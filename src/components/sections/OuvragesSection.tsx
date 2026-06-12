import { photoSrc } from '@/content/realisations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { OuvrageCard } from '@/components/sections/OuvrageCard';

/**
 * OuvragesSection — strate savoir-faire « Ce que nous savons construire ».
 * Grille de 6 types d'ouvrage (cards photo + titre + corps), insérée sur
 * /piscines-bien-etre entre le MediaSplit « Suivi annuel » et ProofBadges.
 * Copy : docs/copy/savoir-faire-copy.md §1 (mot pour mot, slugs photo preuve).
 * Server component. Grille 3 col desktop / 2 col tablette / 1 col mobile
 * (page-compositions.md §4 — gap 24px desktop).
 */
interface Ouvrage {
  /** Slug de la photo preuve (base, sans suffixe de taille). */
  slug: string;
  imageAlt: string;
  title: string;
  body: string;
  /**
   * Slug de fiche réalisation emblématique (R-12) — rend un lien texte discret
   * vers /realisations/<realisationSlug>. Posé uniquement sur les ouvrages dont
   * une fiche individuelle illustre précisément le type (fond mobile, couloir de
   * nage, piscine intérieure). Le slug photo EST le slug de la fiche.
   */
  realisationSlug?: string;
}

const OUVRAGES: Ouvrage[] = [
  {
    slug: 'piscine-debordement-foret',
    imageAlt:
      'Piscine à débordement bordée d’une terrasse en bois, plan d’eau ouvert sur une forêt de pins — réalisation Aqua System, Yvelines',
    title: 'Piscine à débordement',
    body: "L'eau franchit le bord et disparaît dans une goulotte invisible : l'horizon prend le dessus sur le bassin. Sur un terrain en dénivelé, ce parti pris architectural crée une continuité entre la piscine et le paysage. Nous l'avons conçue face à la forêt, adossée à une demeure ancienne, au bord d'un jardin structuré.",
  },
  {
    slug: 'bassin-miroir-crepuscule',
    imageAlt:
      'Bassin miroir au crépuscule, surface immobile reflétant le ciel — réalisation Aqua System, ouest parisien',
    title: 'Bassin miroir',
    body: "L'eau affleure au ras de la plage sur tout le pourtour : aucune margelle ne coupe la ligne de surface. Le bassin ne se lit plus comme une piscine — il devient un reflet du ciel, de la façade, de la végétation. Un ouvrage qui s'efface pour laisser parler l'architecture.",
  },
  {
    slug: 'piscine-interieure-pierre-poutres',
    imageAlt:
      'Couloir de nage intérieur sur mesure, charpente bois apparente et margelles en travertin — réalisation Aqua System',
    title: 'Couloir de nage',
    body: "Un bassin conçu pour la nage, pas pour l'esthétique seule : les proportions allongées, la largeur calibrée, le fond plat sur toute la longueur. La pratique sportive à domicile, intégrée à l'architecture de la propriété sans rien sacrifier aux lignes.",
    realisationSlug: 'piscine-interieure-pierre-poutres',
  },
  {
    slug: 'piscine-interieure-beton-baies',
    imageAlt:
      'Piscine intérieure en béton brut ouverte sur le jardin par des baies vitrées — réalisation Aqua System',
    title: 'Piscine intérieure',
    body: "Baigner toute l'année, sans abri, sans compromis : la piscine est intégrée au bâti, les matériaux choisis pour la durée, l'air traité pour que l'espace reste un lieu de vie. Quatre réalisations dans notre portefeuille, du béton brut aux charpentes bois apparentes. Aucune ne ressemble à la précédente.",
    realisationSlug: 'piscine-interieure-beton-baies',
  },
  {
    slug: 'piscine-fond-mobile-terrasse',
    imageAlt:
      'Piscine à fond mobile, terrasse en bois affleurante avec fond remonté — réalisation Aqua System',
    title: 'Fond mobile',
    body: "Le plancher du bassin monte, la terrasse reprend ses droits. Il redescend, la piscine redevient piscine. La profondeur s'ajuste, l'accès aux enfants se contrôle, l'espace extérieur se transforme selon les usages du moment. Un ouvrage rare, que nous avons réalisé.",
    realisationSlug: 'piscine-fond-mobile-terrasse',
  },
  {
    slug: 'piscine-paroi-verre-travertin',
    imageAlt:
      'Piscine à paroi de verre sur bassin surélevé, margelles en travertin — réalisation Aqua System, Yvelines',
    title: 'Paroi de verre',
    body: "Une paroi transparente qui laisse voir l'eau depuis l'extérieur du bassin : le volume et le mouvement de l'eau deviennent un élément d'architecture à part entière. Souvent associée à un bassin surélevé. Deux réalisations dans notre portefeuille, sur travertin et sur pierre naturelle.",
  },
];

export function OuvragesSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-container px-4 py-16 md:px-8 md:py-20">
        <SectionHeading
          centered
          title="Ce que nous savons construire"
          subtitle="Six types d'ouvrage, tous réalisés dans l'ouest parisien. Chacun répond à une contrainte de terrain, un usage ou une intention architecturale différente."
        />
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {OUVRAGES.map((o) => (
            <OuvrageCard
              key={o.slug}
              photoSrc={photoSrc(o.slug, '800w')}
              imageAlt={o.imageAlt}
              title={o.title}
              body={o.body}
              realisationHref={
                o.realisationSlug
                  ? `/realisations/${o.realisationSlug}`
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
