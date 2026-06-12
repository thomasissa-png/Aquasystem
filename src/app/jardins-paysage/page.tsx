import type { Metadata } from 'next';
import { SITE_URL, absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
import { photoSrc } from '@/content/realisations';
import { Hero } from '@/components/sections/Hero';
import { MediaSplit } from '@/components/sections/MediaSplit';
import { TextBlock } from '@/components/sections/TextBlock';
import { VivantSection } from '@/components/sections/VivantSection';
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
  title: { absolute: 'Paysagiste Yvelines | Jardins haut de gamme, 78/92' },
  // R-01 (re-audit SEO) : description ramenée ≤ 155 caractères.
  description:
    "Paysagiste haut de gamme 78/92 : bureau d'études, création de jardins sur mesure. Les Terres Essentielles. Parlez-nous de votre projet.",
  alternates: { canonical: absoluteUrl('/jardins-paysage/') },
  openGraph: {
    url: `${SITE_URL}/jardins-paysage/`,
    title: 'Paysagiste Yvelines | Jardins sur mesure 78/92',
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
        imageSrc={photoSrc('jardin-bassin-maison-bois-paysage', '1280w')}
        // CAS B (D-40) : le hero maison-bois n'existait qu'en 1280w (crop 3/4 upscalé,
        // flou). Remplacé par l'original 1920 DU MÊME PROJET, cadrage frontal recadré
        // en 16:9 (maison + bassin centrés, pelouse généreuse en bas pour le H1).
        // Palier 1920w servi sur desktop large (anti-flou). Dominante végétale franche
        // conservée (registre jardins). object-center : l'image est déjà cadrée pour
        // le bandeau.
        imageSrc1920="/images/realisations/jardin-bassin-maison-bois-paysage-1920w.webp"
        imageAlt="Jardin paysagé avec bassin intégré aux margelles sombres, pelouse soignée et maison à bardage bois habillée de plantes grimpantes, cyprès et massifs — réalisation Les Terres Essentielles dans l'ouest parisien"
        objectPosition={{ base: 'object-center' }}
        // Overlay allégé (60%) : la photo est claire en bas (pelouse) mais le H1 doit
        // rester lisible — le dégradé bas renforce la zone texte.
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

      {/* Bloc 3 — Matières (strate savoir-faire D-30, savoir-faire-copy §4).
          TextBlock neutre, eyebrow « Matières », entre CreationBlock et
          PepiniereBlock. Pont sobre piscine↔jardin (mêmes pierres). */}
      <MatieresBlock />

      {/* Strate « Ce que le vivant impose » (D-32, fond-jardins-copy §1) —
          pendant jardin de OuvragesSection. Insérée entre MatieresBlock et
          PepiniereBlock. 4 entrées en grille 2 col : essences (slot photo),
          sol (card texte sans visuel forcé), entretien (slot photo), pépinière
          (photo réelle jardinerie LTE). */}
      <VivantSection />

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
        // §2 fond-jardins-copy (D-32) : preuve par l'exemple concret du process
        // bureau d'études (ombres portées, vues, circulations). Inséré en 2e
        // paragraphe pour garder le claim GEO en clôture du bloc.
        "Concrètement, cela signifie : étudier les ombres portées à différentes heures de la journée, identifier les vues depuis l'intérieur de la maison, cartographier les circulations naturelles sur le terrain avant d'en décider une seule. Un jardin qui ne tient pas compte de la vue depuis la cuisine, ou d'un passage quotidien vers le garage, se reprend.",
        "Quand un projet comporte aussi une piscine, les deux études sont menées au même moment. Le résultat : un espace qui tient ensemble, pas une somme de parties.",
        // Claim GEO (D-28) : intégré ici comme 3e paragraphe au lieu d'une section
        // standalone qui « flottait » au centre d'un vide (retour fondateur).
        "Les Terres Essentielles dispose d'un bureau d'études paysager intégré aux Alluets-le-Roi (Yvelines, 78580), permettant la co-conception de projets extérieurs associant piscine et jardin dès la phase de plan, dans les Yvelines et les Hauts-de-Seine.",
      ]}
    />
  );
}

function CreationBlock() {
  // Slot « Création » : photo réelle d'une création plantée LTE (massif
  // exotique, escalier pierre, paillage minéral — photo fondateur 2026-06-12,
  // droits accordés). Remplace le TextBlock D-22 (doctrine conversion : une
  // vraie création convertit mieux qu'un bloc texte). Alt factuel : massif
  // planté visible, sans revendiquer un chantier complet ni de commune.
  return (
    <MediaSplit
      tone="alt"
      accent="forest"
      eyebrow="Création"
      title="La réalisation, du premier arbre à la dernière pierre"
      body={[
        "Allées, massifs, pelouses, enrochements, terrasses végétalisées : chaque élément est conçu pour son rapport avec les autres et avec l'architecture de la maison. Chaque projet part du terrain : aucun plan ne ressemble au précédent, parce qu'aucun terrain ne se ressemble.",
        'Nos végétaux sont sélectionnés ou issus de notre pépinière. Adaptés au sol argilo-calcaire de l\'ouest parisien.',
      ]}
      imageSrc={photoSrc('massif-exotique-escalier', '1280w')}
      imageAlt="Massif exotique planté par Les Terres Essentielles : palmiers, yucca et plantes graphiques sur paillage minéral, escalier en pierre montant vers un mur ancien, ouest parisien"
    />
  );
}

function MatieresBlock() {
  return (
    <TextBlock
      eyebrow="Matières"
      title="Pierre, végétal, sol : ce que nous assemblons"
      body={[
        "Le jardin tient à ses matières autant qu'à ses plans. La pierre calcaire d'une allée, la teinte d'un grès cérame posé en terrasse, les essences choisies pour leur port à maturité : chaque élément contribue à la cohérence du lieu ou la rompt.",
        'Nos végétaux sont sélectionnés pour le sol argilo-calcaire de l\'ouest parisien. Les essences à croissance lente, les vivaces qui résistent à la sécheresse, les arbres de haie qui s\'épaississent avec les années, pas les solutions de remplissage.',
        'Quand un projet associe piscine et jardin, les matières des deux espaces sont choisies au même moment, depuis le même bureau d\'études.',
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
      // §3 fond-jardins-copy (D-32) : body enrichi — l'effet du geste régulier
      // (taille au bon moment, suivi massifs, détection sol) et la sélection
      // sur la plante remplacent les listes vagues précédentes.
      body={[
        "Un jardin suivi dans la durée ne ressemble pas à un jardin entretenu en urgence. La taille de forme à la bonne période, le suivi des massifs saison après saison, la détection d'un problème de sol avant qu'il devienne visible dans les végétaux : c'est ce que le geste régulier construit, pas le rattrapage ponctuel.",
        "Notre pépinière aux Alluets-le-Roi nous permet de sélectionner les végétaux sur la plante, pas sur catalogue. Ce qu'un propriétaire reçoit dans son jardin a été choisi pour ses conditions de sol, sa lumière, et l'effet attendu dans dix ans.",
      ]}
      // Photo CHOISIE PAR LE FONDATEUR (2026-06-12) pour ce slot — bulbes de
      // printemps de la jardinerie (495354275). Droits accordés. Remplace le
      // PhotoPlaceholder ; original conservé dans assets/social-media/.
      imageSrc="/images/jardinerie/jardinerie-bulbes-printemps-800w.webp"
      imageAlt="Bulbes de printemps en pots à la jardinerie Les Terres Essentielles : narcisses et jacinthes sur les étals, palissade de bois en arrière-plan"
      reversed
    />
  );
}

