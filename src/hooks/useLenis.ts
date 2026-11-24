import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let latestScrollVelocity = 0;
let activeLenis: Lenis | null = null;

/**
 * Returns the latest Lenis scroll velocity without triggering React re-renders.
 */
export function getLenisVelocity(): number {
  return latestScrollVelocity;
}

/**
 * Immediately resets scroll position to the top, bypassing Lenis smooth inertia.
 */
export function scrollToTopImmediate(): void {
  if (typeof window === "undefined") return;
  if (activeLenis) {
    activeLenis.scrollTo(0, { immediate: true, force: true });
  }
  window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
}

/**
 * Smoothly scrolls to a target element using Lenis when available,
 * accounting for the 56px sticky navbar height.
 */
export function scrollToElementSmooth(el: HTMLElement): void {
  if (activeLenis) {
    activeLenis.scrollTo(el, { offset: -56, duration: 0.85 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Initializes Lenis smooth scrolling globally, respecting `prefers-reduced-motion`
 * and skipping automated capture sessions (`navigator.webdriver`).
 * Automatically pauses smooth scrolling while a modal or mobile drawer locks body overflow.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const isAutomatedCapture =
      typeof navigator !== "undefined" && Boolean(navigator.webdriver);

    if (prefersReduced || isAutomatedCapture) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      prevent: () => document.body.style.overflow === "hidden",
    });

    lenisRef.current = lenis;
    activeLenis = lenis;
    lenis.on("scroll", (e: { velocity: number }) => {
      latestScrollVelocity = e.velocity;
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      latestScrollVelocity = 0;
      activeLenis = null;
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
