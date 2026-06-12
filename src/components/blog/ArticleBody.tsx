import type { ContentBlock } from '@/content/blog/types';
import { RichText } from './RichText';
import { frTypo } from '@/lib/typography';

/**
 * ArticleBody — rendu typé du corps d'un article « Notre regard ».
 *
 * Parcourt les blocs (src/content/blog/<slug>.ts, transcription mot pour mot des
 * .md validés) et applique les tokens du design system. Server Component, HTML
 * sémantique (h2/h3, p, ul/ol, blockquote pour les encadrés GEO).
 *
 * Le H1 n'est PAS rendu ici (la page article le pose, lié au hero). Les blocs
 * `geo` (Réponse directe extractible) sont rendus en callout distinct = signal
 * GEO/E-E-A-T pour les LLM.
 */
export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'h2':
            return (
              <h2
                key={i}
                className="mt-12 font-serif text-2xl leading-tight text-foreground md:text-3xl"
              >
                {frTypo(block.text)}
              </h2>
            );
          case 'h3':
            return (
              <h3
                key={i}
                className="mt-8 font-serif text-xl leading-snug text-foreground md:text-2xl"
              >
                {frTypo(block.text)}
              </h3>
            );
          case 'p':
            return (
              <p
                key={i}
                className="max-w-[68ch] text-base leading-8 text-foreground-secondary"
              >
                <RichText text={block.text} />
              </p>
            );
          case 'ul':
            return (
              <ul
                key={i}
                className="max-w-[68ch] list-disc space-y-2 pl-6 text-base leading-8 text-foreground-secondary marker:text-foreground-accent-water"
              >
                {block.items.map((item, j) => (
                  <li key={j}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol
                key={i}
                className="max-w-[68ch] list-decimal space-y-3 pl-6 text-base leading-8 text-foreground-secondary marker:font-medium marker:text-foreground-accent-water"
              >
                {block.items.map((item, j) => (
                  <li key={j}>
                    <RichText text={item} />
                  </li>
                ))}
              </ol>
            );
          case 'def':
            return (
              <p
                key={i}
                className="max-w-[68ch] text-base leading-8 text-foreground-secondary"
              >
                <strong className="font-semibold text-foreground">
                  {frTypo(block.term)}.
                </strong>{' '}
                <RichText text={block.text} />
              </p>
            );
          case 'geo':
            return (
              <aside
                key={i}
                className="max-w-[68ch] rounded-lg border-l-4 border-foreground-accent-water bg-background-secondary p-5 md:p-6"
              >
                <p className="font-serif text-lg leading-snug text-foreground">
                  {frTypo(block.question)}
                </p>
                <p className="mt-3 text-base leading-8 text-foreground-secondary">
                  {frTypo(block.answer)}
                </p>
              </aside>
            );
          case 'caption':
            return (
              <p
                key={i}
                className="max-w-[68ch] text-sm italic leading-7 text-foreground-muted"
              >
                {frTypo(block.text)}
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
