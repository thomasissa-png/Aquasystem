import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants';

/**
 * Page d'accueil — PLACEHOLDER build-safe.
 *
 * [Page en attente des arbitrages P0]
 * Le contenu réel (hero, univers, preuves, portfolio, cross-selling, CTA — F-01)
 * sera produit par @fullstack une fois les 5 P0 du checkpoint reviewer résolus
 * (URLs/nav/structure formulaire). Ce placeholder garantit un build statique
 * valide sans préjuger des décisions en cours.
 */
export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-container flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm uppercase tracking-widest text-foreground-secondary">
        {SITE_NAME} <span className="text-foreground-muted">[nom provisoire]</span>
      </p>
      <h1 className="text-4xl text-foreground sm:text-5xl">{SITE_TAGLINE}</h1>
      <p className="rounded-md border border-border bg-background-secondary px-4 py-2 text-sm text-foreground-secondary">
        [Page en attente des arbitrages P0 — socle technique en place]
      </p>
    </main>
  );
}
