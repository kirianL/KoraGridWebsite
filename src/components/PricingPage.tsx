import React, { useState } from "react";
import { MotionConfig, motion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { useLocale } from "../i18n/LocaleContext";
import { VerticalHatchDivider } from "./VerticalHatchDivider";

interface PricingPageProps {
  onOpenDemo: () => void;
  onBackHome: () => void;
}

type BillingCycle = "annual" | "monthly";

interface TierSpec {
  id: string;
  name: string;
  summary: string;
  monthlyPrice: string;
  annualPrice: string;
  unitLabel: string;
  highlighted?: boolean;
  ctaLabel: string;
  features: string[];
}

interface MatrixRow {
  label: string;
  monitor: string;
  compliance: string;
  enterprise: string;
}

const PRICING_COPY: Record<
  "es" | "en",
  {
    heroTitle: string;
    heroSubtitle: string;
    backLabel: string;
    annualLabel: string;
    monthlyLabel: string;
    tiers: TierSpec[];
    matrixTitle: string;
    matrixHeaders: [string, string, string, string];
    matrixRows: MatrixRow[];
  }
> = {
  es: {
    heroTitle: "Precios por circuito y planta",
    heroSubtitle:
      "Hardware estándar Modbus/MQTT y respaldo auditable sin costos ocultos por usuario.",
    backLabel: "Volver a inicio",
    annualLabel: "Anual (-20%)",
    monthlyLabel: "Mensual",
    tiers: [
      {
        id: "monitor",
        name: "Monitor",
        summary: "Para una sola planta o edificio comercial.",
        monthlyPrice: "$490",
        annualPrice: "$390",
        unitLabel: "/mes",
        ctaLabel: "Solicitar demo",
        features: [
          "Hasta 12 circuitos monitoreados",
          "Alertas de pico en ventana de 15 min",
          "Modbus TCP / MQTT en vivo",
          "Retención de 12 meses",
        ],
      },
      {
        id: "compliance",
        name: "Compliance",
        summary: "Multi-sede con trazabilidad ISO 14064 y Programa País 2.0.",
        monthlyPrice: "$1,250",
        annualPrice: "$990",
        unitLabel: "/mes",
        highlighted: true,
        ctaLabel: "Solicitar demo",
        features: [
          "Hasta 60 circuitos en 5 sedes",
          "Exportación ISO 14064-1, GRI y Programa País",
          "Modelado de tarifa horaria ICE / CNFL / JASEC",
          "API REST y webhooks",
        ],
      },
      {
        id: "enterprise",
        name: "Grid Enterprise",
        summary: "Para zonas francas, parques industriales y cargas críticas.",
        monthlyPrice: "A medida",
        annualPrice: "A medida",
        unitLabel: "por subestación",
        ctaLabel: "Hablar con ingeniería",
        features: [
          "Circuitos y subestaciones ilimitadas",
          "Colector edge redundante u on-premise",
          "Conectores SCADA, SAP y BMS",
          "SLA 99.95% e ingeniería en sitio",
        ],
      },
    ],
    matrixTitle: "Especificaciones técnicas",
    matrixHeaders: ["Capacidad", "Monitor", "Compliance", "Grid Enterprise"],
    matrixRows: [
      {
        label: "Frecuencia de muestreo",
        monitor: "1 segundo",
        compliance: "1 segundo",
        enterprise: "Sub-segundo / Ciclo",
      },
      {
        label: "Protocolos de medidor",
        monitor: "Modbus TCP / RTU",
        compliance: "Modbus, MQTT, BACnet",
        enterprise: "Modbus, MQTT, OPC-UA, DNP3",
      },
      {
        label: "Exportación auditable ESG",
        monitor: "CSV / JSON",
        compliance: "ISO 14064 + Programa País",
        enterprise: "Personalizado + Firma digital",
      },
      {
        label: "Retención histórica",
        monitor: "12 meses",
        compliance: "36 meses",
        enterprise: "60+ meses",
      },
      {
        label: "Control de acceso",
        monitor: "Hasta 5 usuarios",
        compliance: "Ilimitados",
        enterprise: "Ilimitados + SSO / SAML",
      },
    ],
  },
  en: {
    heroTitle: "Pricing per circuit and facility",
    heroSubtitle:
      "Standard Modbus/MQTT hardware and audit-ready records with no per-seat fees.",
    backLabel: "Back to home",
    annualLabel: "Annual (-20%)",
    monthlyLabel: "Monthly",
    tiers: [
      {
        id: "monitor",
        name: "Monitor",
        summary: "For a single industrial plant or commercial building.",
        monthlyPrice: "$490",
        annualPrice: "$390",
        unitLabel: "/mo",
        ctaLabel: "Request demo",
        features: [
          "Up to 12 monitored circuits",
          "15-minute utility peak demand alerts",
          "Live Modbus TCP / MQTT sync",
          "12-month telemetry retention",
        ],
      },
      {
        id: "compliance",
        name: "Compliance",
        summary: "Multi-site control for ISO 14064 and Programa País 2.0.",
        monthlyPrice: "$1,250",
        annualPrice: "$990",
        unitLabel: "/mo",
        highlighted: true,
        ctaLabel: "Request demo",
        features: [
          "Up to 60 circuits across 5 sites",
          "ISO 14064-1, GRI & Programa País exports",
          "Time-of-use tariff modeling (ICE / CNFL / JASEC)",
          "REST API & webhooks",
        ],
      },
      {
        id: "enterprise",
        name: "Grid Enterprise",
        summary: "For Free Trade Zones, industrial parks, and critical loads.",
        monthlyPrice: "Custom",
        annualPrice: "Custom",
        unitLabel: "by substation",
        ctaLabel: "Talk to engineering",
        features: [
          "Unlimited circuits and substations",
          "Redundant edge or on-premise collector",
          "SCADA, SAP & BMS connectors",
          "99.95% SLA & on-site engineering",
        ],
      },
    ],
    matrixTitle: "Technical specifications",
    matrixHeaders: ["Capability", "Monitor", "Compliance", "Grid Enterprise"],
    matrixRows: [
      {
        label: "Sampling cadence",
        monitor: "1 second",
        compliance: "1 second",
        enterprise: "Sub-second / Cycle",
      },
      {
        label: "Meter protocols",
        monitor: "Modbus TCP / RTU",
        compliance: "Modbus, MQTT, BACnet",
        enterprise: "Modbus, MQTT, OPC-UA, DNP3",
      },
      {
        label: "ESG audit exports",
        monitor: "CSV / JSON",
        compliance: "ISO 14064 + Programa País",
        enterprise: "Custom + Signed ledger",
      },
      {
        label: "Historical retention",
        monitor: "12 months",
        compliance: "36 months",
        enterprise: "60+ months",
      },
      {
        label: "Access control",
        monitor: "Up to 5 seats",
        compliance: "Unlimited",
        enterprise: "Unlimited + SSO / SAML",
      },
    ],
  },
};

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenDemo, onBackHome }) => {
  const { locale } = useLocale();
  const copy = PRICING_COPY[locale];
  const [billing, setBilling] = useState<BillingCycle>("annual");

  return (
    <main>
      {/* Dark Hero Header matching landing page rails */}
      <section className="relative bg-[var(--bg-canvas)]">
        <div className="rail-container bg-[var(--bg-surface-primary)] px-5 pb-8 pt-7 sm:px-12 sm:pb-10 sm:pt-9 lg:px-16">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 font-mono-tech text-[11.5px] text-[var(--text-secondary)] transition-colors hover:text-white cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {copy.backLabel}
          </button>

          <h1 className="mt-4 max-w-[680px] text-[30px] font-medium leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)] sm:text-[42px]">
            {copy.heroTitle}
          </h1>
          <p className="mt-3 max-w-[560px] text-[14.5px] leading-[1.55] text-[var(--text-secondary)] sm:text-[15.5px]">
            {copy.heroSubtitle}
          </p>

          <div className="mt-6 flex items-center border-t border-[var(--border-subtle)] pt-5">
            <MotionConfig reducedMotion="user">
              <div
                role="group"
                aria-label={locale === "en" ? "Billing cycle" : "Ciclo de facturación"}
                className="inline-flex items-center rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-1 font-mono-tech text-[11.5px]"
              >
                {(
                  [
                    { id: "annual" as BillingCycle, label: copy.annualLabel },
                    { id: "monthly" as BillingCycle, label: copy.monthlyLabel },
                  ] as const
                ).map((option) => {
                  const isActive = billing === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setBilling(option.id)}
                      className={`relative rounded-[4px] px-3 py-1.5 transition-colors duration-150 cursor-pointer ${
                        isActive
                          ? "font-medium text-[#111111]"
                          : "text-[var(--text-secondary)] hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="billing-pill"
                          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                          className="absolute inset-0 rounded-[4px] bg-white"
                        />
                      )}
                      <span className="relative z-10">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </MotionConfig>
          </div>
        </div>
      </section>

      <VerticalHatchDivider />

      {/* Light Pricing Tiers Section with KoraGrid corner-square cards */}
      <section className="border-t border-b border-[var(--border-light-subtle)] bg-[var(--bg-light-canvas)] text-[var(--text-on-light-primary)]">
        <div className="rail-container-light bg-[var(--bg-light-canvas)] px-5 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {copy.tiers.map((tier) => {
              const price = billing === "annual" ? tier.annualPrice : tier.monthlyPrice;
              return (
                <article
                  key={tier.id}
                  className={`group relative flex flex-col justify-between border p-5 transition-colors duration-300 sm:p-6 ${
                    tier.highlighted
                      ? "border-[#3b82f6] bg-white hover:border-[#2563eb]"
                      : "border-[var(--border-light-subtle)] bg-[var(--bg-light-canvas)] hover:border-[var(--border-light-strong)]"
                  }`}
                >
                  {/* Always-visible luminous bright-blue top shader wash for Compliance */}
                  {tier.highlighted && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-32 overflow-hidden opacity-95 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <div
                        className="kg-blue-shader-drift absolute -inset-4"
                        style={{
                          background:
                            "radial-gradient(ellipse 55% 85% at 15% 15%, rgba(147, 197, 253, 0.95) 0%, transparent 62%), radial-gradient(ellipse 50% 80% at 52% 10%, rgba(56, 189, 248, 0.85) 0%, transparent 58%), radial-gradient(ellipse 55% 85% at 88% 18%, rgba(37, 99, 235, 0.92) 0%, transparent 64%), linear-gradient(115deg, rgba(219, 234, 254, 0.65) 0%, rgba(59, 130, 246, 0.55) 52%, rgba(29, 78, 216, 0.72) 100%)",
                        }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 56%, #ffffff 100%)",
                        }}
                      />
                    </div>
                  )}

                  <span aria-hidden="true" className="absolute -top-[2px] -left-[2px] z-20 h-1 w-1 bg-[#111827]" />
                  <span aria-hidden="true" className="absolute -top-[2px] -right-[2px] z-20 h-1 w-1 bg-[#111827]" />
                  <span aria-hidden="true" className="absolute -bottom-[2px] -left-[2px] z-20 h-1 w-1 bg-[#111827]" />
                  <span aria-hidden="true" className="absolute -bottom-[2px] -right-[2px] z-20 h-1 w-1 bg-[#111827]" />

                  <div className="relative z-10">
                    <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[var(--text-on-light-primary)]">
                      {tier.name}
                    </h2>

                    <p className="mt-2.5 text-[13.5px] leading-[1.55] text-[var(--text-on-light-secondary)]">
                      {tier.summary}
                    </p>

                    <div className="mt-6 flex items-baseline gap-1.5 border-t border-[var(--border-light-subtle)] pt-5">
                      <span className="font-mono-tech text-[32px] font-semibold tracking-tight tabular-nums text-[var(--text-on-light-primary)]">
                        {(() => {
                          const numeric = Number(price.replace(/[^0-9.]/g, ""));
                          if (price.startsWith("$") && Number.isFinite(numeric) && numeric > 0) {
                            return (
                              <NumberFlow
                                value={numeric}
                                format={{
                                  style: "currency",
                                  currency: "USD",
                                  maximumFractionDigits: 0,
                                }}
                                transformTiming={{
                                  duration: 380,
                                  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                                }}
                                spinTiming={{
                                  duration: 380,
                                  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                                }}
                              />
                            );
                          }
                          return price;
                        })()}
                      </span>
                      <span className="font-mono-tech text-[12px] text-[var(--text-on-light-secondary)]">
                        {tier.unitLabel}
                      </span>
                    </div>

                    <ul className="mt-6 space-y-2.5 border-t border-[var(--border-light-subtle)] pt-5">
                      {tier.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2.5 text-[13px] leading-[1.5] text-[var(--text-on-light-secondary)]"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                            className="mt-[3px] shrink-0 text-[#2563eb]"
                          >
                            <path
                              d="M3.5 8.5L6.5 11.5L12.5 4.5"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative z-10 mt-8 pt-2">
                    <button
                      type="button"
                      onClick={onOpenDemo}
                      className={`w-full rounded-[4px] px-4 py-2.5 text-[12.5px] font-medium transition-[colors,transform] duration-150 active:scale-[0.98] cursor-pointer ${
                        tier.highlighted
                          ? "bg-[#111827] text-white hover:bg-[#2563eb]"
                          : "border border-[var(--border-light-strong)] bg-white text-[#111827] hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white"
                      }`}
                    >
                      {tier.ctaLabel}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Technical Comparison Matrix */}
          <div className="mt-16 border-t border-[var(--border-light-subtle)] pt-12 sm:mt-20 sm:pt-16">
            <h2 className="text-[24px] font-medium tracking-[-0.02em] text-[var(--text-on-light-primary)] sm:text-[30px]">
              {copy.matrixTitle}
            </h2>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--border-light-strong)]">
                    {copy.matrixHeaders.map((header, i) => (
                      <th
                        key={header}
                        className={`py-3 font-mono-tech text-[11.5px] font-medium text-[var(--text-on-light-muted)] ${
                          i === 0 ? "pr-4" : "px-4"
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {copy.matrixRows.map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-[var(--border-light-subtle)] text-[13.5px]"
                    >
                      <td className="py-3.5 pr-4 font-medium text-[var(--text-on-light-primary)]">
                        {row.label}
                      </td>
                      <td className="px-4 py-3.5 font-mono-tech text-[12px] text-[var(--text-on-light-secondary)]">
                        {row.monitor}
                      </td>
                      <td className="px-4 py-3.5 font-mono-tech text-[12px] text-[var(--text-on-light-primary)]">
                        {row.compliance}
                      </td>
                      <td className="px-4 py-3.5 font-mono-tech text-[12px] text-[var(--text-on-light-secondary)]">
                        {row.enterprise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
