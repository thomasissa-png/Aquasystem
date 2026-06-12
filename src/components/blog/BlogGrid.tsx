'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/cn';
import { trackEvent } from '@/lib/analytics';
import { ARTICLES_BY_DATE } from '@/content/blog';
import {
  BLOG_CATEGORIES,
  type BlogCategory,
} from '@/content/blog-categories';
import { ArticleCard } from './ArticleCard';

/**
 * BlogGrid — grille filtrable des articles « Notre regard ».
 * Réplique exacte du pattern RealisationsGrid (WF-05) :
 *  - le filtre est lu depuis l'URL (?categorie=…) APRÈS le montage
 *    (window.location.search), PAS via useSearchParams (D-17) : ce dernier force
 *    le bailout CSR en export statique, vidant la grille du HTML pré-rendu.
 *  - état par défaut « Tous » → le rendu serveur affiche TOUTES les cards dans
 *    le HTML statique (filtre = affichage client, pas conditionnement du rendu).
 *  - URL partageable (?categorie=…) via history.replaceState natif (pas de router
 *    Next, pour ne pas réintroduire useSearchParams).
 *  - E-blog blog_filter_clicked au changement (fail-silent, zéro PII).
 *
 * Min-h-11 sur les chips (touch target ≥ 44px). Compteur discret par chip.
 */
type ChipValue = 'tous' | BlogCategory;

const CHIPS: { label: string; value: ChipValue; aria: string }[] = [
  { label: 'Tous', value: 'tous', aria: 'Afficher tous les articles' },
  ...BLOG_CATEGORIES.map((c) => ({
    label: c.label,
    value: c.value,
    aria: c.aria,
  })),
];

const VALID = new Set<ChipValue>(CHIPS.map((c) => c.value));

/** Nombre d'articles par catégorie (compteur de chip), calculé une fois. */
const COUNTS: Record<ChipValue, number> = {
  tous: ARTICLES_BY_DATE.length,
  'types-piscine': 0,
  'eau-jardin': 0,
  'investissement-projet': 0,
};
for (const a of ARTICLES_BY_DATE) COUNTS[a.category] += 1;

export function BlogGrid() {
  // État par défaut « tous » au rendu serveur → grille complète dans le HTML
  // statique. Le filtre éventuel de l'URL est appliqué après montage (D-17).
  const [active, setActive] = useState<ChipValue>('tous');

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get(
      'categorie',
    ) as ChipValue | null;
    if (raw && VALID.has(raw)) setActive(raw);
  }, []);

  const visible = useMemo(() => {
    if (active === 'tous') return ARTICLES_BY_DATE;
    return ARTICLES_BY_DATE.filter((a) => a.category === active);
  }, [active]);

  function selectCategory(value: ChipValue) {
    if (value === active) return;
    trackEvent('blog_filter_clicked', { categorie: value });
    setActive(value);
    const params = new URLSearchParams();
    if (value !== 'tous') params.set('categorie', value);
    const qs = params.toString();
    const url = qs ? `/notre-regard/?${qs}` : '/notre-regard/';
    window.history.replaceState(null, '', url);
  }

  return (
    <>
      {/* Barre de filtres */}
      <div
        role="group"
        aria-label="Filtrer les articles par catégorie"
        className="flex flex-wrap gap-2"
      >
        {CHIPS.map((c) => {
          const isActive = c.value === active;
          return (
            <button
              key={c.value}
              type="button"
              aria-pressed={isActive}
              aria-label={c.aria}
              onClick={() => selectCategory(c.value)}
              className={cn(
                'inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2',
                isActive
                  ? 'border-action-primary bg-action-primary text-action-primary-text'
                  : 'border-border bg-background-secondary text-foreground hover:border-border-strong',
              )}
            >
              {c.label}
              <span
                aria-hidden
                className={cn(
                  'text-xs tabular-nums',
                  isActive
                    ? 'text-action-primary-text/70'
                    : 'text-foreground-muted',
                )}
              >
                {COUNTS[c.value]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grille / empty state */}
      {visible.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-4 py-20 text-center">
          <p className="max-w-md text-lg text-foreground">
            Aucun article ne correspond à cette catégorie pour le moment.
          </p>
          <p className="max-w-md text-base text-foreground-secondary">
            Notre regard s&apos;enrichit régulièrement : revenez prochainement,
            ou parcourez l&apos;ensemble de nos articles.
          </p>
          <button
            type="button"
            onClick={() => selectCategory('tous')}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground-accent-water underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Voir tous les articles
          </button>
        </div>
      )}
    </>
  );
}
