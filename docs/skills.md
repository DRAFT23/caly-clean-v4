# Skills

Ces 20 skills sont désormais hérités du scope global Claude Code (`~/.claude/skills/`), partagés entre projets, et ne sont plus versionnés dans ce dépôt. Ils restent invoqués automatiquement par Claude Code selon le contexte de la demande. Aucun skill ne commit, ne push ni ne déploie de lui-même — ils analysent et proposent, l'utilisateur décide.

Audit (2026-07-22) : les 10 premiers skills ont un frontmatter valide (`name` + `description` avec déclencheurs explicites), une responsabilité distincte et documentée ("Ce que ce skill ne fait pas"), sans chevauchement à fusionner.

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
| `architecture-review` | Vérifie la cohérence architecturale avant une évolution importante (séparation des responsabilités, design patterns, dette technique). |
| `secure-coding` | Bonnes pratiques de code sécurisé (OWASP Top 10, validation des entrées, authentification, gestion des secrets dans le code). |
| `dependency-audit` | Triage des vulnérabilités de dépendances (CVE, Dependabot, `npm audit`) et évaluation d'une mise à jour majeure. |
| `platform-security` | Sécurité de la configuration plateforme (GitHub/Vercel) : secrets d'environnement, permissions, branch protection, secret scanning. |
| `release-management` | Versioning sémantique, changelog, stratégie de rollback simple. |
| `seo-audit` | SEO technique : meta tags, schema.org, sitemap/robots.txt, Open Graph, hiérarchie de titres. |
| `content-copywriting` | Qualité éditoriale d'un contenu : ton, clarté, structure, efficacité des CTA. |
| `project-bootstrap` | Checklist de démarrage d'un nouveau projet : CI, branch protection, déploiement, `dependabot.yml`, structure `docs/`. |
| `brand-identity-setup` | Définit l'identité visuelle de départ (palette, échelle typographique, tokens) avant que `design-system-guardian` la fasse respecter dans la durée. |
| `motion-design` | Conception d'animations : timing, easing, performance (transform/opacity), `prefers-reduced-motion`. |

## Ajouter un skill

Un nouveau skill ne doit être créé que s'il couvre une responsabilité qu'aucun skill existant ne couvre déjà. Mettre à jour ce tableau à chaque ajout ou suppression.

## Agents

Ces 5 agents sont eux aussi hérités du scope global Claude Code (`~/.claude/agents/`). Contrairement aux skills (invoqués automatiquement selon le contexte), un agent est lancé explicitement pour une revue ciblée et retourne un rapport. Aucun n'écrit de code, ne commit, ne push ni ne déploie — à l'exception de `project-bootstrap`, seul agent autorisé à créer/écrire des fichiers, qui ne commit ni ne push jamais non plus.

| Agent | Déclencheur | Mission |
|---|---|---|
| `qa-release` | Avant d'ouvrir une pull request vers la branche de production, ou avant un déploiement. | Fait passer le gate qualité local et la revue de déploiement, valide le rendu cross-browser. |
| `tech-reviewer` | Avant une pull request, ou pour challenger une implémentation. | Revoit la cohérence technique : code, design system, accessibilité, performance. |
| `security-auditor` | Avant un merge vers la branche de production. | Audite la sécurité de bout en bout : code applicatif, dépendances, configuration plateforme. |
| `seo-content-reviewer` | Avant publication de contenu. | Vérifie le SEO technique et la qualité éditoriale : meta tags, schema.org, sitemap/robots, ton, efficacité des CTA. |
| `project-bootstrap` | À la création d'un nouveau projet. | Initialise CI, branch protection, connexion à la plateforme de déploiement, `dependabot.yml`, structure `docs/` et identité visuelle de départ. |
