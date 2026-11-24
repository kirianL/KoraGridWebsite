import React, { useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import topologyData from "world-atlas/countries-50m.json";
import { useLocale } from "../i18n/LocaleContext";

interface RegionalTelemetryMapProps {
  onOpenDemo: () => void;
}

interface CountryProperties {
  name: string;
}

const WIDTH = 660;
const HEIGHT = 500;

export const RegionalTelemetryMap: React.FC<RegionalTelemetryMapProps> = ({
  onOpenDemo,
}) => {
  const { isEn } = useLocale();
  const countryPaths = useMemo(() => {
    const projection = geoMercator()
      .center([-84.15, 9.75])
      .scale(4600)
      .translate([WIDTH * 0.5, HEIGHT * 0.5]);
    const pathGen = geoPath(projection);

    const topo = topologyData as unknown as Topology<{
      countries: GeometryCollection<CountryProperties>;
    }>;
    const countries = feature(topo, topo.objects.countries).features;

    return countries
      .filter((c) => c.properties?.name !== "Antarctica")
      .map((c, idx) => {
        const d = pathGen(c);
        const name = c.properties?.name ?? `country-${idx}`;
        return {
          key: `${name}-${idx}`,
          name,
          d: d ?? "",
          isCostaRica: name === "Costa Rica",
        };
      })
      .filter((c) => c.d.length > 0);
  }, []);

  return (
    <section
      id="cobertura"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)]"
    >
      <div className="rail-container grid grid-cols-1 items-stretch overflow-hidden bg-[var(--bg-surface-primary)] lg:grid-cols-12">
        {/* Clean Left Editorial Column */}
        <div className="relative z-10 flex flex-col justify-center px-5 pt-12 pb-6 sm:px-10 sm:pt-20 sm:pb-10 lg:col-span-5 lg:py-24 lg:pr-6 lg:pl-12">
          <h2
            data-reveal
            style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
            className="text-[28px] font-normal leading-[1.12] tracking-[-0.025em] text-[var(--text-primary)] sm:text-[38px]"
          >
            {isEn ? "National coverage in Costa Rica" : "Operación nacional en Costa Rica"}
          </h2>
          <p
            data-reveal
            style={{ "--reveal-delay": "75ms" } as React.CSSProperties}
            className="mt-3.5 max-w-[390px] text-[14px] leading-[1.6] text-[var(--text-secondary)] sm:mt-4 sm:text-[14.5px]"
          >
            {isEn
              ? "Energy telemetry and environmental auditing deployed across Free Trade Zones, hospitality, agribusiness, and logistics centers nationwide, scaling into Central America."
              : "Telemetría energética y auditoría ambiental desplegada en zonas francas, hotelería, agroindustria y centros logísticos en todo el país, con proyección hacia Centroamérica."}
          </p>

          <div
            data-reveal
            style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
            className="mt-5 sm:mt-6"
          >
            <button
              type="button"
              onClick={onOpenDemo}
              className="w-full rounded-[6px] bg-[#ffffff] px-4 py-2.5 text-[12.5px] font-semibold text-[#111111] transition-colors duration-150 hover:bg-[#e5e5e5] sm:w-auto sm:py-2 cursor-pointer"
            >
              {isEn ? "Check coverage" : "Consultar cobertura"}
            </button>
          </div>
        </div>

        {/* Right Free Full-Bleed Map (no box/container, flows top-to-bottom edge-to-edge) */}
        <div
          data-reveal
          style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
          className="relative min-h-[280px] overflow-hidden sm:min-h-[420px] lg:col-span-7 lg:min-h-[480px]"
        >
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full select-none"
            role="img"
            aria-label="Mapa de cobertura operativa de KoraGrid en Costa Rica"
          >
            <g>
              {countryPaths.map((c) => (
                <path
                  key={c.key}
                  d={c.d}
                  fill={c.isCostaRica ? "#1e40af" : "#1f2221"}
                  fillOpacity={c.isCostaRica ? 1 : 0.85}
                  stroke={c.isCostaRica ? "#60a5fa" : "#141414"}
                  strokeWidth={c.isCostaRica ? 1.4 : 0.8}
                />
              ))}
            </g>
          </svg>

          {/* Subtle left gradient blend into editorial column */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-[#141414] to-transparent lg:block"
          />
        </div>
      </div>
    </section>
  );
};
