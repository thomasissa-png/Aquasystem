import Image from 'next/image';

/**
 * AuthorBlock — bloc auteur en pied d'article (blog-program.md §1.5, signal
 * E-E-A-T). Portrait Nicolas Berg + bio courte (3-4 lignes) reprise du programme :
 * gérant d'Aqua System (maison forte de 30+ ans de savoir-faire en Yvelines/92),
 * certification Socotec CSP/ESP-001. Faits PROUVÉS uniquement (project-context.md
 * + geo-strategy.md). NB : Nicolas Berg a REPRIS Aqua System (pas fondateur) —
 * le « 30 ans » est attribué à la MAISON, jamais à lui personnellement (D-47).
 *
 * Server Component. Le portrait existe en 200w/400w (public/images/equipe).
 */
export function AuthorBlock() {
  return (
    <aside className="mt-12 flex flex-col gap-5 rounded-lg border border-border bg-background-secondary p-6 sm:flex-row sm:items-start md:p-8">
      <Image
        src="/images/equipe/nicolas-berg-400w.webp"
        alt="Portrait de Nicolas Berg, gérant d'Aqua System"
        width={88}
        height={88}
        loading="lazy"
        className="h-20 w-20 shrink-0 rounded-full object-cover md:h-24 md:w-24"
      />
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-water">
          L&apos;auteur
        </p>
        <p className="mt-1 font-serif text-xl text-foreground">Nicolas Berg</p>
        <p className="mt-3 max-w-[60ch] text-sm leading-7 text-foreground-secondary">
          Gérant d&apos;Aqua System, maison forte de plus de 30 ans de
          savoir-faire en conception et construction de piscines sur mesure dans
          les Yvelines et les Hauts-de-Seine. Certification Socotec CSP/ESP-001 —
          Professionnels de la piscine privée à usage familial.
        </p>
      </div>
    </aside>
  );
}
