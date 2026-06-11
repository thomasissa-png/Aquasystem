import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import {
  CONTACT,
  FOOTER_NAV_LINKS,
  LEGAL_LINKS,
  PARTNER_CONTACT,
  PARTNER_NAME,
  SITE_NAME,
  SOCIAL_LINKS,
} from '@/lib/constants';

/**
 * Footer — design-system.md §6 + ux-writing-guide §6.
 * Fond sombre (sand-950), texte clair, focus ring inversé (clair).
 * 4 blocs : identité + partenariat / navigation / coordonnées des 2 maisons /
 * liens légaux. Année du copyright calculée au build (jamais hardcodée).
 * Server component — HTML pur, fonctionne sans JS.
 */
const footerLinkClass =
  'rounded-sm underline-offset-4 hover:text-foreground-inverse hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring-inverse)] focus-visible:ring-offset-2';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Pied de page"
      className="bg-background-inverse text-foreground-inverse print:bg-transparent print:text-black"
    >
      <div className="mx-auto max-w-container px-4 pb-12 pt-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Bloc 1 — Identité + partenariat */}
          <div>
            <p className="font-serif text-xl">{SITE_NAME}</p>
            <p className="mt-3 text-sm leading-6 text-sand-300">
              {SITE_NAME} — eau, jardin, propriété.
              <br />
              En partenariat avec {PARTNER_NAME}.
            </p>
          </div>

          {/* Bloc 2 — Navigation */}
          <nav aria-label="Navigation secondaire">
            <p className="font-serif text-sm text-sand-400">Navigation</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-sand-300">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bloc 3 — Coordonnées des 2 maisons */}
          <div className="text-sm text-sand-300">
            <p className="font-serif text-sm text-sand-400">Nous trouver</p>
            <address className="mt-4 not-italic">
              <p className="font-medium text-foreground-inverse">Aqua System</p>
              <p className="mt-1 flex items-start gap-2">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {CONTACT.address.street}
                  <br />
                  {CONTACT.address.postalCode} {CONTACT.address.city}
                </span>
              </p>
              <p className="mt-2 flex items-center gap-2">
                <Phone aria-hidden className="h-4 w-4 shrink-0" />
                <a href={`tel:${CONTACT.phoneE164}`} className={footerLinkClass}>
                  {CONTACT.phone}
                </a>
              </p>
              <p className="mt-2 flex items-center gap-2">
                <Mail aria-hidden className="h-4 w-4 shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className={footerLinkClass}>
                  {CONTACT.email}
                </a>
              </p>
            </address>

            <address className="mt-6 not-italic">
              <p className="font-medium text-foreground-inverse">
                {PARTNER_CONTACT.name}
              </p>
              <p className="mt-1 flex items-start gap-2">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {PARTNER_CONTACT.address.street}
                  <br />
                  {PARTNER_CONTACT.address.postalCode}{' '}
                  {PARTNER_CONTACT.address.city}
                </span>
              </p>
            </address>

            <div className="mt-6 flex gap-4">
              <a
                href={SOCIAL_LINKS.linkedinAS}
                target="_blank"
                rel="noopener noreferrer"
                className={footerLinkClass}
              >
                LinkedIn
              </a>
              <a
                href={SOCIAL_LINKS.facebookLTE}
                target="_blank"
                rel="noopener noreferrer"
                className={footerLinkClass}
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Barre légale */}
        <div className="mt-12 flex flex-col gap-4 border-t border-sand-800 pt-6 text-xs text-sand-600 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {CONTACT.editor} — SIREN {CONTACT.siren}. Tous droits
            réservés.
          </p>
          <ul className="flex flex-wrap gap-4">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={footerLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
