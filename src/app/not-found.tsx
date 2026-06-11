import Link from 'next/link';

/**
 * Page 404 custom (F-11). Sobre, lien retour accueil, PAS de CTA formulaire
 * (parcours de sortie). Wording final à harmoniser avec @copywriter une fois
 * les arbitrages P0 sur le ton des états UI tranchés.
 */
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-container flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="font-serif text-6xl text-foreground-proof">404</p>
      <h1 className="text-3xl text-foreground">Cette page est introuvable</h1>
      <p className="max-w-md text-foreground-secondary">
        Le lien que vous avez suivi n&apos;existe pas ou plus.
      </p>
      <Link
        href="/"
        className="rounded-md bg-action-primary px-8 py-4 font-medium text-action-primary-text transition-colors duration-fast hover:bg-action-primary-hover"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
