---
name: git-workflow
description: Applique les conventions git de ce projet (messages de commit, branches, prudence sur les actions destructives) lors d'un commit ou d'une PR. Déclencheurs — "commit", "crée une PR", "quel message de commit", "git workflow". Ne remplace pas les règles globales de sécurité git (jamais de commit/push non demandé) : les précise pour ce dépôt.
---

# Git Workflow

Conventions observées dans l'historique de Caly Nails.

## Style de commit

L'historique mélange deux styles, les deux sont acceptables :
- Conventionnel : `feat: add Playwright test suite and CI`, `fix(ci): install all Playwright browsers`, `test(playwright): expand cross-browser coverage`.
- Descriptif court à l'impératif/participe : `Finalize mobile navigation`, `Polish UI accessibility and interactions`.

Préférer le préfixe conventionnel (`feat:`, `fix:`, `test:`, `chore:`) quand le changement est technique ou touche la CI ; le style descriptif court convient pour les changements UI/contenu. Toujours au présent, sans point final, résumant le "pourquoi" plutôt que la liste des fichiers touchés.

## Branches

- `main` : branche de référence pour les PR (`origin/main`).
- `v5` : branche de travail courante.
- Ne pas merger ni push vers `main` sans demande explicite.

## Règles de prudence (rappel du cadre global)

- Ne jamais committer sans que l'utilisateur le demande explicitement.
- Ne jamais push, surtout en force, sans demande explicite.
- Toujours vérifier `git status`/`git diff` avant tout commit pour ne pas embarquer de fichiers non voulus (ex. `screenshots-review/` actuellement untracked : demander avant de l'ajouter).
- Créer un nouveau commit plutôt qu'un `--amend`, sauf demande contraire.

## Ce que ce skill ne fait pas

- Ne décide pas quand déployer → `deployment-review`.
- Ne fait pas les vérifications qualité avant commit → `production-qa`.
