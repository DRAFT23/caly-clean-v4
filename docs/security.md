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

## Claude Code

- `bypassPermissions` n'est jamais utilisé sur ce projet.
- `.claude/settings.local.json` (permissions personnelles) reste local et ignoré par Git.
- `.claude/settings.json` (partagé, versionné) ne contient que des permissions Bash minimales, sans accès filesystem global ni `git push` automatique.
