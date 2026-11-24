import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LocaleProvider } from "./i18n/LocaleContext";
import { scrollToElementSmooth, scrollToTopImmediate, useLenis } from "./hooks/useLenis";
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
import { PricingPage } from "./components/PricingPage";

const SubstationAsciiTelemetry = lazy(() =>
  import("./components/SubstationAsciiTelemetry").then((m) => ({
    default: m.SubstationAsciiTelemetry,
  }))
);

const GridTowerAsciiSection = lazy(() =>
  import("./components/GridTowerAsciiSection").then((m) => ({
    default: m.GridTowerAsciiSection,
  }))
);

const RegionalTelemetryMap = lazy(() =>
  import("./components/RegionalTelemetryMap").then((m) => ({
    default: m.RegionalTelemetryMap,
  }))
);

const CaptureStagePage = lazy(() =>
  import("./components/CaptureStagePage").then((m) => ({
    default: m.CaptureStagePage,
  }))
);

export const App: React.FC = () => {
  const [pathname, setPathname] = useState(() =>
    typeof window !== "undefined" ? window.location.pathname : "/es"
  );
  const pendingHashRef = useRef<string | null>(null);
  const captureStage =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("capture")
      : null;

  const isPricingPage = pathname.toLowerCase().endsWith("/pricing");

  useLenis();
  useReveal(isPricingPage);

  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname);
      scrollToTopImmediate();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const scrollToContact = useCallback(() => {
    const el = document.getElementById("contacto");
    if (el) scrollToElementSmooth(el);
  }, []);

  const navigateTo = useCallback((target: string) => {
    if (typeof window === "undefined") return;
    window.history.pushState({}, "", target);
    const [nextPath, hash] = target.split("#");
    pendingHashRef.current = hash || null;
    setPathname(nextPath || "/es");
  }, []);

  const handleTransitionComplete = useCallback(() => {
    const hash = pendingHashRef.current;
    pendingHashRef.current = null;
    if (hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (el) scrollToElementSmooth(el);
      });
    } else {
      scrollToTopImmediate();
    }
  }, []);

  if (captureStage) {
    return (
      <LocaleProvider>
        <Suspense fallback={<div className="min-h-screen bg-[var(--bg-canvas)]" />}>
          <CaptureStagePage
            stageId={captureStage}
            onOpenDemo={scrollToContact}
          />
        </Suspense>
      </LocaleProvider>
    );
  }

  return (
    <LocaleProvider>
      <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]">
        <Navbar
          onOpenDemo={scrollToContact}
          isPricing={isPricingPage}
          onNavigate={navigateTo}
        />

      <AnimatePresence mode="wait" onExitComplete={handleTransitionComplete}>
        {isPricingPage ? (
          <motion.div
            key="pricing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="min-h-screen bg-[var(--bg-canvas)]"
          >
            <PricingPage
              onOpenDemo={scrollToContact}
              onBackHome={() =>
                navigateTo(pathname.toLowerCase().startsWith("/en") ? "/en" : "/es")
              }
            />
            <ClosingCtaAndFooter onOpenDemo={scrollToContact} />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="min-h-screen bg-[var(--bg-canvas)]"
          >
            <main>
              <HeroTelemetry onOpenDemo={scrollToContact} />
              <StandardsBar />
              <SplitArchitecture />
              <VerticalHatchDivider />
              <SplitTraceability onOpenDemo={scrollToContact} />
              <VerticalHatchDivider />
              <LightChallengesSection />
              <ContextualPrecisionCarousel onOpenDemo={scrollToContact} />
              <VerticalHatchDivider />
              <Suspense
                fallback={
                  <section
                    id="modelado"
                    aria-hidden="true"
                    className="border-t border-[var(--border-light-subtle)] bg-[var(--bg-light-subtle)]"
                  >
                    <div className="mx-auto min-h-[560px] max-w-[1060px]" />
                  </section>
                }
              >
                <SubstationAsciiTelemetry onOpenDemo={scrollToContact} />
              </Suspense>
              <Suspense
                fallback={
                  <section
                    id="subestacion"
                    aria-hidden="true"
                    className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)]"
                  >
                    <div className="rail-container min-h-[520px] bg-[var(--bg-surface-primary)]" />
                  </section>
                }
              >
                <GridTowerAsciiSection onOpenDemo={scrollToContact} />
              </Suspense>
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
                <RegionalTelemetryMap onOpenDemo={scrollToContact} />
              </Suspense>
            </main>
            <ClosingCtaAndFooter onOpenDemo={scrollToContact} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </LocaleProvider>
  );
};

export default App;
