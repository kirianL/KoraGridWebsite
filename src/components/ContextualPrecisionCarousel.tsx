import React, { useState } from "react";
import { CONTEXTUAL_CASES } from "../data/koragrid";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

interface ContextualPrecisionCarouselProps {
  onOpenDemo: () => void;
}

export const ContextualPrecisionCarousel: React.FC<ContextualPrecisionCarouselProps> = ({
  onOpenDemo,
}) => {
  const [index, setIndex] = useState(0);
  const current = CONTEXTUAL_CASES[index];

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + CONTEXTUAL_CASES.length) % CONTEXTUAL_CASES.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % CONTEXTUAL_CASES.length);
  };

  return (
    <section id="industrias" className="bg-[var(--bg-canvas)]">
      <div className="rail-container bg-[var(--bg-surface-primary)] px-5 py-12 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        {/* Header Row: On mobile CTA + arrows share one clean horizontal row; desktop keeps exact layout */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <h2 className="max-w-[440px] text-[28px] font-normal leading-[1.15] tracking-[-0.025em] text-[var(--text-primary)] sm:text-[38px]">
              Precisión operativa para cada industria
            </h2>
            <button
              type="button"
              onClick={onOpenDemo}
              className="mt-5 hidden rounded-[6px] bg-[#ffffff] px-5 py-2 text-[13px] font-semibold text-[#0d0e0e] transition-colors duration-150 hover:bg-[#e5e7eb] sm:inline-block cursor-pointer"
            >
              Explorar casos
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <button
              type="button"
              onClick={onOpenDemo}
              className="rounded-[6px] bg-[#ffffff] px-4 py-2 text-[12.5px] font-semibold text-[#0d0e0e] transition-colors duration-150 hover:bg-[#e5e7eb] sm:hidden cursor-pointer"
            >
              Explorar casos
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Industria anterior"
                className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[var(--border-subtle)] bg-[#232625] text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--border-strong)] hover:bg-[#2c302e] cursor-pointer"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Siguiente industria"
                className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-[#ffffff] text-[#0d0e0e] transition-colors duration-150 hover:bg-[#e5e7eb] cursor-pointer"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Slide Content */}
        <div aria-live="polite" className="mt-8 sm:mt-10">
          <span className="font-mono-tech text-[11px] text-[var(--text-muted)]">
            {current.index}
          </span>

          <p className="mt-3 max-w-[920px] text-[23px] font-normal leading-[1.28] tracking-[-0.02em] text-[#6f7472] sm:mt-4 sm:text-[40px] sm:leading-[1.22]">
            <span className="text-[#4ade80]">{current.highlighted}</span> {current.rest}
          </p>
        </div>
      </div>
    </section>
  );
};
