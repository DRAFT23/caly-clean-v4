---
name: bug-root-cause
description: Diagnostique un bug en identifiant sa cause réelle avant de proposer la correction minimale, au lieu de modifier du code au hasard. Déclencheurs — "bug", "ça ne marche pas", "erreur", "pourquoi ça casse", "corrige ce problème". Formalise la section "Méthode" de CLAUDE.md ; s'applique à tout diagnostic de dysfonctionnement, pas aux passes de qualité générales (voir production-qa) ni aux revues de design (voir visual-polish, design-system-guardian).
---

# Bug Root Cause

Méthode de diagnostic pour Caly Nails, reprenant explicitement la section "Méthode" de `CLAUDE.md`.

## Étapes obligatoires avant toute correction

1. **Reproduire** : confirmer le comportement observé (dans quel navigateur, quelle locale fr/en, quelle taille d'écran, quelle étape utilisateur).
2. **Analyser** : lire le code réellement impliqué (composant, hook, config) plutôt que supposer. Utiliser `grep`/lecture de fichiers pour localiser la source exacte, pas une recherche approximative.
3. **Identifier la cause réelle** : distinguer le symptôme (ce qui est visible) de la cause (pourquoi ça arrive). Si plusieurs hypothèses sont possibles, les vérifier une à une avant de conclure.
4. **Proposer la correction minimale** : le changement le plus petit qui adresse la cause identifiée, sans toucher à du code non lié.
5. **Vérifier** : après correction, repasser par le scénario de reproduction, puis lancer `production-qa` (tsc/lint/build/test:e2e) si le changement touche du code partagé.

## Règles

- Ne jamais modifier du code "au cas où" ou par tâtonnement sans avoir confirmé la cause.
- Si la cause n'est pas trouvée avec certitude, le dire explicitement plutôt que de proposer un correctif spéculatif présenté comme définitif.
- Ne pas profiter du bugfix pour refactorer ou nettoyer du code hors périmètre.

## Ce que ce skill ne fait pas

- Ne relance pas les commandes de build/lint/tsc de manière systématique → `production-qa` (à utiliser après la correction).
- Ne traite pas les questions de design/esthétique → `visual-polish`.
