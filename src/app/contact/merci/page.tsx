import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT, REPLY_DELAY_TEXT } from '@/lib/constants';

/**
 * /contact/merci — confirmation post-soumission (F-08, P0-4).
 * Rendu : statique. noindex (page de remerciement, pas de valeur SEO + évite
 * de fausser le double signal de conversion sur les pageviews indexées).
 * Wording EXACT : ux-writing-guide §3. Ton sobre, pas d'animation, pas de CTA
 * vers /contact (anti re-soumission).
 *
 * Le délai de réponse vient de REPLY_DELAY_TEXT (constants.ts) — TODO fondateur :
 * tant que le délai réel n'est pas confirmé, aucun délai chiffré n'est affiché.
 */
export const metadata: Metadata = {
  title: 'Message envoyé',
  robots: { index: false, follow: true },
};

export default function MerciPage() {
  return (
    <div className="flex min-h-[60vh] items-center bg-background">
      <div className="mx-auto max-w-2xl px-4 py-20 md:px-8">
        <h1 className="font-serif text-4xl leading-tight text-foreground lg:text-5xl">
          Votre message est bien parvenu.
        </h1>

        <p className="mt-6 text-lg leading-8 text-foreground-secondary">
          Nous {REPLY_DELAY_TEXT} pour un premier échange autour de votre
          projet.
        </p>

        <p className="mt-4 text-base leading-7 text-foreground-secondary">
          Si votre demande est urgente, vous pouvez aussi nous appeler
          directement au{' '}
          <a
            href={`tel:${CONTACT.phoneE164}`}
            className="font-medium text-foreground-accent-water underline underline-offset-2"
          >
            {CONTACT.phone}
          </a>
          .
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex items-center rounded-sm text-base font-medium text-foreground-accent-water underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
