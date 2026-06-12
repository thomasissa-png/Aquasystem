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
import { SectionCTA } from '@/components/sections/SectionCTA';
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
  // (INFO-SEO-1) : titre COURT (sans suffixe de zone) + « | Réalisations » via
  // `absolute` (pas le template marque). Séparateur « | » (megalot §2.1). Le
  // titre long factuel reste le H1.
  return {
    title: { absolute: `${shortTitle(r)} | Réalisations` },
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
    // P1-03 (audit-seo T3) : aligner twitter:image sur la photo de réalisation
    // (cohérence OG/Twitter) — sans override, le fallback layout pointait vers
    // /og-image.jpg, signal de qualité faible pour Bing.
    twitter: { images: [ogImg] },
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
              <figcaption className="mt-3 text-xs leading-5 text-foreground-muted">
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

            {/* Description visuelle réelle (D-27 — rédigée d'après la photo,
                zéro invention) : rendue sur TOUTES les fiches, draft compris. */}
            {/* P1-10 alignements (megalot §6) : max-w-[60ch] retiré — la colonne
                aside (1fr) borne déjà la mesure, le token ne jouait jamais. */}
            <p className="mt-6 border-t border-border pt-6 text-base leading-8 text-foreground-secondary">
              {r.visualDescription}
            </p>

            {/* Texte éditorial complet uniquement si renseigné (non-draft). */}
            {!draft && (
              <div className="mt-6 border-t border-border pt-6">
                <FicheEditorial realisation={r} />
              </div>
            )}

            {/* P0 gate passe 6 : CTA inline retiré — il dupliquait mot pour mot
                le SectionCTA sombre qui suit (~80px plus bas). Un seul CTA de
                fin de fiche : le SectionCTA. */}
          </aside>
        </div>
      </section>

      {/* Retour fondateur (D-28) : le CrossSellingBlock faisait « cheveu sur la
          soupe » en bas de fiche → remplacé par un SectionCTA contact sobre.
          Tracking E-09 (cross_selling_clicked) ne vit plus que sur les pages
          univers /piscines-bien-etre et /jardins-paysage — comportement attendu. */}
      <SectionCTA
        amorce="Ce projet vous inspire ? Parlons du vôtre."
        href="/contact?source=realisations"
        trackPosition="realisation_detail"
      />
    </>
  );
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
