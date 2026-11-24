import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Locale = "es" | "en";

interface LocaleContextValue {
  locale: Locale;
  isEn: boolean;
  setLocale: (next: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "es",
  isEn: false,
  setLocale: () => {},
});

function resolveLocaleFromPath(pathname: string): Locale {
  const clean = pathname.toLowerCase();
  if (clean === "/en" || clean.startsWith("/en/")) return "en";
  return "es";
}

const META_BY_LOCALE: Record<
  Locale,
  { lang: string; title: string; description: string }
> = {
  es: {
    lang: "es-CR",
    title: "KoraGrid — Telemetría energética y control ESG en tiempo real",
    description:
      "Plataforma B2B en Costa Rica para monitorear consumo eléctrico por circuito, evitar picos en horario punta y automatizar auditorías ISO 14064, GRI y Programa País 2.0.",
  },
  en: {
    lang: "en",
    title: "KoraGrid — Real-time energy telemetry and ESG control",
    description:
      "B2B energy telemetry platform in Costa Rica to monitor circuit-level power loads, prevent peak demand charges, and automate ISO 14064, GRI, and Programa País 2.0 audits.",
  },
};

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "es";
    return resolveLocaleFromPath(window.location.pathname);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname === "/") {
      window.history.replaceState({}, "", `/es${window.location.search}${window.location.hash}`);
    }
    const onPopState = () => {
      setLocaleState(resolveLocaleFromPath(window.location.pathname));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const meta = META_BY_LOCALE[locale];
    document.documentElement.lang = meta.lang;
    document.title = meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute("content", meta.description);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      const current = window.location.pathname.toLowerCase();
      const isPricing = current.endsWith("/pricing");
      const targetPath = isPricing
        ? next === "en"
          ? "/en/pricing"
          : "/es/pricing"
        : next === "en"
          ? "/en"
          : "/es";
      if (current !== targetPath) {
        window.history.pushState(
          {},
          "",
          `${targetPath}${window.location.search}${window.location.hash}`
        );
      }
    }
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, isEn: locale === "en", setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export function useLocale() {
  return useContext(LocaleContext);
}
