import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

/**
 * Config Vitest — tests unitaires + intégration handler de la Pages Function.
 * Environnement `node` par défaut (fonctions pures, validation, Function).
 * jsdom disponible par fichier via la directive `// @vitest-environment jsdom`.
 * Les E2E Playwright (tests/e2e) sont EXCLUS — lancés par `npm run test:e2e`.
 */
export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.test.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**'],
    globals: false,
    coverage: {
      provider: 'v8',
      include: [
        'src/lib/contact-validation.ts',
        'src/lib/analytics.ts',
        'src/lib/constants.ts',
        'src/content/realisations.ts',
        'functions/api/contact.ts',
      ],
      thresholds: {
        // Chemins critiques (formulaire/Function) : >= 80% conformément à la stratégie.
        lines: 80,
        functions: 80,
        statements: 80,
        branches: 70,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
