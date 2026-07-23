---
name: design-system-guardian
description: Vérifie qu'un nouveau composant ou style respecte les tokens Tailwind existants (couleurs, espacements, typographie) au lieu d'introduire des valeurs arbitraires ou des styles dupliqués. Déclencheurs — "cohérence design", "design system", "token", "couleur custom", "valeur arbitraire Tailwind", "ce composant ressemble à un autre". Empêche la dérive visuelle et technique dans la durée ; ne fait pas d'audit esthétique subjectif (voir visual-polish).
---

# Design System Guardian

Garde-fou de cohérence pour le design system Tailwind CSS v4 de Caly Nails (config via `@theme` en CSS, pas de `tailwind.config.js`).

## À vérifier avant d'ajouter ou modifier un style

1. **Couleurs** : chercher si une couleur équivalente existe déjà dans le thème (`@theme` dans le CSS global) avant d'utiliser une valeur arbitraire (`bg-[#...]`). Une valeur arbitraire répétée à deux endroits doit devenir un token.
2. **Espacements** : utiliser l'échelle Tailwind (`p-4`, `gap-6`, etc.) plutôt que des valeurs arbitraires (`mt-[13px]`), sauf contrainte pixel-perfect justifiée.
3. **Typographie** : réutiliser les classes/tailles déjà définies pour les titres/paragraphes plutôt que d'en introduire une nouvelle variante proche d'une existante.
4. **Composants** : avant de créer un nouveau composant, chercher dans `app/components/` un composant similaire (bouton, carte, carrousel) à réutiliser ou étendre plutôt que dupliquer.
5. **Duplication** : si un même pattern de classes Tailwind se répète (3+ fois), proposer de le factoriser (composant ou classe utilitaire), sans sur-architecturer.

## Méthode

Avant toute modification de style, `grep` le codebase pour la valeur ou le pattern envisagé (couleur hex, taille, nom de composant) afin de confirmer qu'il n'existe pas déjà une solution équivalente. Signaler toute incohérence trouvée, mais ne corriger que ce qui est dans le périmètre de la tâche en cours (pas de refactor globals non demandé).

## Ce que ce skill ne fait pas

- Ne juge pas si le résultat est esthétiquement réussi → `visual-polish`.
- Ne vérifie pas le responsive ni l'accessibilité → `responsive-qa`, `accessibility-review`.
