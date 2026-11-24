import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PulseWaveIcon } from "./Icons";

interface SplitTraceabilityProps {
  onOpenDemo: () => void;
}

interface InlineSentenceStep {
  id: number;
  beforeBadge: string;
  afterBadge: string;
  tag: string;
  cardText: string;
}

const TRACEABILITY_SENTENCES: InlineSentenceStep[] = [
  {
    id: 1,
    beforeBadge: "Mide cada circuito al",
    afterBadge: "minuto.",
    tag: "minuto",
    cardText:
      "Lectura directa cada 60 s en subestaciones, chillers y tableros críticos sin digitación manual.",
  },
  {
    id: 2,
    beforeBadge: "Detecta cualquier",
    afterBadge: "pico de demanda.",
    tag: "demanda",
    cardText:
      "Alertas preventivas en ventanas de 15 minutos antes de activar penalizaciones por horario punta.",
  },
  {
    id: 3,
    beforeBadge: "Calcula tu",
    afterBadge: "huella de carbono.",
    tag: "emisiones",
    cardText:
      "Conversión automática de kWh y combustible a tCO2e con factores oficiales actualizados de Costa Rica.",
  },
  {
    id: 4,
    beforeBadge: "Genera evidencia para",
    afterBadge: "ISO 14064 y GRI.",
    tag: "auditoría",
    cardText:
      "Respaldos auditables listos para Programa País Carbono Neutralidad 2.0, Bandera Azul y exportación.",
  },
  {
    id: 5,
    beforeBadge: "Y vincula cada",
    afterBadge: "compensación local.",
    tag: "Costa Rica",
    cardText:
      "Trazabilidad directa entre reducciones en planta y proyectos ambientales verificados en el país.",
  },
];

export const SplitTraceability: React.FC<SplitTraceabilityProps> = ({ onOpenDemo }) => {
  const [activeStep, setActiveStep] = useState(0);
  const current = TRACEABILITY_SENTENCES[activeStep];

  return (
    <section id="trazabilidad" className="bg-[var(--bg-canvas)]">
      <div className="rail-container grid grid-cols-1 bg-[var(--bg-surface-primary)] lg:grid-cols-12">
        {/* Left Column (~38%): Continuous natural prose with inline [1]..[5] badges on all viewports */}
        <div className="flex flex-col justify-start border-b border-[var(--border-subtle)] px-5 py-10 sm:p-10 lg:col-span-5 lg:border-r lg:border-b-0 lg:p-12">
          <h2
            data-reveal
            style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
            className="text-[28px] font-normal leading-[1.12] tracking-[-0.025em] text-[var(--text-primary)] sm:text-[38px]"
          >
            Precisión verificable en cada circuito
          </h2>

          <p
            data-reveal
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            className="mt-5 text-[17px] font-normal leading-[1.52] tracking-[-0.01em] sm:mt-7 sm:text-[21px] sm:leading-[1.48]"
          >
            {TRACEABILITY_SENTENCES.map((step, idx) => {
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
                          ? "border-[#84a955]/70 bg-[#84a955]/20 text-[#d9f99d]"
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

        {/* Right Column (~62%): Flush full-bleed green gradient card */}
        <div
          data-reveal
          style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
          className="relative flex min-h-[340px] flex-col justify-between overflow-hidden p-5 sm:min-h-[480px] sm:p-8 lg:col-span-7 lg:min-h-[560px]"
        >
          <img
            src="/images/split-emerald-field.png"
            alt="Campo cromático verde esmeralda de telemetría KoraGrid"
            width={1024}
            height={1024}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
          />

          {/* Centered editorial telemetry quote with smooth motion reveal */}
          <div className="relative z-10 m-auto flex min-h-[140px] max-w-[460px] items-center justify-center px-2 text-center sm:px-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={current.id}
                initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="text-[19px] font-normal leading-[1.45] tracking-[-0.01em] text-[#092616] sm:text-[22px]"
              >
                <span className="mr-2 inline-block rounded-[4px] bg-white/80 px-2 py-0.5 font-medium text-[#062413] backdrop-blur-sm">
                  [{current.tag}]
                </span>
                {current.cardText}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Bottom controls flush inside corners (exact Image 2) */}
          <div className="relative z-10 flex items-center justify-between">
            <button
              type="button"
              onClick={onOpenDemo}
              className="rounded-[6px] bg-[#ffffff] px-4 py-1.5 text-[12px] font-semibold text-[#111111] shadow-sm transition-colors duration-150 hover:bg-[#e5e7eb] cursor-pointer"
            >
              Solicitar demo
            </button>

            <button
              type="button"
              aria-label="Siguiente indicador de telemetría"
              onClick={() =>
                setActiveStep((prev) => (prev + 1) % TRACEABILITY_SENTENCES.length)
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
