import React from "react";

interface IconProps {
  className?: string;
}

export const KoraGridLogo: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <rect x="2" y="2" width="4.5" height="4.5" rx="1" fill="currentColor" />
    <rect x="9.75" y="2" width="4.5" height="4.5" rx="1" fill="currentColor" opacity="0.55" />
    <rect x="17.5" y="2" width="4.5" height="4.5" rx="1" fill="currentColor" />
    <rect x="2" y="9.75" width="4.5" height="4.5" rx="1" fill="currentColor" opacity="0.55" />
    <rect x="9.75" y="9.75" width="4.5" height="4.5" rx="1" fill="#3b82f6" />
    <rect x="17.5" y="9.75" width="4.5" height="4.5" rx="1" fill="currentColor" opacity="0.55" />
    <rect x="2" y="17.5" width="4.5" height="4.5" rx="1" fill="currentColor" />
    <rect x="9.75" y="17.5" width="4.5" height="4.5" rx="1" fill="currentColor" opacity="0.55" />
    <rect x="17.5" y="17.5" width="4.5" height="4.5" rx="1" fill="currentColor" />
  </svg>
);

export const PlayIcon: React.FC<IconProps> = ({ className = "h-3.5 w-3.5" }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M4.5 3.25a.75.75 0 0 1 1.14-.64l7.5 4.75a.75.75 0 0 1 0 1.28l-7.5 4.75A.75.75 0 0 1 4.5 12.75V3.25Z" />
  </svg>
);

export const PauseIcon: React.FC<IconProps> = ({ className = "h-3.5 w-3.5" }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
    <rect x="4" y="3" width="3" height="10" rx="0.75" />
    <rect x="9" y="3" width="3" height="10" rx="0.75" />
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3.6 9h16.8M3.6 15h16.8" />
    <path d="M12 3a13.5 13.5 0 0 1 0 18M12 3a13.5 13.5 0 0 0 0 18" />
  </svg>
);

/** Icon 1 matching reference "voices" (5 crisp alternating vertical signal bars) */
export const PulseWaveIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M5 10v4" />
    <path d="M8.5 6v12" />
    <path d="M12 8.5v7" />
    <path d="M15.5 5v14" />
    <path d="M19 9.5v5" />
  </svg>
);

/** Icon 2 matching reference "voice cloning" (two overlapping offset geometric squares) */
export const CircuitMeterIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="miter"
    aria-hidden="true"
    className={className}
  >
    <path d="M14.5 9.5V4.5h-10v10h5" />
    <rect x="9.5" y="9.5" width="10" height="10" />
  </svg>
);

/** Icon 3 matching reference "voice infilling" (concentric broken target rings + horizontal connector) */
export const AuditLedgerIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M19.5 12a7.5 7.5 0 1 1-1.9-5" />
    <circle cx="12" cy="12" r="3.6" />
    <path d="M15.6 12h5.4" />
  </svg>
);

export const SectorChipIcon: React.FC<IconProps & { kind: string }> = ({
  kind,
  className = "h-3.5 w-3.5",
}) => {
  switch (kind) {
    case "zonas-francas":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={className}>
          <rect x="6" y="6" width="12" height="12" rx="1.5" />
          <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
        </svg>
      );
    case "hoteleria":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={className}>
          <path d="M4 20V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v15" />
          <path d="M2 20h20M8 8h2M14 8h2M8 12h2M14 12h2M10 20v-4h4v4" />
        </svg>
      );
    case "agroindustria":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={className}>
          <path d="M3 20h18M5 20V9l7-4 7 4v11" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={className}>
          <rect x="3" y="7" width="13" height="10" rx="1.5" />
          <path d="M16 10h3l2 3v4h-5" />
          <circle cx="7.5" cy="18.5" r="1.5" />
          <circle cx="17.5" cy="18.5" r="1.5" />
        </svg>
      );
  }
};

export const PillarRadialIcon: React.FC<IconProps> = ({ className = "h-10 w-10" }) => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true" className={className}>
    <path d="M20 6v8M20 26v8M6 20h8M26 20h8" />
    <path d="M10.1 10.1l5.6 5.6M24.3 24.3l5.6 5.6M29.9 10.1l-5.6 5.6M15.7 24.3l-5.6 5.6" />
    <circle cx="20" cy="20" r="2.5" fill="#60a5fa" stroke="none" />
  </svg>
);

export const PillarLayersIcon: React.FC<IconProps> = ({ className = "h-10 w-10" }) => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d="M20 8l12 6.5L20 21 8 14.5 20 8Z" />
    <path d="M8 21.5L20 28l12-6.5" stroke="#60a5fa" />
    <path d="M8 27.5L20 34l12-6.5" opacity="0.65" />
  </svg>
);

export const PillarBarsIcon: React.FC<IconProps> = ({ className = "h-10 w-10" }) => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" className={className}>
    <path d="M10 26l4-10" opacity="0.55" />
    <path d="M16 28l5-16" />
    <path d="M22 25l4-11" stroke="#60a5fa" />
    <path d="M28 28l4-14" opacity="0.8" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d="M10 3.5L5.5 8 10 12.5" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d="M6 3.5L10.5 8 6 12.5" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true" className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true" className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
