import Link from 'next/link';
import { CONTACT } from '@/lib/constants';

/**
 * NoticeRGPD — design-system.md §15 + ux-writing-guide §1 (mention RGPD).
 * Texte EXACT issu de rgpd-checklist.md §D (version courte). Information, pas
 * alerte : corps 12px, couleur secondaire, jamais rouge/gras. Lien vers la
 * page distincte /politique-confidentialite (arbitrage P1-2).
 */
export function NoticeRGPD() {
  return (
    <p className="border-t border-border-muted pt-4 text-xs leading-5 text-foreground-secondary [max-width:60ch]">
      Les informations recueillies dans ce formulaire sont utilisées
      exclusivement pour traiter votre demande et établir un éventuel devis.
      Elles sont conservées 3 ans et ne sont partagées avec aucun tiers
      commercial. Conformément au RGPD, vous disposez d&apos;un droit
      d&apos;accès, de rectification et d&apos;opposition :{' '}
      <a
        href={`mailto:${CONTACT.email}`}
        className="text-foreground-accent-water underline underline-offset-2"
      >
        {CONTACT.email}
      </a>
      .{' '}
      <Link
        href="/politique-confidentialite/"
        className="text-foreground-accent-water underline underline-offset-2"
      >
        Politique de confidentialité →
      </Link>
    </p>
  );
}
