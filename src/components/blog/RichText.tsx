import { Fragment } from 'react';
import Link from 'next/link';
import { frTypo } from '@/lib/typography';

/**
 * RichText — transforme les marqueurs `[texte](/chemin/)` d'un paragraphe en
 * <Link> internes, le reste en texte brut. Aucun HTML brut interprété : seul
 * le motif lien Markdown inline est reconnu (liens internes du maillage blog).
 *
 * Server Component. Les liens externes (http) ne sont pas utilisés dans le corps
 * des articles (maillage 100 % interne) — on ne gère donc que les chemins relatifs.
 */
const LINK_RE = /\[([^\]]+)\]\((\/[^)]+)\)/g;

export function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  // Réinitialise l'état du regex global entre deux appels.
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    const [full, label, href] = match;
    if (match.index > lastIndex) {
      nodes.push(
        <Fragment key={key++}>
          {frTypo(text.slice(lastIndex, match.index))}
        </Fragment>,
      );
    }
    nodes.push(
      <Link
        key={key++}
        href={href!}
        className="font-medium text-foreground-accent-water underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
      >
        {frTypo(label!)}
      </Link>,
    );
    lastIndex = match.index + full.length;
  }
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={key++}>{frTypo(text.slice(lastIndex))}</Fragment>);
  }
  return <>{nodes}</>;
}
