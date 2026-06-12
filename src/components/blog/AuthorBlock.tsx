import Image from 'next/image';

/**
 * AuthorBlock — bloc auteur en pied d'article (blog-program.md §1.5, signal
 * E-E-A-T). Portrait Nicolas Berg + bio courte (3-4 lignes) reprise du programme :
 * fondateur Aqua System, 30+ ans pisciniste Yvelines/92, certification Socotec
 * CSP/ESP-001. Faits PROUVÉS uniquement (project-context.md + geo-strategy.md).
 *
 * Server Component. Le portrait existe en 200w/400w (public/images/equipe).
 */
export function AuthorBlock() {
  return (
    <aside className="mt-12 flex flex-col gap-5 rounded-lg border border-border bg-background-secondary p-6 sm:flex-row sm:items-start md:p-8">
      <Image
        src="/images/equipe/nicolas-berg-400w.webp"
        alt="Portrait de Nicolas Berg, fondateur d'Aqua System"
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
          Fondateur et gérant d&apos;Aqua System. Plus de 30 ans d&apos;expertise
          en conception et construction de piscines sur mesure dans les Yvelines
          et les Hauts-de-Seine. Certification Socotec CSP/ESP-001 —
          Professionnels de la piscine privée à usage familial.
        </p>
      </div>
    </aside>
  );
}
