import React, { Suspense, lazy, useState } from "react";
import { useLenis } from "./hooks/useLenis";
import { useReveal } from "./hooks/useReveal";
import { Navbar } from "./components/Navbar";
import { HeroTelemetry } from "./components/HeroTelemetry";
import { StandardsBar } from "./components/StandardsBar";
import { SplitArchitecture } from "./components/SplitArchitecture";
import { VerticalHatchDivider } from "./components/VerticalHatchDivider";
import { SplitTraceability } from "./components/SplitTraceability";
import { LightChallengesSection } from "./components/LightChallengesSection";
import { ContextualPrecisionCarousel } from "./components/ContextualPrecisionCarousel";
import { ClosingCtaAndFooter } from "./components/ClosingCtaAndFooter";

const RegionalTelemetryMap = lazy(() =>
  import("./components/RegionalTelemetryMap").then((m) => ({
    default: m.RegionalTelemetryMap,
  }))
);

const DemoContactModal = lazy(() =>
  import("./components/DemoContactModal").then((m) => ({
    default: m.DemoContactModal,
  }))
);

export const App: React.FC = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  useLenis();
  useReveal();

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
        <Suspense
          fallback={
            <section
              id="cobertura"
              aria-hidden="true"
              className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)]"
            >
              <div className="rail-container min-h-[480px] bg-[var(--bg-surface-primary)]" />
            </section>
          }
        >
          <RegionalTelemetryMap onOpenDemo={() => setIsDemoOpen(true)} />
        </Suspense>
      </main>

      <ClosingCtaAndFooter onOpenDemo={() => setIsDemoOpen(true)} />
      {isDemoOpen && (
        <Suspense fallback={null}>
          <DemoContactModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
        </Suspense>
      )}
    </div>
  );
};

export default App;
