import { cn } from '@/lib/cn';

/**
 * ProofBadges — design-system.md §13 (refonte éditoriale D-26, 2026-06-12).
 *
 * Direction premium « Rive privée » : plus de cartouches dorés pleins.
 * Les figures sont posées sur le fond nu de la section, séparées par des FILETS
 * verticaux fins (hairline or #C4924A faible opacité — décoratif, exempté contraste).
 * Alignement strict sur une ligne de base commune (les figures s'ancrent en bas
 * d'une hauteur réservée, les libellés courent sous cette ligne).
 *
 * Deux natures distinctes, traitées différemment (tokens uniquement) :
 * - `kind: 'number'` (défaut) — chiffre serif Didone grand corps (30+, 350+).
 * - `kind: 'name'` — nom propre en serif corps réduit, tenu sur UNE ligne
 *   (« L'Esprit Piscine » ne casse plus), via `whitespace-nowrap` + corps ajusté.
 *
 * Libellés : petites capitales espacées (tracking) sous chaque figure.
 * Contraste : libellés sand-700 ≥ 4.5:1 sur les fonds d'usage (sand-100/200) ;
 * figures sand-900 ; filets décoratifs exemptés WCAG.
 *
 * Les 4 preuves par défaut sont issues de project-context.md (faits vérifiables :
 * 30+ ans, 350+ piscines, Socotec, L'Esprit Piscine). JAMAIS en hero (§13).
 */
export interface ProofItem {
  /** Chiffre ou intitulé court (ex: « 30+ », « Socotec »). */
  figure: string;
  /** Libellé descriptif court, rendu en petites capitales (1–2 lignes). */
  label: string;
  /**
   * Nature de la figure — pilote le corps typographique.
   * 'number' (défaut) : grand corps Didone. 'name' : corps réduit, 1 ligne.
   */
  kind?: 'number' | 'name';
}

export const DEFAULT_PROOFS: ProofItem[] = [
  { figure: '30+', label: "ans d'expertise", kind: 'number' },
  { figure: '350+', label: 'piscines entretenues en 78/92', kind: 'number' },
  { figure: 'Socotec', label: 'certification CSP/ESP-001', kind: 'name' },
  { figure: "L'Esprit Piscine", label: 'réseau pisciniste', kind: 'name' },
];

export interface ProofBadgesProps {
  items?: ProofItem[];
  className?: string;
}

export function ProofBadges({
  items = DEFAULT_PROOFS,
  className,
}: ProofBadgesProps) {
  return (
    <ul
      className={cn(
        // 2×2 mobile → 4 colonnes desktop. items-stretch pour des filets pleine hauteur.
        'grid grid-cols-2 items-stretch md:grid-cols-4',
        className,
      )}
    >
      {items.map((item, index) => {
        const isName = item.kind === 'name';
        // Filets verticaux : à gauche de chaque cellule sauf la 1re de chaque ligne.
        // Mobile (2 col) : filet vertical sur les cols de droite (index impair) ;
        //   filet horizontal sur la 2e ligne (index ≥ 2) pour relier les deux rangées.
        // Desktop (4 col) : un seul filet vertical entre colonnes ; aucun filet
        //   horizontal (md:border-t-0), une seule rangée.
        const mobileLeftRule = index % 2 === 1;
        const mobileTopRule = index >= 2;
        return (
          <li
            key={item.figure}
            className={cn(
              'flex flex-col items-center px-4 py-6 text-center md:py-2 md:px-6',
              // Filet vertical mobile (cols de droite)
              mobileLeftRule
                ? 'border-l border-gold-600/30'
                : 'border-l-0',
              // Filet horizontal mobile (2e rangée) — supprimé en desktop
              mobileTopRule ? 'border-t border-gold-600/25' : 'border-t-0',
              'md:border-t-0',
              // Filet vertical desktop : toutes les cellules sauf la première
              index === 0
                ? 'md:border-l-0'
                : 'md:border-l md:border-gold-600/30',
            )}
          >
            {/* Ligne de base commune : hauteur réservée, figure ancrée en bas. */}
            <span
              className={cn(
                'flex min-h-[3rem] items-end justify-center font-serif leading-none text-foreground md:min-h-[3.5rem]',
                isName
                  ? 'text-xl md:text-2xl'
                  : 'text-4xl md:text-5xl',
              )}
            >
              <span className={cn(isName && 'whitespace-nowrap')}>
                {item.figure}
              </span>
            </span>
            {/* Libellé — petites capitales espacées sous la ligne de base. */}
            <span className="mt-3 text-[11px] font-medium uppercase leading-4 tracking-[0.16em] text-foreground-secondary md:text-xs">
              {item.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
