---
name: visual-polish
description: Passe de finition esthétique finale sur une section — hiérarchie visuelle, rythme d'espacement, typographie, animations discrètes, cohérence globale, niveau Apple/Stripe/Linear/Vercel/Framer. Déclencheurs — "polish", "ça manque de finition", "rendre premium", "peaufiner", "raffiner le design". Jugement subjectif de qualité, à utiliser en dernière passe une fois la section fonctionnelle ; ne vérifie ni le responsive, ni l'accessibilité, ni la cohérence technique des tokens (voir les autres skills design).
---

# Visual Polish

Passe de finition, formalisant la section "Design" de `CLAUDE.md` — le niveau de référence est Apple/Stripe/Linear/Vercel/Framer.

## Grille de lecture

- **Hiérarchie visuelle** : l'œil sait immédiatement où regarder en premier ; un seul élément dominant par section, pas de compétition visuelle entre deux titres/CTA de même poids.
- **Espacement** : rythme cohérent (échelle Tailwind), respiration suffisante autour des blocs, pas d'éléments collés sans raison, alignement propre (grille, pas de décalages de quelques pixels).
- **Typographie** : contraste de taille/poids clair entre titres et corps de texte, line-height confortable, pas plus de 2-3 tailles différentes par section.
- **Animations** : discrètes, jamais gratuites — transition d'état (hover, apparition au scroll) plutôt que mouvement décoratif ; respect de `prefers-reduced-motion`.
- **Cohérence** : la section modifiée doit ressembler à une extension naturelle du reste du site, pas à un ajout visuellement isolé.
- **Éviter le tape-à-l'œil** : pas d'effet spectaculaire qui attire l'attention sur lui-même plutôt que sur le contenu (dégradés criards, ombres excessives, animations trop marquées).

## Méthode

1. Utiliser cette passe en dernier, une fois la fonctionnalité et le responsive validés.
2. Comparer la section au reste du site (screenshots ou navigation) pour repérer toute rupture de cohérence.
3. Proposer des ajustements ciblés (espacement, taille, poids) plutôt qu'une refonte.

## Ce que ce skill ne fait pas

- Ne vérifie pas les breakpoints/layout technique → `responsive-qa`.
- Ne vérifie pas les tokens/duplication de code → `design-system-guardian`.
- Ne vérifie pas l'accessibilité → `accessibility-review`.
