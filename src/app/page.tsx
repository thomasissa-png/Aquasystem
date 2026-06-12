import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';
import { SITE_URL, absoluteUrl } from '@/lib/seo';
import { getFeatured, photoSrc } from '@/content/realisations';
import { Hero } from '@/components/sections/Hero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProofBadges } from '@/components/ui/ProofBadges';
import { RealisationCard } from '@/components/sections/RealisationCard';
import { SectionCTA } from '@/components/sections/SectionCTA';
import { CtaTrackerLink } from '@/components/sections/CtaTrackerLink';
import { ButtonLink } from '@/components/ui/ButtonLink';

/**
 * Accueil (/) — F-01, WF-01.
 * Choix de rendu : SSG (export statique) — page marketing, contenu fixe, zéro
 * donnée utilisateur. Les seuls éléments interactifs (tracking CTA, cards) sont
 * isolés en îlots client.
 */
export const metadata: Metadata = {
  // Metas finales — metadata-templates.md Page 1 (title 56 car. avec "Aquasystem").
  title: {
    absolute: `${SITE_NAME} | Pisciniste & Paysagiste haut de gamme, 78/92`,
  },
  description:
    "Piscines et jardins sur mesure, Yvelines et Hauts-de-Seine. Un seul interlocuteur, 30 ans d'expertise. Parlez-nous de votre projet.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    url: SITE_URL,
    title: `${SITE_NAME} | Pisciniste & Paysagiste haut de gamme 78/92`,
    description:
      "Piscines et jardins sur mesure dans l'ouest parisien — un seul interlocuteur depuis 30 ans.",
    images: [
      {
        url: absoluteUrl('/og-image.jpg'),
        width: 1200,
        height: 630,
        alt: "Aquasystem — Piscine et jardin sur mesure, propriété de l'ouest parisien",
      },
    ],
  },
};

export default function HomePage() {
  const featured = getFeatured();

  return (
    <>
      <Hero
        variant="home"
        imageSrc={photoSrc('piscine-couloir-demeure-ancienne', '1280w')}
        imageAlt="Demeure ancienne en pierre et brique encadrée d'arbres adultes, long bassin miroir reflétant la façade, grande pelouse — propriété de caractère dans les Yvelines"
        // Casting-visuels §3a : cadrage par viewport pour garder la demeure
        // (centre-haut) et le bassin (centre-bas) dans le cadre.
        objectPosition={{
          base: 'object-[40%_30%]',
          md: 'md:object-[center_30%]',
          lg: 'lg:object-[center_35%]',
        }}
        // design-fixes-fondateur §A.1 : overlay renforcé par breakpoint pour
        // garantir le 4.5:1 sur la façade claire et le ciel. Mobile from 0.88 /
        // via 0.65 (35%) / to 0.15 ; desktop allégé via 0.55 (30%) pour garder
        // la demeure visible sur grand écran.
        overlayClassName="bg-gradient-to-t from-[rgba(26,21,16,0.88)] via-[rgba(26,21,16,0.65)] via-35% to-[rgba(26,21,16,0.15)] md:from-[rgba(26,21,16,0.85)] md:via-[rgba(26,21,16,0.55)] md:via-30% md:to-[rgba(26,21,16,0.10)]"
        title="L'extérieur à la hauteur de votre propriété."
        subtitle="De la vision à la réalisation : piscines et jardins sur mesure dans les Yvelines et les Hauts-de-Seine. Un seul interlocuteur, depuis 30 ans."
        cta={
          <CtaTrackerLink
            href="/contact"
            position="hero"
            label="Parlez-nous de votre projet →"
          />
        }
      />

      {/* Section 2 — Les deux univers */}
      <section className="mx-auto max-w-container px-4 py-20 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-0">
          <article className="lg:border-r lg:border-border lg:pr-12">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-water">
              Aqua System
            </p>
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={photoSrc('piscine-interieure-pierre-poutres', '800w')}
                alt="Couloir de nage intérieur sous charpente en bois et murs en pierre, perspective sur le bassin — ouvrage Aqua System"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[center_40%]"
              />
            </div>
            <h2 className="mt-6 font-serif text-3xl leading-tight text-foreground md:text-4xl">
              Piscines &amp; Bien-être
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-8 text-foreground-secondary">
              Conception, construction et entretien de piscines sur mesure. Spas
              HotSpring, saunas, hammams. Chaque ouvrage conçu depuis les
              contraintes réelles du terrain, pas depuis un catalogue.
            </p>
            <Link
              href="/piscines-bien-etre"
              className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground-accent-water underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
            >
              Découvrir nos piscines sur mesure
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </article>

          <article className="lg:pl-12">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-forest">
              en partenariat avec Les Terres Essentielles
            </p>
            {/* Photo FOURNIE PAR LE FONDATEUR (2026-06-12) pour ce slot —
                remplace le PhotoPlaceholder D-25. Droits accordés. */}
            <figure className="relative aspect-square w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/accueil/jardin-piscine-parasols-800w.webp"
                srcSet="/images/accueil/jardin-piscine-parasols-800w.webp 800w, /images/accueil/jardin-piscine-parasols-1280w.webp 1280w"
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Jardin paysagé autour d'une piscine : parasols en paille, fauteuils suspendus, muret en pierre sèche et massifs plantés — l'eau et le végétal composés ensemble"
                width={1394}
                height={1044}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-[center_60%]"
              />
            </figure>
            <h2 className="mt-6 font-serif text-3xl leading-tight text-foreground md:text-4xl">
              Jardins &amp; Paysage
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-8 text-foreground-secondary">
              Bureau d'études paysager, création de parcs et jardins sur mesure,
              entretien. L'eau et le végétal conçus ensemble, au même bureau
              d'études, avant le premier plan.
            </p>
            <Link
              href="/jardins-paysage"
              className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground-accent-forest underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-forest-bg)] focus-visible:ring-offset-2"
            >
              Découvrir nos créations paysagères
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </article>
        </div>
      </section>

      {/* Section 3 — Preuves */}
      <section className="bg-background-secondary">
        <div className="mx-auto max-w-container px-4 py-12 md:px-8">
          <ProofBadges />
          {/* P2-GEO-03 (D-28) : synthèse extractible (point d'entrée LLM) en ligne
              de crédit centrée sous filet — statut secondaire assumé vs les badges. */}
          <div className="mt-8 border-t border-border-muted pt-5 text-center">
            <p className="mx-auto max-w-[72ch] text-sm leading-7 text-foreground-muted">
              Aqua System : certifié Socotec CSP/ESP-001, membre du réseau
              L'Esprit Piscine. Plus de 350 piscines entretenues dans les Yvelines
              et les Hauts-de-Seine depuis plus de 30 ans. Trophée d'Or FPP 2024
              (Piscine intérieure, FPP). Award Bronze EUSA 2025, Piscines
              intérieures privées (Barcelone).
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — Extrait portfolio */}
      <section className="mx-auto max-w-container px-4 py-20 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Réalisations"
          title="Quelques propriétés que nous avons transformées."
          centered
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <RealisationCard key={r.slug} realisation={r} silent />
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/realisations" variant="ghost" size="md">
            Voir toutes les réalisations →
          </ButtonLink>
        </div>
      </section>

      {/* Section 5 — CTA final */}
      <SectionCTA
        amorce="Un projet d'extérieur mérite une conversation, pas un formulaire."
        trackPosition="footer"
      />
    </>
  );
}
