import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants';
import '@/styles/globals.css';

/**
 * Fonts via next/font (self-host au build, zéro requête Google au runtime,
 * subset latin — voir design-system.md). Variables CSS consommées par
 * tailwind.config.ts (fontFamily.serif / .sans) et globals.css.
 */
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

/**
 * Metadata de base. SITE_NAME provisoire/substituable (cf. constants.ts).
 * Le détail SEO par page (canonical, OG, JSON-LD LocalBusiness) sera ajouté
 * par @fullstack page par page une fois les arbitrages P0 (URLs) résolus.
 */
export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Piscines sur mesure et jardins d'exception, conçus ensemble pour les belles propriétés de l'ouest parisien. Un seul interlocuteur, plus de 30 ans d'expertise.",
  applicationName: SITE_NAME,
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
