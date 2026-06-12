import type { Metadata } from 'next';
import { SITE_URL, absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
import { photoSrc } from '@/content/realisations';
import { JARDINERIE_PHOTOS, jardinerieSrc } from '@/content/jardinerie';
import { Hero } from '@/components/sections/Hero';
import { MediaSplit } from '@/components/sections/MediaSplit';
import { ProofBadges, type ProofItem } from '@/components/ui/ProofBadges';
import { CrossSellingBlock } from '@/components/sections/CrossSellingBlock';
import { SectionCTA } from '@/components/sections/SectionCTA';
import { PhotoPlaceholder } from '@/components/sections/PhotoPlaceholder';
import { JsonLd } from '@/components/seo/JsonLd';

/**
 * Jardins & Paysage (/jardins-paysage) — F-03, WF-03.
 * Rendu : SSG. Photos : hero + cross-sell = réalisations réelles à dominante
 * jardin. Blocs prestation : (1) plans paysagers et (2) chantier création
 * restent en PhotoPlaceholder (aucune photo réelle de réalisation) ; (3) la
 * serre/pépinière utilise une VRAIE photo de la jardinerie Les Terres
 * Essentielles (honnête : ambiance pépinière, pas une création de jardin).
 * CrossSellingBlock : CTA forest UNIQUEMENT ici (source=jardins, décision @design).
 */
export const metadata: Metadata = {
  // Metas finales — metadata-templates.md Page 3 (title 50 car., "Paysagiste" en tête).
  title: { absolute: 'Paysagiste Yvelines — Jardins haut de gamme, 78/92' },
  description:
    'Jardinerie, bureau d\'études paysager et pierre naturelle Kei-Stone en 78/92. Les Terres Essentielles, en partenariat avec Aqua System.',
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

/** ProofBadges adaptés jardins (3 preuves — WF-03 §5). */
const JARDINS_PROOFS: ProofItem[] = [
  { figure: "Bureau d'études", label: 'paysager intégré' },
  { figure: 'Pépinière', label: 'propre' },
  { figure: 'Jardinerie & expertise', label: 'depuis 2015' },
];

export default function JardinsPaysagePage() {
  return (
    <>
      <JsonLd data={BREADCRUMB} />
      <Hero
        imageSrc={photoSrc('projet-pool-house-toit-vegetalise', '1280w')}
        imageAlt="Jardin structuré d'une grande propriété : massifs fleuris, pelouse, pavillon à toiture végétalisée, perspective paysagère"
        title="Jardins & Paysage"
        subtitle="En partenariat avec Les Terres Essentielles — bureau d'études paysager, création de parcs et jardins d'exception."
      />

      {/* Bloc 1 — Bureau d'études paysager (placeholder : plans de jardin). */}
      <BureauEtudesBlock />

      {/* Bloc 2 — Création de parcs et jardins (placeholder : chantier création). */}
      <CreationBlock />

      {/* Bloc 3b — Pierre naturelle Kei-Stone (distributeur LTE — synergie piscines/jardins). */}
      <KeiStoneBlock />

      {/* Bloc 4 — Entretien et pépinière : VRAIE photo de la jardinerie LTE. */}
      <PepiniereBlock />

      {/* Preuves jardins */}
      <section className="bg-background">
        <div className="mx-auto max-w-container px-4 py-16 md:px-8">
          <ProofBadges items={JARDINS_PROOFS} className="md:grid-cols-3" />
        </div>
      </section>

      <CrossSellingBlock
        sourceUnivers="jardins"
        destinationUnivers="piscines"
        destinationHref="/piscines-bien-etre"
        title="Un jardin d'exception autour d'une piscine sur mesure."
        body="Notre maison Aqua System les conçoit ensemble — un seul interlocuteur, un seul bureau d'études, aucune interface à gérer entre un pisciniste et un paysagiste qui ne se parlent pas."
        ctaLabel="Découvrir nos piscines sur mesure →"
        imageSrc={photoSrc('jardin-bassin-maison-bois', '800w')}
        imageAlt="Jardin paysagé dense avec bassin de nage intégré à une terrasse en bois, harmonie eau et végétal d'une propriété 78/92"
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
    <PlaceholderSplit
      eyebrow="Bureau d'études"
      title="Un projet pensé avant d'être planté"
      body={[
        "Tout commence par la lecture du terrain : les ombrages, les masses végétales existantes, les contraintes de sol. Notre bureau d'études — en partenariat avec Les Terres Essentielles — pose le plan avant que la première pelle entre dans la terre.",
        "Quand un projet comporte aussi une piscine, les deux études sont menées au même moment. Le résultat : un espace qui tient ensemble, pas une somme de parties.",
      ]}
      placeholder="Plans de jardin déroulés sur une grande table, réglettes et crayons, mains d'un paysagiste au travail, lumière de bureau naturelle."
    />
  );
}

function CreationBlock() {
  return (
    <PlaceholderSplit
      tone="alt"
      reversed
      eyebrow="Création"
      title="La réalisation, du premier arbre à la dernière pierre"
      body={[
        "Allées, massifs, pelouses, enrochements, terrasses végétalisées — chaque élément est conçu pour son rapport avec les autres et avec l'architecture de la maison. Chaque projet part du terrain : aucun plan ne ressemble au précédent, parce qu'aucun terrain ne se ressemble.",
        'Nos végétaux sont sélectionnés ou issus de notre pépinière. Adaptés au sol argilo-calcaire de l\'ouest parisien.',
      ]}
      placeholder="Chantier de création d'un jardin : ouvriers posant des pavés naturels sur une allée, arbres fraîchement plantés, sol travaillé, après-midi ensoleillé."
    />
  );
}

function PepiniereBlock() {
  // VRAIE photo : serre de la jardinerie Les Terres Essentielles (honnête —
  // ambiance pépinière/point de vente, pas une création de jardin).
  const photo = JARDINERIE_PHOTOS['jardinerie-serre-chrysanthemes'];
  return (
    <MediaSplit
      accent="forest"
      eyebrow="Entretien & pépinière"
      title="Des végétaux sélectionnés pour durer"
      body={[
        "Un jardin planté pour aujourd'hui et pensé pour dans vingt ans. Les essences que nous recommandons ont fait leurs preuves dans les propriétés de l'ouest parisien — sur les sols et sous les conditions climatiques que nous connaissons.",
        'Entretien régulier, taille de forme, suivi saisonnier. Et une pépinière pour sourcer les végétaux qui correspondent à votre projet.',
      ]}
      imageSrc={jardinerieSrc(photo.base, '1280w')}
      imageAlt={photo.alt}
    />
  );
}

function KeiStoneBlock() {
  // [À CONFIRMER : partenariat] nature exacte du lien LTE ↔ Kei-Stone
  // ("distributeur agréé", "concessionnaire" ou autre) avant publication —
  // ajuster "distribuent" dans le corps une fois confirmé par le fondateur.
  // Photo : [Photo : dallage/margelles pierre naturelle — à obtenir].
  return (
    <PlaceholderSplit
      eyebrow="Pierre naturelle"
      title="La pierre comme trait d'union entre l'eau et le jardin"
      body={[
        "Dallages de plage, margelles de piscine, allées et pas japonais — la pierre naturelle est le matériau qui fait tenir ensemble l'eau et le végétal. Elle vieillit avec la propriété, absorbe la lumière, et ne ressemble à rien de standard.",
        'Les Terres Essentielles distribuent les pierres naturelles Kei-Stone — une gamme pensée pour les extérieurs haut de gamme : travertin, calcaire, bluestone, pierre grise d\'Asie.',
      ]}
      placeholder="Dallage en pierre naturelle autour d'une plage de piscine — margelles posées à ras, surface calcaire beige-gris, harmonie avec la végétation en bordure. [Photo à obtenir — fournisseur Kei-Stone ou réalisation LTE]"
    />
  );
}

/** MediaSplit avec PhotoPlaceholder à la place de la photo (slots jardins sans
 *  photo réelle). Accent forest. */
function PlaceholderSplit({
  eyebrow,
  title,
  body,
  placeholder,
  reversed = false,
  tone = 'default',
}: {
  eyebrow: string;
  title: string;
  body: string[];
  placeholder: string;
  reversed?: boolean;
  tone?: 'default' | 'alt';
}) {
  return (
    <section className={tone === 'alt' ? 'bg-background-secondary' : undefined}>
      <div className="mx-auto max-w-container px-4 py-16 md:px-8 md:py-20">
        <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2">
          <div className={reversed ? 'lg:order-last' : undefined}>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-forest">
              {eyebrow}
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
              {title}
            </h2>
            <div className="mt-4 space-y-4">
              {body.map((p, i) => (
                <p
                  key={i}
                  className="max-w-[52ch] text-base leading-8 text-foreground-secondary"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
          <figure className={reversed ? 'lg:order-first' : undefined}>
            <PhotoPlaceholder description={placeholder} />
          </figure>
        </div>
      </div>
    </section>
  );
}
