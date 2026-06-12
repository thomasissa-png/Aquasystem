'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/cn';
import { trackEvent } from '@/lib/analytics';
import { REALISATIONS, type FilterValue } from '@/content/realisations';
import { RealisationCard } from './RealisationCard';

/**
 * RealisationsGrid — grille filtrable du portfolio (WF-05).
 * Client component. Le filtre est lu depuis l'URL (?filter=…) APRÈS le montage
 * (window.location.search), PAS via useSearchParams (D-17) : ce dernier force le
 * bailout CSR en export statique, vidant la grille du HTML pré-rendu. Le rendu
 * serveur affiche donc l'état « tous » COMPLET (14 cartes) dans le HTML statique.
 *
 * État du filtre dans l'URL (?filter=…) : partageable + présélection depuis
 * /prescripteurs (?filter=projet_complet). Filtre « Tous » par défaut.
 * E-05 portfolio_filter_clicked au changement de filtre.
 * Empty state : ux-writing §4 (wording exact).
 */
const FILTERS: { label: string; value: FilterValue; aria: string }[] = [
  { label: 'Tous', value: 'tous', aria: 'Afficher toutes les réalisations' },
  { label: 'Piscine', value: 'piscine', aria: 'Filtrer : piscines sur mesure' },
  { label: 'Spa & Sauna', value: 'spa_sauna', aria: 'Filtrer : spas et saunas' },
  { label: 'Jardin & Parc', value: 'jardin_parc', aria: 'Filtrer : jardins et parcs' },
  {
    label: 'Projet complet eau+jardin',
    value: 'projet_complet',
    aria: 'Filtrer : projets complets eau et jardin',
  },
];

const VALID = new Set<FilterValue>(FILTERS.map((f) => f.value));

export function RealisationsGrid() {
  // État par défaut « tous » au rendu serveur → grille complète dans le HTML
  // statique. Le filtre éventuel de l'URL est appliqué après montage (D-17).
  const [active, setActive] = useState<FilterValue>('tous');

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get(
      'filter',
    ) as FilterValue | null;
    if (raw && VALID.has(raw)) setActive(raw);
  }, []);

  const visible = useMemo(() => {
    if (active === 'tous') return REALISATIONS;
    return REALISATIONS.filter((r) => r.filters.includes(active));
  }, [active]);

  function selectFilter(value: FilterValue) {
    if (value === active) return;
    trackEvent('portfolio_filter_clicked', {
      filtre: value,
      nb_resultats: value === 'tous'
        ? REALISATIONS.length
        : REALISATIONS.filter((r) => r.filters.includes(value)).length,
    });
    setActive(value);
    // URL partageable mise à jour sans navigation (history API natif — pas de
    // router Next, pour ne pas réintroduire de dépendance useSearchParams).
    const params = new URLSearchParams();
    if (value !== 'tous') params.set('filter', value);
    const qs = params.toString();
    const url = qs ? `/realisations/?${qs}` : '/realisations/';
    window.history.replaceState(null, '', url);
  }

  return (
    <>
      {/* FilterBar */}
      <div
        role="group"
        aria-label="Filtrer les réalisations par type"
        className="flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => {
          const isActive = f.value === active;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={isActive}
              aria-label={f.aria}
              onClick={() => selectFilter(f.value)}
              className={cn(
                'inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2',
                isActive
                  ? 'border-action-primary bg-action-primary text-action-primary-text'
                  : 'border-border bg-background-secondary text-foreground hover:border-border-strong',
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Grille / empty state */}
      {visible.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((r) => (
            <RealisationCard key={r.slug} realisation={r} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-4 py-20 text-center">
          <p className="max-w-md text-lg text-foreground">
            Aucune réalisation ne correspond à cette sélection pour le moment.
          </p>
          <p className="max-w-md text-base text-foreground-secondary">
            Notre portfolio s'enrichit régulièrement — revenez consulter
            prochainement, ou découvrez l'ensemble de nos réalisations.
          </p>
          <button
            type="button"
            onClick={() => selectFilter('tous')}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground-accent-water underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Voir toutes les réalisations
          </button>
        </div>
      )}
    </>
  );
}
