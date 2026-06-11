import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { onRequestPost, onRequestOptions } from '../../functions/api/contact';

/**
 * INTÉGRATION — Pages Function POST /api/contact (F-08, critères US-08).
 * Handlers exportés testés avec Request/env mockés (KV in-memory, fetch Resend stubbé).
 * 100% déterministe, zéro réseau réel. Couvre 200/400/429/500 + honeypot + KV fail-open.
 */

// --- Mock env -----------------------------------------------------------------
class FakeKV {
  store = new Map<string, string>();
  async get(key: string) {
    return this.store.get(key) ?? null;
  }
  async put(key: string, value: string) {
    this.store.set(key, value);
  }
}

interface FakeEnv {
  RESEND_API_KEY: string;
  CONTACT_EMAIL_TO: string;
  CONTACT_EMAIL_FROM: string;
  SITE_NAME?: string;
  RATE_LIMIT_KV?: FakeKV;
  RATE_LIMIT_MAX?: string;
  RATE_LIMIT_WINDOW_SECONDS?: string;
}

function makeEnv(over: Partial<FakeEnv> = {}): FakeEnv {
  return {
    RESEND_API_KEY: 'test-key',
    CONTACT_EMAIL_TO: 'nicolas@aqua-system.fr',
    CONTACT_EMAIL_FROM: 'site@aqua-system.fr',
    SITE_NAME: 'Aquasystem',
    ...over,
  };
}

const VALID_PAYLOAD = {
  prenom_nom: 'Alexandre Dupont',
  email: 'alexandre@domaine.fr',
  commune: 'Le Vésinet',
  description: 'Je souhaite une piscine à débordement et un jardin paysagé complet.',
  langue: 'fr',
};

function jsonRequest(body: Record<string, unknown>, ip = '1.2.3.4'): Request {
  return new Request('https://site.fr/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': ip },
    body: JSON.stringify(body),
  });
}

function formRequest(pairs: [string, string][], ip = '1.2.3.4'): Request {
  const body = new URLSearchParams(pairs).toString();
  return new Request('https://site.fr/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'CF-Connecting-IP': ip,
    },
    body,
  });
}

// --- Stub fetch (Resend) ------------------------------------------------------
let fetchMock: ReturnType<typeof vi.fn>;
beforeEach(() => {
  fetchMock = vi.fn(async () => new Response('{}', { status: 200 }));
  vi.stubGlobal('fetch', fetchMock);
});
afterEach(() => {
  vi.unstubAllGlobals();
});

// =============================================================================
describe('OPTIONS (CORS preflight)', () => {
  it('retourne 204 avec headers CORS', async () => {
    const res = await onRequestOptions();
    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Methods')).toContain('POST');
  });
});

describe('happy path JSON (US-08 #1)', () => {
  it('200 success:true et Resend appelé une fois', async () => {
    const res = await onRequestPost({ request: jsonRequest(VALID_PAYLOAD), env: makeEnv() });
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ success: true });
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0]?.[0]).toBe('https://api.resend.com/emails');
  });

  it('reply_to = email du contact', async () => {
    await onRequestPost({ request: jsonRequest(VALID_PAYLOAD), env: makeEnv() });
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const sent = JSON.parse(init.body as string);
    expect(sent.reply_to).toBe('alexandre@domaine.fr');
  });
});

describe('form-urlencoded sans JS (US-08 #9)', () => {
  it('succès → redirect 303 vers /contact/merci/', async () => {
    const req = formRequest([
      ['prenom_nom', 'Alexandre Dupont'],
      ['email', 'alexandre@domaine.fr'],
      ['commune', 'Le Vésinet'],
      ['description', 'Une piscine et un jardin paysagé sur ma propriété du Vésinet.'],
      ['type_projet', 'piscine_bien_etre'],
      ['type_projet', 'jardin_paysage'], // chips multiples → tableau
    ]);
    const res = await onRequestPost({ request: req, env: makeEnv() });
    expect(res.status).toBe(303);
    expect(res.headers.get('Location')).toBe('/contact/merci/');
  });

  it('erreur de validation → redirect 303 vers /contact/', async () => {
    const req = formRequest([
      ['prenom_nom', ''],
      ['email', 'bad'],
      ['commune', ''],
      ['description', 'court'],
    ]);
    const res = await onRequestPost({ request: req, env: makeEnv() });
    expect(res.status).toBe(303);
    expect(res.headers.get('Location')).toBe('/contact/');
  });
});

describe('parsing dual & enums (US-08 #13)', () => {
  it('chips multiples JSON sérialisés dans l’email', async () => {
    await onRequestPost({
      request: jsonRequest({
        ...VALID_PAYLOAD,
        type_projet: ['piscine_bien_etre', 'jardin_paysage'],
      }),
      env: makeEnv(),
    });
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const sent = JSON.parse(init.body as string);
    expect(sent.text).toContain('Piscine & Bien-être / Jardin & Paysage');
  });

  it('aucun chip → email "Non précisé — voir description" (US-08 #13)', async () => {
    await onRequestPost({ request: jsonRequest(VALID_PAYLOAD), env: makeEnv() });
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const sent = JSON.parse(init.body as string);
    expect(sent.text).toContain('Non précisé — voir description');
  });

  it('type_projet hors enum → 400 validation', async () => {
    const res = await onRequestPost({
      request: jsonRequest({ ...VALID_PAYLOAD, type_projet: ['licorne'] }),
      env: makeEnv(),
    });
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ error: 'validation' });
  });

  it('budget hors enum → 400 validation', async () => {
    const res = await onRequestPost({
      request: jsonRequest({ ...VALID_PAYLOAD, budget_tranche: '1_million' }),
      env: makeEnv(),
    });
    expect(res.status).toBe(400);
  });

  it('budget non renseigné → email "Non renseigné" (US-08 #2)', async () => {
    await onRequestPost({ request: jsonRequest(VALID_PAYLOAD), env: makeEnv() });
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const sent = JSON.parse(init.body as string);
    expect(sent.text).toContain('Budget indicatif : Non renseigné');
  });
});

describe('validation 400 (US-08 #4/#5)', () => {
  it('email + description invalides → fields par champ avec wording exact', async () => {
    const res = await onRequestPost({
      request: jsonRequest({
        ...VALID_PAYLOAD,
        email: 'alexandre.test',
        description: 'court',
      }),
      env: makeEnv(),
    });
    expect(res.status).toBe(400);
    const body = (await res.json()) as { fields: Record<string, string> };
    expect(body.fields.email).toContain('email semble incorrecte');
    expect(body.fields.description).toContain('Décrivez votre projet');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('content-type non supporté → 400 invalid_body', async () => {
    const req = new Request('https://site.fr/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: 'nope',
    });
    const res = await onRequestPost({ request: req, env: makeEnv() });
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ error: 'invalid_body' });
  });

  it('nom de 10 000 caractères → 400 (donnée adversariale, MAX_NAME)', async () => {
    const res = await onRequestPost({
      request: jsonRequest({ ...VALID_PAYLOAD, prenom_nom: 'a'.repeat(10_000) }),
      env: makeEnv(),
    });
    expect(res.status).toBe(400);
  });
});

describe('honeypot anti-spam (US-08 #10)', () => {
  it('website rempli → 200 silencieux, Resend NON appelé', async () => {
    const res = await onRequestPost({
      request: jsonRequest({ ...VALID_PAYLOAD, website: 'http://spam.ru' }),
      env: makeEnv(),
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ success: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('honeypot via form → redirect merci silencieux', async () => {
    const req = formRequest([
      ['prenom_nom', 'Bot'],
      ['email', 'bot@spam.ru'],
      ['commune', 'X'],
      ['description', 'aaaaaaaaaaaaaaaaaaaaaaaa'],
      ['website', 'spam'],
    ]);
    const res = await onRequestPost({ request: req, env: makeEnv() });
    expect(res.status).toBe(303);
    expect(res.headers.get('Location')).toBe('/contact/merci/');
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('rate limiting 429 (US-08 #11)', () => {
  it('6e requête même IP → 429 avec message', async () => {
    const kv = new FakeKV();
    const env = makeEnv({ RATE_LIMIT_KV: kv, RATE_LIMIT_MAX: '5' });
    const ip = '9.9.9.9';
    for (let i = 0; i < 5; i++) {
      const ok = await onRequestPost({ request: jsonRequest(VALID_PAYLOAD, ip), env });
      expect(ok.status).toBe(200);
    }
    const res = await onRequestPost({ request: jsonRequest(VALID_PAYLOAD, ip), env });
    expect(res.status).toBe(429);
    const body = (await res.json()) as { message: string };
    expect(body.message).toContain('Trop de tentatives');
    expect(body.message).toContain('01 30 42 26 00');
  });

  it('IP différentes ne partagent pas le compteur', async () => {
    const kv = new FakeKV();
    const env = makeEnv({ RATE_LIMIT_KV: kv, RATE_LIMIT_MAX: '1' });
    await onRequestPost({ request: jsonRequest(VALID_PAYLOAD, '1.1.1.1'), env });
    const other = await onRequestPost({ request: jsonRequest(VALID_PAYLOAD, '2.2.2.2'), env });
    expect(other.status).toBe(200);
  });

  it('KV absent → fail-open (pas de 429)', async () => {
    const env = makeEnv(); // pas de RATE_LIMIT_KV
    for (let i = 0; i < 10; i++) {
      const res = await onRequestPost({ request: jsonRequest(VALID_PAYLOAD), env });
      expect(res.status).toBe(200);
    }
  });
});

describe('erreurs 500 (US-08 #6)', () => {
  it('secrets absents → 500 send_failure avec téléphone', async () => {
    const env = makeEnv({ RESEND_API_KEY: '' });
    const res = await onRequestPost({ request: jsonRequest(VALID_PAYLOAD), env });
    expect(res.status).toBe(500);
    const body = (await res.json()) as { message: string };
    expect(body.message).toContain('01 30 42 26 00');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('Resend renvoie un échec (resp.ok false) → 500', async () => {
    fetchMock.mockResolvedValueOnce(new Response('err', { status: 502 }));
    const res = await onRequestPost({ request: jsonRequest(VALID_PAYLOAD), env: makeEnv() });
    expect(res.status).toBe(500);
  });

  it('fetch Resend lève une exception → 500 (catch global)', async () => {
    fetchMock.mockRejectedValueOnce(new Error('network down'));
    const res = await onRequestPost({ request: jsonRequest(VALID_PAYLOAD), env: makeEnv() });
    expect(res.status).toBe(500);
  });
});

describe('email — sujet et qualification NSM (US-08 #12)', () => {
  it('commune en 92 → "Qualifié NSM : OUI"', async () => {
    await onRequestPost({
      request: jsonRequest({
        ...VALID_PAYLOAD,
        commune: 'Versailles 78000',
        type_projet: ['piscine_bien_etre'],
      }),
      env: makeEnv(),
    });
    const sent = JSON.parse((fetchMock.mock.calls[0]?.[1] as RequestInit).body as string);
    expect(sent.subject).toContain('Aquasystem — Nouveau contact : Piscine & Bien-être');
    expect(sent.text).toContain('Qualifié NSM : OUI');
  });

  it('commune hors 78/92 → "Qualifié NSM : NON"', async () => {
    await onRequestPost({
      request: jsonRequest({ ...VALID_PAYLOAD, commune: 'Lyon' }),
      env: makeEnv(),
    });
    const sent = JSON.parse((fetchMock.mock.calls[0]?.[1] as RequestInit).body as string);
    expect(sent.text).toContain('Qualifié NSM : NON');
  });

  it('caractères spéciaux dans la commune (donnée adversariale) n’explosent pas', async () => {
    const res = await onRequestPost({
      request: jsonRequest({ ...VALID_PAYLOAD, commune: 'L\'Étang-la-Ville <92>' }),
      env: makeEnv(),
    });
    expect(res.status).toBe(200);
  });
});
