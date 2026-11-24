import React from "react";

export const VerticalHatchDivider: React.FC = () => {
  return (
    <div aria-hidden="true" className="bg-[var(--bg-canvas)]">
      <div className="rail-container vertical-hatch-band" />
    </div>
  );
};
