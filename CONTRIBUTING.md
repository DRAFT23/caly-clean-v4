# Contributing

Projet actuellement maintenu par une seule personne. Ce guide reste volontairement court.

## Avant de contribuer

Lire [CLAUDE.md](CLAUDE.md) (règles du projet) et [docs/development-workflow.md](docs/development-workflow.md) (cycle de travail).

## Local

```bash
npm ci
npm run dev
```

## Avant toute pull request

```bash
npx tsc --noEmit
npm run lint
npm run build
npm run test:e2e
```

Toutes ces commandes doivent réussir. La CI (`Quality Gate`) les rejoue de toute façon sur la PR.

## Pull requests

- Titre clair, résumé des changements.
- Ne jamais push directement sur `main` — voir [docs/development-workflow.md](docs/development-workflow.md).
- Ne jamais contourner un check CI en échec.
