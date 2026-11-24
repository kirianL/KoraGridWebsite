import React from "react";
import { useLocale } from "../i18n/LocaleContext";

interface GridTowerAsciiSectionProps {
  onOpenDemo: () => void;
}

export const GridTowerAsciiSection: React.FC<GridTowerAsciiSectionProps> = ({
  onOpenDemo,
}) => {
  const { isEn } = useLocale();

  return (
    <section
      id="subestacion"
      aria-labelledby="subestacion-heading"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)]"
    >
      <div className="rail-container grid grid-cols-1 lg:grid-cols-12">
        <div
          className="flex flex-col justify-between gap-8 px-5 py-14 sm:px-8 lg:col-span-5 lg:border-r lg:border-[var(--border-subtle)] lg:px-10 lg:py-20"
          data-reveal
        >
          <div>
            <p className="text-[clamp(1.6rem,2.9vw,2.25rem)] font-medium leading-[1.15] tracking-tight text-[var(--text-muted)]">
              {isEn ? "The grid is at its limits." : "La red opera al límite."}
            </p>
            <h2
              id="subestacion-heading"
              className="mt-1 text-[clamp(1.6rem,2.9vw,2.25rem)] font-medium leading-[1.15] tracking-tight text-[var(--text-primary)]"
            >
              {isEn
                ? "We build the telemetry layer to transform it."
                : "Construimos la telemetría base para transformarla."}
            </h2>
            <p className="mt-6 text-[14.5px] leading-[1.6] text-[var(--text-secondary)]">
              {isEn
                ? "Direct optical acquisition on 13.8 and 34.5 kV buses via Modbus TCP and DNP3, reconciled with utility revenue meters to anticipate thermal overloads and back ISO 14064 audits."
                : "Lectura óptica directa en barras de 13.8 y 34.5 kV mediante Modbus TCP y DNP3, conciliada con medición fiscal nacional para anticipar sobrecargas térmicas y respaldar auditorías ISO 14064."}
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={onOpenDemo}
              className="rounded-[6px] bg-[#ffffff] px-5 py-2.5 text-[13px] font-semibold text-[#0d0e0e] transition-colors duration-150 hover:bg-[#e5e7eb] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6]"
            >
              {isEn ? "Request technical spec" : "Solicitar especificación técnica"}
            </button>
          </div>
        </div>

        <div
          className="relative flex min-h-[440px] items-center justify-center overflow-hidden bg-black sm:min-h-[520px] lg:col-span-7 lg:min-h-[620px]"
          data-reveal
        >
          <img
            src="/images/substation-tower-ascii.webp"
            alt={
              isEn
                ? "High-voltage electrical transmission tower rendered in ASCII art"
                : "Torre de transmisión eléctrica de alta tensión en arte ASCII"
            }
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain object-bottom select-none"
          />

          <div className="pointer-events-none absolute left-4 top-6 max-w-[215px] rounded-[var(--radius-md)] border border-white/15 bg-white/[0.06] p-3.5 backdrop-blur-md sm:left-8 sm:top-16 sm:max-w-[230px]">
            <span className="inline-block rounded-[3px] bg-white px-1.5 py-0.5 font-mono-tech text-[10px] font-semibold tracking-wider text-[#09090b]">
              {isEn ? "CRITICAL" : "CRÍTICO"}
            </span>
            <p className="mt-2 text-[13px] font-medium leading-[1.3] text-[#f5f7f6]">
              {isEn
                ? "Transformer T-17 overload in 42 min"
                : "Transformador T-17 sobrecarga en 42 min"}
            </p>
            <p className="mt-1 text-[11.5px] leading-[1.4] text-white/70">
              {isEn
                ? "Feeder 12 load exceeds thermal limit before system peak."
                : "Alimentador 12 supera límite térmico antes del pico horario."}
            </p>
          </div>

          <div className="pointer-events-none absolute bottom-6 right-4 max-w-[195px] rounded-[var(--radius-md)] border border-white/15 bg-white/[0.06] p-3.5 backdrop-blur-md sm:bottom-14 sm:right-8 sm:max-w-[215px]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#93c5fd"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            <p className="mt-2 font-mono-tech text-[15px] font-medium tabular-nums text-[#f5f7f6]">
              24°C
            </p>
            <p className="mt-1 text-[11.5px] leading-[1.4] text-white/70">
              {isEn
                ? "Clear skies increasing midday solar injection."
                : "Cielos despejados aumentan inyección solar de mediodía."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
