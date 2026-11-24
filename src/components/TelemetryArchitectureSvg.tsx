import React, { useState } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import { useInViewState } from "../hooks/useReveal";
import { useLocale } from "../i18n/LocaleContext";

interface IsoNode {
  id: string;
  code: string;
  label: string;
  labelEn: string;
  metric: string;
  metricEn: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  d: number;
  port?: boolean;
  portDouble?: boolean;
  squarePad?: boolean;
  dashed?: boolean;
  neighbors: string[];
}

const ISO_NODES: IsoNode[] = [
  {
    id: "grid-in",
    code: "01",
    label: "Acometida red eléctrica CR",
    labelEn: "Costa Rica grid feed",
    metric: "13.8 kV · 60 Hz",
    metricEn: "13.8 kV · 60 Hz",
    cx: 240,
    cy: 82,
    rx: 34,
    ry: 20,
    d: 14,
    port: true,
    neighbors: ["substation", "peak-guard"],
  },
  {
    id: "peak-guard",
    code: "02",
    label: "Control de pico punta",
    labelEn: "Peak demand guard",
    metric: "-14.2% demanda",
    metricEn: "-14.2% demand",
    cx: 282,
    cy: 106,
    rx: 34,
    ry: 20,
    d: 14,
    squarePad: true,
    neighbors: ["grid-in", "outpost"],
  },
  {
    id: "substation",
    code: "03",
    label: "Subestación principal",
    labelEn: "Main substation",
    metric: "412.8 kW activos",
    metricEn: "412.8 kW active",
    cx: 198,
    cy: 106,
    rx: 36,
    ry: 21,
    d: 14,
    portDouble: true,
    neighbors: ["grid-in", "chiller"],
  },
  {
    id: "chiller",
    code: "04",
    label: "Circuito chillers planta",
    labelEn: "Plant chiller circuit",
    metric: "118.4 kW · estable",
    metricEn: "118.4 kW · stable",
    cx: 154,
    cy: 132,
    rx: 36,
    ry: 21,
    d: 16,
    squarePad: true,
    neighbors: ["substation", "cleanroom"],
  },
  {
    id: "cleanroom",
    code: "05",
    label: "Cuartos limpios MedTech",
    labelEn: "MedTech cleanrooms",
    metric: "64.0 kW · 24/7",
    metricEn: "64.0 kW · 24/7",
    cx: 110,
    cy: 158,
    rx: 38,
    ry: 22,
    d: 18,
    portDouble: true,
    neighbors: ["chiller", "compressors"],
  },
  {
    id: "compressors",
    code: "06",
    label: "Compresores y bombeo",
    labelEn: "Compressors & pumping",
    metric: "86.2 kW · carga media",
    metricEn: "86.2 kW · mid load",
    cx: 156,
    cy: 184,
    rx: 38,
    ry: 22,
    d: 18,
    port: true,
    neighbors: ["cleanroom", "fuel"],
  },
  {
    id: "fuel",
    code: "07",
    label: "Sensores de combustible",
    labelEn: "Fuel sensors",
    metric: "Alcance 1 · 0.08 tCO2e/h",
    metricEn: "Scope 1 · 0.08 tCO2e/h",
    cx: 202,
    cy: 212,
    rx: 38,
    ry: 22,
    d: 18,
    squarePad: true,
    neighbors: ["compressors", "emission-factor"],
  },
  {
    id: "emission-factor",
    code: "08",
    label: "Factor oficial ICE / SIN",
    labelEn: "Official ICE / SIN factor",
    metric: "0.024 tCO2e/MWh",
    metricEn: "0.024 tCO2e/MWh",
    cx: 248,
    cy: 238,
    rx: 36,
    ry: 21,
    d: 16,
    portDouble: true,
    neighbors: ["fuel", "iso-ledger"],
  },
  {
    id: "iso-ledger",
    code: "09",
    label: "Libro mayor ISO 14064",
    labelEn: "ISO 14064 ledger",
    metric: "Evidencia auditable",
    metricEn: "Auditable evidence",
    cx: 292,
    cy: 212,
    rx: 36,
    ry: 21,
    d: 16,
    port: true,
    neighbors: ["emission-factor", "gri-report"],
  },
  {
    id: "gri-report",
    code: "10",
    label: "Reporte GRI y Programa País",
    labelEn: "GRI & Programa País report",
    metric: "Exportación EE. UU. / UE",
    metricEn: "US / EU export",
    cx: 336,
    cy: 186,
    rx: 36,
    ry: 21,
    d: 16,
    squarePad: true,
    neighbors: ["iso-ledger", "outpost"],
  },
  {
    id: "outpost",
    code: "11",
    label: "Compensación verificada CR",
    labelEn: "Verified CR offset",
    metric: "Balance neto auditado",
    metricEn: "Audited net balance",
    cx: 352,
    cy: 142,
    rx: 24,
    ry: 14,
    d: 12,
    port: true,
    dashed: true,
    neighbors: ["peak-guard", "gri-report"],
  },
];

const HUB_CENTER = { x: 232, y: 163 };

/**
 * Interactive per-module isometric wireframe for KoraGrid.
 * Moving across individual isometric blocks elevates each tile smoothly along the Z-axis
 * with a subtle neighbor ripple, illuminates its telemetry trace to the central hub,
 * and updates the live technical readout without moving the entire canvas.
 */
export const TelemetryArchitectureSvg: React.FC<{ className?: string }> = ({
  className = "w-full max-w-[440px] h-auto",
}) => {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const [activeId, setActiveId] = useState<string | null>(null);
  const { ref, inView } = useInViewState<HTMLDivElement>(0.25);
  const activeNode = ISO_NODES.find((n) => n.id === activeId) ?? null;

  return (
    <div
      ref={ref}
      className={`select-none ${className}`}
      onMouseLeave={() => setActiveId(null)}
    >
      <svg
        viewBox="0 0 460 310"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={
          isEn
            ? "Interactive isometric diagram of KoraGrid energy telemetry nodes"
            : "Diagrama isométrico interactivo de nodos de telemetría energética KoraGrid"
        }
        className="h-auto w-full overflow-visible"
      >
        {/* Subtle base isometric reference diamond */}
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="0.75">
          <path d="M58 178 L230 78 L402 178 L230 278 Z" />
          <path d="M108 178 L230 107 L352 178 L230 249 Z" />
        </g>

        {/* Back-top & left blocks (rendered before central hub for true painter's depth order) */}
        {ISO_NODES.slice(0, 6).map((node) => {
          const isHovered = activeId === node.id;
          const isNeighbor = activeNode ? activeNode.neighbors.includes(node.id) : false;
          const lift = isHovered ? -10 : isNeighbor ? -3 : 0;

          const topPath = `M ${node.cx} ${node.cy - node.ry} L ${node.cx + node.rx} ${node.cy} L ${node.cx} ${node.cy + node.ry} L ${node.cx - node.rx} ${node.cy} Z`;
          const leftWall = `M ${node.cx - node.rx} ${node.cy} L ${node.cx} ${node.cy + node.ry} L ${node.cx} ${node.cy + node.ry + node.d} L ${node.cx - node.rx} ${node.cy + node.d} Z`;
          const rightWall = `M ${node.cx + node.rx} ${node.cy} L ${node.cx} ${node.cy + node.ry} L ${node.cx} ${node.cy + node.ry + node.d} L ${node.cx + node.rx} ${node.cy + node.d} Z`;
          const lowerSeam = `M ${node.cx - node.rx} ${node.cy + node.d * 0.55} L ${node.cx} ${node.cy + node.ry + node.d * 0.55} L ${node.cx + node.rx} ${node.cy + node.d * 0.55}`;

          return (
            <g
              key={node.id}
              onMouseEnter={() => setActiveId(node.id)}
              onClick={() => setActiveId((prev) => (prev === node.id ? null : node.id))}
              style={{
                transform: `translateY(${lift}px)`,
                transition: "transform 280ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="cursor-pointer"
            >
              <path
                d={leftWall}
                fill={isHovered ? "#132018" : "#161616"}
                stroke={isHovered ? "rgba(74, 222, 128, 0.55)" : "rgba(255,255,255,0.16)"}
                strokeWidth="0.85"
              />
              <path
                d={rightWall}
                fill={isHovered ? "#0e1a14" : "#121212"}
                stroke={isHovered ? "rgba(74, 222, 128, 0.4)" : "rgba(255,255,255,0.12)"}
                strokeWidth="0.85"
              />
              <path
                d={lowerSeam}
                stroke={isHovered ? "rgba(74, 222, 128, 0.25)" : "rgba(255,255,255,0.08)"}
                strokeWidth="0.7"
              />
              <path
                d={topPath}
                fill={isHovered ? "#182818" : "#191919"}
                stroke={
                  isHovered
                    ? "#4ade80"
                    : isNeighbor
                      ? "rgba(255,255,255,0.34)"
                      : "rgba(255,255,255,0.22)"
                }
                strokeWidth={isHovered ? "1.1" : "0.9"}
                strokeDasharray={node.dashed ? "3 2" : undefined}
              />
              {node.port && (
                <ellipse
                  cx={node.cx}
                  cy={node.cy}
                  rx={node.rx * 0.28}
                  ry={node.ry * 0.28}
                  stroke={isHovered ? "#4ade80" : "rgba(255,255,255,0.26)"}
                  strokeWidth="0.85"
                />
              )}
              {node.portDouble && (
                <>
                  <ellipse
                    cx={node.cx}
                    cy={node.cy}
                    rx={node.rx * 0.34}
                    ry={node.ry * 0.34}
                    stroke={isHovered ? "#4ade80" : "rgba(255,255,255,0.28)"}
                    strokeWidth="0.85"
                  />
                  <ellipse
                    cx={node.cx}
                    cy={node.cy}
                    rx={node.rx * 0.14}
                    ry={node.ry * 0.14}
                    fill={isHovered ? "#4ade80" : "none"}
                    stroke={isHovered ? "#4ade80" : "rgba(255,255,255,0.2)"}
                    strokeWidth="0.75"
                  />
                </>
              )}
              {node.squarePad && (
                <path
                  d={`M ${node.cx} ${node.cy - node.ry * 0.4} L ${node.cx + node.rx * 0.4} ${node.cy} L ${node.cx} ${node.cy + node.ry * 0.4} L ${node.cx - node.rx * 0.4} ${node.cy} Z`}
                  stroke={isHovered ? "#4ade80" : "rgba(255,255,255,0.22)"}
                  strokeWidth="0.75"
                />
              )}
            </g>
          );
        })}

        {/* Central KoraGrid Telemetry Bus Platform */}
        <g
          onMouseEnter={() => setActiveId(null)}
          style={{
            transform: activeId ? "translateY(-2px)" : "translateY(0px)",
            transition: "transform 280ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <path
            d="M168 156 L220 126 L296 170 L244 200 Z"
            fill={activeId ? "#152218" : "#1b1b1b"}
            stroke={activeId ? "rgba(74, 222, 128, 0.48)" : "rgba(255,255,255,0.26)"}
            strokeWidth="0.95"
          />
          <path
            d="M168 156 L244 200 L244 218 L168 174 Z"
            fill="#151515"
            stroke={activeId ? "rgba(74, 222, 128, 0.3)" : "rgba(255,255,255,0.16)"}
            strokeWidth="0.85"
          />
          <path
            d="M296 170 L244 200 L244 218 L296 188 Z"
            fill="#111111"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.85"
          />
          <path
            d="M196 154 L232 175 M212 145 L248 166 M228 136 L264 157"
            stroke={activeId ? "rgba(74, 222, 128, 0.45)" : "rgba(255,255,255,0.15)"}
            strokeWidth="0.8"
          />
          <circle
            cx={HUB_CENTER.x}
            cy={HUB_CENTER.y}
            r="2.2"
            fill={activeId ? "#4ade80" : "rgba(255,255,255,0.35)"}
          />
        </g>

        {/* Bottom-front & right blocks (in front of central hub) */}
        {ISO_NODES.slice(6).map((node) => {
          const isHovered = activeId === node.id;
          const isNeighbor = activeNode ? activeNode.neighbors.includes(node.id) : false;
          const lift = isHovered ? -10 : isNeighbor ? -3 : 0;

          const topPath = `M ${node.cx} ${node.cy - node.ry} L ${node.cx + node.rx} ${node.cy} L ${node.cx} ${node.cy + node.ry} L ${node.cx - node.rx} ${node.cy} Z`;
          const leftWall = `M ${node.cx - node.rx} ${node.cy} L ${node.cx} ${node.cy + node.ry} L ${node.cx} ${node.cy + node.ry + node.d} L ${node.cx - node.rx} ${node.cy + node.d} Z`;
          const rightWall = `M ${node.cx + node.rx} ${node.cy} L ${node.cx} ${node.cy + node.ry} L ${node.cx} ${node.cy + node.ry + node.d} L ${node.cx + node.rx} ${node.cy + node.d} Z`;
          const lowerSeam = `M ${node.cx - node.rx} ${node.cy + node.d * 0.55} L ${node.cx} ${node.cy + node.ry + node.d * 0.55} L ${node.cx + node.rx} ${node.cy + node.d * 0.55}`;

          return (
            <g
              key={node.id}
              onMouseEnter={() => setActiveId(node.id)}
              onClick={() => setActiveId((prev) => (prev === node.id ? null : node.id))}
              style={{
                transform: `translateY(${lift}px)`,
                transition: "transform 280ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="cursor-pointer"
            >
              <path
                d={leftWall}
                fill={isHovered ? "#132018" : "#161616"}
                stroke={isHovered ? "rgba(74, 222, 128, 0.55)" : "rgba(255,255,255,0.16)"}
                strokeWidth="0.85"
              />
              <path
                d={rightWall}
                fill={isHovered ? "#0e1a14" : "#121212"}
                stroke={isHovered ? "rgba(74, 222, 128, 0.4)" : "rgba(255,255,255,0.12)"}
                strokeWidth="0.85"
              />
              <path
                d={lowerSeam}
                stroke={isHovered ? "rgba(74, 222, 128, 0.25)" : "rgba(255,255,255,0.08)"}
                strokeWidth="0.7"
              />
              <path
                d={topPath}
                fill={isHovered ? "#182818" : "#191919"}
                stroke={
                  isHovered
                    ? "#4ade80"
                    : isNeighbor
                      ? "rgba(255,255,255,0.34)"
                      : "rgba(255,255,255,0.22)"
                }
                strokeWidth={isHovered ? "1.1" : "0.9"}
                strokeDasharray={node.dashed ? "3 2" : undefined}
              />
              {node.port && (
                <ellipse
                  cx={node.cx}
                  cy={node.cy}
                  rx={node.rx * 0.28}
                  ry={node.ry * 0.28}
                  stroke={isHovered ? "#4ade80" : "rgba(255,255,255,0.26)"}
                  strokeWidth="0.85"
                />
              )}
              {node.portDouble && (
                <>
                  <ellipse
                    cx={node.cx}
                    cy={node.cy}
                    rx={node.rx * 0.34}
                    ry={node.ry * 0.34}
                    stroke={isHovered ? "#4ade80" : "rgba(255,255,255,0.28)"}
                    strokeWidth="0.85"
                  />
                  <ellipse
                    cx={node.cx}
                    cy={node.cy}
                    rx={node.rx * 0.14}
                    ry={node.ry * 0.14}
                    fill={isHovered ? "#4ade80" : "none"}
                    stroke={isHovered ? "#4ade80" : "rgba(255,255,255,0.2)"}
                    strokeWidth="0.75"
                  />
                </>
              )}
              {node.squarePad && (
                <path
                  d={`M ${node.cx} ${node.cy - node.ry * 0.4} L ${node.cx + node.rx * 0.4} ${node.cy} L ${node.cx} ${node.cy + node.ry * 0.4} L ${node.cx - node.rx * 0.4} ${node.cy} Z`}
                  stroke={isHovered ? "#4ade80" : "rgba(255,255,255,0.22)"}
                  strokeWidth="0.75"
                />
              )}
            </g>
          );
        })}

        {/* Active illuminated telemetry signal vector connecting hovered node to central bus */}
        {activeNode && (
          <g className="pointer-events-none">
            <line
              x1={activeNode.cx}
              y1={activeNode.cy - 10}
              x2={HUB_CENTER.x}
              y2={HUB_CENTER.y - 2}
              stroke="#4ade80"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.85"
            />
            <circle cx={activeNode.cx} cy={activeNode.cy - 10} r="2.5" fill="#4ade80" />
          </g>
        )}
      </svg>

      {/* Minimal fixed-height technical telemetry readout strip with animated text swap + NumberFlow */}
      <div className="mt-2 min-h-[28px] border-t border-white/[0.06] pt-2 font-mono-tech text-[11px] tabular-nums">
        <AnimatePresence mode="wait">
          {activeNode ? (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 4, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between"
            >
              <span className="truncate pr-2 text-[#e4e4e7]">
                <span className="text-[#4ade80]">[{activeNode.code}]</span>{" "}
                {isEn ? activeNode.labelEn : activeNode.label}
              </span>
              <span className="shrink-0 text-[#4ade80]">
                {isEn ? activeNode.metricEn : activeNode.metric}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 4, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between"
            >
              <span className="text-[#71717a]">
                {isEn ? "[00] KoraGrid modular architecture" : "[00] Arquitectura modular KoraGrid"}
              </span>
              <span className="text-[#71717a]">
                <NumberFlow
                  value={inView ? 11 : 1}
                  format={{ maximumFractionDigits: 0 }}
                  trend={1}
                  className="nf-number"
                />{" "}
                {isEn ? "active nodes" : "nodos activos"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile-only quick tap chips for thumb exploration (since mobile has no hover) */}
      <div className="mt-3 grid grid-cols-2 gap-1.5 sm:hidden">
        {[
          { id: "substation", label: isEn ? "Substation" : "Subestación" },
          { id: "chiller", label: "Chillers" },
          { id: "cleanroom", label: isEn ? "Cleanrooms" : "Cuartos limpios" },
          { id: "iso-ledger", label: "ISO 14064" },
        ].map((chip) => {
          const isSelected = activeId === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => setActiveId((prev) => (prev === chip.id ? null : chip.id))}
              aria-pressed={isSelected}
              className={`rounded-[6px] border px-2.5 py-1.5 text-left font-mono-tech text-[11px] transition-colors duration-150 ${
                isSelected
                  ? "border-[#4ade80]/60 bg-[#182818] text-[#4ade80]"
                  : "border-white/10 bg-[#191919] text-[#a1a1aa]"
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
