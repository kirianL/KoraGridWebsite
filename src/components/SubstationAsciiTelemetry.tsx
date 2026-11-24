import React from "react";
import { useLocale } from "../i18n/LocaleContext";
import { AsciiMotionCanvas, ProceduralAsciiScene } from "./AsciiMotionCanvas";

interface SubstationAsciiTelemetryProps {
  onOpenDemo: () => void;
}

interface AsciiCardConfig {
  id: string;
  scene: ProceduralAsciiScene;
  ramp: string;
  glyphColor: [number, number, number];
  alt: string;
  title: string;
  description: string;
  actionLabel: string;
}

const CARDS_BY_LOCALE: Record<
  "es" | "en",
  {
    heading: string;
    subtitle: string;
    groupAriaPrefix: string;
    cards: AsciiCardConfig[];
  }
> = {
  es: {
    heading: "Modelado continuo de carga y emisiones",
    subtitle:
      "Cada ciclo eléctrico se procesa en vivo desde la celda de subestación hasta el respaldo técnico verificable.",
    groupAriaPrefix: "Ventana de muestreo para",
    cards: [
      {
        id: "generacion",
        scene: "load-pulse",
        ramp: " .:-=+01",
        glyphColor: [0.2314, 0.5098, 0.9647],
        alt: "Imagen de telemetría de carga en tiempo real en arte ASCII",
        title: "Telemetría de carga en tiempo real",
        description:
          "Captura cada variación de generación y demanda en planta para detectar picos antes del cierre de la ventana de 15 minutos.",
        actionLabel: "Ver arquitectura",
      },
      {
        id: "auditoria",
        scene: "audit-torus",
        ramp: " .:-=+14579",
        glyphColor: [0.2314, 0.5098, 0.9647],
        alt: "Imagen de trazabilidad lista para auditoría en arte ASCII",
        title: "Trazabilidad lista para auditoría",
        description:
          "Convierte el flujo eléctrico en registros verificables para ISO 14064 y Programa País sin hojas de cálculo.",
        actionLabel: "Solicitar demo",
      },
    ],
  },
  en: {
    heading: "Continuous load and emissions modeling",
    subtitle:
      "Every electrical cycle is processed live from the substation bay through to verifiable audit records.",
    groupAriaPrefix: "Sampling window for",
    cards: [
      {
        id: "generacion",
        scene: "load-pulse",
        ramp: " .:-=+01",
        glyphColor: [0.2314, 0.5098, 0.9647],
        alt: "Real-time load telemetry image in ASCII art",
        title: "Real-time load telemetry",
        description:
          "Captures every generation and plant demand shift to catch spikes before the 15-minute utility billing window closes.",
        actionLabel: "View architecture",
      },
      {
        id: "auditoria",
        scene: "audit-torus",
        ramp: " .:-=+14579",
        glyphColor: [0.2314, 0.5098, 0.9647],
        alt: "Audit-ready traceability image in ASCII art",
        title: "Audit-ready traceability",
        description:
          "Turns electrical flow into verifiable records for ISO 14064 and Programa País without manual spreadsheets.",
        actionLabel: "Request demo",
      },
    ],
  },
};

export const SubstationAsciiTelemetry: React.FC<SubstationAsciiTelemetryProps> = ({
  onOpenDemo,
}) => {
  const { locale } = useLocale();
  const copy = CARDS_BY_LOCALE[locale];

  return (
    <section
      id="modelado"
      aria-labelledby="modelado-heading"
      className="border-t border-[var(--border-light-subtle)] bg-[var(--bg-light-subtle)] text-[var(--text-on-light-primary)]"
    >
      <div className="mx-auto max-w-[1060px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="max-w-[620px]" data-reveal>
          <h2
            id="modelado-heading"
            className="text-[clamp(1.75rem,3.2vw,2.45rem)] font-medium leading-[1.12] tracking-tight text-[var(--text-on-light-primary)]"
          >
            {copy.heading}
          </h2>
          <p className="mt-3 text-[15px] leading-[1.6] text-[var(--text-on-light-secondary)]">
            {copy.subtitle}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {copy.cards.map((card) => {
            return (
              <article
                key={card.id}
                data-reveal
                className="relative flex flex-col justify-between border border-[var(--border-light-subtle)] bg-[var(--bg-light-canvas)] p-4 transition-colors duration-150 hover:border-[var(--border-light-strong)] sm:p-5"
              >
                <span aria-hidden="true" className="absolute -top-[2px] -left-[2px] h-1 w-1 bg-[#111827]" />
                <span aria-hidden="true" className="absolute -top-[2px] -right-[2px] h-1 w-1 bg-[#111827]" />
                <span aria-hidden="true" className="absolute -bottom-[2px] -left-[2px] h-1 w-1 bg-[#111827]" />
                <span aria-hidden="true" className="absolute -bottom-[2px] -right-[2px] h-1 w-1 bg-[#111827]" />

                <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-white">
                  <AsciiMotionCanvas
                    mediaType="procedural"
                    scene={card.scene}
                    ramp={card.ramp}
                    theme="light"
                    glyphColor={card.glyphColor}
                    speed={1}
                    cellWidth={7}
                    alt={card.alt}
                    className="absolute inset-0 h-full w-full"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[19px] font-medium tracking-tight text-[var(--text-on-light-primary)]">
                      {card.title}
                    </h3>
                    <button
                      type="button"
                      onClick={onOpenDemo}
                      aria-label={`${card.actionLabel}: ${card.title}`}
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-[#111827] text-white transition-colors hover:bg-[#2563eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] cursor-pointer"
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 11L11 5M11 5H6M11 5v5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="mt-2 text-[13.5px] leading-[1.55] text-[var(--text-on-light-secondary)]">
                    {card.description}
                  </p>

                  <div className="mt-6 flex items-center justify-end border-t border-[var(--border-light-subtle)] pt-4">
                    <button
                      type="button"
                      onClick={onOpenDemo}
                      className="inline-flex items-center gap-1.5 rounded-[4px] bg-[#111827] px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-[#2563eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] cursor-pointer"
                    >
                      {card.actionLabel}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
