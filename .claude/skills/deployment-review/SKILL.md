---
name: deployment-review
description: Vérifie ce qui n'est visible qu'au déploiement — variables d'environnement, next.config, i18n (fr/en), CI GitHub Actions, sitemap/robots, headers/redirects. Déclencheurs — "avant de déployer", "prêt pour la prod", "deployment review", "vérifie le déploiement", "CI Playwright". Ne relance pas les commandes de build/lint/tsc (voir production-qa) : audite la configuration, pas le code applicatif.
---

# Deployment Review

Checklist pré-déploiement pour Caly Nails (Next.js 15, déployé probablement sur Vercel, CI GitHub Actions).

## Points à vérifier

- **`next.config.ts`** : tout changement (domains d'images, redirects, headers, `allowedDevOrigins`) est intentionnel et ne casse pas la prod (`allowedDevOrigins` ne doit contenir que des IP de dev, jamais utilisé pour restreindre la prod).
- **i18n (`app/fr`, `app/en`, `app/lib/dictionaries`)** : les deux locales ont les mêmes clés de traduction ; aucune route n'existe dans une locale sans équivalent dans l'autre, sauf volonté explicite.
- **CI (`.github/workflows/playwright.yml`)** : la CI doit rester verte ; toute modification du workflow doit être vérifiée localement avant de push (`act` ou lecture attentive du yaml) — ne jamais désactiver un job pour faire passer la CI.
- **SEO** : `tests/seo.spec.ts` couvre déjà des attentes (title, meta, sitemap/robots) — vérifier qu'un changement de route ou de contenu ne casse pas ces attentes.
- **Variables d'environnement** : toute nouvelle variable utilisée dans le code doit être documentée et présente dans l'environnement de déploiement (Vercel/CI), pas seulement en local.
- **Branches** : le déploiement se fait depuis `main` ; vérifier l'état de la branche courante (`v5`) par rapport à `main` avant de suggérer un merge/déploiement.

## Ce que ce skill ne fait pas

- Ne relance pas `tsc`/`lint`/`build`/`test:e2e` → `production-qa`.
- Ne mesure pas les Core Web Vitals → `performance-audit`.
- Ne crée, ne commite, ni ne push aucun changement de lui-même : il signale, l'utilisateur décide.
