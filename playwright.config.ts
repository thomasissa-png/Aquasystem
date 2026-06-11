import { defineConfig, devices } from '@playwright/test';

/**
 * Config Playwright — E2E sur le serveur de dev local UNIQUEMENT (127.0.0.1).
 * JAMAIS d'URL publique (consigne mission). Réseau /api/contact et events Umami
 * 100% interceptés dans les specs → déterministe, zéro service réel.
 *
 * 3 projets device pour le parcours principal (iPhone 13 / iPad / Desktop Chrome).
 * Les specs ciblées (function-less) tournent sur tous ; le tag @main porte le
 * parcours multi-device, le reste s'exécute sur Desktop Chrome par défaut.
 */
const PORT = 3100;
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  timeout: 30_000,
  expect: { timeout: 7_000 },

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    actionTimeout: 7_000,
  },

  projects: [
    {
      name: 'desktop-chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    // Mobiles forcés sur chromium (déjà installé, déterministe en CI) : on garde
    // viewport + émulation tactile des devices, sans télécharger webkit.
    {
      name: 'ipad',
      use: {
        ...devices['iPad (gen 7)'],
        browserName: 'chromium',
        defaultBrowserType: 'chromium',
      },
      grep: /@main/,
    },
    {
      name: 'iphone-13',
      use: {
        ...devices['iPhone 13'],
        browserName: 'chromium',
        defaultBrowserType: 'chromium',
      },
      grep: /@main/,
    },
  ],

  webServer: {
    command: `npm run dev -- --port ${PORT} --hostname 127.0.0.1`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
