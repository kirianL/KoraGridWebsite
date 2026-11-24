import { useEffect, useRef, useState } from "react";

/**
 * Observes all `[data-reveal]` elements in the document and toggles `data-revealed`
 * as they enter or leave the viewport, re-animating texts smoothly while navigating
 * across sections. Respects `prefers-reduced-motion: reduce` and keeps everything
 * visible during automated non-scrolling captures (`navigator.webdriver`).
 */
export function useReveal(key?: unknown): void {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (elements.length === 0) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const isAutomatedCapture =
      typeof navigator !== "undefined" && Boolean(navigator.webdriver);

    if (prefersReduced || isAutomatedCapture || typeof IntersectionObserver === "undefined") {
      elements.forEach((el) => el.setAttribute("data-revealed", "true"));
      return;
    }

    const vh = window.innerHeight || 900;
    const initialVisible: HTMLElement[] = [];

    elements.forEach((el) => {
      el.setAttribute("data-revealed", "false");
      const rect = el.getBoundingClientRect();
      if (rect.top <= vh * 0.92 && rect.bottom >= 0) {
        initialVisible.push(el);
      }
    });

    let rafOuter = 0;
    let rafInner = 0;
    if (initialVisible.length > 0) {
      rafOuter = window.requestAnimationFrame(() => {
        rafInner = window.requestAnimationFrame(() => {
          initialVisible.forEach((el) => el.setAttribute("data-revealed", "true"));
        });
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -32px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      if (rafOuter) window.cancelAnimationFrame(rafOuter);
      if (rafInner) window.cancelAnimationFrame(rafInner);
      observer.disconnect();
    };
  }, [key]);
}

/**
 * Tracks viewport visibility for numeric roll-in (`NumberFlow`) and section choreography.
 * Resets when completely outside the viewport so returning to a section replays the counter.
 */
export function useInViewState<T extends HTMLElement = HTMLDivElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(() => {
    if (typeof window === "undefined") return true;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return true;
    if (typeof navigator !== "undefined" && Boolean(navigator.webdriver)) return true;
    return false;
  });

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const isAutomatedCapture =
      typeof navigator !== "undefined" && Boolean(navigator.webdriver);

    if (prefersReduced || isAutomatedCapture || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const currentVh = window.innerHeight || 900;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          } else {
            const { top, bottom } = entry.boundingClientRect;
            if (top > currentVh || bottom < 0) {
              setInView(false);
            }
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
