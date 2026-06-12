import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT } from '@/lib/constants';
import { absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
import { ContactForm } from '@/components/forms/ContactForm';
import { JsonLd } from '@/components/seo/JsonLd';

/**
 * /contact — page formulaire de conversion (F-08).
 * Rendu : statique (export). Le ContactForm est un Client Component interactif
 * dont le <form> COMPLET est pré-rendu dans le HTML statique (fallback no-JS
 * opérationnel). Le smart default ?source= est lu après montage via
 * window.location — PAS useSearchParams, qui viderait le form du HTML (D-17).
 * Composition : WF-08 — split asymétrique conviction-first sobre.
 */
export const metadata: Metadata = {
  // Metas finales — metadata-templates.md Page 8 (title enrichi + CTA + géo ;
  // canonical absolu avec trailing slash, conforme trailingSlash:true).
  title: { absolute: 'Parlez-nous de votre projet — Contact, Yvelines 78/92' },
  description:
    "Décrivez-nous votre projet extérieur — piscine, jardin ou les deux. Un seul interlocuteur pour les belles propriétés du 78/92. Nous vous répondons.",
  alternates: { canonical: absoluteUrl('/contact/') },
};

/** Fil d'Ariane (BreadcrumbList JSON-LD) — seo-strategy.md §C.6.3. */
const BREADCRUMB = breadcrumbJsonLd([{ name: 'Contact', path: '/contact/' }]);

export default function ContactPage() {
  return (
    <div className="bg-background">
      <JsonLd data={BREADCRUMB} />
      <div className="mx-auto grid max-w-container gap-12 px-4 pb-16 pt-16 md:px-8 lg:grid-cols-12 lg:gap-16 lg:pt-24">
        {/* Colonne gauche — texte + coordonnées */}
        <div className="flex flex-col lg:col-span-5">
          <h1 className="font-serif text-4xl leading-tight text-foreground lg:text-5xl">
            Parlez-nous de votre projet
          </h1>
          <p className="mt-6 max-w-[48ch] text-lg leading-8 text-foreground-secondary">
            Quelques mots sur ce que vous imaginez suffisent pour démarrer.
            Nicolas Berg et son équipe reviennent vers vous pour un premier
            échange, sans engagement.
          </p>

          {/* Coordonnées — masquées sur mobile (accessibles via footer) */}
          <address className="mt-auto hidden not-italic lg:block lg:pt-12">
            <p className="flex items-center gap-3 text-sm text-foreground-secondary">
              <Phone aria-hidden className="h-4 w-4 shrink-0" />
              <a
                href={`tel:${CONTACT.phoneE164}`}
                className="hover:text-foreground"
              >
                {CONTACT.phone}
              </a>
            </p>
            <p className="mt-3 flex items-center gap-3 text-sm text-foreground-secondary">
              <Mail aria-hidden className="h-4 w-4 shrink-0" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="hover:text-foreground"
              >
                {CONTACT.email}
              </a>
            </p>
            <p className="mt-3 flex items-start gap-3 text-sm text-foreground-secondary">
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {CONTACT.address.street}
                <br />
                {CONTACT.address.postalCode} {CONTACT.address.city}
              </span>
            </p>
          </address>
        </div>

        {/* Colonne droite — formulaire */}
        <div className="lg:col-span-7">
          <div className="rounded-xl bg-background-secondary p-6 md:p-8">
            <Suspense fallback={<FormSkeleton />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Squelette de chargement (fallback Suspense) — préserve la hauteur. */
function FormSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-5" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-16 rounded-md bg-background-tertiary" />
      ))}
      <div className="h-32 rounded-md bg-background-tertiary" />
      <div className="h-[52px] rounded-md bg-background-tertiary" />
    </div>
  );
}
