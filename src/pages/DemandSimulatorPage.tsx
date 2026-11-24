import React, { useMemo, useState } from "react";
import NumberFlow from "@number-flow/react";
import { VerticalHatchDivider } from "../components/VerticalHatchDivider";

interface DemandSimulatorPageProps {
  onOpenDemo: () => void;
  onNavigateHome: () => void;
}

interface IndustryProfile {
  id: string;
  label: string;
  peakMultiplier: number;
  tariffRateUsdKw: number;
  emissionFactor: number;
  curveShape: number[];
}

const PROFILES: IndustryProfile[] = [
  {
    id: "medtech",
    label: "Zonas francas MedTech",
    peakMultiplier: 0.94,
    tariffRateUsdKw: 22.5,
    emissionFactor: 0.024,
    curveShape: [0.58, 0.56, 0.55, 0.57, 0.62, 0.72, 0.82, 0.89, 0.94, 0.97, 0.99, 1.0, 0.98, 0.95, 0.96, 0.94, 0.92, 0.89, 0.84, 0.78, 0.72, 0.66, 0.62, 0.59],
  },
  {
    id: "hoteleria",
    label: "Hotelería Guanacaste",
    peakMultiplier: 1.04,
    tariffRateUsdKw: 24.8,
    emissionFactor: 0.029,
    curveShape: [0.48, 0.45, 0.42, 0.42, 0.46, 0.54, 0.66, 0.74, 0.79, 0.81, 0.84, 0.88, 0.91, 0.92, 0.93, 0.95, 0.98, 1.0, 0.99, 0.96, 0.88, 0.76, 0.64, 0.54],
  },
  {
    id: "agroindustria",
    label: "Agroindustria y frío",
    peakMultiplier: 0.98,
    tariffRateUsdKw: 21.4,
    emissionFactor: 0.042,
    curveShape: [0.64, 0.63, 0.62, 0.65, 0.72, 0.83, 0.91, 0.95, 0.98, 1.0, 0.99, 0.97, 0.94, 0.95, 0.96, 0.94, 0.91, 0.86, 0.81, 0.77, 0.73, 0.7, 0.67, 0.65],
  },
  {
    id: "logistica",
    label: "Centro logístico GAM",
    peakMultiplier: 0.91,
    tariffRateUsdKw: 23.1,
    emissionFactor: 0.022,
    curveShape: [0.46, 0.44, 0.44, 0.48, 0.56, 0.7, 0.84, 0.91, 0.94, 0.95, 0.93, 0.9, 0.89, 0.92, 0.94, 0.96, 0.99, 1.0, 0.94, 0.84, 0.74, 0.64, 0.55, 0.49],
  },
];

type TariffBand = "valle" | "intermedio" | "punta";

const getBandForHour = (hour: number): TariffBand => {
  if ((hour >= 10 && hour < 12) || (hour >= 17 && hour < 20)) return "punta";
  if ((hour >= 6 && hour < 10) || (hour >= 12 && hour < 17) || (hour >= 20 && hour < 22)) {
    return "intermedio";
  }
  return "valle";
};

const BAND_LABELS: Record<TariffBand, string> = {
  valle: "Horario valle",
  intermedio: "Horario intermedio",
  punta: "Horario punta",
};

export const DemandSimulatorPage: React.FC<DemandSimulatorPageProps> = ({
  onOpenDemo,
  onNavigateHome,
}) => {
  const [profileId, setProfileId] = useState<string>(PROFILES[0].id);
  const [contractedKw, setContractedKw] = useState<number>(850);
  const [thresholdPct, setThresholdPct] = useState<number>(85);
  const [selectedHour, setSelectedHour] = useState<number>(18);

  const profile = PROFILES.find((p) => p.id === profileId) ?? PROFILES[0];

  const simulation = useMemo(() => {
    const thresholdKw = (contractedKw * thresholdPct) / 100;
    const hourly = profile.curveShape.map((ratio, hour) => {
      const rawKw = Math.round(contractedKw * profile.peakMultiplier * ratio);
      const band = getBandForHour(hour);
      const controlledKw =
        band !== "valle" && rawKw > thresholdKw
          ? Math.round(thresholdKw + (rawKw - thresholdKw) * 0.18)
          : rawKw;
      return { hour, band, rawKw, controlledKw };
    });

    const maxRaw = Math.max(...hourly.map((h) => h.rawKw));
    const maxControlled = Math.max(...hourly.map((h) => h.controlledKw));
    const shavedKw = Math.max(12, maxRaw - maxControlled);
    const monthlySavingsUsd = Math.round(shavedKw * profile.tariffRateUsdKw * 1.35);
    const annualCo2Avoided = Number(
      ((shavedKw * 4.5 * 260 * profile.emissionFactor) / 1000 + shavedKw * 0.085).toFixed(1)
    );
    const avgLoad = hourly.reduce((acc, h) => acc + h.controlledKw, 0) / hourly.length;
    const loadFactorPct = Math.min(96, Math.round((avgLoad / maxControlled) * 100));

    return {
      thresholdKw: Math.round(thresholdKw),
      hourly,
      shavedKw,
      monthlySavingsUsd,
      annualCo2Avoided,
      loadFactorPct,
    };
  }, [contractedKw, profile, thresholdPct]);

  const activeHourData = simulation.hourly[selectedHour] ?? simulation.hourly[18];

  const jumpToBand = (band: TariffBand) => {
    if (band === "valle") setSelectedHour(2);
    else if (band === "intermedio") setSelectedHour(14);
    else setSelectedHour(18);
  };

  return (
    <div className="bg-[var(--bg-canvas)]">
      {/* Top Editorial Header with Transparent Recraft Breaker Node */}
      <section aria-labelledby="simulator-page-title" className="border-b border-[var(--border-subtle)]">
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
              [02] Simulador de demanda punta
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <h1
                data-reveal
                style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
                id="simulator-page-title"
                className="text-[30px] font-normal leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)] sm:text-[44px]"
              >
                Impacto tarifario y recorte en horario punta
              </h1>
              <p
                data-reveal
                style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
                className="mt-4 max-w-[540px] text-[14px] leading-[1.6] text-[var(--text-secondary)] sm:text-[15px]"
              >
                Ajuste la demanda contratada y el umbral preventivo de su operación en Costa Rica para estimar el ahorro mensual y la reducción de huella eléctrica.
              </p>

              {/* Profile Selector */}
              <div className="mt-6 flex flex-wrap gap-2">
                {PROFILES.map((item) => {
                  const isActive = item.id === profileId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setProfileId(item.id)}
                      aria-pressed={isActive}
                      className={`rounded-[6px] border px-3 py-2 text-[12px] font-medium transition-colors duration-150 cursor-pointer ${
                        isActive
                          ? "border-[#60a5fa]/60 bg-[#142238] text-[#60a5fa]"
                          : "border-white/12 bg-[#1a1b1b] text-[#a1a1aa] hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Transparent Recraft Substation Breaker Node */}
            <div className="flex items-center justify-center lg:col-span-5">
              <img
                src="/images/substation-breaker-node.png"
                alt="Controlador modular de demanda en subestación eléctrica"
                width={1024}
                height={1024}
                className="h-auto w-full max-w-[300px] select-none object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.65)] sm:max-w-[340px]"
              />
            </div>
          </div>
        </div>
      </section>

      <VerticalHatchDivider />

      {/* Interactive Simulator Workspace */}
      <section aria-label="Controles y resultados de simulación">
        <div className="rail-container bg-[var(--bg-surface-primary)] px-5 py-10 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
          {/* Mobile-first: 4 Live NumberFlow KPIs sit ABOVE controls so thumb never covers results */}
          <div className="grid grid-cols-2 divide-x divide-y divide-[var(--border-subtle)] border border-[var(--border-subtle)] lg:hidden">
            <div className="p-4">
              <span className="font-mono-tech text-[10.5px] text-[var(--text-muted)]">Demanda recortada</span>
              <div className="mt-1.5 font-mono-tech text-[24px] font-semibold text-[#60a5fa] tabular-nums">
                <NumberFlow value={simulation.shavedKw} suffix=" kW" className="nf-number" />
              </div>
            </div>
            <div className="p-4">
              <span className="font-mono-tech text-[10.5px] text-[var(--text-muted)]">Ahorro mensual</span>
              <div className="mt-1.5 font-mono-tech text-[24px] font-semibold text-[var(--text-primary)] tabular-nums">
                $<NumberFlow value={simulation.monthlySavingsUsd} className="nf-number" />
              </div>
            </div>
            <div className="p-4">
              <span className="font-mono-tech text-[10.5px] text-[var(--text-muted)]">Huella evitada / año</span>
              <div className="mt-1.5 font-mono-tech text-[22px] font-semibold text-[var(--text-primary)] tabular-nums">
                <NumberFlow
                  value={simulation.annualCo2Avoided}
                  format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
                  suffix=" t"
                  className="nf-number"
                />
              </div>
            </div>
            <div className="p-4">
              <span className="font-mono-tech text-[10.5px] text-[var(--text-muted)]">Factor de carga</span>
              <div className="mt-1.5 font-mono-tech text-[22px] font-semibold text-[var(--text-primary)] tabular-nums">
                <NumberFlow value={simulation.loadFactorPct} suffix="%" className="nf-number" />
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-0 lg:grid-cols-12 lg:gap-12">
            {/* Left Controls */}
            <div className="flex flex-col justify-between border-b border-[var(--border-subtle)] pb-8 lg:col-span-5 lg:border-r lg:border-b-0 lg:pr-10 lg:pb-0">
              <div className="space-y-8">
                <div>
                  <div className="flex items-baseline justify-between">
                    <label
                      htmlFor="contracted-kw-range"
                      className="text-[13px] font-medium text-[var(--text-primary)]"
                    >
                      Demanda contratada
                    </label>
                    <span className="font-mono-tech text-[18px] font-semibold text-[#60a5fa] tabular-nums">
                      <NumberFlow value={contractedKw} suffix=" kW" className="nf-number" />
                    </span>
                  </div>

                  <input
                    id="contracted-kw-range"
                    type="range"
                    min={200}
                    max={2400}
                    step={50}
                    value={contractedKw}
                    onChange={(e) => setContractedKw(Number(e.target.value))}
                    className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#60a5fa]"
                  />

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setContractedKw((v) => Math.max(200, v - 100))}
                      className="rounded-[6px] border border-white/14 bg-[#1a1b1b] px-3 py-1.5 font-mono-tech text-[11.5px] text-[#e4e4e7] transition-colors hover:border-white/30 cursor-pointer"
                    >
                      -100 kW
                    </button>
                    <span className="font-mono-tech text-[11px] text-[var(--text-muted)]">
                      200 – 2,400 kW
                    </span>
                    <button
                      type="button"
                      onClick={() => setContractedKw((v) => Math.min(2400, v + 100))}
                      className="rounded-[6px] border border-white/14 bg-[#1a1b1b] px-3 py-1.5 font-mono-tech text-[11.5px] text-[#e4e4e7] transition-colors hover:border-white/30 cursor-pointer"
                    >
                      +100 kW
                    </button>
                  </div>
                </div>

                <div className="border-t border-[var(--border-subtle)] pt-6">
                  <span className="block text-[13px] font-medium text-[var(--text-primary)]">
                    Umbral de recorte automático
                  </span>
                  <p className="mt-1 text-[12.5px] text-[var(--text-muted)]">
                    Límite preventivo ({simulation.thresholdKw} kW) antes de penalización.
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[80, 85, 90].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setThresholdPct(pct)}
                        aria-pressed={thresholdPct === pct}
                        className={`rounded-[6px] border py-2 font-mono-tech text-[12px] transition-colors duration-150 cursor-pointer ${
                          thresholdPct === pct
                            ? "border-[#60a5fa]/60 bg-[#142238] text-[#60a5fa]"
                            : "border-white/12 bg-[#1a1b1b] text-[#a1a1aa] hover:text-white"
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-[var(--border-subtle)] pt-6">
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="w-full rounded-[6px] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#111111] transition-colors hover:bg-[#e5e5e5] cursor-pointer"
                >
                  Solicitar estudio tarifario para mi planta
                </button>
              </div>
            </div>

            {/* Right Metrics & Interactive 24h Curve */}
            <div className="lg:col-span-7">
              {/* Desktop 4-KPI strip */}
              <div className="hidden grid-cols-4 divide-x divide-[var(--border-subtle)] border-b border-[var(--border-subtle)] pb-6 lg:grid">
                <div className="pr-4">
                  <span className="font-mono-tech text-[11px] text-[var(--text-muted)]">Demanda recortada</span>
                  <div className="mt-1.5 font-mono-tech text-[28px] font-semibold text-[#60a5fa] tabular-nums">
                    <NumberFlow value={simulation.shavedKw} suffix=" kW" className="nf-number" />
                  </div>
                </div>
                <div className="px-4">
                  <span className="font-mono-tech text-[11px] text-[var(--text-muted)]">Ahorro mensual</span>
                  <div className="mt-1.5 font-mono-tech text-[28px] font-semibold text-[var(--text-primary)] tabular-nums">
                    $<NumberFlow value={simulation.monthlySavingsUsd} className="nf-number" />
                  </div>
                </div>
                <div className="px-4">
                  <span className="font-mono-tech text-[11px] text-[var(--text-muted)]">Huella evitada / año</span>
                  <div className="mt-1.5 font-mono-tech text-[28px] font-semibold text-[var(--text-primary)] tabular-nums">
                    <NumberFlow
                      value={simulation.annualCo2Avoided}
                      format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
                      suffix=" t"
                      className="nf-number"
                    />
                  </div>
                </div>
                <div className="pl-4">
                  <span className="font-mono-tech text-[11px] text-[var(--text-muted)]">Factor de carga</span>
                  <div className="mt-1.5 font-mono-tech text-[28px] font-semibold text-[var(--text-primary)] tabular-nums">
                    <NumberFlow value={simulation.loadFactorPct} suffix="%" className="nf-number" />
                  </div>
                </div>
              </div>

              {/* 24h Curve Header + Mobile Band Shortcuts */}
              <div className="mt-0 flex flex-wrap items-center justify-between gap-3 pt-2 lg:mt-6 lg:pt-0">
                <div>
                  <span className="font-mono-tech text-[11.5px] text-[var(--text-primary)]">
                    Perfil horario 24 h · {String(activeHourData.hour).padStart(2, "0")}:00
                  </span>
                  <p className="mt-0.5 font-mono-tech text-[11px] text-[#60a5fa]">
                    {BAND_LABELS[activeHourData.band]} · Base {activeHourData.rawKw} kW → Controlado {activeHourData.controlledKw} kW
                  </p>
                </div>

                <div className="flex gap-1.5">
                  {(["valle", "intermedio", "punta"] as TariffBand[]).map((band) => (
                    <button
                      key={band}
                      type="button"
                      onClick={() => jumpToBand(band)}
                      aria-pressed={activeHourData.band === band}
                      className={`rounded-[6px] border px-2.5 py-1 font-mono-tech text-[10.5px] transition-colors cursor-pointer ${
                        activeHourData.band === band
                          ? "border-[#60a5fa]/60 bg-[#142238] text-[#60a5fa]"
                          : "border-white/10 bg-[#1a1b1b] text-[#a1a1aa]"
                      }`}
                    >
                      {band.charAt(0).toUpperCase() + band.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive 24-hour SVG Bar Chart */}
              <div className="mt-4 border border-[var(--border-subtle)] bg-[#111212] p-4">
                <div className="flex h-[180px] items-end gap-1 sm:h-[210px] sm:gap-1.5">
                  {simulation.hourly.map((h) => {
                    const maxScale = contractedKw * 1.1;
                    const rawPct = Math.min(100, Math.round((h.rawKw / maxScale) * 100));
                    const ctrlPct = Math.min(100, Math.round((h.controlledKw / maxScale) * 100));
                    const isSelected = h.hour === selectedHour;
                    const isPeak = h.band === "punta";

                    return (
                      <button
                        key={h.hour}
                        type="button"
                        onMouseEnter={() => setSelectedHour(h.hour)}
                        onClick={() => setSelectedHour(h.hour)}
                        aria-label={`Hora ${h.hour}:00, carga controlada ${h.controlledKw} kW`}
                        className="group relative flex h-full flex-1 flex-col justify-end focus:outline-none cursor-pointer"
                      >
                        {rawPct > ctrlPct && (
                          <span
                            style={{ height: `${rawPct}%` }}
                            className="absolute inset-x-0 bottom-0 rounded-t-[2px] bg-white/[0.08]"
                          />
                        )}
                        <span
                          style={{ height: `${ctrlPct}%` }}
                          className={`relative z-10 w-full rounded-t-[2px] transition-colors duration-150 ${
                            isSelected
                              ? "bg-[#60a5fa]"
                              : isPeak
                                ? "bg-[#3b82f6]/60 group-hover:bg-[#60a5fa]"
                                : "bg-white/25 group-hover:bg-white/45"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2.5 flex justify-between font-mono-tech text-[10px] text-[var(--text-muted)]">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
