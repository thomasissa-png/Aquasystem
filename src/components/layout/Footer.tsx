import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import {
  CONTACT,
  LEGAL_LINKS,
  PARTNER_CONTACT,
  PARTNER_NAME,
  SITE_NAME,
  SOCIAL_LINKS,
} from '@/lib/constants';

/**
 * Footer — design-system.md §6 + ux-writing-guide §6.
 * Fond sombre (sand-950), texte clair, focus ring inversé (clair).
 * 3 blocs : identité (wordmark + badges + réseaux) / coordonnées Aqua System /
 * coordonnées Les Terres Essentielles + barre légale (copyright + partenariat).
 * Année du copyright calculée au build (jamais hardcodée).
 * Server component — HTML pur, fonctionne sans JS.
 *
 * D-22 (footer-audit.md 2026-06-12) : bloc navigation dupliqué SUPPRIMÉ (la nav
 * sticky le rend redondant), spacing resserré (pt-10/pb-8/mt-8/gap-6 mobile),
 * grille 2fr/1fr/1fr, réseaux sociaux remontés en col 1, mention partenariat
 * fusionnée dans la barre légale, adresses sur 1 ligne mobile. Cible : footer
 * mobile ≤ 1 écran.
 */
const footerLinkClass =
  'rounded-sm underline-offset-4 hover:text-foreground-inverse hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring-inverse)] focus-visible:ring-offset-2';

/**
 * Liens des listes (navigation + barre légale) — cible WCAG 2.2 AA 2.5.8 :
 * inline-flex + min-h-6 (24px) + py-1 garantit une zone tactile ≥ 24px de haut
 * et un espacement suffisant entre cibles (BUG-A11Y-2).
 */
const footerListLinkClass = `inline-flex min-h-6 items-center py-1 ${footerLinkClass}`;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Pied de page"
      className="bg-background-inverse text-foreground-inverse print:bg-transparent print:text-black"
    >
      <div className="mx-auto max-w-container px-4 pb-8 pt-10 md:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr_1fr] md:gap-8">
          {/* Bloc 1 — Identité + badges de qualité + réseaux sociaux (P1-N2) */}
          <div>
            <p className="font-serif text-xl">{SITE_NAME}</p>
            {/* Badges Socotec + Esprit Piscine sur toutes les pages (ux-audit
                P1-N2) — signal de qualité premium constant. */}
            <ul className="mt-4 flex flex-wrap gap-2">
              <li className="rounded-md border border-sand-800 px-3 py-1.5 text-xs font-medium text-sand-300">
                Certifié Socotec CSP/ESP-001
              </li>
              <li className="rounded-md border border-sand-800 px-3 py-1.5 text-xs font-medium text-sand-300">
                Réseau L'Esprit Piscine
              </li>
            </ul>
            {/* Réseaux sociaux remontés en col 1 (footer-audit §B) — groupe les
                signaux de marque, équilibre les hauteurs de colonnes. */}
            <div className="mt-4 flex gap-x-4 text-sm text-sand-300">
              <a
                href={SOCIAL_LINKS.linkedinAS}
                target="_blank"
                rel="noopener noreferrer"
                className={footerListLinkClass}
              >
                LinkedIn
              </a>
              <a
                href={SOCIAL_LINKS.facebookLTE}
                target="_blank"
                rel="noopener noreferrer"
                className={footerListLinkClass}
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Bloc 2 — Coordonnées Aqua System */}
          <div className="text-sm text-sand-300">
            <address className="not-italic">
              <p className="font-medium text-foreground-inverse">Aqua System</p>
              <p className="mt-2 flex items-start gap-2">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {CONTACT.address.street}, {CONTACT.address.postalCode}{' '}
                  {CONTACT.address.city}
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
          </div>

          {/* Bloc 3 — Coordonnées Les Terres Essentielles */}
          <div className="text-sm text-sand-300">
            <address className="not-italic">
              <p className="font-medium text-foreground-inverse">
                {PARTNER_CONTACT.name}
              </p>
              <p className="mt-2 flex items-start gap-2">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {PARTNER_CONTACT.address.street},{' '}
                  {PARTNER_CONTACT.address.postalCode}{' '}
                  {PARTNER_CONTACT.address.city}
                </span>
              </p>
            </address>
          </div>
        </div>

        {/* Barre légale — mention partenariat fusionnée ici (footer-audit §E) */}
        <div className="mt-8 flex flex-col gap-3 border-t border-sand-800 pt-5 text-xs text-foreground-footer-legal md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {CONTACT.editor}, SIREN {CONTACT.siren}. Tous droits
            réservés. · En partenariat avec {PARTNER_NAME}.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={footerListLinkClass}>
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
