import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fusionne des classes Tailwind en résolvant les conflits (ex: deux `px-*`).
 * 10 lignes natives plutôt qu'un helper « intelligent » : clsx pour le
 * conditionnel, twMerge pour la déduplication des utilitaires Tailwind.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
