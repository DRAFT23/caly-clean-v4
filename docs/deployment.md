# Deployment

## Vercel

- **Projet Vercel réellement relié au dépôt GitHub `DRAFT23/caly-clean-v4`** : `caly-clean-1` (équipe `draft23`). Le nom diffère du dépôt — ne pas confondre avec le projet `caly-clean-v4` qui existe sur le même compte mais n'est pas connecté à ce repo.
- **Production Branch** : `main`.
- **Preview** : toute autre branche poussée (dont `v5`), URL du type `caly-clean-1-git-<branche>-draft23.vercel.app`.
- **Root Directory** : `.`
- **Framework Preset** : Next.js
- **Build Command** : par défaut (`npm run build` / `next build`)
- **Install Command** : par défaut (`npm install`)
- **Output Directory** : par défaut (Next.js)
- **Domaines** : uniquement les alias `*.vercel.app` générés par Vercel, aucun domaine personnalisé configuré.
- **Variables d'environnement** : aucune définie à ce jour sur le projet `caly-clean-1`.

## GitHub Actions comme gate

Aucun déploiement n'est déclenché par GitHub Actions : Vercel déploie directement via son intégration GitHub App sur chaque push. Le workflow `Quality Gate` (lint, `tsc`, build, Playwright) est indépendant et sert de garde-fou qualité avant fusion dans `main`, pas de mécanisme de déploiement.

## Ce qui n'a pas été modifié

Domaines, variables d'environnement, Production Branch : aucun changement effectué (actions considérées sensibles, hors périmètre d'exécution autonome).
