import type { Metadata } from 'next';
import { SITE_URL, absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
import { photoSrc } from '@/content/realisations';
import { Hero } from '@/components/sections/Hero';
import { MediaSplit } from '@/components/sections/MediaSplit';
import { ProofBadges } from '@/components/ui/ProofBadges';
import { CrossSellingBlock } from '@/components/sections/CrossSellingBlock';
import { SectionCTA } from '@/components/sections/SectionCTA';
import { JsonLd } from '@/components/seo/JsonLd';

/**
 * Piscines & Bien-être (/piscines-bien-etre) — F-02, WF-02.
 * Rendu : SSG. Contenu fixe marketing. Cross-sell + tracking en îlots client.
 * Photos : hero + cross-sell = réalisations réelles ; le bloc spa HotSpring
 * n'a pas de photo réelle disponible → rendu en texte éditorial centré
 * (D-22 : slot image vide retiré, perception premium).
 */
export const metadata: Metadata = {
  // Metas finales — metadata-templates.md Page 2 (source de vérité @seo).
  // Arbitrage B.5 (orchestrateur, 2026-06-11) : version enrichie GEO retenue —
  // Trophée Or FPP 2024 vérifié, signal CTR différenciant premium (141 car.).
  title: { absolute: 'Piscines sur mesure Yvelines & 92 — Pisciniste Aqua System' },
  description:
    'Pisciniste certifié Socotec, Trophée Or FPP 2024. Piscines sur mesure en Yvelines (78) et Hauts-de-Seine (92). Parlez-nous de votre projet.',
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
        imageSrc={photoSrc('piscine-paroi-verre-travertin', '1280w')}
        imageAlt="Piscine sur mesure à paroi vitrée, margelles en travertin, jardinières de graminées, terrasse bois d'une propriété haut de gamme"
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
          Pas de photo réelle de spa HotSpring → placeholder dédié. */}
      <SpaBlock />

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
        imageSrc={photoSrc('projet-bassin-jardin-paysage', '800w')}
        imageAlt="Piscine et jardin paysagé conçus ensemble dans une propriété de l'ouest parisien, vue d'ensemble harmonieuse"
      />

      <SectionCTA
        amorce="Votre projet commence par une conversation."
        href="/contact?source=piscines-bien-etre"
        trackPosition="footer"
      />
    </>
  );
}

/**
 * Bloc spa — texte éditorial pleine largeur (pas de photo réelle de spa
 * HotSpring dans les sources). Fond alterné (WF-02 §3).
 *
 * D-22 (P0 desktop 2026-06-12) : le PhotoPlaceholder « Visuel à venir » était
 * perçu comme une maquette inachevée sur une page commerciale premium
 * (desktop-audit.md Top 5 #1). On supprime le slot image vide ; bloc rendu en
 * texte centré resserré, sans trou visuel.
 */
function SpaBlock() {
  return (
    <section className="bg-background-secondary">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8 md:py-20">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-water">
          Spa &amp; bien-être
        </p>
        <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
          L'eau chaude dans votre propriété
        </h2>
        <div className="mx-auto mt-5 max-w-[60ch] space-y-4 text-left">
          <p className="text-base leading-8 text-foreground-secondary">
            Spa extérieur HotSpring, sauna finlandais, hammam, intégrés à
            l'architecture de votre propriété, pas posés en périphérie. Chaque
            installation est conçue avec le reste de l'espace : la terrasse, le
            jardin, les lignes de la maison.
          </p>
          <p className="text-base leading-8 text-foreground-secondary">
            Partenaire HotSpring pour les spas : une gamme pensée pour le
            résidentiel haut de gamme.
          </p>
        </div>
      </div>
    </section>
  );
}
