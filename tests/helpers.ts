import { expect, type Page } from "@playwright/test";

/**
 * Contrôles structurels communs à une page d'accueil localisée :
 * chargement, h1 unique, landmarks principaux, liens visibles valides.
 */
export async function expectHomePageStructure(page: Page) {
  await expect(page).toHaveTitle(/.+/);

  await expect(page.locator("h1")).toHaveCount(1);

  const main = page.getByRole("main");
  await expect(main).toBeVisible();

  const nav = page.getByRole("navigation");
  await expect(nav).toBeVisible();

  // `footer` est imbriqué dans `main` : il perd son rôle ARIA implicite
  // "contentinfo" (HTML-AAM), on cible donc le landmark par son tag.
  const footer = page.locator("footer");
  await expect(footer).toBeVisible();

  const visibleLinks = page.locator("a:visible");
  const linkCount = await visibleLinks.count();
  expect(linkCount).toBeGreaterThan(0);

  for (let i = 0; i < linkCount; i++) {
    await expect(visibleLinks.nth(i)).toHaveAttribute("href", /.+/);
  }
}
