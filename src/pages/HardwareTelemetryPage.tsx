import React, { useMemo, useState } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import { VerticalHatchDivider } from "../components/VerticalHatchDivider";
import { PulseWaveIcon } from "../components/Icons";

interface HardwareTelemetryPageProps {
  onOpenDemo: () => void;
  onNavigateHome: () => void;
}

interface HardwareHotspot {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  detail: string;
  metricValue: number;
  metricDecimals: number;
  metricPrefix?: string;
  metricSuffix: string;
  metricLabel: string;
  pinX: number;
  pinY: number;
}

const HOTSPOTS: HardwareHotspot[] = [
  {
    id: "ct-clamps",
    code: "01",
    title: "Bornes CT y bobinas Rogowski",
    subtitle: "Captura trifásica sin corte de energía",
    detail:
      "Sensores de núcleo abierto calibrados en campo que miden corriente, tensión y armónicos en tableros principales sin detener líneas productivas.",
    metricValue: 0.2,
    metricDecimals: 1,
    metricPrefix: "Clase ",
    metricSuffix: "S",
    metricLabel: "Precisión metrológica IEC",
    pinX: 62,
    pinY: 74,
  },
  {
    id: "modbus-bus",
    code: "02",
    title: "Bus industrial Modbus RTU / TCP",
    subtitle: "Integración nativa con medidores existentes",
    detail:
      "Lectura simultánea de analizadores de red, chillers, calderas y submedidores a través de RS-485 aislado o Ethernet industrial.",
    metricValue: 80,
    metricDecimals: 0,
    metricPrefix: "< ",
    metricSuffix: " ms",
    metricLabel: "Latencia de muestreo en borde",
    pinX: 69,
    pinY: 42,
  },
  {
    id: "peak-engine",
    code: "03",
    title: "Motor de deslastre preventivo",
    subtitle: "Predicción de ventana tarifaria de 15 min",
    detail:
      "Evalúa la pendiente de carga cada segundo y dispara alertas o maniobras en cargas no críticas antes de registrar un pico en horario punta.",
    metricValue: -16.4,
    metricDecimals: 1,
    metricPrefix: "",
    metricSuffix: "%",
    metricLabel: "Reducción promedio en demanda punta",
    pinX: 43,
    pinY: 46,
  },
  {
    id: "tls-enclave",
    code: "04",
    title: "Enclave criptográfico TLS 1.3",
    subtitle: "Memoria intermedia ante cortes de red",
    detail:
      "Firma cada lectura con sello temporal y almacena hasta 72 horas de telemetría local cifrada si se interrumpe la conectividad en planta.",
    metricValue: 72,
    metricDecimals: 0,
    metricPrefix: "",
    metricSuffix: " h",
    metricLabel: "Respaldo autónomo sin conexión",
    pinX: 35,
    pinY: 64,
  },
];

type WindowSpan = "1s" | "15s" | "60s";

export const HardwareTelemetryPage: React.FC<HardwareTelemetryPageProps> = ({
  onOpenDemo,
  onNavigateHome,
}) => {
  const [activeId, setActiveId] = useState<string>(HOTSPOTS[0].id);
  const [windowSpan, setWindowSpan] = useState<WindowSpan>("15s");
  const [transientActive, setTransientActive] = useState(false);

  const activeSpot = HOTSPOTS.find((h) => h.id === activeId) ?? HOTSPOTS[0];

  const readings = useMemo(() => {
    const spanOffset = windowSpan === "1s" ? 1.8 : windowSpan === "15s" ? 0 : -1.2;
    if (transientActive) {
      return {
        voltageKv: Number((13.6 + (windowSpan === "1s" ? 0.1 : 0)).toFixed(1)),
        currentA: Math.round(486 + spanOffset * 4),
        powerFactor: 0.91,
        thdPct: Number((4.8 + (windowSpan === "1s" ? 0.4 : 0)).toFixed(1)),
      };
    }
    return {
      voltageKv: 13.8,
      currentA: Math.round(342 + spanOffset * 3),
      powerFactor: 0.98,
      thdPct: 1.9,
    };
  }, [transientActive, windowSpan]);

  const wavePaths = useMemo(() => {
    const freq = windowSpan === "1s" ? 3.2 : windowSpan === "15s" ? 2.1 : 1.4;
    const amp = transientActive ? 34 : 24;
    const harmonic = transientActive ? 8 : 1.5;

    const buildPhase = (phaseShift: number) => {
      const pts: string[] = [];
      for (let x = 0; x <= 600; x += 12) {
        const t = (x / 600) * Math.PI * 2 * freq + phaseShift;
        const dist = transientActive && x > 210 && x < 410 ? Math.sin(t * 5) * harmonic : 0;
        const y = 64 + Math.sin(t) * amp + dist;
        pts.push(`${x === 0 ? "M" : "L"} ${x} ${y.toFixed(1)}`);
      }
      return pts.join(" ");
    };

    return {
      l1: buildPhase(0),
      l2: buildPhase((Math.PI * 2) / 3),
      l3: buildPhase((Math.PI * 4) / 3),
    };
  }, [transientActive, windowSpan]);

  return (
    <div className="bg-[var(--bg-canvas)]">
      {/* Header & Interactive Hardware Anatomy */}
      <section aria-labelledby="telemetry-page-title" className="border-b border-[var(--border-subtle)]">
        <div className="rail-container bg-[var(--bg-surface-primary)] px-5 py-10 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
            <button
              type="button"
              onClick={onNavigateHome}
              className="font-mono-tech text-[12px] text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text-primary)] cursor-pointer"
            >
              ← Volver al inicio
            </button>
            <span className="font-mono-tech text-[11.5px] text-[#60a5fa]">
              [01] Arquitectura física en planta
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-10">
            {/* Left Column: Active Hardware Spec & Live Metric */}
            <div className="order-2 flex flex-col justify-between lg:order-1 lg:col-span-5">
              <div>
                <h1
                  data-reveal
                  style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
                  id="telemetry-page-title"
                  className="text-[30px] font-normal leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)] sm:text-[42px]"
                >
                  Anatomía del nodo en planta
                </h1>
                <p
                  data-reveal
                  style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
                  className="mt-3.5 text-[14px] leading-[1.6] text-[var(--text-secondary)] sm:text-[15px]"
                >
                  Seleccione cada punto físico del módulo para inspeccionar cómo captura datos eléctricos de subestación sin detener su operación.
                </p>
              </div>

              {/* Mobile horizontal selector bar */}
              <div className="mt-6 flex gap-2 overflow-x-auto pb-1 lg:hidden">
                {HOTSPOTS.map((spot) => {
                  const isActive = spot.id === activeId;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => setActiveId(spot.id)}
                      aria-pressed={isActive}
                      className={`shrink-0 rounded-[6px] border px-3 py-2 font-mono-tech text-[11.5px] transition-colors duration-150 cursor-pointer ${
                        isActive
                          ? "border-[#60a5fa]/60 bg-[#142238] text-[#60a5fa]"
                          : "border-white/12 bg-[#1a1b1b] text-[#a1a1aa]"
                      }`}
                    >
                      [{spot.code}] {spot.title.split(" ")[0]}
                    </button>
                  );
                })}
              </div>

              {/* Active Hotspot Detail Readout */}
              <div className="mt-6 border-t border-[var(--border-subtle)] pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono-tech text-[11.5px] text-[#60a5fa]">
                    [{activeSpot.code}] {activeSpot.metricLabel}
                  </span>
                  <div className="font-mono-tech text-[28px] font-semibold tracking-tight text-[var(--text-primary)] tabular-nums sm:text-[34px]">
                    {activeSpot.metricPrefix}
                    <NumberFlow
                      value={activeSpot.metricValue}
                      format={{
                        minimumFractionDigits: activeSpot.metricDecimals,
                        maximumFractionDigits: activeSpot.metricDecimals,
                      }}
                      suffix={activeSpot.metricSuffix}
                      className="nf-number"
                    />
                  </div>
                </div>

                <div className="mt-4 min-h-[108px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSpot.id}
                      initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h2 className="text-[19px] font-medium tracking-[-0.015em] text-[var(--text-primary)]">
                        {activeSpot.title}
                      </h2>
                      <p className="mt-1 text-[13px] text-[#60a5fa]/90">{activeSpot.subtitle}</p>
                      <p className="mt-2.5 text-[13.5px] leading-[1.6] text-[var(--text-secondary)]">
                        {activeSpot.detail}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Desktop quick list */}
                <div className="mt-6 hidden divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)] lg:block">
                  {HOTSPOTS.map((spot) => {
                    const isActive = spot.id === activeId;
                    return (
                      <button
                        key={spot.id}
                        type="button"
                        onClick={() => setActiveId(spot.id)}
                        className={`flex w-full items-center justify-between py-3 text-left transition-colors duration-150 cursor-pointer ${
                          isActive ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[#d4d4d8]"
                        }`}
                      >
                        <span className="text-[13.5px]">
                          <span className={`mr-2.5 font-mono-tech text-[11px] ${isActive ? "text-[#60a5fa]" : ""}`}>
                            [{spot.code}]
                          </span>
                          {spot.title}
                        </span>
                        <span className="font-mono-tech text-[11px]">
                          {isActive ? "Activo" : "Ver"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Transparent Recraft Hardware Render + Interactive Pins + Orthogonal Leader */}
            <div className="order-1 relative flex items-center justify-center lg:order-2 lg:col-span-7">
              <div className="relative w-full max-w-[460px]">
                <img
                  src="/images/hardware-din-gateway.png"
                  alt="Módulo de telemetría industrial KoraGrid en aluminio anodizado"
                  width={1024}
                  height={1024}
                  className="mx-auto h-auto w-full select-none object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.65)]"
                />

                {/* Orthogonal SVG leader from active hardware pin toward left spec column (Desktop) */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
                >
                  <polyline
                    points={`${activeSpot.pinX},${activeSpot.pinY} ${Math.max(4, activeSpot.pinX - 18)},${activeSpot.pinY} 0,${activeSpot.pinY}`}
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="0.45"
                    strokeDasharray="1.5 1.5"
                    opacity="0.85"
                  />
                  <circle cx={activeSpot.pinX} cy={activeSpot.pinY} r="1.4" fill="#60a5fa" />
                </svg>

                {/* Interactive hardware inspection pins */}
                {HOTSPOTS.map((spot) => {
                  const isActive = spot.id === activeId;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => setActiveId(spot.id)}
                      aria-label={`Inspeccionar ${spot.title}`}
                      aria-pressed={isActive}
                      style={{ left: `${spot.pinX}%`, top: `${spot.pinY}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-[6px] border font-mono-tech text-[11px] transition-all duration-150 cursor-pointer ${
                        isActive
                          ? "border-[#60a5fa] bg-[#132644]/95 text-[#60a5fa] scale-105 shadow-[0_0_0_4px_rgba(96,165,250,0.18)]"
                          : "border-white/25 bg-[#141414]/85 text-[#e4e4e7] hover:border-white/50"
                      }`}
                    >
                      {spot.code}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <VerticalHatchDivider />

      {/* Live 60 Hz Phasor / Transient Oscilloscope */}
      <section aria-labelledby="oscilloscope-title">
        <div className="rail-container bg-[var(--bg-surface-primary)] px-5 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
          <div className="flex flex-col gap-5 border-b border-[var(--border-subtle)] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="oscilloscope-title"
                className="text-[24px] font-normal leading-[1.15] tracking-[-0.025em] text-[var(--text-primary)] sm:text-[32px]"
              >
                Monitor fasorial en tiempo real (60 Hz)
              </h2>
              <p className="mt-2 max-w-[520px] text-[13.5px] leading-[1.55] text-[var(--text-secondary)]">
                Alterne la ventana de muestreo o simule un transitorio de arranque para observar cómo el nodo registra caídas de tensión y distorsión armónica.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {(["1s", "15s", "60s"] as WindowSpan[]).map((span) => (
                <button
                  key={span}
                  type="button"
                  onClick={() => setWindowSpan(span)}
                  aria-pressed={windowSpan === span}
                  className={`rounded-[6px] border px-3 py-1.5 font-mono-tech text-[11.5px] transition-colors duration-150 cursor-pointer ${
                    windowSpan === span
                      ? "border-white/30 bg-white/12 text-white"
                      : "border-white/10 bg-[#1a1b1b] text-[#a1a1aa] hover:text-white"
                  }`}
                >
                  {span}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setTransientActive((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 rounded-[6px] px-3.5 py-1.5 text-[12px] font-semibold transition-colors duration-150 cursor-pointer ${
                  transientActive
                    ? "bg-[#60a5fa] text-[#091936]"
                    : "bg-white text-[#111111] hover:bg-[#e5e5e5]"
                }`}
              >
                <PulseWaveIcon className="h-3.5 w-3.5" />
                <span>{transientActive ? "Estabilizar red" : "Simular transitorio"}</span>
              </button>
            </div>
          </div>

          {/* 4 Metric Strip */}
          <div className="grid grid-cols-2 divide-x divide-y divide-[var(--border-subtle)] border-b border-[var(--border-subtle)] lg:grid-cols-4 lg:divide-y-0">
            <div className="p-4 sm:p-6">
              <span className="font-mono-tech text-[11px] text-[var(--text-muted)]">Tensión de línea</span>
              <div className="mt-2 font-mono-tech text-[24px] font-medium text-[var(--text-primary)] tabular-nums sm:text-[30px]">
                <NumberFlow value={readings.voltageKv} format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }} suffix=" kV" className="nf-number" />
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <span className="font-mono-tech text-[11px] text-[var(--text-muted)]">Corriente agregada</span>
              <div className="mt-2 font-mono-tech text-[24px] font-medium text-[var(--text-primary)] tabular-nums sm:text-[30px]">
                <NumberFlow value={readings.currentA} format={{ maximumFractionDigits: 0 }} suffix=" A" className="nf-number" />
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <span className="font-mono-tech text-[11px] text-[var(--text-muted)]">Factor de potencia</span>
              <div className="mt-2 font-mono-tech text-[24px] font-medium text-[#60a5fa] tabular-nums sm:text-[30px]">
                <NumberFlow value={readings.powerFactor} format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }} className="nf-number" />
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <span className="font-mono-tech text-[11px] text-[var(--text-muted)]">Distorsión armónica THD</span>
              <div className="mt-2 font-mono-tech text-[24px] font-medium text-[var(--text-primary)] tabular-nums sm:text-[30px]">
                <NumberFlow value={readings.thdPct} format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }} suffix="%" className="nf-number" />
              </div>
            </div>
          </div>

          {/* 3-phase SVG waveform */}
          <div className="pt-6">
            <div className="overflow-hidden border border-[var(--border-subtle)] bg-[#111212] p-3 sm:p-5">
              <svg
                viewBox="0 0 600 128"
                className="h-[120px] w-full sm:h-[150px]"
                role="img"
                aria-label="Forma de onda trifásica en tiempo real de subestación"
              >
                <line x1="0" y1="64" x2="600" y2="64" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <path d={wavePaths.l1} fill="none" stroke="#60a5fa" strokeWidth="1.6" />
                <path d={wavePaths.l2} fill="none" stroke="#9ca3af" strokeWidth="1.2" opacity="0.6" />
                <path d={wavePaths.l3} fill="none" stroke="#52525b" strokeWidth="1.2" opacity="0.6" />
              </svg>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-3 font-mono-tech text-[11px] text-[var(--text-muted)]">
                <span>Fases L1 / L2 / L3 · Ventana {windowSpan}</span>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="text-[#60a5fa] transition-colors hover:text-white cursor-pointer"
                >
                  Agendar prueba en tablero →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
