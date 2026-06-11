import { cn } from '@/lib/cn';

/**
 * ProofBadges — design-system.md §13.
 * 4 preuves factuelles, 2×2 mobile / 4 en ligne desktop. Non interactif.
 * Chiffres en serif gold, labels en sans secondaire. Fond « proof ».
 *
 * Les 4 preuves par défaut sont issues de project-context.md (faits vérifiables :
 * 30+ ans, 350+ piscines, Socotec, L'Esprit Piscine). JAMAIS en hero (§13).
 */
export interface ProofItem {
  /** Chiffre ou intitulé court (ex: « 30+ », « Socotec »). */
  figure: string;
  /** Libellé descriptif (max 2 lignes). */
  label: string;
}

export const DEFAULT_PROOFS: ProofItem[] = [
  { figure: '30+', label: "ans d'expertise" },
  { figure: '350+', label: 'piscines entretenues en 78/92' },
  { figure: 'Socotec', label: 'CSP/ESP-001 — certification technique' },
  { figure: "L'Esprit Piscine", label: 'réseau professionnel piscinistes' },
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
        'grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:gap-6',
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item.figure}
          className="flex flex-col gap-2 rounded-md bg-background-proof p-4"
        >
          <span className="font-serif text-4xl leading-none text-foreground-proof lg:text-5xl">
            {item.figure}
          </span>
          <span className="text-sm leading-5 text-foreground-proof-label">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
