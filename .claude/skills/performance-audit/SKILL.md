---
name: performance-audit
description: Audite les Core Web Vitals et le poids des ressources (images, vidéos, bundle JS) d'une section modifiée. Déclencheurs — "performance", "Core Web Vitals", "LCP", "CLS", "bundle size", "lazy loading", "ça charge lentement", "optimiser les images/vidéos". Ne fait pas les vérifications de build/lint/types (voir production-qa) : se concentre sur la vitesse et le poids.
---

# Performance Audit

Audit de performance pour Caly Nails (Next.js 15, App Router).

## Points à vérifier

- **Images** : utiliser `next/image` (pas de `<img>` brut) avec `width`/`height` ou `fill` corrects, formats modernes (`avif`/`webp` auto via Next), `priority` uniquement sur l'image LCP (hero), `loading="lazy"` implicite ailleurs.
- **Vidéos** : compression raisonnable, `preload="metadata"` ou lazy si hors écran initial, autoplay uniquement en muted + poster pour éviter un CLS au chargement.
- **CLS** : dimensions réservées (aspect-ratio, width/height) pour tout media, pas de contenu qui se décale après chargement des fonts (`font-display: swap` ou équivalent Next `next/font`).
- **LCP** : l'élément le plus grand visible au-dessus de la ligne de flottaison doit être prioritaire (image `priority`, pas de JS bloquant avant).
- **Bundle** : préférer les Server Components par défaut (App Router), n'utiliser `"use client"` que si nécessaire (interactivité réelle) ; vérifier qu'un nouveau composant n'importe pas une librairie lourde évitable.
- **Lazy loading** : sections hors écran (carrousels, contenu bas de page) chargées en différé quand pertinent.

## Méthode

1. Identifier la section modifiée et ses ressources (images, vidéos, dépendances importées).
2. Vérifier chaque point ci-dessus pour ces ressources uniquement.
3. Si possible, lancer `npm run build` et observer la taille des chunks générés pour la route concernée.
4. Ne pas optimiser prématurément des sections non touchées par la tâche.

## Ce que ce skill ne fait pas

- Ne lance pas la validation types/lint/build globale → `production-qa`.
- Ne vérifie pas la config de déploiement (headers, cache) → `deployment-review`.
