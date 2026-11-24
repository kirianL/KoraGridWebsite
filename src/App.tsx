import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HeroTelemetry } from "./components/HeroTelemetry";
import { StandardsBar } from "./components/StandardsBar";
import { VerticalHatchDivider } from "./components/VerticalHatchDivider";
import { SplitArchitecture } from "./components/SplitArchitecture";
import { SplitTraceability } from "./components/SplitTraceability";
import { LightChallengesSection } from "./components/LightChallengesSection";
import { ContextualPrecisionCarousel } from "./components/ContextualPrecisionCarousel";
import { RegionalTelemetryMap } from "./components/RegionalTelemetryMap";
import { ClosingCtaAndFooter } from "./components/ClosingCtaAndFooter";
import { DemoContactModal } from "./components/DemoContactModal";

export const App: React.FC = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <Navbar onOpenDemo={() => setIsDemoOpen(true)} />

      <main>
        <HeroTelemetry onOpenDemo={() => setIsDemoOpen(true)} />
        <StandardsBar />
        <SplitArchitecture />
        <VerticalHatchDivider />
        <SplitTraceability onOpenDemo={() => setIsDemoOpen(true)} />
        <VerticalHatchDivider />
        <LightChallengesSection />
        <ContextualPrecisionCarousel onOpenDemo={() => setIsDemoOpen(true)} />
        <VerticalHatchDivider />
        <RegionalTelemetryMap onOpenDemo={() => setIsDemoOpen(true)} />
      </main>

      <ClosingCtaAndFooter onOpenDemo={() => setIsDemoOpen(true)} />
      <DemoContactModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
};

export default App;
