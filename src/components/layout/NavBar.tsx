'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { trackEvent } from '@/lib/analytics';
import {
  CONTACT_PATH,
  CTA_LABEL,
  NAV_LINKS,
  SITE_NAME,
} from '@/lib/constants';
import { ButtonLink } from '@/components/ui/ButtonLink';

/**
 * NavBar — design-system.md §5 + mission.
 * Desktop (≥ lg) : wordmark + 5 liens horizontaux + CTA primary.
 * Mobile : wordmark + hamburger → drawer bottom-sheet (items-end), focus trap,
 * scroll body verrouillé, touch targets ≥ 44px, focus-visible inversé sur le
 * fond sombre de l'overlay.
 * Client component : état du drawer + lien actif (usePathname) + tracking E-04.
 */
export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Verrou du scroll body + Escape + focus trap quand le drawer est ouvert.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = 'hidden';

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    // Focus le premier élément du drawer à l'ouverture.
    drawerRef.current?.querySelector<HTMLElement>('a[href], button')?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  function isActive(href: string): boolean {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function trackCta(position: 'navbar') {
    trackEvent('cta_clicked', { position, label_cta: CTA_LABEL });
  }

  return (
    <header className="sticky top-0 z-sticky bg-background shadow-lg print:hidden">
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex h-14 max-w-container items-center justify-between px-4 md:h-16 md:px-8"
      >
        <Link
          href="/"
          className="rounded-sm font-serif text-xl text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
        >
          {SITE_NAME}
        </Link>

        {/* Liens desktop */}
        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={cn(
                  'inline-flex min-h-6 items-center rounded-sm py-1 text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2',
                  isActive(link.href)
                    ? 'text-foreground-accent-water underline'
                    : 'text-foreground',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <div className="hidden lg:block">
          <ButtonLink
            href={CONTACT_PATH}
            variant="primary"
            size="md"
            data-track="cta"
            onClick={() => trackCta('navbar')}
          >
            {CTA_LABEL}
          </ButtonLink>
        </div>

        {/* Hamburger mobile/tablette */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          aria-label="Ouvrir le menu"
          className="flex h-11 w-11 items-center justify-center rounded-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 lg:hidden"
        >
          <Menu aria-hidden className="h-6 w-6" />
        </button>
      </nav>

      {/* Drawer bottom-sheet */}
      {open && (
        <div
          className="fixed inset-0 z-drawer flex flex-col justify-end lg:hidden"
          // Overlay sombre — fermeture au tap extérieur.
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[rgba(26,21,16,0.90)]"
            onClick={() => setOpen(false)}
          />
          <div
            ref={drawerRef}
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigation"
            className="relative max-h-[85vh] overflow-y-auto rounded-t-xl bg-background px-6 pb-8 pt-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="font-serif text-xl text-foreground">
                {SITE_NAME}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="flex h-11 w-11 items-center justify-center rounded-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
              >
                <X aria-hidden className="h-6 w-6" />
              </button>
            </div>

            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-border-muted">
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block min-h-11 py-4 font-serif text-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2',
                      isActive(link.href)
                        ? 'text-foreground-accent-water'
                        : 'text-foreground',
                    )}
                  >
                    {link.label}
                    {link.href === '/la-maison' && (
                      <span className="mt-1 block text-xs font-sans text-foreground-muted">
                        De la vision à la réalisation
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <ButtonLink
              href={CONTACT_PATH}
              variant="primary"
              size="lg"
              data-track="cta"
              onClick={() => {
                trackCta('navbar');
                setOpen(false);
              }}
              className="mt-6 w-full"
            >
              {CTA_LABEL}
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
