# Development Workflow

Projet maintenu par une seule personne : le workflow reste simple, sans bureaucratie excessive.

## Branches

- `main` — production stable. Protégée : pas de push direct, pas de force-push, pas de suppression.
- `v5` — développement courant, déployée en Preview sur Vercel à chaque push.
- Une branche de feature dédiée peut être créée depuis `v5` pour un changement isolé, sinon on travaille directement sur `v5`.

## Cycle de changement

1. Travailler sur `v5` (ou une branche dédiée créée depuis `v5`).
2. Valider localement avant toute PR :
   ```
   npx tsc --noEmit
   npm run lint
   npm run build
   npm run test:e2e
   ```
3. Ouvrir une pull request vers `main`.
4. La CI (`Quality Gate` : lint, tsc, build, Playwright) doit être verte.
5. Résoudre les conversations de la PR.
6. Fusionner (l'administrateur peut fusionner sans approbation supplémentaire, seul mainteneur du dépôt).
7. `main` déclenche le déploiement Production sur Vercel.

## Commits

Conventional Commits de préférence pour les changements techniques (`feat:`, `fix:`, `chore:`, `ci:`, `docs:`) ; un style descriptif court reste acceptable pour les changements UI/contenu. Un commit = un changement cohérent, jamais un mélange de sujets non liés.

## Ce qui ne doit jamais arriver

- Push direct ou force-push sur `main`.
- `git reset --hard` / `git clean -fd` sans vérification préalable de `git status`.
- Contournement d'un check CI (`--no-verify`, désactivation d'un job pour faire passer le pipeline).
