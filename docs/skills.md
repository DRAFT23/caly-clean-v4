# Skills

Expertise réutilisable versionnée dans `.claude/skills/`, invoquée automatiquement par Claude Code selon le contexte de la demande. Aucun skill ne commit, ne push ni ne déploie de lui-même — ils analysent et proposent, l'utilisateur décide.

Audit (2026-07-22) : les 10 skills ont un frontmatter valide (`name` + `description` avec déclencheurs explicites), une responsabilité distincte et documentée ("Ce que ce skill ne fait pas"), sans chevauchement à fusionner.

| Skill | Rôle |
|---|---|
| `bug-root-cause` | Diagnostique un bug (cause réelle avant correction), formalise la section "Méthode" de `CLAUDE.md`. |
| `production-qa` | Gate qualité local : `tsc`, lint, build, Playwright. |
| `deployment-review` | Vérifie ce qui n'est visible qu'au déploiement (env, `next.config`, i18n, CI, SEO). |
| `design-system-guardian` | Vérifie la cohérence avec les tokens Tailwind existants. |
| `visual-polish` | Finition esthétique finale (hiérarchie, spacing, typographie, niveau Apple/Stripe/Linear). |
| `accessibility-review` | Audit WCAG (contraste, sémantique, clavier, ARIA). |
| `responsive-qa` | Vérifie le comportement responsive (CSS/Tailwind, breakpoints). |
| `playwright-visual-review` | Captures Playwright et diff visuel avant/après ou cross-browser. |
| `performance-audit` | Core Web Vitals, poids images/vidéos/bundle. |
| `git-workflow` | Conventions de commit et de branches de ce dépôt. |

## Ajouter un skill

Un nouveau skill ne doit être créé que s'il couvre une responsabilité qu'aucun skill existant ne couvre déjà. Mettre à jour ce tableau à chaque ajout ou suppression.
