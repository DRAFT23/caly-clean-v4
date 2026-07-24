---
name: production-qa
description: Fait passer le gate qualité local du projet après une modification importante — types, lint, build, tests e2e. Déclencheurs — "vérifie que tout compile", "avant de terminer", "c'est prêt ?", "lance les checks", "production qa". Exécute mécaniquement les commandes déjà prescrites par le workflow du projet (tsc, lint, build, test:e2e) et ne corrige que les erreurs liées à la tâche en cours.
---

# Production QA

Gate de qualité local pour Caly Nails, formalisant la section "Workflow" de `CLAUDE.md`.

## Commandes à exécuter, dans l'ordre, après toute modification importante

1. `npx tsc --noEmit` — erreurs de typage.
2. `npm run lint` — erreurs ESLint.
3. `npm run build` — le build de production doit réussir.
4. `npm run test:e2e` — suite Playwright (`tests/seo.spec.ts`, `fr.spec.ts`, `en.spec.ts`, `console.spec.ts`) si la modification touche une page/route testée.

## Règles

- Ne corriger que les erreurs liées à la tâche en cours ; ne pas profiter du passage pour "nettoyer" du code hors périmètre.
- Si une erreur préexistante (non liée à la tâche) apparaît, la signaler à l'utilisateur plutôt que de la corriger silencieusement.
- Ne jamais utiliser `--no-verify` ou équivalent pour contourner un échec.
- Un aller simple (une seule commande) qui échoue bloque la suite : corriger avant de passer à la commande suivante.

## Ce que ce skill ne fait pas

- Ne mesure pas les Core Web Vitals ni le poids des ressources → `performance-audit`.
- Ne vérifie pas la configuration de déploiement (env, headers, domaines) → `deployment-review`.
- Ne diagnostique pas la cause d'un bug fonctionnel → `bug-root-cause`.
