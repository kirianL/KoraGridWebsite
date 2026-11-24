import React from "react";

/**
 * Static architectural pixel-ribbon spectrum matching the reference composition:
 * Interlocking U-brackets, L-shapes, stepped twin columns, horizontal base bridges,
 * and detached floating top blocks with cylindrical optical sheen + multi-stop gradients.
 * Strictly static (no movement) per user specification.
 */
export const HeroSpectrumSvg: React.FC = () => {
  return (
    <svg
      viewBox="0 0 1060 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="h-full w-full select-none"
    >
      <defs>
        {/* Cylindrical optical glass sheen overlaid on key bars */}
        <linearGradient id="kg-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
          <stop offset="28%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="68%" stopColor="#000000" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.14" />
        </linearGradient>

        <linearGradient id="g-lavender-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5d0fe" />
          <stop offset="35%" stopColor="#e879f9" />
          <stop offset="72%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>

        <linearGradient id="g-pink-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff2a9d" />
          <stop offset="48%" stopColor="#f43f5e" />
          <stop offset="82%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#fde047" />
        </linearGradient>

        <linearGradient id="g-rose-violet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f9a8d4" />
          <stop offset="40%" stopColor="#d946ef" />
          <stop offset="80%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>

        <linearGradient id="g-cyan-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="38%" stopColor="#2563eb" />
          <stop offset="78%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>

        <linearGradient id="g-indigo-violet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="45%" stopColor="#4338ca" />
          <stop offset="85%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>

        <linearGradient id="g-red-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="48%" stopColor="#dc2626" />
          <stop offset="82%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>

        <linearGradient id="g-amber-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="45%" stopColor="#facc15" />
          <stop offset="85%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>

        <linearGradient id="g-emerald-teal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#065f46" />
          <stop offset="42%" stopColor="#059669" />
          <stop offset="78%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>

        <linearGradient id="g-olive-emerald" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#65a30d" />
          <stop offset="50%" stopColor="#15803d" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>

        <linearGradient id="g-plum-coral" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7e22ce" />
          <stop offset="50%" stopColor="#db2777" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>

        <linearGradient id="g-terracotta-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9a3412" />
          <stop offset="45%" stopColor="#d97706" />
          <stop offset="85%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>

        <linearGradient id="g-top-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#141414" stopOpacity="0.42" />
          <stop offset="28%" stopColor="#141414" stopOpacity="0" />
          <stop offset="100%" stopColor="#141414" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ============ LEFT OUTER WING (x: 0..185) ============ */}
      <g>
        <rect x="20" y="72" width="18" height="44" fill="url(#g-pink-amber)" />
        <path
          d="M0 156 H18 V260 H0 Z M18 124 H38 V260 H18 Z M38 242 H58 V260 H38 Z M54 44 H74 V260 H54 Z"
          fill="url(#g-lavender-gold)"
        />
        <rect x="20" y="124" width="18" height="136" fill="url(#g-pink-amber)" opacity="0.82" />
        <rect x="54" y="44" width="20" height="216" fill="url(#g-rose-violet)" opacity="0.88" />
        <rect x="54" y="44" width="20" height="216" fill="url(#kg-sheen)" />
      </g>

      <g>
        <rect x="86" y="122" width="17" height="138" fill="url(#g-rose-violet)" />
        <rect x="94" y="96" width="10" height="32" fill="#818cf8" />
        <rect x="116" y="20" width="11" height="122" fill="url(#g-cyan-blue)" />
        <rect x="116" y="156" width="14" height="104" fill="url(#g-cyan-blue)" />
        <rect x="130" y="218" width="18" height="42" fill="url(#g-cyan-blue)" />
        <rect x="140" y="74" width="14" height="186" fill="url(#g-cyan-blue)" />
        <rect x="160" y="46" width="11" height="90" fill="url(#g-indigo-violet)" />
        <rect x="160" y="152" width="17" height="108" fill="url(#g-indigo-violet)" />
        <rect x="116" y="20" width="11" height="122" fill="url(#kg-sheen)" />
      </g>

      {/* ============ CENTER-LEFT BEHIND & BELOW FROSTED CONSOLE (x: 185..530) ============ */}
      <g>
        <rect x="190" y="92" width="18" height="168" fill="url(#g-indigo-violet)" />
        <rect x="208" y="236" width="20" height="24" fill="url(#g-plum-coral)" />
        <rect x="224" y="108" width="16" height="152" fill="url(#g-plum-coral)" />
        <rect x="224" y="186" width="28" height="18" fill="url(#g-plum-coral)" />
        <rect x="242" y="138" width="18" height="122" fill="url(#g-pink-amber)" />
      </g>

      <g>
        <rect x="272" y="116" width="11" height="112" fill="url(#g-red-orange)" />
        <rect x="272" y="236" width="38" height="24" fill="url(#g-red-orange)" />
        <rect x="296" y="88" width="14" height="172" fill="url(#g-red-orange)" />
        <rect x="314" y="124" width="18" height="136" fill="url(#g-terracotta-gold)" />
      </g>

      <g>
        <rect x="342" y="132" width="18" height="128" fill="url(#g-amber-gold)" />
        <rect x="360" y="96" width="18" height="164" fill="url(#g-amber-gold)" />
        <rect x="378" y="234" width="22" height="26" fill="url(#g-amber-gold)" />
        <rect x="398" y="114" width="20" height="146" fill="url(#g-olive-emerald)" />
        <rect x="360" y="96" width="18" height="164" fill="url(#kg-sheen)" />
      </g>

      <g>
        <rect x="428" y="104" width="18" height="156" fill="url(#g-emerald-teal)" />
        <rect x="446" y="236" width="22" height="24" fill="url(#g-emerald-teal)" />
        <rect x="464" y="84" width="16" height="176" fill="url(#g-emerald-teal)" />
        <rect x="488" y="118" width="16" height="142" fill="url(#g-olive-emerald)" />
        <rect x="504" y="148" width="24" height="112" fill="url(#g-emerald-teal)" />
      </g>

      {/* ============ CENTER-RIGHT BEHIND & BELOW FROSTED CONSOLE (x: 530..845) ============ */}
      <g>
        <rect x="542" y="96" width="18" height="164" fill="url(#g-indigo-violet)" />
        <rect x="574" y="112" width="16" height="84" fill="url(#g-cyan-blue)" />
        <rect x="574" y="206" width="18" height="54" fill="url(#g-indigo-violet)" />
        <rect x="592" y="236" width="24" height="24" fill="url(#g-plum-coral)" />
        <rect x="612" y="102" width="18" height="158" fill="url(#g-rose-violet)" />
      </g>

      <g>
        <rect x="646" y="122" width="12" height="138" fill="url(#g-plum-coral)" />
        <rect x="664" y="138" width="18" height="122" fill="url(#g-rose-violet)" />
        <rect x="682" y="94" width="20" height="166" fill="url(#g-terracotta-gold)" />
        <rect x="702" y="236" width="22" height="24" fill="url(#g-terracotta-gold)" />
        <rect x="720" y="110" width="18" height="150" fill="url(#g-terracotta-gold)" />
        <rect x="720" y="110" width="18" height="150" fill="url(#kg-sheen)" />
      </g>

      <g>
        <rect x="752" y="104" width="17" height="156" fill="url(#g-olive-emerald)" />
        <rect x="769" y="156" width="16" height="104" fill="url(#g-emerald-teal)" />
        <rect x="782" y="92" width="14" height="168" fill="url(#g-emerald-teal)" />
        <rect x="802" y="116" width="16" height="144" fill="url(#g-cyan-blue)" />
        <rect x="822" y="106" width="14" height="154" fill="url(#g-rose-violet)" />
      </g>

      {/* ============ RIGHT OUTER WING (x: 845..1060) ============ */}
      <g>
        <rect x="852" y="34" width="20" height="226" fill="url(#g-indigo-violet)" />
        <rect x="852" y="34" width="20" height="226" fill="url(#kg-sheen)" />
        <rect x="884" y="122" width="18" height="138" fill="url(#g-pink-amber)" />
        <rect x="902" y="238" width="26" height="22" fill="url(#g-pink-amber)" />
        <rect x="914" y="182" width="16" height="78" fill="url(#g-red-orange)" />
      </g>

      <g>
        <rect x="936" y="26" width="10" height="30" fill="#f97316" />
        <rect x="936" y="68" width="10" height="114" fill="url(#g-red-orange)" />
        <rect x="936" y="226" width="22" height="34" fill="url(#g-red-orange)" />
        <rect x="958" y="102" width="12" height="158" fill="url(#g-red-orange)" />
        <rect x="978" y="148" width="10" height="82" fill="url(#g-terracotta-gold)" />
      </g>

      <g>
        <rect x="996" y="144" width="18" height="116" fill="url(#g-lavender-gold)" />
        <rect x="1014" y="72" width="18" height="44" fill="url(#g-pink-amber)" />
        <rect x="1014" y="128" width="18" height="132" fill="url(#g-pink-amber)" />
        <rect x="1032" y="138" width="16" height="122" fill="url(#g-amber-gold)" />
        <rect x="1048" y="228" width="12" height="32" fill="url(#g-amber-gold)" />
        <rect x="1014" y="128" width="18" height="132" fill="url(#kg-sheen)" />
      </g>

      <rect x="0" y="0" width="1060" height="90" fill="url(#g-top-fade)" />
    </svg>
  );
};
