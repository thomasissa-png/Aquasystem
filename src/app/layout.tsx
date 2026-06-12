import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants';
import {
  SITE_URL,
  absoluteUrl,
  organizationJsonLd,
  partnerOrganizationJsonLd,
} from '@/lib/seo';
import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
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
 * Metadata de base + favicons + manifest (page-compositions §favicon).
 * Le SEO par page (title/description/canonical/OG) est surchargé dans chaque
 * page.tsx via export const metadata. SITE_NAME provisoire/substituable.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Piscines sur mesure et jardins conçus ensemble pour les belles propriétés de l'ouest parisien. Un seul interlocuteur, plus de 30 ans d'expertise.",
  applicationName: SITE_NAME,
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    images: [{ url: absoluteUrl('/og-image.jpg'), width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [absoluteUrl('/og-image.jpg')],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F0E8' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1510' },
  ],
};

const UMAMI_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <head>
        {/* JSON-LD LocalBusiness Aqua System (enrichi : sameAs, geo, award,
            hasCredential, memberOf, hasOfferCatalog). */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        {/* JSON-LD LocalBusiness Les Terres Essentielles (entité partenaire —
            aucune affirmation de propriété commune, acquisition non actée). */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(partnerOrganizationJsonLd()),
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        {/* Skip link — premier élément focusable (BUG-A11Y-4, WCAG 2.4.1). */}
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        {/* E-10 page_view : Umami couvre toutes les pages (afterInteractive).
            Fail-silent : sans NEXT_PUBLIC_UMAMI_*, aucun script n'est injecté. */}
        {UMAMI_ID && UMAMI_URL && (
          <Script
            src={UMAMI_URL}
            data-website-id={UMAMI_ID}
            strategy="afterInteractive"
          />
        )}
        <NavBar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
