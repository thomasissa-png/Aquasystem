import type { Metadata } from 'next';
import Image from 'next/image';
import {
  SITE_URL,
  absoluteUrl,
  breadcrumbJsonLd,
  faqPageJsonLd,
} from '@/lib/seo';
import { photoSrc, getRealisation } from '@/content/realisations';
import {
  PrescripteurPageView,
  PrescripteurCtaLink,
} from '@/components/sections/PrescripteurTracking';
import { RealisationCard } from '@/components/sections/RealisationCard';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { FaqSection } from '@/components/sections/FaqSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { FAQ_PRESCRIPTEURS, toFaqJsonLd } from '@/content/faq';

/**
 * Espace prescripteurs (/prescripteurs) — F-07, WF-07.
 * Rendu : SSG. E-07 prescripteur_page_viewed au montage (îlot client).
 * E-08 prescripteur_cta_clicked sur les 2 CTA « Présentons-nous ».
 * Wording : ux-writing-guide §10 (exact) + site-copy WF-07.
 * Photo hero (détail finition) sans photo réelle → réalisation à finition
 * irréprochable réutilisée (paroi verre travertin).
 */
export const metadata: Metadata = {
  // Metas finales — metadata-templates.md Page 7 (title 55 car., CTA « Présentons-nous »).
  title: { absolute: 'Espace prescripteurs — Pisciniste & Paysagiste, 78/92' },
  description:
    'Pisciniste & paysagiste haut de gamme 78/92 pour architectes : travail sur votre plan, délais tenus. Présentons-nous.',
  alternates: { canonical: absoluteUrl('/prescripteurs/') },
  openGraph: {
    url: `${SITE_URL}/prescripteurs/`,
    title: 'Espace prescripteurs — Aqua System, pisciniste 78/92',
    images: [
      {
        url: absoluteUrl('/og-image.jpg'),
        width: 1200,
        height: 630,
        alt: 'Aqua System — Partenaire pisciniste des architectes en Yvelines et Hauts-de-Seine',
      },
    ],
  },
};

/** Fil d'Ariane (BreadcrumbList JSON-LD) — seo-strategy.md §C.6.3. */
const BREADCRUMB = breadcrumbJsonLd([
  { name: 'Architectes & prescripteurs', path: '/prescripteurs/' },
]);

/** FAQPage JSON-LD — content-restructuring.md §C.1 (Q/R @geo). */
const FAQ_JSONLD = faqPageJsonLd(toFaqJsonLd(FAQ_PRESCRIPTEURS));

const VALEURS = [
  {
    titre: 'Un exécutant qui lit les plans.',
    body: [
      "Bureau d'études intégré, 30 ans de chantiers dans le 78 et le 92. Nous travaillons sur votre cahier des charges ou co-concevons en amont — avant le premier plan de masse, si vous le souhaitez.",
      "Certification Socotec CSP/ESP-001. Membre du réseau L'Esprit Piscine.",
    ],
  },
  {
    titre: 'Votre relation avec votre client reste la vôtre.',
    body: [
      "Nous ne parlons pas budget directement à votre client. Toutes les décisions de chantier vous passent par vous — c'est notre protocole, pas une exception accordée sur demande.",
      "Interlocuteur technique dédié par chantier. Points d'avancement à la cadence que vous choisissez. Si un problème d'exécution se pose, vous êtes le premier appelé.",
    ],
  },
  {
    titre: '30 ans de réalisations en 78/92. Portfolio sur demande.',
    body: [
      "Terrains en pente, contraintes PLU, délais de réalisation stricts. Nous connaissons les sols de Saint-Nom-la-Bretèche, les servitudes du Vésinet, les exigences des propriétaires de Ville-d'Avray.",
      'Nos références sont locales, identifiables et vérifiables.',
    ],
  },
];

const PREUVES = [
  {
    // Reformulation GEO avec source nommée (content-restructuring.md §B.4) —
    // signal de vérifiabilité pour les LLM (organisme + domaine cités).
    titre: 'Certification Socotec CSP/ESP-001',
    desc: '« Professionnels de la piscine privée à usage familial » — certification délivrée par Socotec Certification France (socotec-certification-international.fr). Disponible sur demande pour tout dossier de prescription.',
  },
  {
    titre: "Réseau L'Esprit Piscine",
    desc: 'Réseau national de piscinistes professionnels. Sélection sur critères techniques et de service.',
  },
  {
    titre: 'Plus de 30 ans d’activité en 78/92',
    desc: "Connaissance des sols, des PLU, des contraintes propres aux propriétés de l'ouest parisien. Des références locales, identifiables, vérifiables.",
  },
  {
    titre: "Bureau d'études paysager intégré",
    desc: 'En partenariat avec Les Terres Essentielles — capacité de projet global eau + végétal depuis un seul bureau d’études.',
  },
];

const PORTFOLIO_SLUGS = [
  'piscine-paroi-verre-travertin',
  'piscine-couloir-demeure-ancienne',
  'projet-piscine-jardin-banquette',
];

export default function PrescripteursPage() {
  const portfolio = PORTFOLIO_SLUGS.map((s) => getRealisation(s)).filter(
    (r): r is NonNullable<typeof r> => Boolean(r),
  );

  return (
    <>
      <JsonLd data={BREADCRUMB} />
      <JsonLd data={FAQ_JSONLD} />
      <PrescripteurPageView />

      {/* Hero split */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-container items-stretch gap-0 lg:min-h-[70vh] lg:grid-cols-12">
          <div className="flex flex-col justify-center px-4 py-16 md:px-8 md:py-20 lg:col-span-7">
            <h1 className="font-serif text-3xl leading-tight text-foreground md:text-4xl lg:text-5xl">
              L'exécutant haut de gamme que vos clients méritent — et qui fait
              honneur à votre prescription.
            </h1>
            <p className="mt-4 max-w-[48ch] text-lg leading-8 text-foreground-secondary">
              Pour les architectes, paysagistes et décorateurs d'intérieur — un
              exécutant qui travaille sur votre plan et respecte votre relation
              client.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              <li className="rounded-md bg-background-proof px-3 py-1.5 text-xs font-medium text-foreground">
                Certification Socotec CSP/ESP-001
              </li>
              <li className="rounded-md bg-background-proof px-3 py-1.5 text-xs font-medium text-foreground">
                Réseau L'Esprit Piscine
              </li>
            </ul>
            <div className="mt-8">
              <PrescripteurCtaLink
                href="/contact?source=prescripteurs"
                position="above_fold"
                label="Présentons-nous →"
                size="md"
              />
            </div>
          </div>
          <figure className="relative min-h-[260px] w-full overflow-hidden lg:col-span-5 lg:min-h-full">
            <Image
              src={photoSrc('piscine-paroi-verre-travertin', '1280w')}
              alt="Détail de finition haut de gamme : margelles en travertin posées avec précision, paroi vitrée, joint parfait — travail artisanal Aqua System"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      {/* 3 blocs valeur */}
      <section className="bg-background">
        <div className="mx-auto max-w-container px-4 py-20 md:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            {VALEURS.map((v) => (
              <article key={v.titre}>
                <h2 className="font-serif text-2xl leading-tight text-foreground">
                  {v.titre}
                </h2>
                <div className="mt-3 space-y-3">
                  {v.body.map((p, i) => (
                    <p
                      key={i}
                      className="text-base leading-8 text-foreground-secondary"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Preuves détaillées */}
      <section className="bg-background-secondary">
        <div className="mx-auto max-w-2xl px-4 py-20 md:px-8">
          <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
            Ce qui nous qualifie
          </h2>
          <ul className="mt-8 divide-y divide-border">
            {PREUVES.map((p) => (
              <li key={p.titre} className="py-5">
                <p className="text-base font-medium text-foreground-accent-water">
                  {p.titre}
                </p>
                <p className="mt-1 text-sm leading-7 text-foreground-secondary">
                  {p.desc}
                </p>
              </li>
            ))}
          </ul>

          {/* P0-C1 (ux-audit) : signal explicite de qualification active pour
              Camille — transforme la page en outil de qualification, pas
              seulement en vitrine. Wording exact ux-audit §FRICTION C1. */}
          <div className="mt-8 flex flex-col gap-4 rounded-lg bg-background-proof px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base font-medium text-foreground">
              Dossier de qualification complet disponible sur demande.
            </p>
            <PrescripteurCtaLink
              href="/contact?source=prescripteurs"
              position="milieu_page"
              label="Présentons-nous →"
              size="md"
            />
          </div>
        </div>
      </section>

      {/* FAQ GEO — content-restructuring.md §A.2 (entre preuves et portfolio).
          Titre B2B « Ce que les architectes nous demandent » (pas « FAQ »). */}
      <FaqSection
        heading="Ce que les architectes nous demandent"
        items={FAQ_PRESCRIPTEURS.map((i) => ({ q: i.q, a: i.a }))}
        tone="default"
      />

      {/* Accès portfolio */}
      <section className="bg-background-secondary">
        <div className="mx-auto max-w-container px-4 py-20 md:px-8">
          <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
            Nos réalisations — références vérifiables
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((r) => (
              <RealisationCard key={r.slug} realisation={r} silent />
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink
              href="/realisations?filter=projet_complet"
              variant="ghost"
              size="md"
            >
              Voir toutes les réalisations →
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* CTA principal Camille */}
      <section className="bg-background-inverse">
        <div className="mx-auto max-w-container px-4 py-24 text-center md:px-8">
          <h2 className="font-serif text-3xl leading-tight text-sand-100 md:text-4xl">
            Travaillons ensemble.
          </h2>
          <p className="mx-auto mt-4 max-w-[50ch] text-lg leading-8 text-sand-300">
            Présentez-nous votre projet. Nous vous répondons avec notre
            portfolio, nos références et notre méthode de collaboration.
          </p>
          <div className="mt-8">
            <PrescripteurCtaLink
              href="/contact?source=prescripteurs"
              position="milieu_page"
              label="Présentons-nous →"
              size="lg"
              inverseFocus
            />
          </div>
        </div>
      </section>
    </>
  );
}
