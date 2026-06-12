import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { SITE_URL, absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
import {
  REALISATIONS,
  getRealisation,
  isDraft,
  photoSrc,
  shortTitle,
  type Realisation,
} from '@/content/realisations';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { CrossSellingBlock } from '@/components/sections/CrossSellingBlock';
import { JsonLd } from '@/components/seo/JsonLd';

/**
 * Fiche réalisation (/realisations/[slug]) — F-05b, WF-05b.
 * Rendu : SSG via generateStaticParams (export statique — toutes les fiches
 * pré-générées depuis le manifeste).
 *
 * Données éditoriales RÉELLES non encore fournies (champs null) → la fiche est
 * une page galerie sobre, complète en soi : photos + titre factuel + métadonnées.
 * Aucun signal d'inachevé rendu (gate-perception D2/D3, 2026-06-12). Jamais de
 * donnée de chantier inventée (règle zéro invention). Le draft reste noindex.
 */
export function generateStaticParams() {
  return REALISATIONS.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const r = getRealisation(params.slug);
  if (!r) return { title: 'Réalisation introuvable' };
  const ogImg = absoluteUrl(photoSrc(r.photos[0]!.base, '1280w'));
  // Metas dynamiques — metadata-templates.md Page 9. Le <title> reste < 60 car.
  // (INFO-SEO-1) : titre COURT (sans suffixe de zone) + « — Réalisations » via
  // `absolute` (pas le template marque). Le titre long factuel reste le H1.
  return {
    title: { absolute: `${shortTitle(r)} — Réalisations` },
    description: `${r.cardType}, ${r.zone}. Une réalisation Aqua System dans l'ouest parisien. Parlez-nous de votre projet.`,
    // Fiches en draft (sans donnée éditoriale) = thin content → noindex tant que
    // non documentées (arbitrage orchestrateur). Ré-indexation automatique dès
    // que les champs éditoriaux sont remplis (isDraft repasse false).
    robots: isDraft(r) ? { index: false, follow: true } : { index: true, follow: true },
    alternates: { canonical: absoluteUrl(`/realisations/${r.slug}/`) },
    openGraph: {
      url: `${SITE_URL}/realisations/${r.slug}/`,
      title: r.title,
      images: [{ url: ogImg, width: 1280, height: 720, alt: r.photos[0]!.alt }],
    },
  };
}

export default function RealisationFiche({
  params,
}: {
  params: { slug: string };
}) {
  const r = getRealisation(params.slug);
  if (!r) notFound();

  const main = r.photos[0]!;
  const draft = isDraft(r);
  // Cross-sell conditionnel : seulement si piscine "seule" (pas projet complet).
  const showCrossSell = r.type === 'piscine_bien_etre';

  // BreadcrumbList JSON-LD (3 niveaux) — seo-strategy.md §C.6.3.
  const breadcrumb = breadcrumbJsonLd([
    { name: 'Réalisations', path: '/realisations/' },
    { name: r.title, path: `/realisations/${r.slug}/` },
  ]);

  // ImageObject JSON-LD sur la photo principale — seo-strategy.md §C.6.4.
  // Données factuelles uniquement (alt réel, zone large, jamais de commune inventée).
  const imageObject = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: absoluteUrl(photoSrc(main.base, '1280w')),
    name: `${r.title} — Réalisation Aqua System`,
    description: main.alt,
    creator: { '@type': 'Organization', name: 'Aqua System' },
    copyrightHolder: { '@type': 'Organization', name: 'SARL AQUA SYSTEM' },
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={imageObject} />
      {/* Breadcrumb */}
      <div className="bg-background">
        <div className="mx-auto max-w-container px-4 py-6 md:px-8">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground-accent-water underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Retour aux réalisations
          </Link>
        </div>
      </div>

      {/* Contenu principal — split 60/40 */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-container gap-10 px-4 pb-16 md:px-8 lg:grid-cols-[2fr_1fr] lg:gap-12">
          {/* Galerie */}
          <div>
            <figure>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={photoSrc(main.base, '1280w')}
                  alt={main.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-foreground-muted">
                Réalisation Aqua System, {r.zone}. Photo publiée avec
                l'autorisation du propriétaire.
              </figcaption>
            </figure>

            {r.photos.slice(1).map((p) => (
              <figure key={p.base} className="mt-6">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <Image
                    src={photoSrc(p.base, '800w')}
                    alt={p.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>
              </figure>
            ))}
          </div>

          {/* Infos */}
          <aside>
            <h1 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
              {r.title}
            </h1>

            <div className="mt-6 space-y-1">
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-water">
                {r.cardType}
              </p>
              <p className="text-base text-foreground-secondary">{r.zone}</p>
            </div>

            {r.prestations && r.prestations.length > 0 && (
              <ul className="mt-6 space-y-2">
                {r.prestations.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <CheckCircle
                      aria-hidden
                      className="mt-0.5 h-4 w-4 shrink-0 text-foreground-accent-water"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            )}

            {/* Texte éditorial réel uniquement. Draft (sans texte) → page galerie
                sobre, aucun encart d'inachevé rendu (gate-perception D2/D3). */}
            {!draft && (
              <div className="mt-6 border-t border-border pt-6">
                <FicheEditorial realisation={r} />
              </div>
            )}

            <div className="mt-8">
              <p className="mb-3 font-serif text-xl text-foreground">
                Ce projet vous inspire ? Parlons du vôtre.
              </p>
              <ButtonLink
                href={`/contact?source=${ficheSource(r)}`}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Parlez-nous de votre projet →
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>

      {showCrossSell && (
        <CrossSellingBlock
          sourceUnivers="piscines"
          destinationUnivers="jardins"
          destinationHref="/jardins-paysage"
          title="Votre piscine mérite un jardin à sa mesure."
          body="L'eau et le végétal se conçoivent ensemble, en partenariat avec Les Terres Essentielles, bureau d'études paysager."
          ctaLabel="Voir nos créations paysagères →"
          imageSrc={photoSrc('projet-bassin-jardin-paysage', '800w')}
          imageAlt="Piscine et jardin paysagé conçus ensemble dans une propriété de l'ouest parisien"
        />
      )}
    </>
  );
}

/** Map type de fiche → smart default chip du formulaire. */
function ficheSource(r: Realisation): string {
  if (r.type === 'jardin_paysage') return 'jardins-paysage';
  if (r.type === 'projet_complet') return 'projet-complet';
  return 'piscines-bien-etre';
}

/** Texte éditorial Intention → Réponse → Exécution (quand fourni). */
function FicheEditorial({ realisation: r }: { realisation: Realisation }) {
  const blocks: { label: string; text: string | null }[] = [
    { label: 'Intention', text: r.intention },
    { label: 'Réponse', text: r.reponse },
    { label: 'Exécution', text: r.execution },
  ];
  return (
    <div className="space-y-5">
      {blocks
        .filter((b) => b.text)
        .map((b) => (
          <div key={b.label}>
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-water">
              {b.label}
            </p>
            <p className="mt-1 text-base leading-8 text-foreground-secondary">
              {b.text}
            </p>
          </div>
        ))}
    </div>
  );
}
