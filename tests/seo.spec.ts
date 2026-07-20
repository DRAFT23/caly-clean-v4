import { test, expect } from "@playwright/test";
import { SITE_URL } from "../app/lib/constants";

const pages = [
  { path: "/fr", lang: "fr", canonical: SITE_URL },
  { path: "/en", lang: "en", canonical: `${SITE_URL}/en` },
];

for (const { path, lang, canonical } of pages) {
  test.describe(`SEO ${path}`, () => {
    test(`title, meta description et lang sont corrects`, async ({ page }) => {
      await page.goto(path);

      await expect(page).toHaveTitle(/.+/);

      const description = page.locator('meta[name="description"]');
      await expect(description, "la meta description doit exister").toHaveCount(1);

      const content = await description.getAttribute("content");
      expect(
        content?.trim().length ?? 0,
        "la meta description ne doit pas être vide"
      ).toBeGreaterThan(0);

      await expect(page.locator("html")).toHaveAttribute("lang", lang);
    });

    test(`canonical est présent et cohérent`, async ({ page }) => {
      await page.goto(path);

      const canonicalLink = page.locator('link[rel="canonical"]');
      const count = await canonicalLink.count();

      expect(
        count,
        `Aucun <link rel="canonical"> trouvé sur ${path}. ` +
          `Le projet définit alternates.canonical dans app/lib/seo.ts : ` +
          `vérifier que ce champ est bien renseigné et rendu dans le <head>.`
      ).toBe(1);

      await expect(canonicalLink).toHaveAttribute("href", canonical);
    });
  });
}
