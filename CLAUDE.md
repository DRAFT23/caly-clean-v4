@AGENTS.md

# Projet

Caly Nails est un site vitrine premium développé avec Next.js, React, TypeScript et Tailwind CSS.

L'objectif est d'obtenir une qualité comparable à Apple, Stripe, Linear, Vercel et Framer.

# Méthode

Avant toute modification :

- analyser le problème
- identifier la cause réelle
- proposer la correction minimale
- ne jamais modifier du code au hasard

# Règles absolues

- Simplicité, lisibilité, maintenabilité, composants réutilisables.
- Bonnes pratiques React, Next.js, Tailwind, TypeScript.
- Ne jamais créer de dette technique.
- Travailler sur une seule section à la fois.
- Préserver les fonctionnalités existantes.
- Corriger uniquement les erreurs liées à la tâche en cours.

# Design

Toujours rechercher une hiérarchie visuelle claire, un excellent spacing, une typographie premium, un responsive irréprochable, des animations discrètes, une cohérence visuelle, une excellente accessibilité.

Éviter les effets tape-à-l'œil.

# Performance

Optimiser images, vidéos, bundle, lazy loading, Core Web Vitals.

# Règles Git

- `main` = production stable. `v5` = développement et Preview.
- Ne jamais push ni fusionner dans `main` sans demande explicite.
- Changements notables via pull request ; CI GitHub Actions obligatoire avant fusion.
- Détails → [docs/development-workflow.md](docs/development-workflow.md)

# Sécurité

- Ne jamais afficher, committer ou logger un secret.
- `.env*` et `.vercel` restent locaux, jamais versionnés.
- Détails → [docs/security.md](docs/security.md)

# Commandes de validation

Après une modification importante :

- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- `npm run test:e2e` (si la modification touche une page/route testée)

# Documentation et Skills

- Documentation détaillée → [docs/](docs/) (architecture, workflow, sécurité, déploiement, workflow IA)
- Expertise réutilisable → skills globaux Claude Code dans `~/.claude/skills/` (scope utilisateur, partagés entre tous les projets, non versionnés dans ce dépôt), index dans [docs/skills.md](docs/skills.md)
- Ce fichier reste une constitution courte et stable : les détails vivent dans `docs/` et dans les skills globaux, jamais dupliqués ici.
