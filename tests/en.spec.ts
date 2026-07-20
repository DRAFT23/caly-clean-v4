import { test } from "@playwright/test";
import { expectHomePageStructure } from "./helpers";

test.describe("Page d'accueil EN (/en)", () => {
  test("charge et respecte la structure attendue", async ({ page }) => {
    await page.goto("/en");
    await expectHomePageStructure(page);
  });

  test("capture full-page", async ({ page }, testInfo) => {
    await page.goto("/en");
    await page.screenshot({
      path: testInfo.outputPath("en-full-page.png"),
      fullPage: true,
    });
  });
});
