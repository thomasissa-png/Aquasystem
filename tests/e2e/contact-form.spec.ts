import { test, expect } from '@playwright/test';
import {
  stubUmami,
  getEvents,
  mockContact,
  fillValidContactForm,
  expectNoA11yViolations,
} from './helpers';

/**
 * F-08 — formulaire de contact (seul point de conversion, NSM directe).
 * Réseau /api/contact 100% mocké, events Umami interceptés → déterministe.
 */

test.describe('Formulaire de contact', () => {
  test.beforeEach(async ({ page }) => {
    await stubUmami(page);
  });

  test('happy path → /contact/merci + event E-01 (US-08 #1) @main', async ({ page }) => {
    await mockContact(page, { status: 200, body: { success: true } });
    await page.goto('/contact/');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await fillValidContactForm(page);
    await page.getByRole('button', { name: 'Parlez-nous de votre projet' }).click();

    await page.waitForURL('**/contact/merci/');
    await expect(
      page.getByRole('heading', { name: 'Votre message est bien parvenu.' }),
    ).toBeVisible();

    // E-01 émis AVANT redirect — capturé par le stub.
    const events = await getEvents(page);
    const e01 = events.find((e) => e.name === 'form_submission_success');
    expect(e01, 'E-01 form_submission_success émis').toBeTruthy();
    // Aucun chip sélectionné → type_projet = 'null' (tracking-plan v1.2).
    expect(e01?.props.type_projet).toBe('null');
    expect(e01?.props.budget_tranche).toBe('non_renseigne');
    expect(e01?.props.has_cross_selling).toBe(false);
    expect(e01?.props.has_description).toBe(true);
  });

  test('E-02 form_start au premier focus (tracking-plan)', async ({ page }) => {
    await page.goto('/contact/');
    await page.getByLabel('Votre nom').focus();
    await expect
      .poll(async () => (await getEvents(page)).some((e) => e.name === 'form_start'))
      .toBe(true);
  });

  test('payload E-01 reflète chip et budget sélectionnés', async ({ page }) => {
    await mockContact(page);
    await page.goto('/contact/');
    await fillValidContactForm(page);
    await page.getByRole('checkbox', { name: 'Piscine & bien-être' }).click();
    await page.getByLabel('Budget envisagé').selectOption('80_150k');
    await page.getByRole('button', { name: 'Parlez-nous de votre projet' }).click();
    await page.waitForURL('**/contact/merci/');

    const e01 = (await getEvents(page)).find((e) => e.name === 'form_submission_success');
    expect(e01?.props.type_projet).toBe('piscine_bien_etre');
    expect(e01?.props.budget_tranche).toBe('80_150k');
  });

  test('email invalide → message exact ux-writing + focus (US-08 #4)', async ({ page }) => {
    await page.goto('/contact/');
    await page.getByLabel('Votre nom').fill('Alexandre Dupont');
    await page.getByLabel(/^Email/).fill('alexandre.test');
    await page.getByLabel('Commune').fill('Le Vésinet');
    await page
      .getByLabel('Décrivez-nous votre projet')
      .fill('Un projet de piscine complet sur ma propriété.');
    await page.getByRole('button', { name: 'Parlez-nous de votre projet' }).click();

    await expect(
      page.getByText(
        "L'adresse email semble incorrecte — vérifiez le format (exemple : prenom@domaine.fr).",
      ),
    ).toBeVisible();
    await expect(page.getByLabel(/^Email/)).toBeFocused();
    await expect(page).toHaveURL(/\/contact\/?$/);
  });

  test('description < 20 → message exact ux-writing (US-08 #5)', async ({ page }) => {
    await page.goto('/contact/');
    await page.getByLabel('Votre nom').fill('Alexandre Dupont');
    await page.getByLabel(/^Email/).fill('alexandre@domaine.fr');
    await page.getByLabel('Commune').fill('Le Vésinet');
    await page.getByLabel('Décrivez-nous votre projet').fill('court');
    await page.getByRole('button', { name: 'Parlez-nous de votre projet' }).click();

    await expect(
      page.getByText(
        'Décrivez votre projet en quelques mots — cela guidera notre premier échange.',
      ),
    ).toBeVisible();
  });

  test('erreur serveur 500 → saisie préservée + bloc erreur (US-08 #6)', async ({ page }) => {
    await mockContact(page, { status: 500, body: { error: 'send_failure' } });
    await page.goto('/contact/');
    await fillValidContactForm(page);
    await page.getByRole('button', { name: 'Parlez-nous de votre projet' }).click();

    // Reste sur /contact, bloc d'alerte du formulaire visible, saisie conservée.
    // Wording = ux-writing-guide §3 (source de vérité ; diverge de functional-specs
    // US-08 #6 — voir handoff INFO-1). Téléphone cliquable présent.
    const formAlert = page.getByRole('main').getByRole('alert');
    await expect(formAlert).toBeVisible();
    await expect(formAlert).toContainText(
      "Votre message n'a pas pu être envoyé — une erreur technique est survenue de notre côté.",
    );
    await expect(formAlert).toContainText('01 30 42 26 00');
    await expect(page.getByLabel('Votre nom')).toHaveValue('Alexandre Dupont');
    await expect(page.getByLabel('Commune')).toHaveValue('Le Vésinet');
  });

  test('smart default ?source=prescripteurs → chip pré-sélectionné (US-08 #3)', async ({
    page,
  }) => {
    await page.goto('/contact/?source=prescripteurs');
    await expect(
      page.getByRole('checkbox', { name: 'Je suis prescripteur', checked: true }),
    ).toBeVisible();
  });

  // FIXME(BUG-A11Y-1) : violations color-contrast WCAG 2 AA (gold #c4924a sur
  // fond proof #edd9b8 = 2.01:1, attendu 3:1 ; foreground-secondary 4.42:1
  // attendu 4.5:1 ; lien gold du footer). Global (footer + badges proof).
  // Repasse vert après correction tokens @fullstack/@design. Voir handoff QA P1.
  test.fixme('a11y axe-core sur /contact', async ({ page }) => {
    await page.goto('/contact/');
    await expectNoA11yViolations(page, 'contact');
  });

  test('navigation clavier : focus visible + soumission au clavier', async ({ page }) => {
    await mockContact(page);
    await page.goto('/contact/');
    await page.getByLabel('Votre nom').focus();
    await expect(page.getByLabel('Votre nom')).toBeFocused();
    await fillValidContactForm(page);
    // Soumission via Enter dans un champ texte court → bouton submit.
    await page.getByRole('button', { name: 'Parlez-nous de votre projet' }).press('Enter');
    await page.waitForURL('**/contact/merci/');
  });
});
