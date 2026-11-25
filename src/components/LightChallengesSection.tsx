import React from "react";
import { LIGHT_CHALLENGES_BY_LOCALE } from "../data/koragrid";
import { useLocale } from "../i18n/LocaleContext";
import { COMPANY_LOGOS } from "./CompanyLogos";
import { PillarBarsIcon, PillarLayersIcon, PillarRadialIcon } from "./Icons";

const renderPillarIcon = (id: string) => {
  switch (id) {
    case "fragmented-meters":
      return <PillarRadialIcon className="h-10 w-10 text-white" />;
    case "manual-esg":
      return <PillarLayersIcon className="h-10 w-10 text-white" />;
    default:
      return <PillarBarsIcon className="h-10 w-10 text-white" />;
  }
};

export const LightChallengesSection: React.FC = () => {
  const { locale } = useLocale();
  const copy = LIGHT_CHALLENGES_BY_LOCALE[locale];

  return (
    <section
      id="desafios"
      className="border-t border-b border-[var(--border-light-subtle)] bg-[var(--bg-light-canvas)] text-[var(--text-on-light-primary)]"
    >
      <div className="border-b border-[var(--border-light-subtle)]">
        <div className="rail-container-light flex flex-col gap-5 px-5 py-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6 sm:px-10 lg:px-12">
          <p
            data-reveal
            style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
            className="max-w-[240px] text-[12px] leading-[1.45] text-[var(--text-on-light-secondary)] sm:max-w-[200px]"
          >
            {copy.stripLabel}
          </p>
          <div
            data-reveal
            style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
            className="grid grid-cols-2 items-center gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:gap-x-9 sm:gap-y-4"
          >
            {COMPANY_LOGOS.map((company) => (
              <div key={company.id} className="flex items-center justify-start sm:justify-center">
                <img
                  src={company.src}
                  alt={company.name}
                  loading="lazy"
                  decoding="async"
                  className={`${company.lightHeightClass} object-contain brightness-0 opacity-85 transition-opacity duration-150 hover:opacity-100 select-none`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rail-container-light bg-[var(--bg-light-canvas)] px-5 py-12 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <div className="max-w-[580px]">
          <h2
            data-reveal
            style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
            className="text-balance font-sans text-[30px] font-normal leading-[1.2] tracking-[-0.025em] text-[#292524] sm:text-[40px] sm:leading-[48px]"
          >
            {copy.title}
          </h2>
          <p
            data-reveal
            style={{ "--reveal-delay": "75ms" } as React.CSSProperties}
            className="mt-3.5 text-pretty text-[14px] leading-[1.6] text-[var(--text-on-light-secondary)] sm:mt-4 sm:text-[15.5px]"
          >
            {copy.subtitle}
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
          {copy.pillars.map((pillar, idx) => (
            <article
              key={pillar.id}
              data-reveal
              style={{ "--reveal-delay": `${idx * 90}ms` } as React.CSSProperties}
              className="relative flex flex-col border border-[var(--border-light-subtle)] bg-[var(--bg-light-canvas)] p-4 transition-colors duration-150 hover:border-[var(--border-light-strong)] sm:p-5"
            >
              <span aria-hidden="true" className="absolute -top-[2px] -left-[2px] h-1 w-1 bg-[#111827]" />
              <span aria-hidden="true" className="absolute -top-[2px] -right-[2px] h-1 w-1 bg-[#111827]" />
              <span aria-hidden="true" className="absolute -bottom-[2px] -left-[2px] h-1 w-1 bg-[#111827]" />
              <span aria-hidden="true" className="absolute -bottom-[2px] -right-[2px] h-1 w-1 bg-[#111827]" />

              <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#090a0a]">
                <img
                  src={pillar.image}
                  alt=""
                  aria-hidden="true"
                  width={1344}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90 select-none"
                />
                <div className="relative z-10 flex items-center justify-center">
                  {renderPillarIcon(pillar.id)}
                </div>
              </div>

              <h3 className="mt-6 text-[17px] font-semibold leading-[1.3] tracking-[-0.015em] text-[var(--text-on-light-primary)]">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.6] text-[var(--text-on-light-secondary)]">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
