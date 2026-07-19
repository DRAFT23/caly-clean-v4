# Caly Nails — site vitrine

Site vitrine du salon Caly Nails (Genève), construit avec Next.js (App Router), React 19 et Tailwind CSS v4.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

- `app/fr/` — layout + page racine, servis sur `/` (français, langue par défaut)
- `app/en/` — layout + page, servis sur `/en` (anglais)
- `middleware.ts` — réécrit discrètement `/` vers `/fr` en interne (l'URL affichée reste `/`)
- `app/components/` — composants partagés par les deux langues, chacun reçoit le texte via une prop `dict`
  - `Reveal.tsx` — animation d'apparition au scroll (fondu + léger déplacement vertical), réutilisée par les sections Galerie, Prestations, Univers, Avis, Réservation. Visible par défaut sans JavaScript, respecte `prefers-reduced-motion`.
  - `StickyBookingBar.tsx` — barre de réservation persistante, mobile uniquement, masquée pendant le Hero et le Footer. Le CTA de la navbar reste le point de repli fonctionnel sans JavaScript.
- `app/lib/dictionaries/` et `en.ts` — tout le texte du site, dans les deux langues
- `app/lib/constants.ts` — URLs et coordonnées du salon (à modifier ici, pas dans les composants)
- `app/lib/seo.ts` — génère les métadonnées et le schema.org, partagé par les deux layouts
- `public/` — images (`.webp`) et vidéo (`.mp4`) optimisées — **non incluses dans cette livraison V4, voir `public/LISEZ-MOI.txt`**

Pour ajouter/corriger du texte, modifier les fichiers dans `app/lib/dictionaries/`, jamais directement dans les composants.

## À vérifier avant mise en production

- `app/lib/constants.ts` : `SITE_URL` est un placeholder (`https://caly-nails.ch`) — à remplacer par le vrai domaine une fois acheté. Tant que ce domaine n'est pas actif, le canonical, l'Open Graph et le sitemap pointent vers une adresse qui ne résout pas encore.
- `app/[fr|en]/layout.tsx` : les horaires du schema.org (`openingHoursSpecification`, dans `app/lib/seo.ts`) sont une estimation à corriger avec les vraies horaires du salon.
- Une image Open Graph dédiée (1200×630) donnerait un meilleur rendu au partage que le recadrage automatique du portrait hero.
- `StickyBookingBar.tsx` : le comportement `env(safe-area-inset-bottom)` et le rendu Safari iOS (repli/déploiement de la barre d'outils) nécessitent une vérification sur appareil réel, non effectuée dans le cadre de ce travail.

## Déploiement

Déployable tel quel sur [Vercel](https://vercel.com/new).

## Journal des évolutions (V4)

Cette V4 intègre, par rapport à la version de référence du dépôt :

1. Contraste WCAG AA du CTA principal et de l'onglet actif des prestations (nouvelle teinte `#617261` / hover `#566b59`, texte blanc).
2. Contraste WCAG AA des libellés "eyebrow" (Galerie, Prestations, Avis) — `#566b59`.
3. Animation d'apparition au scroll (`Reveal.tsx`) sur les blocs d'introduction de Galerie, Prestations, Univers, Avis, Réservation. Footer volontairement statique.
4. Barre de réservation sticky mobile (`StickyBookingBar.tsx`), avec repli fonctionnel sans JavaScript via le CTA navbar existant.
5. `viewport-fit=cover` ajouté aux deux layouts, nécessaire au bon fonctionnement de la barre sticky sur iOS.

Voir les commentaires en tête de `StickyBookingBar.tsx` pour le détail des décisions techniques figées sur ce composant.
