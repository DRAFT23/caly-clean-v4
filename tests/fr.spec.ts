import { test } from "@playwright/test";
import { expectHomePageStructure } from "./helpers";

test.describe("Page d'accueil FR (/fr)", () => {
  test("charge et respecte la structure attendue", async ({ page }) => {
    await page.goto("/fr");
    await expectHomePageStructure(page);
  });

  test("capture full-page", async ({ page }, testInfo) => {
    await page.goto("/fr");
    await page.screenshot({
      path: testInfo.outputPath("fr-full-page.png"),
      fullPage: true,
    });
  });
});
