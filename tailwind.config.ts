import type { Config } from 'tailwindcss';

/**
 * Tailwind config — source de vérité unique : docs/design/design-tokens.json.
 *
 * Stratégie (voir docs/dev-decisions.md D-03) :
 * - PRIMITIVES (couleurs brutes, spacing, typo, radius, shadow, motion) sont
 *   recopiées ici depuis le tier 1 des tokens. Aucune palette parallèle.
 * - SÉMANTIQUES (background.primary, text.primary, action.primary-bg...) sont
 *   exposées en CSS variables dans src/styles/globals.css et référencées ici
 *   via `var(--...)`. Cela permet le dark mode différé (V2) sans refonte :
 *   seules les variables changent, jamais les classes.
 *
 * Les composants utilisent en priorité les classes sémantiques (ex: bg-background,
 * text-foreground, bg-action-primary). Les primitives (ex: bg-water-600) restent
 * disponibles pour les cas non couverts par un token sémantique.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // --- Tier 1 : primitives (design-tokens.json > primitives.color) ---
        sand: {
          50: '#FAF8F4',
          100: '#F5F0E8',
          200: '#EDE8DF',
          300: '#E0D8CC',
          400: '#D4CCC0',
          500: '#A89E92',
          600: '#7E7468',
          700: '#6B6058',
          800: '#4A3E34',
          900: '#2A2420',
          950: '#1A1510',
        },
        water: {
          50: '#EAF2F5',
          100: '#D4E7ED',
          200: '#B8D4DC',
          300: '#8CB8C7',
          400: '#6B9FAF',
          500: '#5A8A9A',
          600: '#3A6675',
          700: '#2C4F5C',
          800: '#1E3840',
          900: '#102028',
        },
        forest: {
          50: '#EBF2EB',
          100: '#D6E5D6',
          200: '#C4D9C6',
          300: '#A0BFA3',
          400: '#789A7C',
          500: '#587A5F',
          600: '#3B5240',
          700: '#2C3F30',
          800: '#1E2C22',
          900: '#101A13',
        },
        gold: {
          100: '#EDD9B8',
          400: '#D4A864',
          600: '#C4924A',
          800: '#8B6130',
        },
        // --- Tier 2 : sémantiques (mappées sur les CSS variables de globals.css) ---
        background: {
          DEFAULT: 'var(--color-background-primary)',
          secondary: 'var(--color-background-secondary)',
          tertiary: 'var(--color-background-tertiary)',
          inverse: 'var(--color-background-inverse)',
          'accent-water': 'var(--color-background-accent-water)',
          'accent-forest': 'var(--color-background-accent-forest)',
          proof: 'var(--color-background-proof)',
        },
        foreground: {
          DEFAULT: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
          'accent-water': 'var(--color-text-accent-water)',
          'accent-forest': 'var(--color-text-accent-forest)',
          proof: 'var(--color-text-proof)',
        },
        border: {
          DEFAULT: 'var(--color-border-default)',
          strong: 'var(--color-border-strong)',
          muted: 'var(--color-border-muted)',
        },
        action: {
          primary: 'var(--color-action-primary-bg)',
          'primary-hover': 'var(--color-action-primary-bg-hover)',
          'primary-active': 'var(--color-action-primary-bg-active)',
          'primary-text': 'var(--color-action-primary-text)',
          forest: 'var(--color-action-forest-bg)',
          'forest-hover': 'var(--color-action-forest-bg-hover)',
        },
        success: 'var(--color-text-success)',
        error: 'var(--color-text-error)',
      },
      fontFamily: {
        // Variables injectées par next/font dans layout.tsx
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '60px',
        display: '72px',
      },
      spacing: {
        // primitives.spacing (4px base unit)
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        10: '40px',
        12: '48px',
        14: '56px',
        16: '64px',
        20: '80px',
        24: '96px',
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        md: '4px',
        lg: '8px',
        xl: '12px',
        full: '9999px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(42,36,32,0.06)',
        sm: '0 2px 4px rgba(42,36,32,0.08)',
        md: '0 4px 12px rgba(42,36,32,0.10)',
        lg: '0 8px 24px rgba(42,36,32,0.12)',
        xl: '0 16px 48px rgba(42,36,32,0.16)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
        glacial: '1000ms',
      },
      transitionTimingFunction: {
        default: 'cubic-bezier(0.4, 0, 0.2, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      maxWidth: {
        container: '1280px',
      },
      zIndex: {
        dropdown: '10',
        sticky: '100',
        overlay: '200',
        drawer: '300',
        toast: '400',
        tooltip: '500',
      },
    },
  },
  plugins: [],
};

export default config;
