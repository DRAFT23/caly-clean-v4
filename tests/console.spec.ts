import { test, expect } from "@playwright/test";

/**
 * Bruit connu et non critique du serveur de développement Next.js
 * (React DevTools, Fast Refresh, HMR, source maps) : ne doit jamais faire
 * échouer le test.
 */
const IGNORED_NEXT_DEV_PATTERNS = [
  /Download the React DevTools/i,
  /\[Fast Refresh\]/,
  /A preload for .* is found, but is not used/i,
  /webpack-hmr/i,
];

/**
 * Bruit natif du navigateur (macOS/Chromium) lié aux contrôles média
 * système (AirPlay, Picture-in-Picture) de la vidéo Hero en autoplay :
 * n'a aucun rapport avec le JavaScript de l'application.
 */
const IGNORED_BROWSER_CHROME_PATTERNS = [/Button failed to load, iconName = .*-placard/i];

const IGNORED_CONSOLE_PATTERNS = [
  ...IGNORED_NEXT_DEV_PATTERNS,
  ...IGNORED_BROWSER_CHROME_PATTERNS,
];

const IGNORED_REQUEST_PATTERNS = [/\/favicon\.ico(\?.*)?$/, /\.map(\?.*)?$/];

const pages = ["/fr", "/en"];

for (const path of pages) {
  test(`aucune erreur console ni requête critique échouée sur ${path}`, async ({
    page,
  }, testInfo) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() !== "error") return;
      const text = msg.text();
      if (IGNORED_CONSOLE_PATTERNS.some((pattern) => pattern.test(text))) return;
      consoleErrors.push(text);
    });

    page.on("pageerror", (error) => {
      consoleErrors.push(`Uncaught exception: ${error.message}`);
    });

    page.on("requestfailed", (request) => {
      const url = request.url();
      const errorText = request.failure()?.errorText;

      // Chromium annule volontairement la requête initiale d'un <video>
      // en autoplay/loop pour la relancer en requêtes par plages (Range)
      // pendant la mise en mémoire tampon : comportement navigateur
      // normal, pas une vraie panne réseau ni un bug applicatif.
      const isAbortedMediaBuffering =
        errorText === "net::ERR_ABORTED" && request.resourceType() === "media";
      if (isAbortedMediaBuffering) return;

      if (IGNORED_REQUEST_PATTERNS.some((pattern) => pattern.test(url))) return;
      failedRequests.push(`${errorText ?? "échec réseau"} — ${url}`);
    });

    page.on("response", (response) => {
      if (response.status() < 400) return;
      const url = response.url();
      if (IGNORED_REQUEST_PATTERNS.some((pattern) => pattern.test(url))) return;
      failedRequests.push(`HTTP ${response.status()} — ${url}`);
    });

    await page.goto(path, { waitUntil: "load" });
    // Laisse le temps aux erreurs asynchrones (hydratation, effets) de remonter.
    await page.waitForTimeout(1000);

    if (consoleErrors.length > 0) {
      await testInfo.attach("console-errors.txt", { body: consoleErrors.join("\n") });
    }
    if (failedRequests.length > 0) {
      await testInfo.attach("failed-requests.txt", { body: failedRequests.join("\n") });
    }

    expect(consoleErrors, "Erreurs console inattendues détectées").toEqual([]);
    expect(failedRequests, "Requêtes critiques échouées détectées").toEqual([]);
  });
}
