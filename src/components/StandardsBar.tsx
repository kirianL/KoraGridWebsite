import React from "react";
import { COMPANY_LOGOS } from "./CompanyLogos";

export const StandardsBar: React.FC = () => {
  return (
    <section
      id="estandares"
      aria-label="Empresas y ecosistemas industriales compatibles"
      className="border-t border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]"
    >
      <div className="rail-container grid grid-cols-2 lg:grid-cols-4">
        {COMPANY_LOGOS.map((company, idx) => {
          const isRightMobile = idx % 2 === 1;
          const isBottomMobile = idx >= 2;
          const isLastDesktop = idx === COMPANY_LOGOS.length - 1;
          return (
            <div
              key={company.id}
              className={`flex h-[88px] items-center justify-center px-6 transition-colors duration-150 hover:bg-[#191a19] ${
                isRightMobile ? "" : "border-r border-[var(--border-subtle)]"
              } ${
                isBottomMobile ? "" : "border-b border-[var(--border-subtle)]"
              } lg:border-b-0 ${
                isLastDesktop ? "lg:border-r-0" : "lg:border-r lg:border-[var(--border-subtle)]"
              }`}
            >
              <img
                src={company.src}
                alt={company.name}
                className={`${company.heightClass} object-contain brightness-0 invert opacity-80 transition-opacity duration-150 hover:opacity-100 select-none`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
