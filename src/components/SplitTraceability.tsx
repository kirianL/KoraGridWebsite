import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TRACEABILITY_BY_LOCALE } from "../data/koragrid";
import { useLocale } from "../i18n/LocaleContext";
import { PulseWaveIcon } from "./Icons";

interface SplitTraceabilityProps {
  onOpenDemo: () => void;
}

export const SplitTraceability: React.FC<SplitTraceabilityProps> = ({ onOpenDemo }) => {
  const { locale } = useLocale();
  const copy = TRACEABILITY_BY_LOCALE[locale];
  const [activeStep, setActiveStep] = useState(0);
  const current = copy.steps[activeStep] ?? copy.steps[0];

  return (
    <section id="trazabilidad" className="bg-[var(--bg-canvas)]">
      <div className="rail-container grid grid-cols-1 bg-[var(--bg-surface-primary)] lg:grid-cols-12">
        <div className="flex flex-col justify-start border-b border-[var(--border-subtle)] px-5 py-10 sm:p-10 lg:col-span-5 lg:border-r lg:border-b-0 lg:p-12">
          <h2
            data-reveal
            style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
            className="font-sans text-[30px] font-normal leading-[1.2] tracking-[-0.025em] text-[var(--text-primary)] sm:text-[40px] sm:leading-[48px]"
          >
            {copy.title}
          </h2>

          <p
            data-reveal
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            className="mt-5 text-[17px] font-normal leading-[1.52] tracking-[-0.01em] sm:mt-7 sm:text-[21px] sm:leading-[1.48]"
          >
            {copy.steps.map((step, idx) => {
              const isSelected = idx === activeStep;
              return (
                <React.Fragment key={step.id}>
                  <button
                    type="button"
                    aria-current={isSelected ? "step" : undefined}
                    onClick={() => setActiveStep(idx)}
                    className={`inline text-left transition-colors duration-150 cursor-pointer ${
                      isSelected
                        ? "text-[#ffffff]"
                        : "text-[#6c706e] hover:text-[#9ca3af]"
                    }`}
                  >
                    <span>{step.beforeBadge}</span>{" "}
                    <span
                      className={`mx-0.5 inline-flex h-[18px] w-[18px] -translate-y-[1px] items-center justify-center rounded-[3px] border font-mono-tech text-[10.5px] align-middle sm:h-[19px] sm:w-[19px] sm:text-[11px] ${
                        isSelected
                          ? "border-[#60a5fa]/70 bg-[#3b82f6]/20 text-[#bfdbfe]"
                          : "border-white/12 bg-white/[0.06] text-[#8a8f8d]"
                      }`}
                    >
                      {step.id}
                    </span>{" "}
                    <span>{step.afterBadge}</span>
                  </button>{" "}
                </React.Fragment>
              );
            })}
          </p>
        </div>

        <div
          data-reveal
          style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
          className="relative flex min-h-[340px] flex-col justify-between overflow-hidden p-5 sm:min-h-[480px] sm:p-8 lg:col-span-7 lg:min-h-[560px]"
        >
          <img
            src="/images/split-emerald-field.webp"
            alt={copy.imageAlt}
            width={1024}
            height={1024}
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
          />

          <div className="relative z-10 m-auto flex min-h-[140px] max-w-[460px] items-center justify-center px-2 text-center sm:px-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={`${locale}-${current.id}`}
                initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="text-[19px] font-normal leading-[1.45] tracking-[-0.01em] text-[#071636] sm:text-[22px]"
              >
                <span className="mr-2 inline-block rounded-[4px] bg-white/80 px-2 py-0.5 font-medium text-[#08193d] backdrop-blur-sm">
                  [{current.tag}]
                </span>
                {current.cardText}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <button
              type="button"
              onClick={onOpenDemo}
              className="rounded-[6px] bg-[#ffffff] px-4 py-1.5 text-[12px] font-semibold text-[#111111] shadow-sm transition-colors duration-150 hover:bg-[#e5e7eb] cursor-pointer"
            >
              {copy.cta}
            </button>

            <button
              type="button"
              aria-label={copy.nextAria}
              onClick={() =>
                setActiveStep((prev) => (prev + 1) % copy.steps.length)
              }
              className="inline-flex h-9 w-9 items-center justify-center rounded-[6px] bg-black/30 text-white backdrop-blur-sm transition-colors duration-150 hover:bg-black/45 cursor-pointer"
            >
              <PulseWaveIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
