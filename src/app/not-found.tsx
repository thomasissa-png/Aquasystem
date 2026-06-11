import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ButtonLink } from '@/components/ui/ButtonLink';

/**
 * Page 404 (F-11) — WF-09 + ux-writing §7.
 * Sobre : pas de « 404 » en gros, pas d'illustration, pas de formulaire.
 * Deux sorties claires (réalisations + contact). Wording exact ux-writing §7.
 *
 * Note noindex : les 404 ne sont pas indexées (Next sert /404.html en réponse
 * 404, non listée au sitemap). En export statique, le robots meta par page sur
 * not-found.tsx n'est pas pris en charge par la Metadata API — la non-indexation
 * repose sur le code HTTP 404 servi par Cloudflare Pages (comportement standard).
 */
export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-background px-4 py-20">
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
          Cette page n'existe pas.
        </h1>
        <p className="mt-4 text-lg leading-8 text-foreground-secondary">
          Elle a peut-être été déplacée ou l'adresse a été mal copiée.
        </p>
        <p className="mt-2 text-base leading-8 text-foreground-secondary">
          Vous pouvez retrouver nos réalisations, découvrir notre approche ou nous
          décrire votre projet.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground-accent-water underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>
        <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <ButtonLink href="/realisations" variant="ghost" size="md">
            Voir les réalisations →
          </ButtonLink>
          <ButtonLink href="/contact" variant="primary" size="md">
            Parlez-nous de votre projet →
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
