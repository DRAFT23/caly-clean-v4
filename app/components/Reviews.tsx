import Reveal from "./Reveal";
import { SALONKEE_URL, RATING } from "../lib/constants";
import type { Dictionary } from "../lib/dictionaries/fr";

export default function Reviews({ dict }: { dict: Dictionary }) {
  const t = dict.reviews;

  return (
    <section id="reviews" className="bg-[#f8f4ef] px-6 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#566b59]">
              {t.eyebrow}
            </p>

            <h2 className="font-serif text-5xl leading-tight text-[#2a2320] md:text-7xl">
              {t.title}
            </h2>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#2a2320]/65">
              {t.subtitle}
            </p>

            <div className="mx-auto mt-8 inline-flex items-center gap-4 rounded-full border border-[#dcc8b5] bg-white px-6 py-4 text-sm font-semibold text-[#2a2320] shadow-sm">
              <span className="text-[#b9975b]" aria-hidden="true">
                ★★★★★
              </span>
              {RATING.value} / 5 · {RATING.count} {t.verifiedLabel}
            </div>
          </div>
        </Reveal>

        <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {t.items.map((review) => (
            <article
              key={review.name}
              className="min-w-[82%] snap-start rounded-[32px] border border-[#dcc8b5]/70 bg-white p-8 shadow-[0_18px_50px_rgba(60,35,20,0.07)] md:min-w-0 md:snap-none md:p-10"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#566b59] font-serif text-2xl text-white">
                  {review.initial}
                </div>

                <div className="text-[#b9975b]" aria-hidden="true">
                  ★★★★★
                </div>
              </div>

              <p className="mt-8 text-lg leading-8 text-[#2a2320]/70">
                “{review.text}”
              </p>

              <div className="mt-8 border-t border-[#ead8ca] pt-6">
                <h3 className="font-serif text-3xl text-[#2a2320]">
                  {review.name}
                </h3>

                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#566b59]">
                  {t.verifiedTag}
                </p>
              </div>
            </article>
          ))}
        </div>

        <a
          href={SALONKEE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block rounded-[28px] border border-[#dcc8b5]/70 bg-white/85 px-6 py-5 text-center shadow-[0_16px_40px_rgba(60,35,20,0.06)] transition hover:border-[#6f836f] hover:bg-white outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#566b59] md:mx-auto md:max-w-md"
        >
          <span className="block font-serif text-2xl text-[#2a2320]">
            {t.ctaTitle}
          </span>
          <span className="mt-1 block text-sm font-semibold text-[#566b59]">
            {t.ctaLink}
          </span>
        </a>
      </div>
    </section>
  );
}
