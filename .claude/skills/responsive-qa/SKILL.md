---
name: responsive-qa
description: Vérifie qu'une section ou un composant reste irréprochable à toutes les tailles d'écran après une modification UI (layout, débordement, tailles tactiles). Déclencheurs — "responsive", "mobile", "tablette", "breakpoint", "viewport", "ça casse sur mobile", "vérifier sur tous les écrans". Se concentre sur les règles CSS/Tailwind et le comportement de mise en page ; ne fait pas de capture d'écran automatisée ni de diff visuel (voir playwright-visual-review pour ça).
---

# Responsive QA

Contrôle manuel/raisonné du responsive pour Caly Nails (Next.js 15, Tailwind CSS). À utiliser après toute modification touchant une section visible (layout, composant, media).

## Largeurs à vérifier

Breakpoints Tailwind par défaut : `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536.

Largeurs réelles déjà utilisées dans `screenshots-review/` pour ce projet : 375, 390, 414 (mobile iPhone courants). Toujours inclure ces trois largeurs en plus des breakpoints Tailwind, et 1440 pour le desktop (cohérent avec `playwright.config.ts`).

## Méthode

1. Lancer `npm run dev` si le serveur n'est pas déjà actif.
2. Pour chaque largeur ci-dessus, inspecter la section modifiée (devtools responsive mode, ou piloter les projets Playwright existants `mobile-chromium` / `mobile-webkit` / `desktop-*` définis dans `playwright.config.ts`).
3. Vérifier spécifiquement :
   - pas de débordement horizontal (scroll-x involontaire) ;
   - textes non tronqués, pas de recouvrement d'éléments ;
   - zones tactiles ≥ 44×44px sur mobile ;
   - images/vidéos qui gardent leur ratio (`next/image`, `object-fit`) ;
   - navigation mobile (menu, header) qui reste utilisable ;
   - `safe-area-inset` respecté sur iPhone si des éléments sont collés aux bords.
4. Si un problème apparaît uniquement entre deux breakpoints, vérifier la largeur exacte de bascule dans le CSS/Tailwind avant de corriger — ne jamais corriger "au hasard" (cf. méthode du projet dans `AGENTS.md`/`CLAUDE.md`).

## Ce que ce skill ne fait pas

- Ne capture pas d'images ni ne compare de captures avant/après → `playwright-visual-review`.
- Ne juge pas la qualité esthétique (rythme, hiérarchie) → `visual-polish`.
