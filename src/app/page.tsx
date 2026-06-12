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
    absolute: `${SITE_NAME} — Pisciniste & Paysagiste haut de gamme, 78/92`,
  },
  description:
    "Piscines et jardins sur mesure, Yvelines et Hauts-de-Seine. Un seul interlocuteur, 30 ans d'expertise. Parlez-nous de votre projet.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    url: SITE_URL,
    title: `${SITE_NAME} — Pisciniste & Paysagiste haut de gamme 78/92`,
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
        imageSrc={photoSrc('piscine-debordement-foret', '1280w')}
        imageAlt="Piscine à débordement intégrée dans un parc paysagé bordé de pins, plan d'eau calme reflétant la végétation, fin d'après-midi"
        title="L'extérieur à la hauteur de votre propriété."
        subtitle="De la vision à la réalisation — eau, jardin, propriété — un seul interlocuteur, depuis 30 ans dans l'ouest parisien."
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
                src={photoSrc('piscine-paroi-verre-travertin', '800w')}
                alt="Piscine sur mesure à paroi vitrée et margelles en travertin clair, jardinières de graminées, propriété de l'ouest parisien"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <h2 className="mt-6 font-serif text-3xl leading-tight text-foreground md:text-4xl">
              Piscines &amp; Bien-être
            </h2>
            <p className="mt-4 max-w-[45ch] text-base leading-8 text-foreground-secondary">
              Conception, construction et entretien de piscines sur mesure. Spas
              HotSpring, saunas, hammams. Chaque ouvrage conçu depuis les
              contraintes réelles du terrain — pas depuis un catalogue.
            </p>
            <Link
              href="/piscines-bien-etre"
              className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground-accent-water underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
            >
              Découvrir
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
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={photoSrc('projet-pool-house-toit-vegetalise', '800w')}
                alt="Pavillon de jardin à toiture végétalisée et jardin structuré avec massifs fleuris, perspective végétale d'une grande propriété"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <h2 className="mt-6 font-serif text-3xl leading-tight text-foreground md:text-4xl">
              Jardins &amp; Paysage
            </h2>
            <p className="mt-4 max-w-[45ch] text-base leading-8 text-foreground-secondary">
              Bureau d'études paysager, création de parcs et jardins sur mesure,
              entretien. L'eau et le végétal conçus ensemble — au même bureau
              d'études, avant le premier plan.
            </p>
            <Link
              href="/jardins-paysage"
              className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground-accent-forest underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-forest-bg)] focus-visible:ring-offset-2"
            >
              Découvrir
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
          {/* P2-GEO-03 : synthèse extractible (point d'entrée LLM sur l'accueil). */}
          <p className="mt-6 max-w-[70ch] text-sm leading-7 text-foreground-secondary">
            Aqua System — certifié Socotec CSP/ESP-001, membre du réseau
            L'Esprit Piscine. Plus de 350 piscines entretenues dans les Yvelines
            et les Hauts-de-Seine depuis plus de 30 ans. Trophée d'Or FPP 2024.
            Award Bronze EUSA 2025.
          </p>
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
        amorce="Un projet d'extérieur mérite une conversation — pas un formulaire."
        trackPosition="footer"
      />
    </>
  );
}
