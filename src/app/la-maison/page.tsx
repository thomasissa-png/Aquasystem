import type { Metadata } from 'next';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import {
  CONTACT,
  ESPRIT_PISCINE_MEMBER_URL,
  PARTNER_CONTACT,
} from '@/lib/constants';
import {
  SITE_URL,
  absoluteUrl,
  breadcrumbJsonLd,
  faqPageJsonLd,
  nicolasBergJsonLd,
} from '@/lib/seo';
import { photoSrc } from '@/content/realisations';
import { JARDINERIE_PHOTOS, jardinerieSrc } from '@/content/jardinerie';
import { SectionCTA } from '@/components/sections/SectionCTA';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { FaqSection } from '@/components/sections/FaqSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { FAQ_NOTRE_APPROCHE, toFaqJsonLd } from '@/content/faq';

/**
 * À propos (/la-maison) — F-06, WF-06 + fusion F-04 « Notre approche » (D-25).
 * Nommage aligné nav/H1/metas/breadcrumb sur « À propos » (D-34). URL inchangée
 * (pas de nouvelle 301). Le terme « maison »/« les deux maisons » reste en corps.
 * Rendu : SSG. Page identité fusionnée : histoire + portrait + méthode 5 étapes
 * (migrée de notre-approche) + les deux maisons + ancrage local (migré) +
 * valeurs + photo propriété + FAQ (migrée, FAQPage JSON-LD fusionné).
 * Hero split (texte + photo). /notre-approche → 301 vers cette page
 * (public/_redirects Cloudflare — output:'export', pas de next.config redirects).
 */
export const metadata: Metadata = {
  // Metas fusionnées (ia-refonte §2) — title identité conservé + intention
  // méthode. ≤ 65 car. Canonical /la-maison/ (page absorbante).
  // Title validé megalot §1.1 (54 car., PASS) + description validée §1.2
  // (132 car., PASS) — séparateur « | » (§2.1).
  title: {
    absolute: 'À propos | Aqua System, pisciniste 30 ans en 78/92',
  },
  description:
    "Aqua System & Les Terres Essentielles : 30 ans en 78/92, Socotec, bureau d'études intégré. Un seul interlocuteur. Rencontrons-nous.",
  alternates: { canonical: absoluteUrl('/la-maison/') },
  openGraph: {
    url: `${SITE_URL}/la-maison/`,
    title: 'À propos | Aqua System & Les Terres Essentielles, 78/92',
    images: [
      {
        url: absoluteUrl('/og-image.jpg'),
        width: 1200,
        height: 630,
        alt: 'Aqua System — Pisciniste à Freneuse dans les Yvelines depuis 30 ans',
      },
    ],
  },
};

/** Fil d'Ariane (BreadcrumbList JSON-LD) — seo-strategy.md §C.6.3. */
const BREADCRUMB = breadcrumbJsonLd([{ name: 'À propos', path: '/la-maison/' }]);

/** Person JSON-LD Nicolas Berg (content-restructuring.md §C.2). */
const PERSON = nicolasBergJsonLd();

/** FAQPage JSON-LD — migré de notre-approche (content-restructuring.md §C.1). */
const FAQ_JSONLD = faqPageJsonLd(
  toFaqJsonLd(FAQ_NOTRE_APPROCHE),
  absoluteUrl('/la-maison/#faq'),
);

/** Méthode 5 étapes — migrée intégralement de notre-approche (ia-refonte §3). */
const STEPS = [
  {
    title: "L'écoute",
    body: [
      "Nous commençons par comprendre ce que vous imaginez : l'espace, les usages, ce que vous souhaitez ressentir. Pas un formulaire à remplir. Une conversation.",
      "À ce stade, il n'est pas nécessaire d'avoir un plan ou un budget précis. Votre vision est suffisante.",
    ],
  },
  {
    title: "Le bureau d'études",
    body: [
      "Piscine et jardin conçus ensemble dès le premier plan, pas l'un après l'autre. Les deux maisons coordonnent à cette étape : les choix d'implantation, les matériaux, les lignes directrices de l'espace.",
      "Vous n'avez pas à arbitrer entre deux prestataires qui ne se sont jamais parlé.",
    ],
  },
  {
    title: 'La réalisation',
    body: [
      "Un seul interlocuteur sur le chantier. Nous gérons les corps de métier, les délais, les interfaces techniques. Ce qui se passe sur votre propriété est sous notre responsabilité : vous en êtes informé, vous n'avez pas à le piloter.",
    ],
  },
  {
    title: 'La livraison',
    body: [
      "Réception conjointe de la piscine et du jardin. Votre propriété n'est pas livrée en deux temps, avec six mois de chantier jardin après la piscine. Le projet s'achève quand l'espace est complet.",
    ],
  },
  {
    title: 'Le suivi annuel',
    body: [
      "Votre piscine est entretenue par ceux qui l'ont construite. L'équipe connaît votre équipement : les choix faits au moment du chantier, les spécificités de votre terrain, les réglages propres à votre bassin.",
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

const VALEURS = [
  {
    titre: 'Exigence',
    corps:
      "Pas de standard, pas de catalogue. Chaque terrain est différent : chaque réalisation l'est aussi. L'exigence, c'est refuser le compromis qui ferait tenir un projet dans une offre existante.",
  },
  {
    titre: 'Confiance',
    corps:
      "Nous construisons pour la pérennité, pas pour la saison. Le client dont la piscine a été construite il y a 15 ans : nous connaissons encore chaque équipement sans rouvrir un dossier. C'est ça, la confiance.",
  },
  {
    titre: 'Sur-mesure',
    corps:
      "Aucune piscine ne ressemble à la précédente, parce qu'aucun terrain ne se ressemble. Le sur-mesure n'est pas une option : c'est la seule façon de bien faire.",
  },
];

export default function LaMaisonPage() {
  return (
    <>
      <JsonLd data={BREADCRUMB} />
      <JsonLd data={PERSON} />
      <JsonLd data={FAQ_JSONLD} />

      {/* §1 — Hero split (pattern ex-notre-approche). H1 « À propos » (D-34) + formule
          signature « De la vision à la réalisation » en sous-titre (raccords-fusion
          mot pour mot), visible dès le fold. Photo identité piscine intérieure. */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-container items-stretch gap-0 lg:min-h-[70vh] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-4 py-14 md:px-8 md:py-20">
            {/* D-28 : eyebrow + ligne de preuve + filet aqua pour combler le vide
                de la colonne texte et ancrer la confiance dès le fold. */}
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-water">
              Aqua System & Les Terres Essentielles
            </p>
            <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
              À propos
            </h1>
            <p className="mt-4 max-w-[45ch] text-lg leading-8 text-foreground-secondary md:text-xl">
              De la vision à la réalisation : trente ans dans les plus belles
              propriétés de l'ouest parisien.
            </p>
            <p className="mt-6 text-sm font-medium text-foreground-secondary">
              30 ans · Équipe de 8 · Yvelines &amp; Hauts-de-Seine
            </p>
            <div className="mt-6 h-px w-12 bg-foreground-accent-water" />
          </div>
          <figure className="relative min-h-[260px] w-full overflow-hidden lg:min-h-full">
            <Image
              src={photoSrc('piscine-interieure-veranda-soir', '1280w')}
              alt="Piscine intérieure sous véranda à la tombée du jour, lumière chaude et tamisée, ambiance feutrée — réalisation Aqua System"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      {/* §2 — Notre histoire + portrait Nicolas Berg (conservé tel quel). */}
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-8">
          <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
            Notre histoire
          </h2>
          <div className="mt-6 space-y-5">
            <p className="text-lg leading-8 text-foreground-secondary">
              Aqua System est née à Freneuse, dans les Yvelines, il y a plus de 30
              ans. Depuis, nous n'avons pas changé de territoire : le 78 et le 92 :
              ces communes où les propriétés ont du caractère et où les
              propriétaires ont des exigences que le standard ne satisfait pas.
            </p>
            <p className="text-lg leading-8 text-foreground-secondary">
              Aujourd'hui, nous sommes une équipe de 8. Nous concevons,
              construisons et entretenons des piscines sur mesure : du
              débordement ouvert sur le paysage aux piscines intérieures, de la
              paroi de verre au fond mobile. En partenariat avec Les Terres
              Essentielles, nous portons aussi le végétal, pour que l'eau et le
              jardin ne soient jamais pensés séparément.
            </p>
          </div>
          {/* Portrait Nicolas Berg — bloc sobre (portrait fourni fondateur,
              droits OK, D-16). 400px max : jamais en grand format. */}
          <figure className="mt-10 flex flex-col items-center gap-4">
            <Image
              src="/images/equipe/nicolas-berg-400w.webp"
              alt="Nicolas Berg, gérant d'Aqua System"
              width={160}
              height={160}
              loading="lazy"
              sizes="160px"
              className="h-40 w-40 rounded-full object-cover grayscale"
            />
            <figcaption className="text-center">
              <span className="block font-serif text-lg text-foreground">
                Nicolas Berg
              </span>
              <span className="block text-sm text-foreground-secondary">
                Gérant, Aqua System
              </span>
            </figcaption>
          </figure>
          {/* Raccord 1 (raccords-fusion.md, mot pour mot) — « qui » → « comment ». */}
          <p className="mt-12 font-serif text-xl italic leading-9 text-foreground md:text-2xl">
            Voici comment ce projet prend forme, de la première conversation à la
            livraison.
          </p>
        </div>
      </section>

      {/* §3 — Notre méthode (timeline 5 étapes, migrée de notre-approche). */}
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 pb-20 md:px-8 md:pb-24">
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
                <h3 className="font-serif text-2xl leading-tight text-foreground lg:text-3xl">
                  {step.title}
                </h3>
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
          {/* Raccord 2 (raccords-fusion.md, mot pour mot) — méthode → entités. */}
          <p className="mt-12 text-center font-serif text-xl italic leading-9 text-foreground md:text-2xl">
            Derrière cette méthode : deux maisons, deux expertises, un seul
            interlocuteur.
          </p>
        </div>
      </section>

      {/* §4 — Les deux maisons (conservé tel quel). */}
      <section className="bg-background-secondary">
        <div className="mx-auto grid max-w-container gap-12 px-4 py-20 md:grid-cols-2 md:px-8">
          <article>
            {/* P1-06 alignements (megalot §6) : eyebrow symétrique de la colonne
                LTE (« en partenariat avec ») → les 2 colonnes partagent le même
                schéma typographique tête de bloc. */}
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-water">
              Notre maison
            </p>
            <h2 className="font-serif text-2xl leading-tight text-foreground md:text-3xl">
              Aqua System
            </h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-foreground-secondary">
              <p>
                Conception, construction, rénovation et entretien de piscines sur
                mesure. Spas extérieurs HotSpring, saunas, hammams. Traitement
                d'eau, robots Dolphin, SAV équipements.
              </p>
              {/* Reflet (D-34) de la preuve structure live sur /piscines-bien-etre
                  (D-32, « Ce qui tient dans le temps ») : béton armé, Avis Technique
                  CSTB, bureau d'études, marché unique → décennale. Aucun fait nouveau. */}
              <p>
                Chaque piscine est une structure en béton armé conçue par notre
                bureau d'études, couverte par un Avis Technique CSTB et engagée
                sous notre garantie décennale : un seul marché, un seul
                responsable.
              </p>
              <p>
                Membre du{' '}
                <a
                  href={ESPRIT_PISCINE_MEMBER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm underline underline-offset-4 decoration-border hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
                >
                  réseau L'Esprit Piscine
                </a>
                . Certification Socotec « Professionnels de la piscine »
                CSP/ESP-001.
              </p>
              {/* Distinctions récentes (faq-geo-copy.md §B.3 — wording @copywriter
                  exact) — faits vérifiables, augmentent la fraîcheur perçue LLM. */}
              <p>
                Trophée d'Or FPP 2024, Piscine intérieure. Award Bronze EUSA 2025,
                Piscines intérieures privées (Barcelone).
              </p>
              {/* P2-GEO-02 : claim 11 (Charte GdC) rendu extractible en texte
                  visible, pas seulement en JSON-LD sameAs. */}
              <p>Nicolas Berg, signataire de la Charte Pro Gens de Confiance.</p>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              <li className="rounded-md bg-background-proof px-3 py-1.5 text-xs font-medium text-foreground">
                Certification Socotec CSP/ESP-001
              </li>
              <li className="rounded-md bg-background-proof px-3 py-1.5 text-xs font-medium text-foreground">
                Avis Technique CSTB
              </li>
              <li className="rounded-md bg-background-proof px-3 py-1.5 text-xs font-medium text-foreground">
                Réseau L'Esprit Piscine
              </li>
              <li className="rounded-md bg-background-proof px-3 py-1.5 text-xs font-medium text-foreground">
                Trophée Or FPP 2024
              </li>
            </ul>
            <address className="mt-5 text-sm not-italic text-foreground-secondary">
              <p className="flex items-start gap-2">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {CONTACT.address.street}, {CONTACT.address.postalCode}{' '}
                  {CONTACT.address.city}
                </span>
              </p>
              <p className="mt-2 flex items-center gap-2">
                <Phone aria-hidden className="h-4 w-4 shrink-0" />
                <a
                  href={`tel:${CONTACT.phoneE164}`}
                  className="underline-offset-2 hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
                >
                  {CONTACT.phone}
                </a>
              </p>
              <p className="mt-2 flex items-center gap-2">
                <Mail aria-hidden className="h-4 w-4 shrink-0" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="underline-offset-2 hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
                >
                  {CONTACT.email}
                </a>
              </p>
            </address>
          </article>

          <article>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-forest">
              en partenariat avec
            </p>
            <h2 className="font-serif text-2xl leading-tight text-foreground md:text-3xl">
              Les Terres Essentielles
            </h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-foreground-secondary">
              {/* Kei-Stone passé sous silence (fondateur 2026-06-12). */}
              <p>
                Jardinerie, bureau d'études paysager, création et entretien de
                parcs et jardins, pépinière. Des végétaux et des matériaux
                sélectionnés pour les propriétés de l'ouest parisien.
              </p>
              {/* Reflet (D-34) de la maîtrise du vivant live sur /jardins-paysage
                  (D-32, PepiniereBlock §3) : pépinière aux Alluets-le-Roi, sélection
                  sur la plante, sol argilo-calcaire. Substance prouvée LTE, aucune
                  création paysagère livrée revendiquée. Aucun fait nouveau. */}
              <p>
                À la pépinière des Alluets-le-Roi, les végétaux sont sélectionnés
                sur la plante, pas sur catalogue : choisis pour le sol
                argilo-calcaire et le climat de l'ouest parisien, pour ce qu'ils
                deviendront dans dix ou vingt ans.
              </p>
            </div>
            {/* Photo d'ambiance HONNÊTE : la jardinerie LTE (point de vente),
                pas une réalisation paysagère. Alt 100% factuel. */}
            {(() => {
              const photo =
                JARDINERIE_PHOTOS['jardinerie-cagette-lauriers-orgeval'];
              return (
                <figure className="mt-6 overflow-hidden rounded-lg">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={jardinerieSrc(photo.base, '800w')}
                      alt={photo.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-xs leading-5 text-foreground-muted">
                    La jardinerie Les Terres Essentielles, route d'Orgeval.
                  </figcaption>
                </figure>
              );
            })()}
            <address className="mt-5 text-sm not-italic text-foreground-secondary">
              <p className="flex items-start gap-2">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {PARTNER_CONTACT.address.street},{' '}
                  {PARTNER_CONTACT.address.postalCode}{' '}
                  {PARTNER_CONTACT.address.city}
                </span>
              </p>
            </address>
          </article>
        </div>
      </section>

      {/* §5 — Ancrage local (migré de notre-approche, après les deux maisons).
          Bloc texte centré : 30 ans 78/92, nappes, PLU, communes, 2 adresses NAP.
          + CTA mi-parcours conservé. */}
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-8">
          <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
            Nous connaissons ces propriétés, et leurs contraintes.
          </h2>
          <div className="mx-auto mt-5 max-w-[60ch]">
            <p className="text-base leading-8 text-foreground-secondary">
              30 ans de chantiers dans le 78 et le 92. Nous connaissons les nappes
              phréatiques, les PLU locaux, les caractéristiques du sol
              argilo-calcaire de l'ouest parisien. Ce savoir ne se consulte pas en
              ligne, il s'acquiert en travaillant sur ces terrains depuis des
              décennies.
            </p>
            <p className="mt-6 text-center font-serif text-xl italic text-foreground md:text-2xl">
              {COMMUNES.join(', ')}
            </p>
            {/* Ajout factuel GEO (faq-geo-copy.md §B.2 — wording @copywriter exact) —
                extractibilité géographique : zone complète + 2 adresses dans le
                même passage. */}
            <p className="mt-4 text-base leading-8 text-foreground-secondary">
              Et l'ensemble des communes des Yvelines (78) et des Hauts-de-Seine
              (92). Aqua System est établie à Freneuse (Yvelines, 78840), à moins
              de 60 km de Paris. Les Terres Essentielles, partenaire paysagiste,
              opère aux Alluets-le-Roi (78580).
            </p>
          </div>
        </div>
        {/* CTA mi-parcours (design-audit P1-APPROCHE-2) — évite 4 écrans sans CTA.
            D-28 : pb-20→pb-12, le CTA ghost flottait isolé en bas de section. */}
        <div className="mx-auto max-w-container px-4 pb-12 text-center md:px-8">
          <ButtonLink href="/contact" variant="ghost" size="md">
            Parlez-nous de votre projet →
          </ButtonLink>
        </div>
      </section>

      {/* §6 — Nos valeurs (conservé). Raccord 3 : séparation visuelle (changement
          de fond bg-background-secondary) + H2 lisible — pas de texte (raccords-
          fusion R3, alternative séparation visuelle retenue). */}
      <section className="bg-background-secondary">
        <div className="mx-auto max-w-container px-4 py-20 md:px-8">
          <h2 className="sr-only">Nos valeurs</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {VALEURS.map((v) => (
              <div key={v.titre}>
                <h3 className="font-serif text-2xl text-foreground">{v.titre}</h3>
                <p className="mt-3 text-base leading-8 text-foreground-secondary">
                  {v.corps}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §7 — Photo propriété représentative — pleine largeur (conservé). */}
      <section>
        <div className="relative h-[280px] w-full overflow-hidden md:h-[480px]">
          <Image
            src={photoSrc('piscine-jardin-arbre', '1280w')}
            alt="Propriété de grande ampleur : terrasse avec piscine et jardin arboré en arrière-plan, lumière d'été"
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* §8 — FAQ (migrée de notre-approche). FAQPage JSON-LD ci-dessus.
          Q3 « durée de chantier » omise (placeholder [À CONFIRMER fondateur]). */}
      <FaqSection
        heading="Questions fréquentes"
        items={FAQ_NOTRE_APPROCHE.map((i) => ({ q: i.q, a: i.a }))}
        tone="default"
        extraTopSpacing
      />

      {/* §9 — SectionCTA. */}
      <SectionCTA
        amorce="Parlez-nous de votre projet. Nous vous dirons ce qu'on peut faire ensemble."
        ctaLabel="Décrivez-nous votre projet →"
        trackPosition="footer"
      />
    </>
  );
}
