import type { Metadata } from 'next';
import { SITE_URL, absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
import { REALISATIONS, isDraft } from '@/content/realisations';
import { RealisationsGrid } from '@/components/sections/RealisationsGrid';
import { SectionCTA } from '@/components/sections/SectionCTA';
import { JsonLd } from '@/components/seo/JsonLd';
import { frTypo } from '@/lib/typography';

/**
 * Réalisations (/realisations) — F-05, WF-05.
 * Rendu : SSG. En-tête statique + grille filtrable. La grille (client island)
 * rend l'état « tous » COMPLET dans le HTML statique (24 cartes pré-rendues),
 * le filtre URL étant appliqué après montage (D-17 — plus de bailout CSR).
 * E-05/E-06 dans la grille/cards.
 */
export const metadata: Metadata = {
  // Metas finales — metadata-templates.md Page 6 (« Portfolio » retiré, CTA ajouté).
  title: { absolute: 'Réalisations | Piscines, jardins sur mesure, 78/92' },
  description:
    "Piscines sur mesure, jardins, spas et projets complets : nos réalisations en Yvelines et Hauts-de-Seine. Parlez-nous de votre projet.",
  alternates: { canonical: absoluteUrl('/realisations/') },
  openGraph: {
    url: `${SITE_URL}/realisations/`,
    title: 'Réalisations | Piscines & Jardins, Yvelines 78/92',
    images: [
      {
        url: absoluteUrl('/og-image.jpg'),
        width: 1200,
        height: 630,
        alt: 'Réalisations Aqua System — piscines et jardins sur mesure dans les Yvelines',
      },
    ],
  },
};

/** Fil d'Ariane (BreadcrumbList JSON-LD) — seo-strategy.md §C.6.3. */
const BREADCRUMB = breadcrumbJsonLd([
  { name: 'Réalisations', path: '/realisations/' },
]);

/**
 * ItemList JSON-LD (R-08 SEO / SITE-04 GEO, re-audits 2026-06-12) : déclare la
 * collection des fiches indexables aux moteurs et aux LLM (position = ordre du
 * manifeste, le même que la grille en état « tous »).
 */
const ITEM_LIST = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': absoluteUrl('/realisations/#itemlist'),
  name: 'Réalisations Aqua System — piscines et jardins sur mesure (78/92)',
  numberOfItems: REALISATIONS.filter((r) => !isDraft(r)).length,
  itemListElement: REALISATIONS.filter((r) => !isDraft(r)).map((r, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: r.title,
    url: absoluteUrl(`/realisations/${r.slug}/`),
  })),
};

export default function RealisationsPage() {
  return (
    <>
      <JsonLd data={BREADCRUMB} />
      <JsonLd data={ITEM_LIST} />
      <section className="bg-background">
        <div className="mx-auto max-w-container px-4 pb-12 pt-16 md:px-8">
          <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
            Réalisations
          </h1>
          <p className="mt-4 max-w-[52ch] text-lg leading-8 text-foreground-secondary md:text-xl">
            30 ans de chantiers dans les propriétés des Yvelines et des
            Hauts-de-Seine.
          </p>
          {/* Bloc extractible GEO (P0-GEO-01, megalot §3) — texte visible et
              auto-contenu pour les LLM : 6 types d'ouvrage nommés + zones +
              différenciateur bureau d'études. SANS compteur visible (retour
              fondateur 2026-06-12 : un chiffre en ouverture plafonne la
              perception et périme — le compte réel reste dans l'ItemList
              JSON-LD, recalculé au build). */}
          <p className="mt-6 max-w-[72ch] text-base leading-8 text-foreground-secondary">
            {frTypo(
              "Nos réalisations dans les Yvelines et les Hauts-de-Seine couvrent six types d'ouvrage : piscines à débordement, bassins miroir, couloirs de nage, piscines intérieures, fond mobile, paroi de verre, ainsi que des projets associant piscine et jardin conçus depuis le même bureau d'études. Chaque ouvrage est une réponse à un terrain, une architecture et une intention spécifiques.",
            )}
          </p>
          <div className="mt-8">
            <RealisationsGrid />
          </div>
        </div>
      </section>

      <SectionCTA
        amorce="Un projet d'extérieur mérite une conversation, pas un formulaire."
        trackPosition="footer"
      />
    </>
  );
}
