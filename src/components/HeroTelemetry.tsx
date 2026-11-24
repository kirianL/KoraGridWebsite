import React, { useEffect, useState } from "react";
import { HERO_DATA, TELEMETRY_SECTORS } from "../data/koragrid";
import { HeroSpectrumSvg } from "./HeroSpectrumSvg";
import { GlobeIcon, PauseIcon, PlayIcon, SectorChipIcon } from "./Icons";

interface HeroTelemetryProps {
  onOpenDemo: () => void;
}

const TuneSparkIcon: React.FC<{ className?: string }> = ({ className = "h-3.5 w-3.5" }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M8 2.5v2M8 11.5v2M2.5 8h2M11.5 8h2M4.1 4.1l1.4 1.4M10.5 10.5l1.4 1.4M11.9 4.1l-1.4 1.4M5.5 10.5l-1.4 1.4" />
  </svg>
);

const CONSOLE_LINES: Record<string, string> = {
  "zonas-francas": "Planta Alajuela en línea: 412.8 kW sin picos de demanda.",
  hoteleria: "Complejo Guanacaste: 684.5 kW con alerta punta preventiva.",
  agroindustria: "Empacadora Zona Norte: 529.1 kW auditados bajo ISO 14064.",
};

export const HeroTelemetry: React.FC<HeroTelemetryProps> = ({ onOpenDemo }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [pulseTick, setPulseTick] = useState(0);

  const sector = TELEMETRY_SECTORS[activeIndex];

  useEffect(() => {
    if (!isSimulating) return;
    const timer = window.setInterval(() => {
      setPulseTick((prev) => (prev + 1) % 3);
    }, 950);
    return () => window.clearInterval(timer);
  }, [isSimulating]);

  const baseKw = parseFloat(sector.readingKw.replace(" kW", ""));
  const liveKw = isSimulating
    ? `${(baseKw + (pulseTick === 0 ? 1.4 : pulseTick === 1 ? -0.9 : 0.6)).toFixed(1)} kW`
    : sector.readingKw;

  const baseLine = CONSOLE_LINES[sector.id] ?? CONSOLE_LINES["zonas-francas"];
  const displayLine = isSimulating
    ? baseLine.replace(/\d+\.\d+\s*kW/, liveKw)
    : baseLine;

  return (
    <section id="plataforma" className="bg-[var(--bg-canvas)]">
      <div className="rail-container flex min-h-[calc(100lvh-56px-env(safe-area-inset-top))] flex-col justify-between bg-[var(--bg-surface-primary)] pt-10 sm:block sm:min-h-0 sm:pt-16">
        {/* Centered 2-line Hero Copy (exact reference proportions) */}
        <div className="mx-auto my-auto max-w-[660px] px-5 py-3 text-center sm:my-0 sm:px-8 sm:py-0">
          <h1 className="text-[31px] font-normal leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)] sm:text-[50px]">
            {HERO_DATA.title}
          </h1>
          <p className="mx-auto mt-3.5 max-w-[470px] text-[13.5px] leading-[1.55] text-[#8e8e93] sm:mt-4 sm:text-[14px]">
            {HERO_DATA.subtitle}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
            <button
              type="button"
              onClick={onOpenDemo}
              className="rounded-[6px] bg-[#ffffff] px-4 py-2.5 text-[12.5px] font-semibold text-[#111111] transition-colors duration-150 hover:bg-[#e5e5e5] sm:py-2 cursor-pointer"
            >
              {HERO_DATA.primaryCta}
            </button>
            <a
              href="#arquitectura"
              className="rounded-[6px] border border-white/14 bg-[#1a1a1a] px-4 py-2.5 text-[12.5px] font-medium text-[#e4e4e7] transition-colors duration-150 hover:border-white/25 hover:bg-[#242424] sm:py-2"
            >
              {HERO_DATA.secondaryCta}
            </a>
          </div>
        </div>

        {/* Frosted Smoked-Glass Console over Interlocking SVG Spectrum Bars */}
        <div className="relative mt-4 px-4 pt-2 sm:mt-12 sm:px-6 sm:pt-3">
          {/* Flush interlocking SVG spectrum bars anchored at bottom (static) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[215px] overflow-hidden sm:h-[255px]"
          >
            <HeroSpectrumSvg />
          </div>

          {/* Translucent Smoked-Glass Console Card (authentic glassmorphism matching reference) */}
          <div
            className="relative z-10 mx-auto mb-[72px] flex min-h-[156px] max-w-[650px] flex-col justify-between rounded-[8px] border border-white/[0.12] px-4 py-4 backdrop-blur-2xl sm:mb-[102px] sm:min-h-[164px] sm:px-6 sm:py-5"
            style={{
              background:
                "linear-gradient(180deg, rgba(36, 36, 38, 0.72) 0%, rgba(22, 22, 24, 0.56) 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 28px 64px rgba(0, 0, 0, 0.58)",
            }}
          >
            {/* Single clean prompt line (minimal text, identical to reference) */}
            <p className="text-[13.5px] font-normal leading-[1.5] text-[#f4f4f5]/95 tabular-nums sm:text-[14px]">
              {displayLine}
            </p>

            {/* Mobile: structured 3-col tabs + full-width bottom action row | Desktop: single horizontal row */}
            <div className="mt-5 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
              <div className="grid grid-cols-3 gap-1.5 sm:flex sm:flex-nowrap sm:items-center">
                <button
                  type="button"
                  aria-label="Cambiar escenario"
                  onClick={() => setActiveIndex((prev) => (prev + 1) % 3)}
                  className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-[6px] border border-white/12 bg-white/[0.06] text-[#d4d4d8] backdrop-blur-md transition-colors duration-150 hover:bg-white/[0.12] hover:text-white sm:flex cursor-pointer"
                >
                  <TuneSparkIcon className="h-3.5 w-3.5" />
                </button>

                {TELEMETRY_SECTORS.slice(0, 3).map((item, idx) => {
                  const isActive = idx === activeIndex;
                  const shortLabel =
                    item.id === "zonas-francas"
                      ? "Zonas francas"
                      : item.id === "hoteleria"
                        ? "Hotelería"
                        : "Agroindustria";
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveIndex(idx)}
                      className={`inline-flex h-8 items-center justify-center gap-1 whitespace-nowrap rounded-[6px] border px-2 text-[11px] font-medium backdrop-blur-md transition-colors duration-150 sm:h-7 sm:shrink-0 sm:justify-start sm:gap-1.5 sm:px-2.5 cursor-pointer ${
                        isActive
                          ? "border-white/24 bg-white/[0.14] text-white"
                          : "border-white/10 bg-white/[0.05] text-[#d4d4d8]/85 hover:bg-white/[0.1] hover:text-white"
                      }`}
                    >
                      <SectorChipIcon kind={item.id} className="hidden h-3 w-3 text-[#e4e4e7] sm:inline" />
                      <span className="truncate">{shortLabel}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-2.5 sm:shrink-0 sm:justify-end sm:border-t-0 sm:pt-0">
                <span className="inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-[6px] border border-white/10 bg-white/[0.06] px-2.5 text-[11px] text-[#e4e4e7] backdrop-blur-md">
                  <GlobeIcon className="h-3 w-3 text-[#4ade80]" />
                  <span>Costa Rica</span>
                </span>

                <button
                  type="button"
                  onClick={() => setIsSimulating((prev) => !prev)}
                  aria-label={isSimulating ? "Pausar simulación" : "Simular telemetría"}
                  className="inline-flex h-8 items-center justify-center gap-1.5 rounded-[6px] bg-[#ffffff] px-3 text-[11.5px] font-semibold text-[#111111] shadow-sm transition-colors duration-150 hover:bg-[#e5e5e5] sm:w-8 sm:px-0 cursor-pointer"
                >
                  {isSimulating ? (
                    <>
                      <PauseIcon className="h-3.5 w-3.5" />
                      <span className="sm:hidden">Pausar</span>
                    </>
                  ) : (
                    <>
                      <PlayIcon className="h-3.5 w-3.5 translate-x-[0.5px]" />
                      <span className="sm:hidden">Simular</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="h-1" />
        </div>
      </div>
    </section>
  );
};
