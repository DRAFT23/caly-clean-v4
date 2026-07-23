# Security

## Secrets

- Aucun secret n'est versionné : `.env*` et `.vercel` sont ignorés par Git (voir `.gitignore`).
- Les variables d'environnement de production/preview vivent uniquement dans Vercel (Project Settings → Environment Variables), jamais dans le code ni dans les logs.
- Aucun secret ne doit apparaître dans un commit, un log CI, ou un fichier `.claude/`.

## Contrôles GitHub actifs

- **Secret scanning** + **push protection** : activés, empêchent la publication accidentelle de secrets détectables.
- **Dependabot alerts** + **Dependabot security updates** : activés — PR automatiques sur vulnérabilités connues des dépendances npm.
- **Private vulnerability reporting** : activé — permet un signalement responsable de faille sans passer par une issue publique.
- **CodeQL** (`.github/workflows/codeql.yml`) : analyse statique JavaScript/TypeScript sur push (`main`, `v5`), PR vers `main`, et hebdomadairement.

## Protection de branche

`main` est protégée : pull request obligatoire, statut CI `Quality Gate` requis, branche à jour avant fusion, force-push et suppression interdits. Détails exacts et limites liées au plan GitHub → voir le rapport d'audit le plus récent.

## Permissions CI

Les workflows GitHub Actions utilisent des `permissions` minimales (`contents: read`, `security-events: write` uniquement pour CodeQL). Aucun `pull_request_target` n'est utilisé ; les PR externes n'ont accès à aucun secret.

## Risques de dépendances acceptés temporairement

Deux alertes Dependabot restent ouvertes après la mise à jour de `next` vers `16.2.11` (2026-07-23), car elles sont fixées par `next` lui-même dans son propre arbre de dépendances, sans levier sûr pour les corriger côté application :

### `sharp` < 0.35.0 (high, GHSA-f88m-g3jw-g9cj)

- **Chemin** : dépendance **optionnelle** de `next` (`optionalDependencies: sharp@^0.34.5`), utilisée pour l'optimisation d'images en environnement Node self-hosted.
- **Portée** : vulnérabilités libvips exploitables lors du traitement d'**images non fiables/attaquant-contrôlées**.
- **Pourquoi non corrigé** : `next@16.2.11` exige toujours `sharp@^0.34.5` ; forcer `sharp@0.35+` nécessiterait une override npm non supportée ou un downgrade de `next`, tous deux interdits.
- **Mesures compensatoires** : Caly Nails est un site vitrine statique — les seules images traitées par `next/image` sont des assets du dépôt (`public/`), jamais un upload utilisateur. En production, le déploiement est sur **Vercel**, dont l'optimisation d'images passe par son infrastructure propre (pas par le binaire `sharp` local) : l'exposition réelle en production est très faible.
- **Condition de réévaluation** : dès qu'une version de `next` publie `sharp@^0.35` comme dépendance, mettre à jour immédiatement ; surveiller les releases `next` via Dependabot (déjà actif).

### `postcss` < 8.5.10 (moderate, GHSA-qx2v-qp2m-jg93) — instance imbriquée dans `next`

- **Chemin** : `node_modules/next/node_modules/postcss@8.4.31`, version **exacte** imposée par `next` (inchangée en 16.2.11). Une seconde instance (`node_modules/postcss@8.5.20`, via `@tailwindcss/postcss`) est déjà saine et hors de cause.
- **Portée** : XSS lors de la ré-sérialisation de CSS **soumis par un utilisateur** dans une balise `<style>`.
- **Pourquoi non corrigé** : version épinglée exactement par `next`, aucune override sûre disponible.
- **Mesures compensatoires** : Caly Nails ne traite aucun CSS soumis par un utilisateur à l'exécution — le CSS (Tailwind) est entièrement compilé au build à partir de code source, jamais de contenu externe. Exploitabilité nulle dans ce contexte.
- **Condition de réévaluation** : idem `sharp`, suivre les prochaines releases `next`.

## Claude Code

- `bypassPermissions` n'est jamais utilisé sur ce projet.
- `.claude/settings.local.json` (permissions personnelles) reste local et ignoré par Git.
- `.claude/settings.json` (partagé, versionné) ne contient que des permissions Bash minimales, sans accès filesystem global ni `git push` automatique.
