import type { Metadata } from 'next';
import { CONTACT } from '@/lib/constants';
import { absoluteUrl } from '@/lib/seo';

/**
 * Politique de confidentialité (/politique-confidentialite) — arbitrage P1-2.
 * Rendu : SSG. Contenu = docs/legal/privacy-policy.md (RGPD, responsable de
 * traitement SARL AQUA SYSTEM, outil analytics Umami exempté CNIL). Les
 * placeholders [À CONFIRMER] sont rendus discrets.
 */
export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Comment SARL AQUA SYSTEM traite vos données personnelles : finalités, durées de conservation, droits RGPD, hébergement Cloudflare.',
  alternates: { canonical: absoluteUrl('/politique-confidentialite/') },
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
      <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
        Politique de confidentialité
      </h1>

      <Section title="1. Qui sommes-nous ?">
        <p>
          Le présent site est édité par SARL AQUA SYSTEM, société à responsabilité
          limitée au capital de 20 000 €, immatriculée sous le numéro SIREN{' '}
          {CONTACT.siren}, dont le siège social est situé {CONTACT.address.street},{' '}
          {CONTACT.address.postalCode} {CONTACT.address.city}.
        </p>
        <p className="mt-2">
          SARL AQUA SYSTEM est le responsable de traitement de vos données
          personnelles au sens du RGPD (Règlement UE 2016/679).
        </p>
        <p className="mt-2">
          Contact : {CONTACT.email} — {CONTACT.phone}
        </p>
      </Section>

      <Section title="2. Données que nous collectons et pourquoi">
        <p className="font-medium text-foreground">Formulaire de contact</p>
        <p>
          Lorsque vous remplissez le formulaire de contact, nous collectons : votre
          nom et prénom, votre adresse email, votre numéro de téléphone (facultatif)
          et la description de votre projet.
        </p>
        <p className="mt-2">
          <span className="font-medium text-foreground">Finalité</span> : traiter
          votre demande, vous recontacter pour préciser votre projet, établir un
          devis personnalisé.
        </p>
        <p className="mt-2">
          <span className="font-medium text-foreground">Base légale</span> :
          intérêt légitime de SARL AQUA SYSTEM (art. 6.1.f du RGPD) à répondre aux
          demandes initiées par les personnes elles-mêmes.
        </p>
        <p className="mt-2">
          <span className="font-medium text-foreground">
            Durée de conservation
          </span>{' '}
          : 3 ans à compter de notre dernier échange si aucun contrat n'est conclu.
          Si une relation commerciale s'engage, 5 ans à compter de la fin du
          contrat.
        </p>
        <p className="mt-4 font-medium text-foreground">Mesure d'audience</p>
        <p>
          Ce site utilise un outil de mesure d'audience configuré pour être exempt
          de consentement préalable conformément aux recommandations de la CNIL :
          aucun cookie déposé, adresse IP non conservée, aucune donnée
          individuelle, données strictement agrégées, non croisées avec d'autres
          traitements.
        </p>
      </Section>

      <Section title="3. Qui a accès à vos données ?">
        <p>
          Vos données ne sont jamais vendues ni cédées à des tiers à des fins
          commerciales. Les données de votre formulaire sont accessibles à l'équipe
          de SARL AQUA SYSTEM, à notre hébergeur Cloudflare, Inc. (sous-traitant
          technique) et au prestataire d'envoi d'emails acheminant votre message,
          encadré par un accord de traitement des données.
        </p>
        <p className="mt-2">
          Vos données ne sont pas transmises à Les Terres Essentielles, partenaire
          présentée sur ce site, sauf demande explicite de votre part concernant une
          prestation paysagère.
        </p>
      </Section>

      <Section title="4. Transferts hors Union européenne">
        <p>
          Notre site est hébergé par Cloudflare, Inc., société de droit américain.
          Ce transfert est encadré par le cadre EU-US Data Privacy Framework
          (décision d'adéquation de la Commission européenne du 10 juillet 2023).
          Cloudflare dispose également de centres de données en Europe, dont en
          France.
        </p>
      </Section>

      <Section title="5. Vos droits">
        <p>
          Conformément au RGPD, vous disposez d'un droit d'accès, de rectification,
          d'effacement, de limitation et d'opposition concernant vos données.
        </p>
        <p className="mt-2">
          Pour exercer vos droits, adressez votre demande par email à{' '}
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-foreground-accent-water underline underline-offset-2"
          >
            {CONTACT.email}
          </a>
          . Nous vous répondrons dans un délai d'un mois.
        </p>
        <p className="mt-2">
          Vous pouvez introduire une réclamation auprès de la CNIL — 3 place de
          Fontenoy, TSA 80715, 75334 Paris Cedex 07 — www.cnil.fr.
        </p>
      </Section>

      <Section title="6. Cookies">
        <p>
          Ce site n'utilise pas de cookies publicitaires, de traceurs de réseaux
          sociaux ou de cookies nécessitant votre consentement. Aucun bandeau de
          consentement n'est affiché car aucun traceur ne l'exige.
        </p>
      </Section>

      <Section title="7. Sécurité de vos données">
        <p>
          Transmission chiffrée par HTTPS (TLS), accès restreint aux personnes
          habilitées, infrastructure d'hébergement Cloudflare certifiée ISO 27001.
        </p>
      </Section>

      <Section title="8. Contact">
        <p>SARL AQUA SYSTEM</p>
        <p>
          {CONTACT.address.street}, {CONTACT.address.postalCode}{' '}
          {CONTACT.address.city}
        </p>
        <p>Email : {CONTACT.email} — Téléphone : {CONTACT.phone}</p>
      </Section>

      <p className="mt-12 text-sm text-foreground-muted">
        Cette politique a été rédigée en conformité avec le RGPD et la loi
        Informatique et Libertés. À faire valider par un avocat avant publication
        définitive.
      </p>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-xl text-foreground md:text-2xl">{title}</h2>
      <div className="mt-3 space-y-1 text-base leading-8 text-foreground-secondary">
        {children}
      </div>
    </section>
  );
}
