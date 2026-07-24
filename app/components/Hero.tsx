import HeroVideo from "./HeroVideo";
import { SALONKEE_URL, WHATSAPP_URL, INSTAGRAM_URL } from "../lib/constants";
import type { Dictionary } from "../lib/dictionaries/fr";

const buttonClass =
  "rounded-full bg-[#617261] px-8 py-4 text-center text-sm font-semibold text-white outline-none transition hover:bg-[#566b59] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#566b59]";

const mobileButtonClass =
  "rounded-full border border-white/20 bg-white/10 px-6 py-4 text-center text-sm font-semibold text-white backdrop-blur-md outline-none transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b9975b]";

export default function Hero({ dict }: { dict: Dictionary }) {
  const t = dict.hero;

  return (
    <section className="relative overflow-hidden bg-[#f8f4ef]">
      {/*
        Un seul <h1> pour toute la page, commun aux deux mises en page
        (mobile et desktop) et cible d'accessibilité/SEO. Visuellement
        invisible (sr-only) : le rendu "Caly Nails" en grand que l'on voit
        dans chaque bloc ci-dessous n'est plus qu'une reprise décorative
        (aria-hidden), plus un second <h1>.
      */}
      <h1 className="sr-only">{t.a11yTitle}</h1>

      <div
        data-scroll-boundary="hero-end"
        className="relative grid min-h-dvh bg-[#2a2320] md:min-h-[calc(100dvh-7rem)] md:mx-auto md:max-w-7xl md:items-center md:gap-16 md:bg-[#f8f4ef] md:px-6 md:pt-28 lg:grid-cols-[0.85fr_1.15fr]"
      >
        {/* Halo décoratif desktop, positionné dans l'angle du bloc */}
        <div className="pointer-events-none absolute left-[-140px] top-20 hidden h-[420px] w-[420px] rounded-full bg-[#6f836f]/12 blur-3xl md:block" />

        {/*
          MOBILE : contenu superposé à la vidéo. Le contenu précède la vidéo
          dans le DOM (avant le bloc vidéo ci-dessous) pour que l'ordre de
          lecture au lecteur d'écran corresponde à l'ordre visuel sur
          tablette/desktop (texte avant vidéo) ; sur mobile, la superposition
          visuelle reste garantie par `z-10`, indépendamment de l'ordre DOM.
        */}
        <div className="relative z-10 flex min-h-dvh flex-col justify-end px-6 pb-10 pt-28 text-white [grid-area:1/1] md:hidden">
          <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-white/70">
            {t.badge}
          </p>

          <p
            aria-hidden="true"
            className="font-serif text-[72px] leading-[0.82] tracking-tight"
          >
            Caly
            <br />
            Nails
          </p>

          <p className="mt-6 text-lg leading-8 text-white/80">
            {t.tagline[0]}
            <br />
            {t.tagline[1]}
            <br />
            {t.tagline[2]}
          </p>

          <div className="mt-6 inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/15 px-5 py-3 backdrop-blur-md">
            <span className="text-[#b9975b]" aria-hidden="true">
              ★★★★★
            </span>
            <span className="text-sm font-medium text-white">
              {t.ratingMobile}
            </span>
          </div>

          <div className="mt-8 grid gap-3">
            <a
              href={SALONKEE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={mobileButtonClass}
            >
              {t.book}
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={mobileButtonClass}
              >
                {t.whatsapp}
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={mobileButtonClass}
              >
                {t.instagram}
              </a>
            </div>
          </div>
        </div>

        {/* DESKTOP : contenu à côté de la vidéo */}
        <div className="hidden [grid-area:1/1] md:block">
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#566b59]">
            {t.badge}
          </p>

          <p
            aria-hidden="true"
            className="font-serif text-9xl leading-[0.82] tracking-tight text-[#2a2320]"
          >
            Caly
            <br />
            Nails
          </p>

          <p className="mt-8 max-w-xl text-xl leading-relaxed text-[#2a2320]/70">
            {t.tagline[0]}
            <br />
            {t.tagline[1]}
            <br />
            {t.tagline[2]}
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#dcc8b5] bg-white/80 px-5 py-3 shadow-sm">
            <span className="text-[#b9975b]" aria-hidden="true">
              ★★★★★
            </span>
            <span className="text-sm font-medium text-[#2a2320]">
              {t.ratingDesktop}
            </span>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <a
              href={SALONKEE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass}
            >
              {t.book}
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass}
            >
              {t.whatsapp}
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass}
            >
              {t.instagram}
            </a>
          </div>
        </div>

        {/*
          Vidéo : une seule instance de <HeroVideo/>, repositionnée en CSS
          selon le breakpoint (fond plein écran mobile → carte arrondie
          desktop) au lieu d'en monter une deuxième copie. Placée après les
          deux blocs de contenu dans le DOM pour que l'ordre de lecture au
          lecteur d'écran suive l'ordre visuel (texte avant vidéo).
        */}
        <div className="relative min-h-dvh [grid-area:1/1] md:min-h-0 md:[grid-area:2/1] lg:[grid-area:1/2]">
          {/* Cadre + halo décoratifs autour de la carte, desktop uniquement */}
          <div className="pointer-events-none absolute -inset-5 hidden rounded-[52px] border border-[#dcc8b5]/50 md:block" />
          <div className="pointer-events-none absolute -bottom-10 left-10 hidden h-44 w-44 rounded-full bg-[#6f836f]/18 blur-3xl md:block" />

          <div className="absolute inset-0 overflow-hidden md:relative md:inset-auto md:h-[760px] md:rounded-[46px] md:shadow-[0_40px_120px_rgba(40,30,20,0.18)]">
            <HeroVideo />

            {/* Dégradé pour garder le texte lisible sur la vidéo, mobile uniquement */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20 md:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
