'use client';

import { useEffect, useState } from 'react';

/**
 * useQueryParam — lit UN paramètre d'URL côté client APRÈS le montage.
 *
 * Pourquoi (D-17) : `useSearchParams()` de next/navigation force le bailout CSR
 * de toute la page en `output: 'export'` (le HTML statique est alors vide du
 * contenu sous Suspense). En lisant `window.location.search` dans un useEffect,
 * le rendu serveur émet l'état par défaut COMPLET (grille entière / formulaire
 * complet) dans le HTML statique, puis l'état réel est appliqué après hydratation.
 *
 * Retourne `null` au premier rendu (serveur + hydratation initiale), puis la
 * valeur réelle du paramètre. Met à jour si l'URL change (popstate, replaceState
 * via le router Next qui déclenche un re-render sur navigation interne).
 */
export function useQueryParam(name: string): string | null {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    function read() {
      const params = new URLSearchParams(window.location.search);
      setValue(params.get(name));
    }
    read();
    // Synchronise sur navigation arrière/avant + changements programmatiques.
    window.addEventListener('popstate', read);
    return () => window.removeEventListener('popstate', read);
  }, [name]);

  return value;
}
