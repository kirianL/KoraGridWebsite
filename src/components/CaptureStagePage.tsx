import React, { Suspense, lazy, useEffect } from "react";
import { Navbar } from "./Navbar";
import { HeroTelemetry } from "./HeroTelemetry";
import { StandardsBar } from "./StandardsBar";
import { SplitArchitecture } from "./SplitArchitecture";
import { SplitTraceability } from "./SplitTraceability";
import { LightChallengesSection } from "./LightChallengesSection";
import { ContextualPrecisionCarousel } from "./ContextualPrecisionCarousel";
import { SubstationAsciiTelemetry } from "./SubstationAsciiTelemetry";
import { GridTowerAsciiSection } from "./GridTowerAsciiSection";
import { PricingPage } from "./PricingPage";
import { ClosingCtaAndFooter } from "./ClosingCtaAndFooter";

const RegionalTelemetryMap = lazy(() =>
  import("./RegionalTelemetryMap").then((m) => ({
    default: m.RegionalTelemetryMap,
  }))
);

export type CaptureStageId =
  | "01-hero"
  | "02-architecture"
  | "03-traceability"
  | "04-challenges"
  | "05-industries"
  | "06-ascii-modeling"
  | "07-substation-tower"
  | "08-coverage-costa-rica"
  | "09-contact-footer"
  | "10-pricing";

interface CaptureStagePageProps {
  stageId: string;
  onOpenDemo: () => void;
}

const STAGE_STYLES = `
  .capture-stage [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
    transition: none !important;
  }
  .capture-stage-hero #plataforma > .rail-container {
    padding-top: 2.25rem !important;
  }
  .capture-stage-hero #plataforma .backdrop-blur-2xl {
    margin-bottom: 56px !important;
  }
  .capture-stage-dark-tight .rail-container {
    padding-top: 2.5rem !important;
    padding-bottom: 2.5rem !important;
  }
  .capture-stage-trace #trazabilidad .lg\\:min-h-\\[560px\\] {
    min-height: 490px !important;
  }
  .capture-stage-tower #subestacion .lg\\:min-h-\\[620px\\] {
    min-height: 560px !important;
    max-height: 590px !important;
  }
  .capture-stage-tower #subestacion .lg\\:py-20 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  .capture-stage-light #desafios > .rail-container-light {
    padding-top: 1.75rem !important;
    padding-bottom: 1.75rem !important;
  }
  .capture-stage-light #desafios .sm\\:py-6 {
    padding-top: 0.9rem !important;
    padding-bottom: 0.9rem !important;
  }
  .capture-stage-light #desafios .mt-9 {
    margin-top: 1.5rem !important;
  }
  .capture-stage-ascii #modelado > div {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }
  .capture-stage-ascii #modelado .mt-10 {
    margin-top: 1.5rem !important;
  }
  .capture-stage-ascii #modelado .sm\\:h-\\[330px\\] {
    height: 250px !important;
  }
  .capture-stage-map #cobertura .lg\\:min-h-\\[480px\\] {
    min-height: 450px !important;
  }
  .capture-stage-map #cobertura .lg\\:py-24 {
    padding-top: 3.5rem !important;
    padding-bottom: 3.5rem !important;
  }
  .capture-stage-pricing .rail-container {
    padding-top: 0.75rem !important;
    padding-bottom: 0.75rem !important;
  }
  .capture-stage-pricing .rail-container h1 {
    margin-top: 0.35rem !important;
    font-size: 1.85rem !important;
  }
  .capture-stage-pricing .rail-container p {
    margin-top: 0.25rem !important;
    font-size: 0.85rem !important;
  }
  .capture-stage-pricing .rail-container > div:last-child {
    margin-top: 0.6rem !important;
    padding-top: 0.6rem !important;
  }
  .capture-stage-pricing .rail-container-light {
    padding-top: 0.9rem !important;
    padding-bottom: 0.9rem !important;
  }
  .capture-stage-pricing .rail-container-light article {
    padding: 0.9rem !important;
  }
  .capture-stage-pricing .rail-container-light article ul {
    margin-top: 0.65rem !important;
    padding-top: 0.65rem !important;
  }
  .capture-stage-pricing .rail-container-light article > div:last-child {
    margin-top: 0.75rem !important;
  }
  .capture-stage-footer #contacto > div:first-child {
    padding-top: 1.25rem !important;
  }
  .capture-stage-footer #contacto .lg\\:py-16 {
    padding-top: 1.75rem !important;
    padding-bottom: 1.75rem !important;
  }
  .capture-stage-footer #contacto form.space-y-6 > :not(:first-child) {
    margin-top: 0.85rem !important;
  }
  .capture-stage-footer #contacto textarea {
    rows: 2;
    max-height: 44px;
  }
  .capture-stage-footer #contacto .lg\\:px-12 {
    padding-top: 1.25rem !important;
    padding-bottom: 1.25rem !important;
  }
  .capture-stage-footer #contacto .mt-10 {
    margin-top: 1.1rem !important;
    padding-top: 0.9rem !important;
  }
`;

export const CaptureStagePage: React.FC<CaptureStagePageProps> = ({
  stageId,
  onOpenDemo,
}) => {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    els.forEach((el) => el.classList.add("is-revealed"));
  }, [stageId]);

  const isLightWhite = stageId === "04-challenges";
  const isLightSubtle = stageId === "06-ascii-modeling";

  if (stageId === "01-hero") {
    return (
      <div className="capture-stage capture-stage-hero flex h-screen w-screen flex-col overflow-hidden bg-[var(--bg-canvas)] text-[var(--text-primary)]">
        <style>{STAGE_STYLES}</style>
        <Navbar onOpenDemo={onOpenDemo} />
        <div className="flex flex-1 flex-col justify-between overflow-hidden">
          <HeroTelemetry onOpenDemo={onOpenDemo} />
          <div className="w-full border-t border-[var(--border-subtle)] flex-1 flex">
            <div className="rail-container flex-1 bg-[var(--bg-surface-primary)]" />
          </div>
        </div>
      </div>
    );
  }

  if (isLightWhite || isLightSubtle) {
    return (
      <div
        className={`capture-stage ${
          isLightWhite ? "capture-stage-light bg-[var(--bg-light-canvas)]" : "capture-stage-ascii bg-[var(--bg-light-subtle)]"
        } flex h-screen w-screen flex-col justify-center overflow-hidden text-[var(--text-on-light-primary)]`}
      >
        <style>{STAGE_STYLES}</style>
        {stageId === "04-challenges" && <LightChallengesSection />}
        {stageId === "06-ascii-modeling" && (
          <SubstationAsciiTelemetry onOpenDemo={onOpenDemo} />
        )}
      </div>
    );
  }

  if (stageId === "10-pricing") {
    return (
      <div className="capture-stage capture-stage-pricing flex h-screen w-screen flex-col overflow-hidden bg-[var(--bg-canvas)] text-[var(--text-primary)]">
        <style>{STAGE_STYLES}</style>
        <Navbar onOpenDemo={onOpenDemo} isPricing />
        <div className="flex-1 overflow-hidden">
          <PricingPage onOpenDemo={onOpenDemo} onBackHome={() => {}} />
        </div>
      </div>
    );
  }

  if (stageId === "09-contact-footer") {
    return (
      <div className="capture-stage capture-stage-footer flex h-screen w-screen flex-col justify-between overflow-hidden bg-[var(--bg-canvas)] text-[var(--text-primary)]">
        <style>{STAGE_STYLES}</style>
        <div className="rail-container flex-1 bg-[var(--bg-surface-primary)]" />
        <ClosingCtaAndFooter onOpenDemo={onOpenDemo} />
      </div>
    );
  }

  // Dark rail-framed sections with continuous 1px vertical rails from top to bottom
  const stageClass =
    stageId === "02-architecture"
      ? "capture-stage-dark-tight"
      : stageId === "03-traceability"
        ? "capture-stage-trace"
        : stageId === "07-substation-tower"
          ? "capture-stage-tower"
          : stageId === "08-coverage-costa-rica"
            ? "capture-stage-map"
            : "";

  return (
    <div
      className={`capture-stage ${stageClass} flex h-screen w-screen flex-col justify-between overflow-hidden bg-[var(--bg-canvas)] text-[var(--text-primary)]`}
    >
      <style>{STAGE_STYLES}</style>
      {/* Top continuous vertical rail extension */}
      <div className="rail-container flex-1 bg-[var(--bg-surface-primary)]" />

      {/* Target section cleanly framed by 1px horizontal rules across 100vw */}
      <div className="w-full border-y border-[var(--border-subtle)]">
        {stageId === "02-architecture" && (
          <>
            <StandardsBar />
            <SplitArchitecture />
          </>
        )}
        {stageId === "03-traceability" && (
          <SplitTraceability onOpenDemo={onOpenDemo} />
        )}
        {stageId === "05-industries" && (
          <ContextualPrecisionCarousel onOpenDemo={onOpenDemo} />
        )}
        {stageId === "07-substation-tower" && (
          <GridTowerAsciiSection onOpenDemo={onOpenDemo} />
        )}
        {stageId === "08-coverage-costa-rica" && (
          <Suspense fallback={<div className="rail-container min-h-[450px] bg-[var(--bg-surface-primary)]" />}>
            <RegionalTelemetryMap onOpenDemo={onOpenDemo} />
          </Suspense>
        )}
      </div>

      {/* Bottom continuous vertical rail extension */}
      <div className="rail-container flex-1 bg-[var(--bg-surface-primary)]" />
    </div>
  );
};
