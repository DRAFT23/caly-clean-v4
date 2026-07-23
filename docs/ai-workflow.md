# AI Workflow

Répartition des rôles pour ce projet :

| Rôle | Responsabilité |
|---|---|
| Utilisateur | Product Owner, décideur final |
| ChatGPT | CTO / architecte principal |
| Claude AI (web) | Challenger, second avis |
| Claude Code | Ingénieur d'implémentation |
| Skills (`.claude/skills/`) | Expertise réutilisable, invoquée automatiquement selon le contexte — voir [skills.md](skills.md) |
| Agents | Orchestrateurs spécialisés, utilisés seulement quand ils apportent une valeur réelle |
| MCP | Outils et connexions externes |
| Playwright | Validation fonctionnelle et visuelle |
| GitHub Actions | Gate automatisé (lint, types, build, tests) |
| Vercel | Preview et Production |

## Cycle

1. Demande produit (utilisateur).
2. Proposition d'architecture (ChatGPT).
3. Revue / challenge (Claude AI web).
4. Décision (utilisateur).
5. Implémentation (Claude Code, guidé par `CLAUDE.md` et les Skills).
6. Tests locaux (`tsc`, lint, build, Playwright).
7. Pull request vers `main`.
8. CI (`Quality Gate`, CodeQL).
9. Revue.
10. Fusion (décision utilisateur/administrateur).
11. Déploiement (Vercel, automatique sur `main`).
12. Vérification post-déploiement.

Claude Code n'exécute jamais de commit, push ou déploiement sans qu'ils soient explicitement demandés, et ne fusionne jamais dans `main` de sa propre initiative.
