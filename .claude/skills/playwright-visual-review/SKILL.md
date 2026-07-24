---
name: playwright-visual-review
description: Capture des captures d'écran avec Playwright (avant/après une modification, ou sur plusieurs navigateurs) et compare visuellement pour détecter des régressions. Déclencheurs — "screenshot", "capture d'écran", "régression visuelle", "compare avant/après", "cross-browser", "vérifie visuellement", "review Playwright". Complète responsive-qa (qui raisonne sur les règles CSS) en apportant une preuve visuelle automatisée sur les 5 projets définis dans playwright.config.ts.
---

# Playwright Visual Review

Preuve visuelle automatisée pour Caly Nails, en s'appuyant sur la config Playwright déjà en place (`playwright.config.ts`, dossier `tests/`).

## Ce qui existe déjà dans le projet

- 5 projects : `desktop-chromium`, `desktop-firefox`, `desktop-webkit` (1440×1000), `mobile-chromium` (Pixel 5), `mobile-webkit` (iPhone 13).
- Scripts npm : `npm run test:e2e`, `test:e2e:ui`, `test:e2e:headed`, `test:e2e:report`.
- Convention de nommage observée dans `screenshots-review/` : `<slug>-<locale>-<largeur>.png` (ex. `v5-preview-fr-414.png`).
- Suite de tests existante : `tests/seo.spec.ts`, `tests/fr.spec.ts`, `tests/en.spec.ts`, `tests/console.spec.ts`.

## Méthode

1. Avant une modification importante : capturer un état "avant" avec `page.screenshot()` sur les largeurs/pages concernées, dans un dossier temporaire ou `screenshots-review/`.
2. Appliquer la modification.
3. Capturer l'état "après" avec les mêmes viewports/pages.
4. Comparer côte à côte (diff visuel manuel ou pixel-diff) et signaler tout changement non intentionnel (décalage, couleur, troncature).
5. Lancer `npm run test:e2e` pour vérifier que la suite existante (SEO, fr, en, console) passe toujours — ne pas se limiter au visuel.
6. Pour une revue cross-browser, exécuter les 5 projects et comparer spécifiquement les rendus WebKit/Firefox vs Chromium (fonts, flex/grid, vidéos autoplay).

## Ce que ce skill ne fait pas

- Ne remplace pas l'analyse des règles CSS/breakpoints → `responsive-qa`.
- Ne juge pas la qualité esthétique subjective → `visual-polish`.
- Ne vérifie pas l'accessibilité (contraste, focus, ARIA) → `accessibility-review`.
