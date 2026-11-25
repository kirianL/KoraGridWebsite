import React, { useState } from "react";
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
  const activeNode = ISO_NODES.find((n) => n.id === activeId) ?? null;

  return (
    <div
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
                fill={isHovered ? "#0f1b33" : "#161616"}
                stroke={isHovered ? "rgba(96, 165, 250, 0.55)" : "rgba(255,255,255,0.16)"}
                strokeWidth="0.85"
              />
              <path
                d={rightWall}
                fill={isHovered ? "#0b1426" : "#121212"}
                stroke={isHovered ? "rgba(96, 165, 250, 0.4)" : "rgba(255,255,255,0.12)"}
                strokeWidth="0.85"
              />
              <path
                d={lowerSeam}
                stroke={isHovered ? "rgba(96, 165, 250, 0.25)" : "rgba(255,255,255,0.08)"}
                strokeWidth="0.7"
              />
              <path
                d={topPath}
                fill={isHovered ? "#162647" : "#191919"}
                stroke={
                  isHovered
                    ? "#60a5fa"
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
                  stroke={isHovered ? "#60a5fa" : "rgba(255,255,255,0.26)"}
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
                    stroke={isHovered ? "#60a5fa" : "rgba(255,255,255,0.28)"}
                    strokeWidth="0.85"
                  />
                  <ellipse
                    cx={node.cx}
                    cy={node.cy}
                    rx={node.rx * 0.14}
                    ry={node.ry * 0.14}
                    fill={isHovered ? "#60a5fa" : "none"}
                    stroke={isHovered ? "#60a5fa" : "rgba(255,255,255,0.2)"}
                    strokeWidth="0.75"
                  />
                </>
              )}
              {node.squarePad && (
                <path
                  d={`M ${node.cx} ${node.cy - node.ry * 0.4} L ${node.cx + node.rx * 0.4} ${node.cy} L ${node.cx} ${node.cy + node.ry * 0.4} L ${node.cx - node.rx * 0.4} ${node.cy} Z`}
                  stroke={isHovered ? "#60a5fa" : "rgba(255,255,255,0.22)"}
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
            fill={activeId ? "#13223d" : "#1b1b1b"}
            stroke={activeId ? "rgba(96, 165, 250, 0.55)" : "rgba(255,255,255,0.26)"}
            strokeWidth="0.95"
          />
          <path
            d="M168 156 L244 200 L244 218 L168 174 Z"
            fill={activeId ? "#0f1b33" : "#151515"}
            stroke={activeId ? "rgba(96, 165, 250, 0.4)" : "rgba(255,255,255,0.16)"}
            strokeWidth="0.85"
          />
          <path
            d="M296 170 L244 200 L244 218 L296 188 Z"
            fill={activeId ? "#0b1426" : "#111111"}
            stroke={activeId ? "rgba(96, 165, 250, 0.32)" : "rgba(255,255,255,0.12)"}
            strokeWidth="0.85"
          />
          <path
            d="M168 166 L244 210 L296 180"
            stroke={activeId ? "rgba(96, 165, 250, 0.25)" : "rgba(255,255,255,0.08)"}
            strokeWidth="0.7"
          />
          <path
            d="M196 154 L232 175 M212 145 L248 166 M228 136 L264 157"
            stroke={activeId ? "rgba(96, 165, 250, 0.45)" : "rgba(255,255,255,0.15)"}
            strokeWidth="0.8"
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
                fill={isHovered ? "#0f1b33" : "#161616"}
                stroke={isHovered ? "rgba(96, 165, 250, 0.55)" : "rgba(255,255,255,0.16)"}
                strokeWidth="0.85"
              />
              <path
                d={rightWall}
                fill={isHovered ? "#0b1426" : "#121212"}
                stroke={isHovered ? "rgba(96, 165, 250, 0.4)" : "rgba(255,255,255,0.12)"}
                strokeWidth="0.85"
              />
              <path
                d={lowerSeam}
                stroke={isHovered ? "rgba(96, 165, 250, 0.25)" : "rgba(255,255,255,0.08)"}
                strokeWidth="0.7"
              />
              <path
                d={topPath}
                fill={isHovered ? "#162647" : "#191919"}
                stroke={
                  isHovered
                    ? "#60a5fa"
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
                  stroke={isHovered ? "#60a5fa" : "rgba(255,255,255,0.26)"}
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
                    stroke={isHovered ? "#60a5fa" : "rgba(255,255,255,0.28)"}
                    strokeWidth="0.85"
                  />
                  <ellipse
                    cx={node.cx}
                    cy={node.cy}
                    rx={node.rx * 0.14}
                    ry={node.ry * 0.14}
                    fill={isHovered ? "#60a5fa" : "none"}
                    stroke={isHovered ? "#60a5fa" : "rgba(255,255,255,0.2)"}
                    strokeWidth="0.75"
                  />
                </>
              )}
              {node.squarePad && (
                <path
                  d={`M ${node.cx} ${node.cy - node.ry * 0.4} L ${node.cx + node.rx * 0.4} ${node.cy} L ${node.cx} ${node.cy + node.ry * 0.4} L ${node.cx - node.rx * 0.4} ${node.cy} Z`}
                  stroke={isHovered ? "#60a5fa" : "rgba(255,255,255,0.22)"}
                  strokeWidth="0.75"
                />
              )}
            </g>
          );
        })}

      </svg>
    </div>
  );
};
