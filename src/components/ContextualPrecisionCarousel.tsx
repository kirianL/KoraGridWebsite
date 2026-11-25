import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CONTEXTUAL_CASES_BY_LOCALE } from "../data/koragrid";
import { useLocale } from "../i18n/LocaleContext";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

interface ContextualPrecisionCarouselProps {
  onOpenDemo: () => void;
}

export const ContextualPrecisionCarousel: React.FC<ContextualPrecisionCarouselProps> = ({
  onOpenDemo,
}) => {
  const { locale } = useLocale();
  const copy = CONTEXTUAL_CASES_BY_LOCALE[locale];
  const [index, setIndex] = useState(0);
  const current = copy.cases[index] ?? copy.cases[0];

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + copy.cases.length) % copy.cases.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % copy.cases.length);
  };

  return (
    <section id="industrias" className="bg-[var(--bg-canvas)]">
      <div className="rail-container bg-[var(--bg-surface-primary)] px-5 py-12 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div data-reveal style={{ "--reveal-delay": "0ms" } as React.CSSProperties}>
            <h2 className="max-w-[440px] text-balance font-sans text-[30px] font-normal leading-[1.2] tracking-[-0.025em] text-[var(--text-primary)] sm:text-[40px] sm:leading-[48px]">
              {copy.heading}
            </h2>
            <button
              type="button"
              onClick={onOpenDemo}
              className="mt-5 hidden rounded-[6px] bg-[#ffffff] px-5 py-2 text-[13px] font-semibold text-[#0d0e0e] transition-colors duration-150 hover:bg-[#e5e7eb] sm:inline-block cursor-pointer"
            >
              {copy.cta}
            </button>
          </div>

          <div
            data-reveal
            style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
            className="flex items-center justify-between gap-3 sm:justify-end"
          >
            <button
              type="button"
              onClick={onOpenDemo}
              className="rounded-[6px] bg-[#ffffff] px-4 py-2 text-[12.5px] font-semibold text-[#0d0e0e] transition-colors duration-150 hover:bg-[#e5e7eb] sm:hidden cursor-pointer"
            >
              {copy.cta}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label={copy.prevAria}
                className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[var(--border-subtle)] bg-[#232625] text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--border-strong)] hover:bg-[#2c302e] cursor-pointer"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label={copy.nextAria}
                className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-[#ffffff] text-[#0d0e0e] transition-colors duration-150 hover:bg-[#e5e7eb] cursor-pointer"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          aria-live="polite"
          data-reveal
          style={{ "--reveal-delay": "130ms" } as React.CSSProperties}
          className="mt-8 grid sm:mt-10"
        >
          {/* Invisible sizer stack locks container height to the tallest slide across all viewports */}
          {copy.cases.map((c) => (
            <p
              key={`sizer-${c.index}`}
              aria-hidden="true"
              className="invisible pointer-events-none select-none col-start-1 row-start-1 max-w-[920px] text-pretty text-[23px] font-normal leading-[1.28] tracking-[-0.02em] sm:text-[40px] sm:leading-[1.22]"
            >
              <span>{c.highlighted}</span> {c.rest}
            </p>
          ))}

          <AnimatePresence mode="wait">
            <motion.div
              key={`${locale}-${current.index}`}
              initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="col-start-1 row-start-1"
            >
              <p className="max-w-[920px] text-pretty text-[23px] font-normal leading-[1.28] tracking-[-0.02em] text-[#6f7472] sm:text-[40px] sm:leading-[1.22]">
                <span className="text-[#60a5fa]">{current.highlighted}</span> {current.rest}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
