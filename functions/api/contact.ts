/**
 * Cloudflare Pages Function — POST /api/contact
 * =============================================================================
 * SQUELETTE. Hors du build Next.js (dossier functions/ Cloudflare).
 * Endpoint UNIQUE côté serveur du site (export statique pour tout le reste).
 *
 * Spec : docs/product/functional-specs.md > "API — Pages Function POST /api/contact"
 * Contrat analytics (E-01) : déclenché CÔTÉ CLIENT après 200, pas ici.
 *
 * Accepte application/json ET application/x-www-form-urlencoded (dégradation
 * progressive sans JS — le <form> natif poste en urlencoded).
 *
 * [BLOQUÉ P0-2/P0-3] : la VALIDATION FINALE des champs (schéma exact, enum
 * type_projet, tranches budget, multi-select vs texte libre) est en arbitrage
 * P0. Les blocs concernés sont balisés ci-dessous. Le squelette compile et gère
 * déjà : CORS, méthode, parsing, honeypot, rate limiting, stub Resend.
 * =============================================================================
 */

// --- Typage de l'environnement Cloudflare (bindings + secrets) ---------------
interface Env {
  // Secrets (dashboard Cloudflare Pages > Settings > Environment variables)
  RESEND_API_KEY: string;
  CONTACT_EMAIL_TO: string;
  CONTACT_EMAIL_FROM: string;
  // Rate limiting
  RATE_LIMIT_WINDOW_SECONDS?: string;
  RATE_LIMIT_MAX?: string;
  // KV namespace binding (Settings > Functions > KV namespace bindings)
  RATE_LIMIT_KV?: KVNamespace;
}

// Minimal KV typing (évite la dépendance @cloudflare/workers-types dans ce squelette).
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface PagesFunctionContext {
  request: Request;
  env: Env;
}

// --- Réponses standardisées --------------------------------------------------
const CORS_HEADERS: Record<string, string> = {
  // Même origine en production (site + function servis par Cloudflare Pages).
  // Restreindre explicitement après mise en ligne (remplacer * par le domaine).
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

// --- Parsing des deux content-types ------------------------------------------
async function parseBody(request: Request): Promise<Record<string, unknown>> {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return (await request.json()) as Record<string, unknown>;
  }

  if (contentType.includes('application/x-www-form-urlencoded')) {
    const form = await request.formData();
    const out: Record<string, unknown> = {};
    for (const [key, value] of form.entries()) {
      // type_projet peut arriver en valeurs multiples (multi-select natif).
      if (key in out) {
        const existing = out[key];
        out[key] = Array.isArray(existing) ? [...existing, value] : [existing, value];
      } else {
        out[key] = value;
      }
    }
    return out;
  }

  throw new Error('unsupported_content_type');
}

// --- Rate limiting par IP (KV) -----------------------------------------------
// Choix KV vs Durable Object : KV est le plus simple, suffisant pour 5 req/IP/h
// à faible trafic (cohérence éventuelle acceptable). Voir dev-decisions.md D-05.
async function isRateLimited(env: Env, ip: string): Promise<boolean> {
  if (!env.RATE_LIMIT_KV) return false; // pas de KV configuré → on ne bloque pas
  const max = Number(env.RATE_LIMIT_MAX ?? '5');
  const windowSec = Number(env.RATE_LIMIT_WINDOW_SECONDS ?? '3600');
  const key = `rl:contact:${ip}`;

  const current = Number((await env.RATE_LIMIT_KV.get(key)) ?? '0');
  if (current >= max) return true;

  // Incrément best-effort. Le TTL réinitialise la fenêtre.
  await env.RATE_LIMIT_KV.put(key, String(current + 1), { expirationTtl: windowSec });
  return false;
}

// --- Envoi email via Resend (STUB) -------------------------------------------
async function sendEmail(
  env: Env,
  payload: Record<string, unknown>,
): Promise<boolean> {
  // TODO [BLOQUÉ P0-2/P0-3] : construire le sujet et le corps depuis le schéma
  // de champs FINAL (type_projet enum, tag [PROJET COMPLET], commune...).
  // Format cible documenté dans functional-specs.md > "Format de l'email".
  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_EMAIL_FROM,
      to: env.CONTACT_EMAIL_TO,
      reply_to: typeof payload.email === 'string' ? payload.email : undefined,
      subject: '[Aquasystem] Nouveau contact', // TODO P0 : sujet dynamique
      text: 'Stub — corps à générer depuis le schéma final.', // TODO P0
    }),
  });
  return resp.ok;
}

// --- Handlers ----------------------------------------------------------------
export async function onRequestOptions(): Promise<Response> {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context: PagesFunctionContext): Promise<Response> {
  const { request, env } = context;

  try {
    // 1. Garde-fou config : clé API absente → 500 explicite (pas de crash, pas
    //    d'exposition de secret). Critère d'acceptation US-11 #8.
    if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL_TO || !env.CONTACT_EMAIL_FROM) {
      return json({ success: false, error: 'server_misconfigured' }, 500);
    }

    // 2. Rate limiting par IP.
    const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    if (await isRateLimited(env, ip)) {
      return json({ success: false, error: 'rate_limited' }, 429);
    }

    // 3. Parsing (json | urlencoded).
    let body: Record<string, unknown>;
    try {
      body = await parseBody(request);
    } catch {
      return json({ success: false, error: 'invalid_body' }, 400);
    }

    // 4. Honeypot : champ "website" doit être vide. Si rempli → 200 silencieux
    //    (jamais 403 : ne pas révéler le filtre au bot). Aucun email envoyé.
    const honeypot = body.website;
    if (typeof honeypot === 'string' && honeypot.trim() !== '') {
      return json({ success: true }, 200);
    }

    // 5. VALIDATION DES CHAMPS.
    //    TODO [BLOQUÉ P0-2/P0-3 : schéma champs final en arbitrage] —
    //    implémenter ici les 7 validations serveur de functional-specs.md :
    //    prenom_nom, email, telephone FR, type_projet (enum), commune,
    //    budget_tranche (enum optionnel), description (20..2000). Retour 400 au
    //    moindre échec. NE PAS coder le schéma tant que P0-2/P0-3 non tranchés.

    // 6. Envoi email (stub Resend).
    const sent = await sendEmail(env, body);
    if (!sent) {
      return json({ success: false, error: 'email_failed' }, 502);
    }

    return json({ success: true }, 200);
  } catch {
    return json({ success: false, error: 'internal_error' }, 500);
  }
}
