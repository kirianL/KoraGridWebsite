import React from "react";
import type { Route } from "../routing/routes";
import { ChevronRightIcon } from "./Icons";

interface InteractiveToolsStripProps {
  onNavigate: (route: Route) => void;
}

const TOOL_PAGES: Array<{
  route: Route;
  code: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  alt: string;
}> = [
  {
    route: "telemetria",
    code: "01",
    title: "Nodo en planta y osciloscopio",
    description:
      "Inspeccione los bornes CT, el bus Modbus y simule transitorios de carga en 60 Hz.",
    cta: "Explorar hardware",
    image: "/images/hardware-din-gateway.png",
    alt: "Gateway DIN-rail KoraGrid en aluminio anodizado",
  },
  {
    route: "simulador",
    code: "02",
    title: "Simulador de demanda punta",
    description:
      "Calcule el recorte tarifario en horario punta y el ahorro anual según su industria.",
    cta: "Abrir simulador",
    image: "/images/substation-breaker-node.png",
    alt: "Controlador modular de subestación KoraGrid",
  },
  {
    route: "auditoria",
    code: "03",
    title: "Metodología y auditoría ESG",
    description:
      "Convierta lecturas en toneladas equivalentes con factores de Costa Rica y firma SHA-256.",
    cta: "Probar conversor",
    image: "/images/audit-layered-prism.png",
    alt: "Estratos de auditoría óptica KoraGrid",
  },
];

export const InteractiveToolsStrip: React.FC<InteractiveToolsStripProps> = ({
  onNavigate,
}) => {
  return (
    <section
      aria-labelledby="interactive-tools-title"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)]"
    >
      <div className="rail-container bg-[var(--bg-surface-primary)] px-5 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
        <div className="flex flex-col gap-3 border-b border-[var(--border-subtle)] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span
              data-reveal
              style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
              className="font-mono-tech text-[11.5px] text-[#4ade80]"
            >
              Módulos interactivos de ingeniería
            </span>
            <h2
              id="interactive-tools-title"
              data-reveal
              style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
              className="mt-2 text-[26px] font-normal leading-[1.14] tracking-[-0.025em] text-[var(--text-primary)] sm:text-[34px]"
            >
              Explore la plataforma en profundidad
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 divide-y divide-[var(--border-subtle)] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {TOOL_PAGES.map((tool, idx) => (
            <button
              key={tool.route}
              type="button"
              onClick={() => onNavigate(tool.route)}
              data-reveal
              style={{ "--reveal-delay": `${idx * 75}ms` } as React.CSSProperties}
              className="group flex flex-col justify-between py-7 text-left transition-colors duration-150 hover:bg-white/[0.02] lg:px-6 lg:first:pl-0 lg:last:pr-0 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-[11px] text-[#4ade80]">
                    [{tool.code}]
                  </span>
                  <ChevronRightIcon className="h-4 w-4 text-[var(--text-muted)] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[#4ade80]" />
                </div>

                <div className="my-5 flex h-[140px] items-center justify-center sm:h-[160px]">
                  <img
                    src={tool.image}
                    alt={tool.alt}
                    width={1024}
                    height={1024}
                    className="h-full w-auto select-none object-contain transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] drop-shadow-[0_16px_28px_rgba(0,0,0,0.55)]"
                  />
                </div>

                <h3 className="text-[17px] font-medium tracking-[-0.015em] text-[var(--text-primary)]">
                  {tool.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.55] text-[var(--text-secondary)]">
                  {tool.description}
                </p>
              </div>

              <span className="mt-5 inline-flex items-center gap-1.5 font-mono-tech text-[11.5px] text-[#4ade80]">
                <span>{tool.cta}</span>
                <span>→</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
