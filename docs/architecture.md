# Architecture

## Stack

- **Framework** : Next.js 16 (App Router), React 19, TypeScript.
- **Styles** : Tailwind CSS v4, configuré via `@theme` en CSS (pas de `tailwind.config.js`).
- **i18n** : deux locales, `app/fr/` et `app/en/`, dictionnaires dans `app/lib/dictionaries/`.
- **Tests** : Playwright (`tests/`), 5 projets (desktop Chromium/Firefox/WebKit, mobile Chromium/WebKit).

## Structure

```
app/
  components/   composants React réutilisables
  lib/          logique partagée, dictionnaires i18n
  fr/, en/      routes par locale
tests/          suite Playwright (seo, fr, en, console)
docs/           documentation du projet (ce dossier)
.claude/
  skills/       expertise réutilisable, versionnée (voir docs/skills.md)
  settings.json partagé, versionné — settings.local.json reste local
```

## Déploiement

Le repo GitHub est relié à Vercel via l'intégration GitHub App (pas de configuration `vercel.json` locale). Détails → [deployment.md](deployment.md).
