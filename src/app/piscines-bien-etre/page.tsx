import type { Metadata } from 'next';
import { SITE_URL, absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from '@/lib/seo';
import { photoSrc } from '@/content/realisations';
import { FAQ_PISCINES, toFaqJsonLd } from '@/content/faq';
import { Hero } from '@/components/sections/Hero';
import { MediaSplit } from '@/components/sections/MediaSplit';
import { OuvragesSection } from '@/components/sections/OuvragesSection';
import { TextBlock } from '@/components/sections/TextBlock';
import { FaqSection } from '@/components/sections/FaqSection';
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
  title: { absolute: 'Piscines sur mesure Yvelines & 92 | Pisciniste Aqua System' },
  // Description validée megalot §1.3 (154 car., PASS < 155) : Trophée FPP
  // conservé, 6 types compressés mais tous listés, CTA final préservé.
  description:
    'Pisciniste certifié Socotec, Trophée Or FPP 2024. Piscines sur mesure en 78/92 : débordement, miroir, intérieure, fond mobile. Parlez-nous de votre projet.',
  alternates: { canonical: absoluteUrl('/piscines-bien-etre/') },
  openGraph: {
    url: `${SITE_URL}/piscines-bien-etre/`,
    title: 'Piscines sur mesure Yvelines 78/92 | Aqua System',
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

/**
 * FAQPage JSON-LD (P1-GEO-03, megalot §4) — 3e FAQPage du site. `@id` ancré sur
 * l'URL canonique de la page pour garantir l'unicité dans le graphe (les FAQPage
 * /la-maison et /prescripteurs portent leurs propres @id). Source = FAQ_PISCINES,
 * MÊMES données que la FaqSection visible (cohérence contenu/structured data).
 */
const FAQ_JSONLD = faqPageJsonLd(
  toFaqJsonLd(FAQ_PISCINES),
  absoluteUrl('/piscines-bien-etre/#faq'),
);

export default function PiscinesBienEtrePage() {
  return (
    <>
      <JsonLd data={BREADCRUMB} />
      <JsonLd data={FAQ_JSONLD} />
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
        // Photo DÉSIGNÉE PAR LE FONDATEUR (2026-06-12) : pavillon bien-être
        // vitré au crépuscule, réalisation Aqua System (78), arch. SKP,
        // photo Philippe Leroy (source esprit-piscine). Remplace le placeholder.
        imageSrc="/images/realisations/bien-etre-pavillon-crepuscule-800w.webp"
        imageAlt="Pavillon bien-être vitré au crépuscule, piscine intérieure éclairée visible à travers les baies, terrasse en bois et jardin — réalisation Aqua System dans les Yvelines"
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

      {/* Resserrage P1 (gate passe 5, D-32) : fusion ÉDITORIALE des anciens
          §2 « Construit pour durer » + §3 « La matière qui reste » en UN seul
          TextBlock (tone alt, eyebrow « Construction & finitions »). Aucun fait
          perdu : CSTB, décennale, Socotec, Propiscines, matières, pont jardin.
          3 paragraphes : structure → engagement → matières/cohérence. */}
      <TextBlock
        tone="alt"
        accent="water"
        eyebrow="Construction & finitions"
        title="Ce qui tient dans le temps"
        body={[
          "Chaque piscine est une structure en béton armé, conçue par notre bureau d'études et contrôlée par un organisme tiers avant réception. Le procédé de construction est couvert par un Avis Technique CSTB : c'est la preuve que la structure répond aux normes de l'ouvrage privé, indépendamment de notre propre déclaration.",
          "Un seul marché, un seul responsable : vous signez avec Aqua System, qui engage sa garantie décennale sur l'ensemble de l'ouvrage. Certification de services Socotec CSP/ESP-001 « Professionnels de la piscine privée à usage familial », membre Propiscines Certifié.",
          "Les finitions se décident au même moment que la structure, pas en fin de chantier : margelles en pierre naturelle ou travertin, plages en grès cérame, revêtement dont la teinte compose la couleur d'eau. Ces mêmes pierres, nous les travaillons aussi autour de la propriété : terrasses, allées, soubassements. C'est de là que vient la cohérence entre le bord de bassin et le reste de l'extérieur.",
        ]}
      />

      {/* Preuves */}
      <section className="bg-background">
        <div className="mx-auto max-w-container px-4 py-16 md:px-8">
          <ProofBadges />
          {/* P0-01 alignements (megalot) : synthèse extractible LLM alignée sur
              le PATTERN ACCUEIL — fusion des 2 paragraphes en 1 seul, centré sous
              filet, max-w-[72ch], statut crédit secondaire (text-sm muted).
              Wording @copywriter conservé (claims sourcés, faq-geo-copy.md §B.1). */}
          <div className="mt-8 border-t border-border-muted pt-5 text-center">
            <p className="mx-auto max-w-[72ch] text-sm leading-7 text-foreground-muted">
              Aqua System est certifié Socotec CSP/ESP-001 « Professionnels de la
              piscine privée à usage familial » et membre du réseau L'Esprit
              Piscine, réseau national de piscinistes professionnels. L'entreprise
              assure l'entretien de plus de 350 piscines dans les Yvelines et les
              Hauts-de-Seine, depuis plus de 30 ans. Trophée d'Or FPP 2024, Piscine
              intérieure (Fédération des Professionnels de la Piscine et du Spa).
              Award Bronze EUSA 2025, Piscines intérieures privées (European Union
              of Swimming Pools and Spas, Barcelone).
            </p>
          </div>
        </div>
      </section>

      {/* FAQ piscines (P1-GEO-03, megalot §4) — 3 Q/R extractibles, après le
          TextBlock « Ce qui tient dans le temps » et le bloc Preuves. Tone alt
          pour alterner avec la section Preuves (fond default) qui précède. */}
      <FaqSection heading="Questions fréquentes" items={[...FAQ_PISCINES]} tone="alt" />

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

