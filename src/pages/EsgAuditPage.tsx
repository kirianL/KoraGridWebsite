import React, { useMemo, useState } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import { VerticalHatchDivider } from "../components/VerticalHatchDivider";

interface EsgAuditPageProps {
  onOpenDemo: () => void;
  onNavigateHome: () => void;
}

interface AuditStratum {
  id: string;
  code: string;
  title: string;
  description: string;
  standardTag: string;
}

const STRATA: AuditStratum[] = [
  {
    id: "capture",
    code: "01",
    title: "Captura física en medidor",
    description:
      "Cada lectura de energía activa, reactiva y caudal de combustible se registra con marca temporal NTP y firma local sin intervención en hojas de cálculo.",
    standardTag: "IEC 62053-22 · Muestreo continuo",
  },
  {
    id: "factors",
    code: "02",
    title: "Factores oficiales de Costa Rica",
    description:
      "Aplicación automática de los factores de emisión del Sistema Eléctrico Nacional (SEN) y combustibles fósiles vigentes ante el MINAE.",
    standardTag: "Programa País Carbono Neutralidad 2.0",
  },
  {
    id: "ledger",
    code: "03",
    title: "Expediente ISO 14064 y GRI",
    description:
      "Generación de paquetes auditables con anexos metodológicos listos para verificadores externos, Bandera Azul Ecológica y compradores de exportación.",
    standardTag: "ISO 14064-1 · GRI 302 / 305",
  },
];

interface EnergySource {
  id: string;
  label: string;
  scope: "Alcance 1" | "Alcance 2";
  unit: "MWh" | "L";
  min: number;
  max: number;
  step: number;
  defaultQty: number;
  factorValue: number;
  factorUnit: string;
  toTonsFactor: number;
}

const SOURCES: EnergySource[] = [
  {
    id: "sen-grid",
    label: "Red eléctrica nacional SEN",
    scope: "Alcance 2",
    unit: "MWh",
    min: 20,
    max: 600,
    step: 10,
    defaultQty: 180,
    factorValue: 0.024,
    factorUnit: "tCO2e / MWh",
    toTonsFactor: 0.024,
  },
  {
    id: "diesel-boiler",
    label: "Calderas industriales diésel",
    scope: "Alcance 1",
    unit: "L",
    min: 500,
    max: 15000,
    step: 250,
    defaultQty: 4500,
    factorValue: 2.68,
    factorUnit: "kgCO2e / L",
    toTonsFactor: 0.00268,
  },
  {
    id: "solar-pv",
    label: "Autoconsumo solar fotovoltaico",
    scope: "Alcance 2",
    unit: "MWh",
    min: 10,
    max: 300,
    step: 10,
    defaultQty: 90,
    factorValue: 0.0,
    factorUnit: "tCO2e / MWh",
    toTonsFactor: 0.0,
  },
  {
    id: "cold-chain",
    label: "Sistemas de enfriamiento",
    scope: "Alcance 1",
    unit: "MWh",
    min: 20,
    max: 400,
    step: 10,
    defaultQty: 140,
    factorValue: 0.038,
    factorUnit: "tCO2e / MWh",
    toTonsFactor: 0.038,
  },
];

export const EsgAuditPage: React.FC<EsgAuditPageProps> = ({
  onOpenDemo,
  onNavigateHome,
}) => {
  const [stratumIdx, setStratumIdx] = useState(0);
  const [sourceId, setSourceId] = useState<string>(SOURCES[0].id);
  const [quantity, setQuantity] = useState<number>(SOURCES[0].defaultQty);
  const [verifiedHash, setVerifiedHash] = useState<boolean>(false);

  const activeStratum = STRATA[stratumIdx] ?? STRATA[0];
  const activeSource = SOURCES.find((s) => s.id === sourceId) ?? SOURCES[0];

  const handleSelectSource = (next: EnergySource) => {
    setSourceId(next.id);
    setQuantity(next.defaultQty);
    setVerifiedHash(false);
  };

  const tonsCo2e = useMemo(
    () => Number((quantity * activeSource.toTonsFactor).toFixed(2)),
    [activeSource.toTonsFactor, quantity]
  );

  const shaPreview = useMemo(() => {
    const seed = `${activeSource.id}-${quantity}-${activeStratum.code}`;
    let hash = 2166136261;
    for (let i = 0; i < seed.length; i++) {
      hash ^= seed.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    const hex = (hash >>> 0).toString(16).padStart(8, "0");
    return `sha256:9f4a${hex}c18e2b70d4`;
  }, [activeSource.id, activeStratum.code, quantity]);

  return (
    <div className="bg-[var(--bg-canvas)]">
      {/* Top 3-Layer Certification Architecture */}
      <section aria-labelledby="audit-page-title" className="border-b border-[var(--border-subtle)]">
        <div className="rail-container bg-[var(--bg-surface-primary)] px-5 py-10 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
            <button
              type="button"
              onClick={onNavigateHome}
              className="font-mono-tech text-[12px] text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text-primary)] cursor-pointer"
            >
              ← Volver al inicio
            </button>
            <span className="font-mono-tech text-[11.5px] text-[#4ade80]">
              [03] Metodología y auditoría ESG
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <h1
                data-reveal
                style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
                id="audit-page-title"
                className="text-[30px] font-normal leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)] sm:text-[42px]"
              >
                Del kilovatio-hora al expediente certificable
              </h1>
              <p
                data-reveal
                style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
                className="mt-4 text-[14px] leading-[1.6] text-[var(--text-secondary)] sm:text-[15px]"
              >
                Explore los tres estratos de validación técnica que transforman mediciones de planta en respaldos verificables sin hojas de cálculo.
              </p>

              {/* 3 Strata Selector */}
              <div className="mt-7 divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)]">
                {STRATA.map((item, idx) => {
                  const isActive = idx === stratumIdx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setStratumIdx(idx)}
                      aria-pressed={isActive}
                      className="flex w-full items-center justify-between py-3.5 text-left transition-colors duration-150 cursor-pointer"
                    >
                      <span className={`text-[14.5px] ${isActive ? "font-medium text-white" : "text-[var(--text-muted)] hover:text-[#d4d4d8]"}`}>
                        <span className={`mr-2.5 font-mono-tech text-[11px] ${isActive ? "text-[#4ade80]" : ""}`}>
                          [{item.code}]
                        </span>
                        {item.title}
                      </span>
                      <span className={`font-mono-tech text-[11px] ${isActive ? "text-[#4ade80]" : "text-[var(--text-muted)]"}`}>
                        {isActive ? "Activo" : "→"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 min-h-[92px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStratum.id}
                    initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="font-mono-tech text-[11px] text-[#4ade80]">
                      {activeStratum.standardTag}
                    </span>
                    <p className="mt-2 text-[14px] leading-[1.6] text-[var(--text-secondary)]">
                      {activeStratum.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: Transparent Recraft 3-Layer Prism */}
            <div className="relative flex flex-col items-center justify-center lg:col-span-6">
              <div className="relative w-full max-w-[360px] py-4">
                <img
                  src="/images/audit-layered-prism.png"
                  alt="Estratos de vidrio óptico y grafito de auditoría ESG KoraGrid"
                  width={1024}
                  height={1024}
                  style={{
                    transform: `translateY(${(stratumIdx - 1) * 8}px)`,
                  }}
                  className="mx-auto h-auto w-full select-none object-contain transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] drop-shadow-[0_24px_48px_rgba(0,0,0,0.65)]"
                />
                <div className="mt-2 flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono-tech text-[11px] text-[var(--text-muted)]">
                  <span>Estrato activo [{activeStratum.code}]</span>
                  <span className="text-[#4ade80]">{activeStratum.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VerticalHatchDivider />

      {/* Interactive Emissions Converter & Cryptographic Evidence */}
      <section aria-labelledby="converter-title">
        <div className="rail-container bg-[var(--bg-surface-primary)] px-5 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
          <div className="flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="converter-title"
                className="text-[24px] font-normal leading-[1.15] tracking-[-0.025em] text-[var(--text-primary)] sm:text-[32px]"
              >
                Conversor de emisiones y firma de respaldo
              </h2>
              <p className="mt-2 max-w-[540px] text-[13.5px] leading-[1.55] text-[var(--text-secondary)]">
                Seleccione una fuente energética y ajuste el consumo mensual para calcular el inventario bajo factores de Costa Rica.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenDemo}
              className="w-full rounded-[6px] bg-white px-4 py-2 text-[12.5px] font-semibold text-[#111111] transition-colors hover:bg-[#e5e5e5] sm:w-auto cursor-pointer"
            >
              Exportar muestra ISO 14064
            </button>
          </div>

          {/* Energy Source Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {SOURCES.map((src) => {
              const isActive = src.id === sourceId;
              return (
                <button
                  key={src.id}
                  type="button"
                  onClick={() => handleSelectSource(src)}
                  aria-pressed={isActive}
                  className={`rounded-[6px] border px-3 py-2 text-[12px] font-medium transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? "border-[#4ade80]/60 bg-[#17281e] text-[#4ade80]"
                      : "border-white/12 bg-[#1a1b1b] text-[#a1a1aa] hover:text-white"
                  }`}
                >
                  {src.label}
                </button>
              );
            })}
          </div>

          {/* Consumption Slider + Editorial Hairline Table */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="esg-quantity-range"
                  className="text-[13px] font-medium text-[var(--text-primary)]"
                >
                  Consumo mensual ({activeSource.unit})
                </label>
                <span className="font-mono-tech text-[20px] font-semibold text-[#4ade80] tabular-nums">
                  <NumberFlow value={quantity} suffix={` ${activeSource.unit}`} className="nf-number" />
                </span>
              </div>

              <input
                id="esg-quantity-range"
                type="range"
                min={activeSource.min}
                max={activeSource.max}
                step={activeSource.step}
                value={quantity}
                onChange={(e) => {
                  setQuantity(Number(e.target.value));
                  setVerifiedHash(false);
                }}
                className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#4ade80]"
              />

              <div className="mt-3 flex justify-between font-mono-tech text-[11px] text-[var(--text-muted)]">
                <span>
                  {activeSource.min} {activeSource.unit}
                </span>
                <span>
                  {activeSource.max} {activeSource.unit}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)]">
                <div className="flex items-center justify-between py-3.5">
                  <span className="text-[13px] text-[var(--text-secondary)]">Clasificación GEI</span>
                  <span className="font-mono-tech text-[13px] text-[var(--text-primary)]">
                    {activeSource.scope}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3.5">
                  <span className="text-[13px] text-[var(--text-secondary)]">Factor oficial aplicado</span>
                  <span className="font-mono-tech text-[13px] text-[var(--text-primary)] tabular-nums">
                    <NumberFlow
                      value={activeSource.factorValue}
                      format={{ minimumFractionDigits: 3, maximumFractionDigits: 3 }}
                      suffix={` ${activeSource.factorUnit}`}
                      className="nf-number"
                    />
                  </span>
                </div>
                <div className="flex items-center justify-between py-3.5">
                  <span className="text-[13px] text-[var(--text-secondary)]">Emisiones equivalentes</span>
                  <span className="font-mono-tech text-[22px] font-semibold text-[#4ade80] tabular-nums">
                    <NumberFlow
                      value={tonsCo2e}
                      format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                      suffix=" tCO2e"
                      className="nf-number"
                    />
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                  <div>
                    <span className="block text-[12px] text-[var(--text-secondary)]">
                      Registro inmutable de auditoría
                    </span>
                    <span className="font-mono-tech text-[11.5px] text-[var(--text-muted)]">
                      {shaPreview}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVerifiedHash(true)}
                    className={`rounded-[6px] border px-3 py-1.5 font-mono-tech text-[11.5px] transition-colors cursor-pointer ${
                      verifiedHash
                        ? "border-[#4ade80]/60 bg-[#17281e] text-[#4ade80]"
                        : "border-white/14 bg-[#1a1b1b] text-white hover:border-white/30"
                    }`}
                  >
                    {verifiedHash ? "Firma verificada · Lista" : "Verificar firma de auditoría"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
