import type { Metadata } from 'next';
import { CONTACT, SITE_NAME } from '@/lib/constants';
import { absoluteUrl } from '@/lib/seo';

/**
 * Mentions légales (/mentions-legales) — F-09.
 * Rendu : SSG. Contenu = docs/legal/mentions-legales-draft.md (éditeur unique
 * SARL AQUA SYSTEM).
 *
 * D-22 (P1 desktop 2026-06-12, desktop-audit.md Top 5 #5) : les marqueurs
 * « à confirmer » publics (RCS, TVA, assureur, n° police, n° certif Socotec)
 * nuisaient à la crédibilité auprès d'une cible premium qui vérifie. Pour un
 * site en préprod, on OMET les lignes dont la donnée n'est pas fournie (légal :
 * le SIREN identifie déjà l'éditeur ; TVA/RCS non obligatoires sur un site
 * vitrine de services) plutôt que d'afficher un crochet. La garantie décennale
 * est affirmée sans détails d'assureur (placeholder non bloquant validé
 * fondateur, project-context.md 2026-06-12 §4).
 */
export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    'Mentions légales du site. Éditeur : SARL AQUA SYSTEM, Freneuse (78). Hébergeur : Cloudflare, Inc.',
  alternates: { canonical: absoluteUrl('/mentions-legales/') },
  // R-06 (re-audit SEO) : page légale hors sitemap + noindex (budget crawl).
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
      <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
        Mentions légales
      </h1>
      <p className="mt-4 text-base leading-8 text-foreground-secondary">
        Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour
        la confiance dans l'économie numérique (LCEN), les utilisateurs du site{' '}
        {SITE_NAME} sont informés des présentes mentions légales.
      </p>

      <Section title="1. Éditeur du site">
        <p className="font-medium text-foreground">SARL AQUA SYSTEM</p>
        <p>Société à responsabilité limitée au capital de 20 000 €</p>
        <p>
          Siège social : {CONTACT.address.street}, {CONTACT.address.postalCode}{' '}
          {CONTACT.address.city}
        </p>
        <p>SIREN : {CONTACT.siren}</p>
        <p>Code NAF/APE : 4399D, Autres travaux de construction spécialisés</p>
        <p className="mt-3">Téléphone : {CONTACT.phone}</p>
        <p>Email : {CONTACT.email}</p>
        <p className="mt-3">
          <span className="font-medium text-foreground">
            Directeur de la publication
          </span>{' '}
          : Nicolas Berg, gérant de SARL AQUA SYSTEM
        </p>
      </Section>

      <Section title="2. Hébergeur">
        <p className="font-medium text-foreground">Cloudflare, Inc.</p>
        <p>101 Townsend St, San Francisco, CA 94107, États-Unis</p>
        <p>Téléphone : +1 (650) 319-8930</p>
        <p>Site web : https://www.cloudflare.com</p>
        <p className="mt-2">
          Le site est hébergé sur l'infrastructure Cloudflare Pages. Cloudflare
          exploite des points de présence en Europe, dont en France, permettant
          la diffusion des contenus au plus près des utilisateurs.
        </p>
      </Section>

      <Section title="3. Propriété intellectuelle">
        <p>
          L'ensemble des contenus présents sur ce site (textes, photographies,
          visuels, logo, architecture du site) est la propriété exclusive de
          SARL AQUA SYSTEM ou fait l'objet d'une autorisation d'utilisation. Toute
          reproduction, représentation, modification, publication ou adaptation de
          tout ou partie des éléments du site, quel que soit le moyen ou le
          procédé utilisé, est interdite sans autorisation écrite préalable de
          SARL AQUA SYSTEM.
        </p>
        <p className="mt-2">
          Les photographies de réalisations publiées sur ce site sont reproduites
          avec l'autorisation des propriétaires des biens concernés.
        </p>
      </Section>

      <Section title="4. Présentation des activités">
        <p>
          Ce site présente les activités de deux maisons spécialisées dans
          l'aménagement extérieur haut de gamme en Île-de-France :
        </p>
        <p className="mt-2">
          <span className="font-medium text-foreground">AQUA SYSTEM</span> :
          Conception, construction et entretien de piscines sur mesure, spas,
          saunas et hammams. Implantée dans les Yvelines depuis plus de 30 ans, au
          service des propriétés de l'ouest parisien.
        </p>
        <p className="mt-2">
          <span className="font-medium text-foreground">
            En partenariat : LES TERRES ESSENTIELLES
          </span>{' '}
          : Jardinerie, bureau d'études paysager, création et entretien de parcs
          et jardins, pépinière. Implantée à Les Alluets-le-Roi (78580) depuis
          2015.
        </p>
      </Section>

      <Section title="5. Garanties professionnelles : AQUA SYSTEM">
        <p>
          SARL AQUA SYSTEM est titulaire d'une assurance de responsabilité
          décennale conformément à l'article L241-1 du Code des assurances. Les
          références de l'assureur et le numéro de police sont communiqués sur
          demande dans le cadre de tout devis ou contrat.
        </p>
        <p className="mt-2">
          SARL AQUA SYSTEM est certifiée par Socotec dans le cadre du référentiel
          CSP/ESP-001 (professionnels de la piscine). L'attestation de
          certification est disponible sur demande.
        </p>
        <p className="mt-2">
          SARL AQUA SYSTEM est membre du réseau L'Esprit Piscine.
        </p>
      </Section>

      <Section title="6. Données personnelles et cookies">
        <p>
          Le traitement des données personnelles collectées via ce site est décrit
          dans notre{' '}
          <a
            href="/politique-confidentialite/"
            className="text-foreground-accent-water underline underline-offset-2"
          >
            politique de confidentialité
          </a>
          .
        </p>
        <p className="mt-2">
          Ce site n'utilise pas de cookies publicitaires ni de traceurs
          nécessitant votre consentement préalable. La mesure d'audience est
          réalisée par un outil configuré pour être exempt de consentement
          conformément aux recommandations de la CNIL.
        </p>
      </Section>

      <Section title="7. Limitation de responsabilité">
        <p>
          SARL AQUA SYSTEM s'efforce d'assurer l'exactitude et la mise à jour des
          informations diffusées sur ce site. Toutefois, elle ne saurait être
          tenue responsable des erreurs ou omissions. Les informations présentées
          sur ce site sont non contractuelles et susceptibles d'évoluer sans
          préavis.
        </p>
      </Section>

      <Section title="8. Droit applicable">
        <p>
          Les présentes mentions légales sont régies par le droit français. En cas
          de litige et à défaut de résolution amiable, les tribunaux compétents
          sont ceux du ressort du siège social de SARL AQUA SYSTEM.
        </p>
      </Section>

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
