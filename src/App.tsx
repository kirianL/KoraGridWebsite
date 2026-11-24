import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReveal } from "./hooks/useReveal";
import {
  matchHashRoute,
  resolveRoute,
  ROUTE_PATHS,
  ROUTE_TITLES,
  type Route,
} from "./routing/routes";
import { Navbar } from "./components/Navbar";
import { HeroTelemetry } from "./components/HeroTelemetry";
import { StandardsBar } from "./components/StandardsBar";
import { SplitArchitecture } from "./components/SplitArchitecture";
import { VerticalHatchDivider } from "./components/VerticalHatchDivider";
import { SplitTraceability } from "./components/SplitTraceability";
import { LightChallengesSection } from "./components/LightChallengesSection";
import { ContextualPrecisionCarousel } from "./components/ContextualPrecisionCarousel";
import { RegionalTelemetryMap } from "./components/RegionalTelemetryMap";
import { ClosingCtaAndFooter } from "./components/ClosingCtaAndFooter";
import { DemoContactModal } from "./components/DemoContactModal";
import { HardwareTelemetryPage } from "./pages/HardwareTelemetryPage";
import { DemandSimulatorPage } from "./pages/DemandSimulatorPage";
import { EsgAuditPage } from "./pages/EsgAuditPage";

export const App: React.FC = () => {
  const [route, setRoute] = useState<Route>(resolveRoute);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const pendingSection = useRef<string | null>(null);
  const isInitialMount = useRef(true);

  useReveal(route);

  useEffect(() => {
    document.title = ROUTE_TITLES[route];

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const section = pendingSection.current;
    pendingSection.current = null;

    if (section) {
      window.setTimeout(() => {
        document.querySelector(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [route]);

  useEffect(() => {
    const syncRoute = () => {
      const next = resolveRoute();
      if (matchHashRoute(window.location.hash)) {
        window.history.replaceState({}, "", ROUTE_PATHS[next]);
      }
      setRoute(next);
    };

    window.addEventListener("popstate", syncRoute);
    window.addEventListener("hashchange", syncRoute);
    return () => {
      window.removeEventListener("popstate", syncRoute);
      window.removeEventListener("hashchange", syncRoute);
    };
  }, []);

  const navigateTo = (next: Route, sectionHash?: string) => {
    if (next === route) {
      if (sectionHash) {
        document.querySelector(sectionHash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    pendingSection.current = sectionHash ?? null;
    const targetPath = ROUTE_PATHS[next];
    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState({}, "", targetPath);
    }
    setRoute(next);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <Navbar
        currentRoute={route}
        onNavigate={navigateTo}
        onOpenDemo={() => setIsDemoOpen(true)}
      />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={route}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {route === "home" && (
              <>
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
              </>
            )}
            {route === "telemetria" && (
              <HardwareTelemetryPage
                onOpenDemo={() => setIsDemoOpen(true)}
                onNavigateHome={() => navigateTo("home")}
              />
            )}
            {route === "simulador" && (
              <DemandSimulatorPage
                onOpenDemo={() => setIsDemoOpen(true)}
                onNavigateHome={() => navigateTo("home")}
              />
            )}
            {route === "auditoria" && (
              <EsgAuditPage
                onOpenDemo={() => setIsDemoOpen(true)}
                onNavigateHome={() => navigateTo("home")}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <ClosingCtaAndFooter
        onOpenDemo={() => setIsDemoOpen(true)}
        onNavigate={navigateTo}
      />
      <DemoContactModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
};

export default App;
