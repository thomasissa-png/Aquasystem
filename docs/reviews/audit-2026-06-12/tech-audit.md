# Audit technique final — Site LIVE aquasystem.pages.dev

> Auteur : @qa · Date : 2026-06-12 · Cible : https://aquasystem.pages.dev
> Périmètre : perf réelle (Lighthouse/Playwright) + a11y axe-core + robustesse (formulaire live, headers, pages d'erreur)
> Légende honnêteté : `[LIVE]` = mesure réelle observée · `[STATIQUE]` = analyse sans exécution

---

## 0. Verdict global

| Dimension | Score | Cible | Statut |
|-----------|-------|-------|--------|
| Performance | _en cours_ | ≥ 90 | _ |
| Accessibilité | _en cours_ | ≥ 95 | _ |
| Best Practices | _en cours_ | ≥ 90 | _ |
| SEO | _en cours_ | ≥ 90 | _ |
| Robustesse (form/headers/erreurs) | _en cours_ | — | _ |
| **GLOBAL /10** | **_en cours_** | — | _ |

---

## 1. Lighthouse réel (M-3)

### Méthode
_à compléter_

### Résultats par page

| Page | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|------|------|------|-----|-----|-----|-----|-----|
| `/` | | | | | | | |
| `/realisations/` | | | | | | | |
| `/contact/` | | | | | | | |

### Écarts vs cibles
_à compléter_

---

## 2. Poids réels & headers de cache

### Poids
_à compléter_

### Headers (_headers actifs)
_à compléter_

---

## 3. Formulaire live — POST /api/contact

| Cas | Attendu | Observé | Statut |
|-----|---------|---------|--------|
| Payload valide | 500 send_failure propre (Resend non config) | | |
| Honeypot rempli | 200 silencieux | | |
| Payload invalide | 400 codes machine | | |
| 8 POST rapides (rate limit KV) | 429 après seuil | | |

_détails à compléter_

---

## 4. Axe-core LIVE (3 pages)
_à compléter_

---

## 5. Pages d'erreur & redirects
_à compléter_

---

## 6. Synthèse correctifs priorisés

| ID | Sévérité | Dimension | Écart (mesure) | Correctif | Type |
|----|----------|-----------|----------------|-----------|------|

_à compléter_
