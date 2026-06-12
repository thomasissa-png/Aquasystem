import type { Metadata } from 'next';
import { SITE_URL, absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionCTA } from '@/components/sections/SectionCTA';
import { JsonLd } from '@/components/seo/JsonLd';

/**
 * Index du blog « Notre regard » (/notre-regard) — blog-program.md §1.
 * Choix de rendu : SSG (export statique) — contenu éditorial fixe, zéro donnée
 * utilisateur. Liste statique des articles depuis le manifeste (src/content/blog.ts),
 * triée par date décroissante. Pas de fetching dynamique en export statique.
 */
export const metadata: Metadata = {
  title: { absolute: 'Notre regard | Le blog d’Aqua System' },
  description:
    "Le regard d'un pisciniste haut de gamme sur la conception, la construction et la rénovation de piscines sur mesure dans les Yvelines et les Hauts-de-Seine.",
  alternates: { canonical: absoluteUrl('/notre-regard/') },
  openGraph: {
    url: `${SITE_URL}/notre-regard/`,
    title: 'Notre regard — le blog d’Aqua System',
    description:
      "Conception, prix, hygrométrie, rénovation : le regard d'expert d'Aqua System sur les piscines sur mesure de l'ouest parisien.",
  },
};

export default function NotreRegardIndex() {
  const breadcrumb = breadcrumbJsonLd([
    { name: 'Notre regard', path: '/notre-regard/' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />

      <section className="mx-auto max-w-container px-4 pb-8 pt-16 md:px-8 md:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="Notre regard"
          title="Le regard d’un pisciniste sur les projets d’exception."
          subtitle="Ce que trente ans de conception et de chantiers dans l’ouest parisien nous apprennent — sans détour, sans prix inventés. Des sujets concrets, traités par ceux qui construisent."
        />
      </section>

      {/* Filtre + grille : grille COMPLÈTE rendue côté serveur (état « Tous » par
          défaut), filtre client par affichage (D-17, pas de bailout CSR). */}
      <section className="mx-auto max-w-container px-4 pb-20 md:px-8 md:pb-24">
        <BlogGrid />
      </section>

      <SectionCTA
        amorce="Un projet d’extérieur mérite une conversation, pas un formulaire."
        href="/contact?source=notre-regard"
        trackPosition="notre_regard_index"
      />
    </>
  );
}
