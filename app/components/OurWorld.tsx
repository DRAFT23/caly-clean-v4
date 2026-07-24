import Image from "next/image";
import Reveal from "./Reveal";
import type { Dictionary } from "../lib/dictionaries/fr";

export default function OurWorld({ dict }: { dict: Dictionary }) {
  const t = dict.ourWorld;

  const images = {
    main: { src: "/atelier-poste.webp", alt: t.images.main },
    secondary: [
      { src: "/hygiene.webp", alt: t.images.hygiene },
      { src: "/produits-vernis.webp", alt: t.images.products },
    ],
  };

  const allImages = [images.main, ...images.secondary];

  return (
    <section id="world" className="bg-[#f8f4ef] px-6 py-16 md:py-32">
      <div className="mx-auto max-w-7xl rounded-[34px] bg-[#566b59] p-5 text-white md:rounded-[56px] md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          {/* Photos — mobile : carrousel horizontal tactile */}
          <div
            role="group"
            aria-label={t.title}
            className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-5 px-5 pb-1 md:hidden"
          >
            {allImages.map((image) => (
              <div
                key={image.src}
                className="relative h-[390px] w-[82%] shrink-0 snap-start overflow-hidden rounded-[30px] shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="82vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Photos — desktop : grille existante inchangée */}
          <div className="hidden md:grid md:grid-cols-[1.35fr_0.65fr] md:gap-4">
            <div className="group relative h-[660px] overflow-hidden rounded-[42px] shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
              <Image
                src={images.main.src}
                alt={images.main.alt}
                fill
                sizes="45vw"
                loading="lazy"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>

            <div className="grid gap-4">
              {images.secondary.map((image) => (
                <div
                  key={image.src}
                  className="group relative h-[322px] overflow-hidden rounded-[34px] shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="25vw"
                    loading="lazy"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Texte */}
          <Reveal>
            <div className="px-1 py-4 md:px-8 md:py-0">
              <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-white/85 md:text-xs">
                {t.eyebrow}
              </p>

              <h2 className="font-serif text-4xl leading-tight md:text-6xl">
                {t.title}
              </h2>

              <p className="mt-6 text-base leading-7 text-white/85 md:text-lg md:leading-8">
                {t.paragraph}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {t.values.map((value) => (
                  <div
                    key={value}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-3 text-center text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/15 md:text-sm"
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
