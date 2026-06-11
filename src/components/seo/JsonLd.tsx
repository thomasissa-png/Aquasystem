/**
 * JsonLd — rend un objet en `<script type="application/ld+json">`.
 *
 * Server Component (aucune interactivité). Utilisé dans le body des pages pour
 * les données structurées par page : BreadcrumbList, FAQPage, Person.
 * Le JSON-LD Organization global reste dans layout.tsx (head).
 *
 * Plusieurs blocs JSON-LD distincts sur une même page sont valides (schema.org) :
 * un `<JsonLd>` par type (ne pas fusionner BreadcrumbList et FAQPage).
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
