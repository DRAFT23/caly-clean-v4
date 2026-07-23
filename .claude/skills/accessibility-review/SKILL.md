---
name: accessibility-review
description: Audite l'accessibilité (WCAG) d'une section modifiée — contraste, sémantique HTML, ARIA, navigation clavier, focus, alt text, reduced motion. Déclencheurs — "accessibilité", "a11y", "contraste", "clavier", "lecteur d'écran", "aria", "focus visible". Complémentaire à design-system-guardian (cohérence visuelle) et visual-polish (finition esthétique) : ce skill vérifie l'accès pour tous les utilisateurs, pas le rendu.
---

# Accessibility Review

Checklist WCAG appliquée aux composants React/Next.js de Caly Nails.

## Checklist

- **Contraste** : texte sur fond respecte au minimum WCAG AA (4.5:1 texte normal, 3:1 grand texte/UI). Vérifier particulièrement les textes sur images/vidéos (hero, overlays).
- **Sémantique HTML** : utiliser les balises natives (`button`, `nav`, `header`, `main`, `h1`-`h6` dans l'ordre) plutôt que des `div` cliquables.
- **Focus clavier** : chaque élément interactif est atteignable au clavier (Tab) et possède un état focus visible (ne jamais faire `outline-none` sans remplacement).
- **ARIA** : n'ajouter des attributs ARIA que si la sémantique HTML ne suffit pas ; `aria-label` sur les boutons icône seuls, `aria-expanded` sur les menus/accordéons.
- **Images/vidéos** : `alt` descriptif sur les images informatives, `alt=""` sur les décoratives ; vidéos en autoplay muettes et avec un moyen de les stopper si longues.
- **Formulaires** : chaque champ a un `label` associé (pas juste un placeholder).
- **Mouvement** : respecter `prefers-reduced-motion` pour les animations/carrousels (cohérent avec la section "Design > animations discrètes" du projet).
- **Navigation mobile** : menu accessible au clavier et au lecteur d'écran, pas seulement au tactile.

## Méthode

1. Identifier la section modifiée et lister ses éléments interactifs.
2. Vérifier chaque point de la checklist ci-dessus pour cette section uniquement.
3. Tester la navigation au clavier (Tab/Shift+Tab/Enter/Espace) sur le composant.
4. Ne corriger que les manquements liés à la tâche en cours.

## Ce que ce skill ne fait pas

- Ne vérifie pas le layout responsive → `responsive-qa`.
- Ne juge pas l'esthétique → `visual-polish`.
