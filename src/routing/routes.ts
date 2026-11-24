export type Route = "home" | "telemetria" | "simulador" | "auditoria";

export const ROUTE_PATHS: Record<Route, string> = {
  home: "/",
  telemetria: "/telemetria",
  simulador: "/simulador",
  auditoria: "/auditoria",
};

export const ROUTE_TITLES: Record<Route, string> = {
  home: "KoraGrid — Telemetría energética y gestión ESG en tiempo real",
  telemetria: "Nodo en planta y telemetría de campo — KoraGrid",
  simulador: "Simulador de demanda punta y emisiones — KoraGrid",
  auditoria: "Metodología y auditoría ESG — KoraGrid",
};

const HASH_ROUTES: Record<string, Route> = {
  "#telemetria": "telemetria",
  "#/telemetria": "telemetria",
  "#simulador": "simulador",
  "#/simulador": "simulador",
  "#auditoria": "auditoria",
  "#/auditoria": "auditoria",
};

const PATH_ROUTES: Record<string, Route> = {
  "/": "home",
  "/telemetria": "telemetria",
  "/simulador": "simulador",
  "/auditoria": "auditoria",
};

/** Returns the route a hash alias points to, or null for in-page home anchors (#plataforma, #arquitectura...). */
export function matchHashRoute(hash: string): Route | null {
  return HASH_ROUTES[hash.toLowerCase()] ?? null;
}

export function resolveRoute(): Route {
  if (typeof window === "undefined") return "home";
  const byHash = matchHashRoute(window.location.hash);
  if (byHash) return byHash;
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return PATH_ROUTES[path.toLowerCase()] ?? "home";
}
