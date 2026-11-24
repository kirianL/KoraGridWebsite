import React, { useState } from "react";
import { PauseIcon, PlayIcon } from "./Icons";

export const ComparisonGradientSection: React.FC = () => {
  const [activeSide, setActiveSide] = useState<"manual" | "live">("live");

  return (
    <section id="comparativa" className="bg-[var(--bg-canvas)]">
      <div className="rail-container bg-[var(--bg-surface-primary)] pt-16 sm:pt-20">
        {/* Centered 2-line Heading + Subtitle */}
        <div className="mx-auto max-w-[520px] px-4 text-center sm:px-8">
          <h2 className="text-[32px] font-normal leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)] sm:text-[42px]">
            Diseñado para plantas con telemetría en vivo
          </h2>
          <p className="mx-auto mt-3 max-w-[400px] text-[13px] leading-[1.55] text-[#8e8e93] sm:text-[13.5px]">
            Evidencias verificables en planta: capture lecturas de medidores, picos horarios e inventarios de carbono en cada ciclo.
          </p>
        </div>

        {/* Flush Dual Fluted-Glass Gradient Panels (minimal copy, pure fluted-glass art direction) */}
        <div className="relative mt-11 grid grid-cols-1 border-t border-white/10 md:grid-cols-2">
          <svg className="hidden" aria-hidden="true">
            <filter id="kg-fluted-grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </svg>

          {/* Left Panel: Fluted Warm Amber / Luminous Gold Glass */}
          <div
            onClick={() => setActiveSide("manual")}
            className="relative flex min-h-[260px] flex-col justify-between overflow-hidden border-b border-white/15 p-6 text-white sm:min-h-[280px] sm:p-7 md:border-r md:border-b-0 cursor-pointer"
            style={{
              background:
                "linear-gradient(90deg, #f3a638 0%, #d97706 14%, #b45309 28%, #d97706 42%, #fde68a 52%, #e07a14 66%, #c2610c 80%, #f59e0b 92%, #b45309 100%)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
              style={{ filter: "url(#kg-fluted-grain)" }}
            />
            <span className="relative z-10 font-mono-tech text-[11px] tracking-[0.06em] text-white/85">
              Proceso manual
            </span>
            <p className="relative z-10 pb-8 font-mono-tech text-[12px] text-white/90 md:pb-10">
              Cierre mensual manual · Sin alerta de picos
            </p>
          </div>

          {/* Right Panel: Fluted Vivid Crimson / Specular Rose Glass */}
          <div
            onClick={() => setActiveSide("live")}
            className="relative flex min-h-[260px] flex-col justify-between overflow-hidden p-6 text-white sm:min-h-[280px] sm:p-7 cursor-pointer"
            style={{
              background:
                "linear-gradient(90deg, #ff1744 0%, #e11d48 16%, #ff0a2b 32%, #ff9eb5 46%, #e11d48 60%, #ff0828 74%, #fda4af 86%, #ff0022 100%)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
              style={{ filter: "url(#kg-fluted-grain)" }}
            />
            <span className="relative z-10 font-mono-tech text-[11px] tracking-[0.06em] text-white/90">
              KoraGrid en vivo
            </span>
            <p className="relative z-10 pb-8 font-mono-tech text-[12px] text-white/95 md:pb-10">
              Muestreo cada 60 s · Auditoría ISO 14064 y GRI
            </p>
          </div>

          {/* Center-bottom overlapping glass toggle pill */}
          <div
            className="pointer-events-auto absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 p-1 backdrop-blur-xl md:flex"
            style={{ background: "rgba(20, 20, 22, 0.72)" }}
          >
            <button
              type="button"
              onClick={() => setActiveSide("manual")}
              aria-pressed={activeSide === "manual"}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium transition-colors duration-150 cursor-pointer ${
                activeSide === "manual"
                  ? "bg-white text-[#141414]"
                  : "text-[#d4d4d8] hover:text-white"
              }`}
            >
              {activeSide === "manual" ? (
                <PauseIcon className="h-2.5 w-2.5" />
              ) : (
                <PlayIcon className="h-2.5 w-2.5" />
              )}
              <span>Manual</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSide("live")}
              aria-pressed={activeSide === "live"}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium transition-colors duration-150 cursor-pointer ${
                activeSide === "live"
                  ? "bg-white text-[#141414]"
                  : "text-[#d4d4d8] hover:text-white"
              }`}
            >
              {activeSide === "live" ? (
                <PauseIcon className="h-2.5 w-2.5" />
              ) : (
                <PlayIcon className="h-2.5 w-2.5" />
              )}
              <span>KoraGrid</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
