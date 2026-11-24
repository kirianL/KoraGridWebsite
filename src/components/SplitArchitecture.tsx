import React from "react";
import { SPLIT_ARCHITECTURE } from "../data/koragrid";
import { AuditLedgerIcon, CircuitMeterIcon, PulseWaveIcon } from "./Icons";
import { TelemetryArchitectureSvg } from "./TelemetryArchitectureSvg";

export const SplitArchitecture: React.FC = () => {
  return (
    <section id="arquitectura" className="bg-[var(--bg-canvas)]">
      <div className="rail-container grid grid-cols-1 items-center bg-[var(--bg-surface-primary)] px-5 py-12 sm:px-12 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:px-16 lg:py-24">
        <div className="lg:col-span-6">
          <p
            data-reveal
            style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
            className="text-[18px] font-normal leading-[1.48] tracking-[-0.015em] text-[#9a9a9e] sm:text-[23px] sm:leading-[1.42]"
          >
            Los equipos de ingeniería integran telemetría en vivo{" "}
            <PulseWaveIcon className="mx-1 inline h-[18px] w-[18px] -translate-y-[1px] text-[#e4e4e7] sm:h-[21px] sm:w-[21px]" />
            , submedición por circuito{" "}
            <CircuitMeterIcon className="mx-1 inline h-[18px] w-[18px] -translate-y-[1px] text-[#e4e4e7] sm:h-[21px] sm:w-[21px]" />
            , auditoría Alcance 1 y 2{" "}
            <AuditLedgerIcon className="mx-1 inline h-[18px] w-[18px] -translate-y-[1px] text-[#e4e4e7] sm:h-[21px] sm:w-[21px]" />{" "}
            y alertas de demanda en sus plantas.
          </p>

          <p
            data-reveal
            style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
            className="mt-5 text-[16px] font-normal leading-[1.52] tracking-[-0.01em] text-[#9a9a9e] sm:mt-7 sm:text-[23px] sm:leading-[1.42] sm:tracking-[-0.015em]"
          >
            {SPLIT_ARCHITECTURE.paragraphTwo}
          </p>
        </div>

        <div
          data-reveal
          style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
          className="mt-8 flex items-center justify-center lg:col-span-6 lg:mt-0"
        >
          <TelemetryArchitectureSvg className="w-full max-w-[430px] h-auto" />
        </div>
      </div>
    </section>
  );
};
