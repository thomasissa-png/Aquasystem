import { OuvrageCard } from '@/components/sections/OuvrageCard';
import { PhotoPlaceholder } from '@/components/ui/PhotoPlaceholder';

/**
 * VivantSection — strate « Ce que le vivant impose » (/jardins-paysage).
 * Pendant jardin de OuvragesSection : on pose la maîtrise du vivant avec la
 * même rigueur factuelle que la maîtrise du béton armé côté piscines.
 * Copy : docs/copy/fond-jardins-copy.md §1 (mot pour mot).
 *
 * Insérée entre MatieresBlock et PepiniereBlock. Grille 2 col desktop / 1 mobile.
 * Eyebrow forest (univers jardins). Server component.
 *
 * Doctrine photos (fond-jardins-copy §7) :
 * - Entrée 1 (essences)  : slot F1 [Photo à fournir] → PhotoPlaceholder.
 * - Entrée 2 (sol)       : SANS visuel forcé (sujet peu porteur de conversion) →
 *   card texte sur fond neutre, pas de cadre image.
 * - Entrée 3 (entretien) : slot F2 [Photo à fournir] → PhotoPlaceholder.
 * - Entrée 4 (pépinière) : photo RÉELLE jardinerie LTE (allée pépinière).
 */

interface VivantEntry {
  title: string;
  body: string;
  /** Visuel : photo réelle, slot à fournir, ou aucun (card texte). */
  visual:
    | { kind: 'photo'; src: string; alt: string }
    | { kind: 'placeholder'; subject: string }
    | { kind: 'none' };
}

const ENTRIES: VivantEntry[] = [
  {
    title: 'Le choix des essences',
    body: "On ne plante pas pour ce que le jardin est aujourd'hui : on plante pour ce qu'il sera dans vingt ans. Un charme taillé en rideau, un tilleul à grandes feuilles, un liquidambar — chacun a un port à maturité, une envergure, une relation avec la lumière qui ne se lisent pas au moment de la plantation. Choisir la mauvaise essence à cinq mètres d'une façade, c'est un problème en vingt ans, pas maintenant.",
    visual: {
      kind: 'placeholder',
      subject:
        'Haie de charme ou arbres à port défini, lumière rasante de fin de journée, propriété de l’ouest parisien',
    },
  },
  {
    title: 'Le sol comme contrainte réelle',
    body: "Le sol argilo-calcaire qui couvre une grande partie des Yvelines et des Hauts-de-Seine est un sol exigeant : en période humide, il retient l'eau et se compacte ; en été, il durcit et se fissure. Certains végétaux s'y épanouissent naturellement (érables, charmes, sorbiers, cornouillers) ; d'autres nécessitent un travail de sol préalable et un drainage pensé dès la conception. Ignorer cette donnée au départ coûte plus cher qu'une plantation refaite à la deuxième saison.",
    visual: { kind: 'none' },
  },
  {
    title: "L'entretien au bon moment",
    body: "Un jardin bien planté demande les bons gestes à la bonne période. Les arbustes à floraison estivale (buddleia, althéa, potentille) se taillent en mars, avant la reprise de végétation, pour stimuler la floraison de l'été. Les arbustes à floraison printanière (lilas, forsythia, weigela) attendent la fin de leur floraison pour être taillés — les couper avant, c'est supprimer les fleurs de l'année suivante. Ce calendrier précis, suivi rigoureusement, fait la différence entre un jardin qui se refait chaque saison et un jardin qui s'affirme avec les années.",
    visual: {
      kind: 'placeholder',
      subject:
        'Geste de taille en cours, végétaux en plein port, profil de dos — entretien Les Terres Essentielles',
    },
  },
  {
    title: 'La pépinière',
    body: "Ce que change une pépinière propre : on choisit les végétaux sur la plante, pas sur une fiche. On sait dans quelle terre ils ont grandi, depuis combien de temps ils sont en conteneur, si la reprise sera facile sur le sol de la propriété. Les végétaux produits ou sélectionnés dans notre pépinière aux Alluets-le-Roi sont adaptés aux conditions climatiques et pédologiques de l'ouest parisien — pas achetés en lot standardisé et revendus.",
    visual: {
      kind: 'photo',
      src: '/images/jardinerie/jardinerie-allee-pepiniere-800w.webp',
      alt: "Allée de la pépinière Les Terres Essentielles aux Alluets-le-Roi, végétaux en conteneurs alignés",
    },
  },
];

export function VivantSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-container px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-forest">
            Le vivant
          </p>
          <h2 className="font-serif text-3xl leading-tight text-foreground md:text-[32px] lg:text-4xl">
            Ce que le vivant impose
          </h2>
          <p className="mt-4 max-w-[60ch] text-base leading-8 text-foreground-secondary md:text-[17px] lg:text-lg">
            Quatre réalités du végétal que tout jardin de cette qualité suppose
            de maîtriser.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
          {ENTRIES.map((entry) => {
            if (entry.visual.kind === 'photo') {
              return (
                <OuvrageCard
                  key={entry.title}
                  photoSrc={entry.visual.src}
                  imageAlt={entry.visual.alt}
                  title={entry.title}
                  body={entry.body}
                />
              );
            }
            if (entry.visual.kind === 'placeholder') {
              return (
                <article key={entry.title} className="flex flex-col">
                  <PhotoPlaceholder
                    subject={entry.visual.subject}
                    aspect="3/2"
                    className="aspect-[4/3]"
                  />
                  <h3 className="mt-5 font-serif text-xl leading-snug text-foreground md:text-2xl">
                    {entry.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-foreground-secondary">
                    {entry.body}
                  </p>
                </article>
              );
            }
            // kind === 'none' : card texte sans visuel forcé (entrée sol).
            return (
              <article
                key={entry.title}
                className="flex flex-col justify-center rounded-lg bg-background-secondary p-7 md:p-8"
              >
                <h3 className="font-serif text-xl leading-snug text-foreground md:text-2xl">
                  {entry.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-foreground-secondary">
                  {entry.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
