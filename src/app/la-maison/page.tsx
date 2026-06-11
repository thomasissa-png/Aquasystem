import type { Metadata } from 'next';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT, PARTNER_CONTACT } from '@/lib/constants';
import {
  SITE_URL,
  absoluteUrl,
  breadcrumbJsonLd,
  nicolasBergJsonLd,
} from '@/lib/seo';
import { photoSrc } from '@/content/realisations';
import { Hero } from '@/components/sections/Hero';
import { SectionCTA } from '@/components/sections/SectionCTA';
import { JsonLd } from '@/components/seo/JsonLd';

/**
 * La maison (/la-maison) — F-06, WF-06.
 * Rendu : SSG. Hero = photo réelle de réalisation (FALLBACK validé : photo
 * Nicolas Berg non disponible, project-context.md Annexe B P1). Section 5 =
 * propriété réelle. Badges Socotec / L'Esprit Piscine rendus en texte sobre
 * (pas de logo SVG fourni — à substituer si assets reçus).
 */
export const metadata: Metadata = {
  // Metas finales — metadata-templates.md Page 5 (title 58 car., « Freneuse » conservé).
  title: { absolute: "Aqua System — Pisciniste Freneuse (78), 30 ans d'expertise" },
  description:
    "Aqua System et Les Terres Essentielles — 30 ans dans le 78/92. Certification Socotec. Membre L'Esprit Piscine. Rencontrons-nous.",
  alternates: { canonical: absoluteUrl('/la-maison/') },
  openGraph: {
    url: `${SITE_URL}/la-maison/`,
    title: "Aqua System — Pisciniste Freneuse (78), 30 ans d'expertise",
    images: [
      {
        url: absoluteUrl('/og-image.jpg'),
        width: 1200,
        height: 630,
        alt: 'Aqua System — Pisciniste à Freneuse dans les Yvelines depuis 30 ans',
      },
    ],
  },
};

/** Fil d'Ariane (BreadcrumbList JSON-LD) — seo-strategy.md §C.6.3. */
const BREADCRUMB = breadcrumbJsonLd([{ name: 'La maison', path: '/la-maison/' }]);

/** Person JSON-LD Nicolas Berg (content-restructuring.md §C.2). */
const PERSON = nicolasBergJsonLd();

const VALEURS = [
  {
    titre: 'Exigence',
    corps:
      "Pas de standard, pas de catalogue. Chaque terrain est différent — chaque réalisation l'est aussi. L'exigence, c'est refuser le compromis qui ferait tenir un projet dans une offre existante.",
  },
  {
    titre: 'Confiance',
    corps:
      "Nous construisons pour la pérennité — pas pour la saison. Le client dont la piscine a été construite il y a 15 ans : nous connaissons encore chaque équipement sans rouvrir un dossier. C'est ça, la confiance.",
  },
  {
    titre: 'Sur-mesure',
    corps:
      "Aucune piscine ne ressemble à la précédente — parce qu'aucun terrain ne se ressemble. Le sur-mesure n'est pas une option : c'est la seule façon de bien faire.",
  },
];

export default function LaMaisonPage() {
  return (
    <>
      <JsonLd data={BREADCRUMB} />
      <JsonLd data={PERSON} />
      {/* Hero — FALLBACK : photo de réalisation (photo Nicolas Berg non fournie). */}
      <Hero
        imageSrc={photoSrc('piscine-couloir-demeure-ancienne', '1280w')}
        imageAlt="Bassin miroir devant une demeure de caractère de l'ouest parisien — réalisation Aqua System"
        title="La maison"
        subtitle="Plus de 30 ans d'expertise dans les plus belles propriétés de l'ouest parisien — et une conviction : le détail fait tout."
      />

      {/* Notre histoire */}
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-8">
          <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
            Notre histoire
          </h2>
          <div className="mt-6 space-y-5 text-left">
            <p className="text-lg leading-8 text-foreground-secondary">
              Aqua System est née à Freneuse, dans les Yvelines, il y a plus de 30
              ans. Depuis, nous n'avons pas changé de territoire : le 78 et le 92 —
              ces communes où les propriétés ont du caractère et où les
              propriétaires ont des exigences que le standard ne satisfait pas.
            </p>
            <p className="text-lg leading-8 text-foreground-secondary">
              Aujourd'hui, nous sommes une équipe de 8. Nous concevons,
              construisons et entretenons des piscines sur mesure. En partenariat
              avec Les Terres Essentielles, nous portons aussi le végétal — pour
              que l'eau et le jardin ne soient jamais pensés séparément.
            </p>
          </div>
        </div>
      </section>

      {/* Les deux maisons */}
      <section className="bg-background-secondary">
        <div className="mx-auto grid max-w-container gap-12 px-4 py-20 md:grid-cols-2 md:px-8">
          <article>
            <h2 className="font-serif text-2xl leading-tight text-foreground md:text-3xl">
              Aqua System
            </h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-foreground-secondary">
              <p>
                Conception, construction, rénovation et entretien de piscines sur
                mesure. Spas extérieurs HotSpring, saunas, hammams. Traitement
                d'eau, robots Dolphin, SAV équipements.
              </p>
              <p>
                Membre du réseau L'Esprit Piscine. Certification Socotec
                « Professionnels de la piscine » CSP/ESP-001.
              </p>
              {/* Distinctions récentes (faq-geo-copy.md §B.3 — wording @copywriter
                  exact) — faits vérifiables, augmentent la fraîcheur perçue LLM. */}
              <p>
                Trophée d'Or FPP 2024 — Piscine intérieure. Award Bronze EUSA 2025
                — Piscines intérieures privées (Barcelone).
              </p>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              <li className="rounded-md bg-background-proof px-3 py-1.5 text-xs font-medium text-foreground">
                Certification Socotec CSP/ESP-001
              </li>
              <li className="rounded-md bg-background-proof px-3 py-1.5 text-xs font-medium text-foreground">
                Réseau L'Esprit Piscine
              </li>
              <li className="rounded-md bg-background-proof px-3 py-1.5 text-xs font-medium text-foreground">
                Trophée Or FPP 2024
              </li>
            </ul>
            <address className="mt-5 text-sm not-italic text-foreground-secondary">
              <p className="flex items-start gap-2">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {CONTACT.address.street}, {CONTACT.address.postalCode}{' '}
                  {CONTACT.address.city}
                </span>
              </p>
              <p className="mt-2 flex items-center gap-2">
                <Phone aria-hidden className="h-4 w-4 shrink-0" />
                <a
                  href={`tel:${CONTACT.phoneE164}`}
                  className="underline-offset-2 hover:underline"
                >
                  {CONTACT.phone}
                </a>
              </p>
              <p className="mt-2 flex items-center gap-2">
                <Mail aria-hidden className="h-4 w-4 shrink-0" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="underline-offset-2 hover:underline"
                >
                  {CONTACT.email}
                </a>
              </p>
            </address>
          </article>

          <article>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-forest">
              en partenariat avec
            </p>
            <h2 className="font-serif text-2xl leading-tight text-foreground md:text-3xl">
              Les Terres Essentielles
            </h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-foreground-secondary">
              <p>
                Bureau d'études paysager, création et entretien de parcs et
                jardins, pépinière. Des végétaux sélectionnés pour les sols et le
                climat de l'ouest parisien.
              </p>
            </div>
            <address className="mt-5 text-sm not-italic text-foreground-secondary">
              <p className="flex items-start gap-2">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {PARTNER_CONTACT.address.street},{' '}
                  {PARTNER_CONTACT.address.postalCode}{' '}
                  {PARTNER_CONTACT.address.city}
                </span>
              </p>
            </address>
          </article>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-background">
        <div className="mx-auto max-w-container px-4 py-20 md:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            {VALEURS.map((v) => (
              <div key={v.titre}>
                <h3 className="font-serif text-2xl text-foreground">{v.titre}</h3>
                <p className="mt-3 text-base leading-8 text-foreground-secondary">
                  {v.corps}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo propriété représentative — pleine largeur */}
      <section>
        <div className="relative h-[280px] w-full overflow-hidden md:h-[480px]">
          <Image
            src={photoSrc('piscine-jardin-arbre', '1280w')}
            alt="Propriété de grande ampleur : terrasse avec piscine et jardin arboré en arrière-plan, lumière d'été"
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      <SectionCTA
        amorce="Un projet ? Décrivez-nous ce que vous imaginez."
        trackPosition="footer"
      />
    </>
  );
}
