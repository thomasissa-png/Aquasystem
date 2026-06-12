import type { Metadata } from 'next';
import { SITE_URL, absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
import { photoSrc } from '@/content/realisations';
import { Hero } from '@/components/sections/Hero';
import { MediaSplit } from '@/components/sections/MediaSplit';
import { OuvragesSection } from '@/components/sections/OuvragesSection';
import { TextBlock } from '@/components/sections/TextBlock';
import { ProofBadges } from '@/components/ui/ProofBadges';
import { CrossSellingBlock } from '@/components/sections/CrossSellingBlock';
import { SectionCTA } from '@/components/sections/SectionCTA';
import { JsonLd } from '@/components/seo/JsonLd';

/**
 * Piscines & Bien-être (/piscines-bien-etre) — F-02, WF-02.
 * Rendu : SSG. Contenu fixe marketing. Cross-sell + tracking en îlots client.
 * Photos : hero + cross-sell = réalisations réelles ; le bloc spa HotSpring
 * n'a pas de photo réelle disponible → MediaSplit avec PhotoPlaceholder élégant
 * (D-25 doctrine photos : conversion d'abord, photo demandée au fondateur).
 */
export const metadata: Metadata = {
  // Metas finales — metadata-templates.md Page 2 (source de vérité @seo).
  // Arbitrage B.5 (orchestrateur, 2026-06-11) : version enrichie GEO retenue —
  // Trophée Or FPP 2024 vérifié, signal CTR différenciant premium (141 car.).
  title: { absolute: 'Piscines sur mesure Yvelines & 92 — Pisciniste Aqua System' },
  // Description enrichie (savoir-faire-copy §5, D-30) : intègre les 6 types
  // d'ouvrage comme qualificatif de confiance + alimente le CTR longue traîne
  // (« piscine intérieure 78 », « fond mobile »). 158 car., sous le seuil 160.
  // Title actuel conservé (proposition enrichie §5 optionnelle, arbitrage @seo).
  description:
    'Pisciniste certifié Socotec, Trophée Or FPP 2024. Débordement, miroir, piscine intérieure, fond mobile — 6 types d’ouvrage, tous réalisés en 78/92. Parlez-nous de votre projet.',
  alternates: { canonical: absoluteUrl('/piscines-bien-etre/') },
  openGraph: {
    url: `${SITE_URL}/piscines-bien-etre/`,
    title: 'Piscines sur mesure Yvelines 78/92 — Aqua System',
    images: [
      {
        url: absoluteUrl('/og-image.jpg'),
        width: 1200,
        height: 630,
        alt: 'Piscine sur mesure réalisée par Aqua System dans les Yvelines',
      },
    ],
  },
};

/** Fil d'Ariane (BreadcrumbList JSON-LD) — seo-strategy.md §C.6.3. */
const BREADCRUMB = breadcrumbJsonLd([
  { name: 'Piscines & Bien-être', path: '/piscines-bien-etre/' },
]);

export default function PiscinesBienEtrePage() {
  return (
    <>
      <JsonLd data={BREADCRUMB} />
      <Hero
        imageSrc={photoSrc('piscine-interieure-pierre-poutres', '1280w')}
        imageAlt="Couloir de nage intérieur sur mesure — charpente bois apparente, murs en pierre de pays, lumière naturelle — réalisation Aqua System dans les Yvelines"
        // Crop-first (D-28) : la photo travertin restait « catalogue » à tous les
        // cadrages testés → swap spec. center_35% cadre l'axe du couloir.
        objectPosition={{ base: 'object-[center_35%]' }}
        title="Piscines & Bien-être"
        subtitle="Notre maison Aqua System : conception sur mesure depuis plus de 30 ans en Yvelines et Hauts-de-Seine."
      />

      <MediaSplit
        eyebrow="Conception sur mesure"
        accent="water"
        title="De la feuille blanche à l'inauguration"
        body={[
          "Chaque piscine commence par l'écoute : la pente du terrain, l'orientation de la maison, les usages de la famille. Notre bureau d'études traduit cette vision en un plan, avant de poser la première pierre.",
          "De la conception à la livraison, un seul interlocuteur porte votre projet. Vous n'avez pas à gérer les interfaces entre les corps de métier.",
        ]}
        imageSrc={photoSrc('piscine-debordement-foret', '800w')}
        imageAlt="Piscine à débordement bordée d'une terrasse en bois, plan d'eau ouvert sur une forêt — réalisation Aqua System"
      />

      {/* Bloc 2 — Spas, saunas, hammams (inversé, fond alterné).
          D-25 : ré-arbitrage doctrine photos — re-split avec PhotoPlaceholder
          élégant (conversion d'abord) ; le visuel spa convertirait mieux qu'un
          bloc texte centré. Photo demandée au fondateur (photos-a-fournir.md). */}
      <MediaSplit
        eyebrow="Spa & bien-être"
        accent="water"
        title="L'eau chaude dans votre propriété"
        body={[
          "Spa extérieur HotSpring, sauna finlandais, hammam, intégrés à l'architecture de votre propriété, pas posés en périphérie. Chaque installation est conçue avec le reste de l'espace : la terrasse, le jardin, les lignes de la maison.",
          'Partenaire HotSpring pour les spas : une gamme pensée pour le résidentiel haut de gamme.',
        ]}
        placeholderSubject="Spa extérieur HotSpring intégré à une terrasse, en soirée — propriété 78/92"
        reversed
        tone="alt"
      />

      <MediaSplit
        eyebrow="Suivi annuel"
        accent="water"
        title="L'équipe qui connaît votre piscine de l'intérieur"
        body={[
          "La piscine que vous nous avez demandé de construire, nous la connaissons. L'équipement, les spécificités du terrain, les choix techniques faits au moment du chantier. Quand vous appelez, vous n'expliquez pas, vous continuez.",
          'Plus de 350 piscines entretenues dans le 78 et le 92. Robots Dolphin, traitement d\'eau, SAV équipements.',
        ]}
        imageSrc={photoSrc('piscine-interieure-beton-baies', '800w')}
        imageAlt="Piscine intérieure en béton brut ouverte sur le jardin — entretien et suivi Aqua System"
      />

      {/* Strate savoir-faire (D-30, savoir-faire-copy §1-3) — entre « Suivi
          annuel » et ProofBadges. */}
      <OuvragesSection />

      {/* §2 « Construit pour durer » — TextBlock fond alterné, eyebrow water. */}
      <TextBlock
        tone="alt"
        accent="water"
        eyebrow="Construction"
        title="Construit pour durer"
        body={[
          "Chaque piscine est une structure en béton armé, conçue par notre bureau d'études et contrôlée par un organisme tiers avant réception. Le procédé de construction est couvert par un Avis Technique CSTB : c'est la preuve que la structure répond aux normes de l'ouvrage privé, indépendamment de notre propre déclaration.",
          "Un seul marché, un seul responsable : vous signez avec Aqua System, qui engage sa garantie décennale sur l'ensemble de l'ouvrage. Certification de services Socotec CSP/ESP-001 « Professionnels de la piscine privée à usage familial », membre Propiscines Certifié.",
        ]}
      />

      {/* §3 « La matière qui reste » — TextBlock neutre, eyebrow water. */}
      <TextBlock
        accent="water"
        eyebrow="Finitions"
        title="La matière qui reste"
        body={[
          "Le choix du matériau n'est pas une option de fin de chantier : il conditionne la lecture de l'ensemble. Margelles en pierre naturelle ou travertin, plages en grès cérame, revêtement dont la teinte compose la couleur d'eau — chaque décision est prise au moment du plan, pas en rattrapage.",
          'Ces mêmes pierres, nous les travaillons aussi autour de la propriété : terrasses, allées, soubassements. La cohérence entre le bord de bassin et le reste de l\'extérieur vient de là.',
        ]}
      />

      {/* Preuves */}
      <section className="bg-background">
        <div className="mx-auto max-w-container px-4 py-16 md:px-8">
          <ProofBadges />
          {/* Synthèse texte extractible par les LLM (faq-geo-copy.md §B.1 —
              wording @copywriter exact). Les badges visuels ne sont pas lus par
              les moteurs IA ; ce paragraphe rend les claims sourcés extractibles.
              Visible (pas sr-only). */}
          <p className="mt-8 max-w-[70ch] text-base leading-8 text-foreground-secondary">
            Aqua System est certifié Socotec CSP/ESP-001 « Professionnels de la
            piscine privée à usage familial » et membre du réseau L'Esprit Piscine,
            réseau national de piscinistes professionnels. L'entreprise assure
            l'entretien de plus de 350 piscines dans les Yvelines et les
            Hauts-de-Seine, depuis plus de 30 ans.
          </p>
          <p className="mt-4 max-w-[70ch] text-sm leading-7 text-foreground-secondary">
            Trophée d'Or FPP 2024, Piscine intérieure (Fédération des
            Professionnels de la Piscine et du Spa). Award Bronze EUSA 2025,
            Piscines intérieures privées (European Union of Swimming Pools and
            Spas, Barcelone).
          </p>
        </div>
      </section>

      <CrossSellingBlock
        sourceUnivers="piscines"
        destinationUnivers="jardins"
        destinationHref="/jardins-paysage"
        title="Votre piscine mérite un jardin à sa mesure."
        body="L'eau et le végétal se conçoivent ensemble ou ne se conçoivent pas vraiment : c'est ce que nous faisons depuis 30 ans. En partenariat avec Les Terres Essentielles, bureau d'études paysager."
        ctaLabel="Voir nos créations paysagères →"
        imageSrc={photoSrc('piscine-jardin-arbre', '800w')}
        imageAlt="Bassin bordé de margelles claires, arbre planté au bord, terrasse en bois et haies dans une propriété de l'ouest parisien"
      />

      <SectionCTA
        amorce="Votre projet commence par une conversation."
        href="/contact?source=piscines-bien-etre"
        trackPosition="footer"
      />
    </>
  );
}

