import type { Metadata } from 'next';
import Image from 'next/image';
import { SITE_NAME } from '@/lib/constants';
import { SITE_URL, absoluteUrl } from '@/lib/seo';
import { photoSrc } from '@/content/realisations';
import { SectionCTA } from '@/components/sections/SectionCTA';
import { PhotoPlaceholder } from '@/components/sections/PhotoPlaceholder';

/**
 * Notre approche (/notre-approche) — F-04, WF-04.
 * Rendu : SSG. Hero split (texte + photo, pas d'overlay plein écran),
 * timeline 5 étapes, ancrage local. Photo hero = réalisation réelle ;
 * vue aérienne (ancrage) sans photo réelle → PhotoPlaceholder.
 */
export const metadata: Metadata = {
  title: 'Notre approche — De la vision à la réalisation, un seul interlocuteur',
  description: `Comment ${SITE_NAME} porte un projet d’extérieur complet en Yvelines et Hauts-de-Seine : écoute, bureau d’études, réalisation et suivi — une seule équipe de bout en bout.`,
  alternates: { canonical: absoluteUrl('/notre-approche/') },
  openGraph: {
    url: `${SITE_URL}/notre-approche/`,
    title: 'Notre approche — De la vision à la réalisation',
  },
};

const STEPS = [
  {
    title: "L'écoute",
    body: [
      "Nous commençons par comprendre ce que vous imaginez — l'espace, les usages, ce que vous souhaitez ressentir. Pas un formulaire à remplir. Une conversation.",
      "À ce stade, il n'est pas nécessaire d'avoir un plan ou un budget précis. Votre vision est suffisante.",
    ],
  },
  {
    title: "Le bureau d'études",
    body: [
      "Piscine et jardin conçus ensemble dès le premier plan — pas l'un après l'autre. Les deux maisons coordonnent à cette étape : les choix d'implantation, les matériaux, les lignes directrices de l'espace.",
      "Vous n'avez pas à arbitrer entre deux prestataires qui ne se sont jamais parlé.",
    ],
  },
  {
    title: 'La réalisation',
    body: [
      "Un seul interlocuteur sur le chantier. Nous gérons les corps de métier, les délais, les interfaces techniques. Ce qui se passe sur votre propriété est sous notre responsabilité — vous en êtes informé, vous n'avez pas à le piloter.",
    ],
  },
  {
    title: 'La livraison',
    body: [
      "Réception conjointe de la piscine et du jardin. Votre propriété n'est pas livrée en deux temps — avec six mois de chantier jardin après la piscine. Le projet s'achève quand l'espace est complet.",
    ],
  },
  {
    title: 'Le suivi annuel',
    body: [
      "Votre piscine est entretenue par ceux qui l'ont construite. L'équipe connaît votre équipement — les choix faits au moment du chantier, les spécificités de votre terrain, les réglages propres à votre bassin.",
      "Vous n'avez pas à tout réexpliquer à chaque saison.",
    ],
  },
];

const COMMUNES = [
  'Le Vésinet',
  'Saint-Nom-la-Bretèche',
  "Ville-d'Avray",
  'Marnes-la-Coquette',
  'Saint-Cloud',
];

export default function NotreApprochePage() {
  return (
    <>
      {/* Hero split — texte gauche (fond clair), photo droite. */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-container items-stretch gap-0 lg:min-h-[70vh] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-4 py-16 md:px-8 md:py-24">
            <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
              De la vision à la réalisation
            </h1>
            <p className="mt-4 max-w-[45ch] text-lg leading-8 text-foreground-secondary md:text-xl">
              Comment nous portons un projet d'extérieur de bout en bout — et
              pourquoi cela change tout.
            </p>
          </div>
          <figure className="relative min-h-[260px] w-full overflow-hidden lg:min-h-full">
            <Image
              src={photoSrc('projet-piscine-jardin-banquette', '1280w')}
              alt="Propriété transformée : piscine et jardin intégrés dans un même espace cohérent, terrasse en bois, demeure en arrière-plan"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      {/* Timeline 5 étapes */}
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-24">
          <ol className="relative">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative pb-12 pl-16 last:pb-0">
                {/* Ligne de connexion verticale */}
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[22px] top-14 h-[calc(100%-2rem)] w-0.5 bg-border"
                  />
                )}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 font-serif text-5xl leading-none text-foreground-accent-water lg:text-6xl"
                >
                  {i + 1}
                </span>
                <h2 className="font-serif text-2xl leading-tight text-foreground lg:text-3xl">
                  {step.title}
                </h2>
                <div className="mt-3 space-y-3">
                  {step.body.map((p, j) => (
                    <p
                      key={j}
                      className="text-base leading-8 text-foreground-secondary"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Ancrage local — split 50/50 */}
      <section className="bg-background-secondary">
        <div className="mx-auto grid max-w-container items-center gap-8 px-4 py-20 md:grid-cols-2 md:gap-12 md:px-8">
          <div>
            <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
              Nous connaissons ces propriétés — et leurs contraintes.
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-8 text-foreground-secondary">
              30 ans de chantiers dans le 78 et le 92. Nous connaissons les nappes
              phréatiques, les PLU locaux, les caractéristiques du sol
              argilo-calcaire de l'ouest parisien. Ce savoir ne se consulte pas en
              ligne — il s'acquiert en travaillant sur ces terrains depuis des
              décennies.
            </p>
            <p className="mt-6 font-serif text-xl italic text-foreground md:text-2xl">
              {COMMUNES.join(' — ')}
            </p>
          </div>
          <figure>
            <PhotoPlaceholder
              ratioClassName="aspect-[4/3]"
              description="Vue aérienne d'une commune de l'ouest parisien : propriétés avec jardins et piscines dans un quartier résidentiel arboré, prise de vue drone."
            />
          </figure>
        </div>
      </section>

      <SectionCTA
        amorce="Parlez-nous de votre projet. Nous vous dirons ce qu'on peut faire ensemble."
        ctaLabel="Décrivez-nous votre projet →"
        trackPosition="footer"
      />
    </>
  );
}
