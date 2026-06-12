/**
 * Cloudflare Pages Function — POST /api/contact
 * =============================================================================
 * Endpoint UNIQUE côté serveur du site (export statique pour tout le reste).
 * Hors du build Next.js (dossier functions/ Cloudflare, exclu du tsconfig Next).
 *
 * Spec : docs/product/functional-specs.md F-08 v1.1 (payload + format email).
 * Wording erreurs/succès : docs/copy/ux-writing-guide.md v1.2 (source de vérité).
 * Contrat E-01 : déclenché CÔTÉ CLIENT après 200 (pas ici).
 *
 * Deux content-types acceptés :
 *  - application/json (parcours avec JS) → réponses JSON (200/400/429/500).
 *  - application/x-www-form-urlencoded (fallback sans JS) → redirect 303 vers
 *    /contact/merci en cas de succès ; en cas d'erreur, redirect 303 vers
 *    /contact (la page reste utilisable, message générique côté page non géré
 *    en export statique — comportement dégradé acceptable, US-08 #9).
 * =============================================================================
 */

// --- Typage de l'environnement Cloudflare (bindings + secrets) ---------------
interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL_TO: string;
  CONTACT_EMAIL_FROM: string;
  SITE_NAME?: string;
  RATE_LIMIT_WINDOW_SECONDS?: string;
  RATE_LIMIT_MAX?: string;
  RATE_LIMIT_KV?: KVNamespace;
}

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number },
  ): Promise<void>;
}

interface PagesFunctionContext {
  request: Request;
  env: Env;
}

// --- Constantes métier (alignées functional-specs v1.1) ----------------------
const SITE_NAME_FALLBACK = 'Aquasystem';

const TYPE_PROJET_ENUM = [
  'piscine_bien_etre',
  'jardin_paysage',
  'projet_complet',
  'prescripteur',
] as const;
type TypeProjet = (typeof TYPE_PROJET_ENUM)[number];

const BUDGET_ENUM = ['50_80k', '80_150k', '150k_plus', 'prefere_discuter'] as const;
type Budget = (typeof BUDGET_ENUM)[number];

/** Labels lisibles pour le sujet/corps de l'email (humain, pas la valeur API). */
const TYPE_PROJET_LABELS: Record<TypeProjet, string> = {
  piscine_bien_etre: 'Piscine & Bien-être',
  jardin_paysage: 'Jardin & Paysage',
  projet_complet: 'Projet complet',
  prescripteur: 'Espace prescripteur',
};

const BUDGET_LABELS: Record<Budget, string> = {
  '50_80k': '50 000 – 80 000 €',
  '80_150k': '80 000 – 150 000 €',
  '150k_plus': '150 000 € et plus',
  prefere_discuter: 'Je préfère en discuter',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^0[1-9][0-9]{8}$/;
const DESCRIPTION_MIN = 20;
const DESCRIPTION_MAX = 2000;
const MAX_NAME = 100;

/** Codes postaux 78/92 → qualification NSM informative (jamais bloquante). */
const QUALIFYING_DEPTS = ['78', '92'];

// --- Scoring lead (lead-qualification.md §7) — INTERNE Nicolas uniquement -----
// JAMAIS exposé dans la réponse HTTP au visiteur, JAMAIS dans l'analytics.
// Matching insensible casse + partiel (« saint-nom » matche « Saint-Nom-la-Bretèche »).
type Segment = 'GO' | 'AMBIGU' | 'PRESCRIPTEUR' | 'HORS_ZONE' | 'HORS_BUDGET';

/** Communes haute valeur 78/92 (lead-qualification §2 critère 1) + codes dépt. */
const COMMUNES_ZONE = [
  '78',
  '92',
  'vésinet',
  'saint-nom',
  'marnes-la-coquette',
  'saint-cloud',
  'ville-d',
  'chaville',
  'cernay',
  'versailles',
  'marly',
  "l'étang-la-ville",
  'etang-la-ville',
  'louveciennes',
  'croissy',
  'bougival',
  'jouy-en-josas',
  'freneuse',
  'neuilly',
  'rueil',
  'sèvres',
  'sevres',
  'meudon',
  'garches',
  'vaucresson',
  'la celle-saint-cloud',
];
/** Limitrophes : Val-d'Oise (95) / Eure (27). */
const COMMUNES_LIMITROPHES = ['95', '27'];

const SIGNAUX_FORTS = [
  'propriété',
  'propriete',
  'terrain',
  'superficie',
  'm²',
  'm2',
  'architecte',
  'recommandé',
  'recommande',
  "pour l'été",
  'avant l’automne',
  "avant l'automne",
  'ma femme',
  'mon mari',
  'on réfléchit depuis',
  'on reflechit depuis',
  'on a le permis',
  'permis',
];
const SIGNAUX_FAIBLES = [
  'devis',
  'prix le plus bas',
  'comparer',
  'moins cher',
];

function scoreZone(commune: string): { points: number; horsZone: boolean } {
  const c = commune.toLowerCase();
  if (COMMUNES_ZONE.some((m) => c.includes(m))) return { points: 3, horsZone: false };
  if (COMMUNES_LIMITROPHES.some((m) => c.includes(m)))
    return { points: 2, horsZone: false };
  if (c.trim() !== '') return { points: 1, horsZone: true }; // mentionnée mais hors zone
  return { points: 0, horsZone: true };
}

function scoreBudget(
  budget: Budget | undefined,
  types: TypeProjet[],
): number {
  if (budget === '80_150k' || budget === '150k_plus') return 2;
  if (budget === 'prefere_discuter') return 1;
  if (budget === undefined) return 1; // qualification douce — neutre
  if (budget === '50_80k') {
    // piscine seule = cohérent minimum (1) ; projet intégré = sous le seuil (0).
    const piscineSeule =
      types.length === 1 && types[0] === 'piscine_bien_etre';
    return piscineSeule ? 1 : 0;
  }
  return 1;
}

function scoreDescription(description: string): number {
  const d = description.toLowerCase();
  const forts = SIGNAUX_FORTS.filter((s) => d.includes(s)).length;
  const faibles = SIGNAUX_FAIBLES.filter((s) => d.includes(s)).length;
  let pts = forts >= 2 ? 2 : forts === 1 ? 1 : 0;
  if (faibles >= 1) pts -= 1; // signal négatif
  return pts;
}

interface LeadScore {
  score: number; // borné 0..7
  segment: Segment;
}

function computeScore(p: CleanPayload): LeadScore {
  const zone = scoreZone(p.commune);
  const budget = scoreBudget(p.budget_tranche, p.type_projet);
  const desc = scoreDescription(p.description);
  const raw = zone.points + budget + desc;
  const score = Math.max(0, Math.min(7, raw));

  let segment: Segment;
  if (p.type_projet.includes('prescripteur')) {
    segment = 'PRESCRIPTEUR'; // override (lead-qualification §7)
  } else if (score >= 4) {
    segment = 'GO';
  } else if (score === 2 || score === 3) {
    segment = 'AMBIGU';
  } else if (zone.horsZone) {
    segment = 'HORS_ZONE'; // score ≤ 1 + commune hors zone
  } else {
    segment = 'HORS_BUDGET';
  }

  return { score, segment };
}

const SEGMENT_LABELS: Record<Segment, string> = {
  GO: 'GO',
  AMBIGU: 'À QUALIFIER',
  PRESCRIPTEUR: 'PRESCRIPTEUR',
  HORS_ZONE: 'HORS ZONE',
  HORS_BUDGET: 'HORS BUDGET',
};

// --- Réponses standardisées --------------------------------------------------
const CORS_HEADERS: Record<string, string> = {
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

function redirect(location: string): Response {
  return new Response(null, { status: 303, headers: { Location: location } });
}

// --- Parsing des deux content-types ------------------------------------------
interface ParsedBody {
  isForm: boolean;
  data: Record<string, unknown>;
}

async function parseBody(request: Request): Promise<ParsedBody> {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return { isForm: false, data: (await request.json()) as Record<string, unknown> };
  }

  if (contentType.includes('application/x-www-form-urlencoded')) {
    const form = await request.formData();
    const out: Record<string, unknown> = {};
    for (const [key, value] of form.entries()) {
      if (key in out) {
        const existing = out[key];
        out[key] = Array.isArray(existing)
          ? [...existing, value]
          : [existing, value];
      } else {
        out[key] = value;
      }
    }
    return { isForm: true, data: out };
  }

  throw new Error('unsupported_content_type');
}

// --- Validation --------------------------------------------------------------
interface CleanPayload {
  prenom_nom: string;
  email: string;
  telephone?: string;
  type_projet: TypeProjet[];
  commune: string;
  budget_tranche?: Budget;
  description: string;
  page_source?: string;
}

type ValidationResult =
  | { ok: true; value: CleanPayload }
  | { ok: false; fields: Record<string, string> };

function asString(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

function validate(data: Record<string, unknown>): ValidationResult {
  const fields: Record<string, string> = {};

  const prenom_nom = asString(data.prenom_nom).trim();
  if (prenom_nom === '' || prenom_nom.length > MAX_NAME) {
    fields.prenom_nom =
      'Votre nom nous permet de vous répondre personnellement.';
  }

  const email = asString(data.email).trim();
  if (email === '') {
    fields.email = 'Nous avons besoin de votre email pour vous répondre.';
  } else if (!EMAIL_REGEX.test(email)) {
    fields.email =
      "L'adresse email semble incorrecte. Vérifiez le format : prenom@domaine.fr.";
  }

  // Téléphone optionnel.
  let telephone: string | undefined;
  const telRaw = asString(data.telephone).trim();
  if (telRaw !== '') {
    const cleaned = telRaw.replace(/[\s.\-]/g, '');
    if (!PHONE_REGEX.test(cleaned)) {
      fields.telephone =
        'Ce numéro ne semble pas valide. Vérifiez-le ou laissez ce champ vide si vous préférez.';
    } else {
      telephone = cleaned;
    }
  }

  // type_projet optionnel — normaliser en tableau, valider l'enum.
  const type_projet: TypeProjet[] = [];
  const rawTypes = data.type_projet;
  const typeArray = Array.isArray(rawTypes)
    ? rawTypes
    : rawTypes !== undefined && rawTypes !== ''
      ? [rawTypes]
      : [];
  for (const t of typeArray) {
    const s = asString(t);
    if ((TYPE_PROJET_ENUM as readonly string[]).includes(s)) {
      type_projet.push(s as TypeProjet);
    } else {
      fields.type_projet = 'Sélection de projet invalide.';
    }
  }

  const commune = asString(data.commune).trim();
  if (commune === '' || commune.length > MAX_NAME) {
    fields.commune =
      'Précisez votre commune pour que nous puissions répondre de façon pertinente.';
  }

  // budget optionnel.
  let budget_tranche: Budget | undefined;
  const budgetRaw = asString(data.budget_tranche).trim();
  if (budgetRaw !== '') {
    if ((BUDGET_ENUM as readonly string[]).includes(budgetRaw)) {
      budget_tranche = budgetRaw as Budget;
    } else {
      fields.budget_tranche = 'Tranche de budget invalide.';
    }
  }

  const description = asString(data.description).trim();
  if (description.length < DESCRIPTION_MIN) {
    fields.description =
      'Décrivez votre projet en quelques mots : cela guidera notre premier échange.';
  } else if (description.length > DESCRIPTION_MAX) {
    fields.description = 'Description trop longue (2000 caractères maximum).';
  }

  if (Object.keys(fields).length > 0) return { ok: false, fields };

  return {
    ok: true,
    value: {
      prenom_nom,
      email,
      telephone,
      type_projet,
      commune,
      budget_tranche,
      description,
      page_source: asString(data.page_source).trim() || undefined,
    },
  };
}

// --- Rate limiting par IP (KV) — dev-decisions D-05 --------------------------
async function isRateLimited(env: Env, ip: string): Promise<boolean> {
  if (!env.RATE_LIMIT_KV) return false; // fail-open : honeypot reste la 1re ligne
  const max = Number(env.RATE_LIMIT_MAX ?? '5');
  const windowSec = Number(env.RATE_LIMIT_WINDOW_SECONDS ?? '3600');
  const key = `rl:contact:${ip}`;

  const current = Number((await env.RATE_LIMIT_KV.get(key)) ?? '0');
  if (current >= max) return true;

  await env.RATE_LIMIT_KV.put(key, String(current + 1), {
    expirationTtl: windowSec,
  });
  return false;
}

// --- Construction de l'email (functional-specs « Format de l'email ») --------
function isQualified(commune: string, description: string): boolean {
  // NSM informative : description ≥ 20 (toujours vrai ici) + commune 78/92.
  // La détection fine du département se fait au dashboard ; ici on cherche un
  // indice « 78/92 » dans la commune saisie (best-effort, jamais bloquant).
  void description;
  return QUALIFYING_DEPTS.some((d) => commune.includes(d));
}

function buildEmail(
  p: CleanPayload,
  siteName: string,
): { subject: string; text: string } {
  const typesLabel =
    p.type_projet.length > 0
      ? p.type_projet.map((t) => TYPE_PROJET_LABELS[t]).join(', ')
      : 'projet à préciser';

  // Scoring interne (lead-qualification §7) — sujet préfixé [LEAD score/7 — segment].
  // Réservé à l'email Nicolas : jamais dans la réponse HTTP ni l'analytics.
  const { score, segment } = computeScore(p);
  const segmentLabel = SEGMENT_LABELS[segment];

  const subject = `[LEAD ${score}/7 — ${segmentLabel}] ${siteName} — Nouveau contact : ${typesLabel} — ${p.commune}`;

  const now = new Date();
  const dateFr = now.toLocaleString('fr-FR', {
    timeZone: 'Europe/Paris',
    dateStyle: 'short',
    timeStyle: 'short',
  });

  const typesBody =
    p.type_projet.length > 0
      ? p.type_projet.map((t) => TYPE_PROJET_LABELS[t]).join(' / ')
      : 'Non précisé — voir description';

  const budgetBody = p.budget_tranche
    ? BUDGET_LABELS[p.budget_tranche]
    : 'Non renseigné';

  const nsm = isQualified(p.commune, p.description) ? 'OUI' : 'NON';

  const text = [
    `SCORE : ${score}/7 → SEGMENT : ${segmentLabel}`,
    '(Qualification automatique — outil d\'aide à la décision, jamais d\'envoi auto au prospect.)',
    '',
    'NOUVEAU MESSAGE DE CONTACT',
    '',
    `Nom : ${p.prenom_nom}`,
    `Email : ${p.email}`,
    `Téléphone : ${p.telephone ?? 'Non renseigné'}`,
    `Commune : ${p.commune}`,
    `Type(s) de projet : ${typesBody}`,
    `Budget indicatif : ${budgetBody}`,
    '',
    'Description du projet :',
    p.description,
    '',
    '---',
    `Reçu le : ${dateFr}`,
    `Source page : ${p.page_source ?? 'contact direct'}`,
    `Qualifié NSM : ${nsm}`,
    '---',
    `Répondre directement à cet email pour contacter ${p.prenom_nom}.`,
  ].join('\n');

  return { subject, text };
}

async function sendEmail(env: Env, p: CleanPayload): Promise<boolean> {
  const siteName = env.SITE_NAME ?? SITE_NAME_FALLBACK;
  const { subject, text } = buildEmail(p, siteName);

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_EMAIL_FROM,
      to: env.CONTACT_EMAIL_TO,
      reply_to: p.email,
      subject,
      text,
    }),
  });
  return resp.ok;
}

// --- Handlers ----------------------------------------------------------------
export async function onRequestOptions(): Promise<Response> {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(
  context: PagesFunctionContext,
): Promise<Response> {
  const { request, env } = context;

  // Le content-type détermine le format de réponse (JSON vs redirect 303).
  let parsed: ParsedBody;
  try {
    parsed = await parseBody(request);
  } catch {
    return json({ success: false, error: 'invalid_body' }, 400);
  }
  const wantsRedirect = parsed.isForm;

  try {
    // 1. Garde-fou config : secrets absents → 500 explicite (pas d'exposition).
    if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL_TO || !env.CONTACT_EMAIL_FROM) {
      if (wantsRedirect) return redirect('/contact/');
      return json(
        {
          success: false,
          error: 'send_failure',
          message:
            'Une erreur est survenue. Veuillez réessayer ou nous appeler au 01 30 42 26 00.',
        },
        500,
      );
    }

    // 2. Honeypot : si "website" rempli → 200 silencieux, aucun email.
    const honeypot = parsed.data.website;
    if (typeof honeypot === 'string' && honeypot.trim() !== '') {
      if (wantsRedirect) return redirect('/contact/merci/');
      return json({ success: true }, 200);
    }

    // 3. Rate limiting par IP.
    const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    if (await isRateLimited(env, ip)) {
      if (wantsRedirect) return redirect('/contact/');
      return json(
        {
          success: false,
          error: 'rate_limit',
          message:
            'Trop de tentatives. Veuillez réessayer dans une heure ou nous appeler au 01 30 42 26 00.',
        },
        429,
      );
    }

    // 4. Validation complète (functional-specs v1.1).
    const result = validate(parsed.data);
    if (result.ok === false) {
      if (wantsRedirect) return redirect('/contact/');
      return json(
        { success: false, error: 'validation', fields: result.fields },
        400,
      );
    }

    // 5. Envoi email (Resend).
    const sent = await sendEmail(env, result.value);
    if (!sent) {
      if (wantsRedirect) return redirect('/contact/');
      return json(
        {
          success: false,
          error: 'send_failure',
          message:
            'Une erreur est survenue. Veuillez réessayer ou nous appeler au 01 30 42 26 00.',
        },
        500,
      );
    }

    // 6. Succès.
    if (wantsRedirect) return redirect('/contact/merci/');
    return json(
      { success: true, message: 'Votre message a bien été transmis.' },
      200,
    );
  } catch {
    if (wantsRedirect) return redirect('/contact/');
    return json(
      {
        success: false,
        error: 'send_failure',
        message:
          'Une erreur est survenue. Veuillez réessayer ou nous appeler au 01 30 42 26 00.',
      },
      500,
    );
  }
}
