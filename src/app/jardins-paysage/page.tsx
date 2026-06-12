import type { Metadata } from 'next';
import { SITE_URL, absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
import { photoSrc } from '@/content/realisations';
import { Hero } from '@/components/sections/Hero';
import { MediaSplit } from '@/components/sections/MediaSplit';
import { CrossSellingBlock } from '@/components/sections/CrossSellingBlock';
import { SectionCTA } from '@/components/sections/SectionCTA';
import { JsonLd } from '@/components/seo/JsonLd';

/**
 * Jardins & Paysage (/jardins-paysage) — F-03, WF-03.
 * Rendu : SSG. Photos : hero + cross-sell = réalisations réelles à dominante
 * jardin. Blocs prestation : bureau d'études et création rendus en texte
 * éditorial centré (D-22 / D-24, pas de photo premium disponible) ; pépinière
 * re-splitée avec PhotoPlaceholder élégant (D-25 doctrine photos — lieu réel,
 * photo demandée au fondateur).
 * CrossSellingBlock : CTA forest UNIQUEMENT ici (source=jardins, décision @design).
 */
export const metadata: Metadata = {
  // Metas finales — metadata-templates.md Page 3 (title 50 car., "Paysagiste" en tête).
  title: { absolute: 'Paysagiste Yvelines — Jardins haut de gamme, 78/92' },
  description:
    "Jardinerie, bureau d'études paysager, jardins et parcs sur mesure en 78/92. Les Terres Essentielles, en partenariat avec Aqua System.",
  alternates: { canonical: absoluteUrl('/jardins-paysage/') },
  openGraph: {
    url: `${SITE_URL}/jardins-paysage/`,
    title: 'Paysagiste Yvelines — Jardins sur mesure 78/92',
    images: [
      {
        url: absoluteUrl('/og-image.jpg'),
        width: 1200,
        height: 630,
        alt: 'Jardin et terrasse en pierre naturelle dans une propriété des Yvelines — Les Terres Essentielles',
      },
    ],
  },
};

/** Fil d'Ariane (BreadcrumbList JSON-LD) — seo-strategy.md §C.6.3. */
const BREADCRUMB = breadcrumbJsonLd([
  { name: 'Jardins & Paysage', path: '/jardins-paysage/' },
]);

/**
 * Services jardins (3 — WF-03 §5).
 * NF-2 (re-audit-iteration2 §3, D-18) : ce sont des SERVICES fonctionnels, pas
 * des preuves chiffrées → NE PAS réutiliser ProofBadges (fond doré + chiffres
 * serif). Spec design-audit P1-JARDINS-1 + P1-HIERAR-1 : fond secondaire neutre,
 * bordure gauche, sous-titres DM Sans semibold (libère la hiérarchie des H2).
 */
const JARDINS_SERVICES: { title: string; detail: string }[] = [
  { title: "Bureau d'études", detail: 'paysager intégré' },
  { title: 'Pépinière', detail: 'propre' },
  { title: 'Jardinerie & expertise', detail: 'depuis 2015' },
];

export default function JardinsPaysagePage() {
  return (
    <>
      <JsonLd data={BREADCRUMB} />
      <Hero
        imageSrc={photoSrc('jardin-bassin-maison-bois', '1280w')}
        imageAlt="Jardin sur mesure avec bassin intégré, végétation dense et maison contemporaine à ossature bois — réalisation Les Terres Essentielles dans l'ouest parisien"
        // Crop-first (D-28) : la photo brique-piscine restait sémantiquement « une
        // piscine sur une page jardin » à tous les cadrages → swap spec. La candidate
        // jardin-bassin a une dominante végétale franche. center_40% garde la maison.
        objectPosition={{ base: 'object-[center_40%]' }}
        // Overlay allégé (60%) : la photo est plus sombre en bas (végétaux).
        overlayClassName="bg-gradient-to-t from-[rgba(26,21,16,0.60)] via-[rgba(26,21,16,0.22)] to-transparent"
        title="Jardins & Paysage"
        subtitle="En partenariat avec Les Terres Essentielles : bureau d'études paysager, création et entretien de parcs et jardins sur mesure."
      />

      {/* Bloc 1 — Bureau d'études paysager (texte éditorial, D-22).
          Le claim GEO LTE (P2-GEO-01) est désormais le 3e paragraphe du body
          (D-28) — section standalone supprimée. */}
      <BureauEtudesBlock />

      {/* Bloc 2 — Création de parcs et jardins (texte éditorial, D-22). */}
      <CreationBlock />

      {/* Bloc Kei-Stone retiré à la demande du fondateur (2026-06-12) — copy
          conservé dans docs/copy/site-copy.md §v1.1 pour réactivation future. */}

      {/* Bloc 4 — Entretien et pépinière : VRAIE photo de la jardinerie LTE. */}
      <PepiniereBlock />

      {/* Services jardins (NF-2) — cartes neutres, sous-titres DM Sans semibold. */}
      <section className="bg-background">
        <div className="mx-auto max-w-container px-4 py-16 md:px-8">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
            {JARDINS_SERVICES.map((service) => (
              <li
                key={service.title}
                className="rounded-md border-l-2 border-border-default bg-background-secondary p-5"
              >
                <p className="font-sans text-lg font-semibold leading-snug text-foreground">
                  {service.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-foreground-secondary">
                  {service.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CrossSellingBlock
        sourceUnivers="jardins"
        destinationUnivers="piscines"
        destinationHref="/piscines-bien-etre"
        title="Un jardin pensé avec la piscine, depuis le même bureau d'études."
        body="Notre maison Aqua System les conçoit ensemble : un seul interlocuteur, un seul bureau d'études, aucune interface à gérer entre un pisciniste et un paysagiste qui ne se parlent pas."
        ctaLabel="Découvrir nos piscines sur mesure →"
        imageSrc={photoSrc('piscine-jardin-arbre', '800w')}
        imageAlt="Bassin bordé de margelles claires, arbre planté au bord, terrasse en bois et haies dans une propriété de l'ouest parisien"
      />

      <SectionCTA
        amorce="Votre projet commence par une conversation."
        href="/contact?source=jardins-paysage"
        trackPosition="footer"
      />
    </>
  );
}

function BureauEtudesBlock() {
  return (
    <TextBlock
      eyebrow="Bureau d'études"
      title="Un projet pensé avant d'être planté"
      body={[
        "Tout commence par la lecture du terrain : les ombrages, les masses végétales existantes, les contraintes de sol. Notre bureau d'études, en partenariat avec Les Terres Essentielles, pose le plan avant que la première pelle entre dans la terre.",
        "Quand un projet comporte aussi une piscine, les deux études sont menées au même moment. Le résultat : un espace qui tient ensemble, pas une somme de parties.",
        // Claim GEO (D-28) : intégré ici comme 3e paragraphe au lieu d'une section
        // standalone qui « flottait » au centre d'un vide (retour fondateur).
        "Les Terres Essentielles dispose d'un bureau d'études paysager intégré aux Alluets-le-Roi (Yvelines, 78580), permettant la co-conception de projets extérieurs associant piscine et jardin dès la phase de plan, dans les Yvelines et les Hauts-de-Seine.",
      ]}
    />
  );
}

function CreationBlock() {
  return (
    <TextBlock
      tone="alt"
      eyebrow="Création"
      title="La réalisation, du premier arbre à la dernière pierre"
      body={[
        "Allées, massifs, pelouses, enrochements, terrasses végétalisées : chaque élément est conçu pour son rapport avec les autres et avec l'architecture de la maison. Chaque projet part du terrain : aucun plan ne ressemble au précédent, parce qu'aucun terrain ne se ressemble.",
        'Nos végétaux sont sélectionnés ou issus de notre pépinière. Adaptés au sol argilo-calcaire de l\'ouest parisien.',
      ]}
    />
  );
}

function PepiniereBlock() {
  // D-25 : ré-arbitrage doctrine photos (conversion d'abord). La pépinière est
  // un lieu physique réel (LTE) : un visuel y convertit mieux qu'un bloc texte.
  // Re-split avec PhotoPlaceholder élégant ; photo réelle de pépinière demandée
  // au fondateur (photos-a-fournir.md). Remplace le TextBlock D-22/D-24.
  return (
    <MediaSplit
      eyebrow="Entretien & pépinière"
      accent="forest"
      title="Des végétaux sélectionnés pour durer"
      body={[
        "Un jardin planté pour aujourd'hui et pensé pour dans vingt ans. Les essences que nous recommandons ont fait leurs preuves dans les propriétés de l'ouest parisien, sur les sols et sous les conditions climatiques que nous connaissons.",
        'Entretien régulier, taille de forme, suivi saisonnier. Et une pépinière pour sourcer les végétaux qui correspondent à votre projet.',
      ]}
      placeholderSubject="Allée de la pépinière Les Terres Essentielles, végétaux en conteneurs alignés"
      reversed
    />
  );
}

/**
 * Bloc prestation jardins SANS photo réelle disponible.
 *
 * D-22 (P0 desktop 2026-06-12) : les PhotoPlaceholder « Visuel à venir » étaient
 * perçus comme une maquette inachevée sur une page commerciale premium
 * (desktop-audit.md Top 5 #1 — reco : « masquer le placeholder tant qu'aucune
 * image n'est fournie »). On supprime le slot image vide et on rend le bloc en
 * texte éditorial pleine largeur, centré et resserré : lecture délibérée, aucun
 * trou visuel. La photo réelle pourra réintroduire un MediaSplit plus tard.
 */
function TextBlock({
  eyebrow,
  title,
  body,
  tone = 'default',
}: {
  eyebrow: string;
  title: string;
  body: string[];
  tone?: 'default' | 'alt';
}) {
  return (
    <section className={tone === 'alt' ? 'bg-background-secondary' : undefined}>
      <div className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8 md:py-20">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-forest">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
          {title}
        </h2>
        <div className="mx-auto mt-5 max-w-[60ch] space-y-4 text-left">
          {body.map((p, i) => (
            <p
              key={i}
              className="text-base leading-8 text-foreground-secondary"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
