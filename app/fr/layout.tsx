import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import type { Viewport } from "next";
import "../globals.css";
import fr from "../lib/dictionaries/fr";
import { buildMetadata, buildJsonLd } from "../lib/seo";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

export const metadata = buildMetadata(fr, "/");

// viewport-fit=cover est nécessaire pour que env(safe-area-inset-bottom)
// (utilisé par StickyBookingBar sur mobile) renvoie une valeur non nulle
// sur iOS. Sans cette déclaration, le padding de sécurité serait toujours 0.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function FrLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = buildJsonLd(fr);

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
