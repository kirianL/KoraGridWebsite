import type { Locale } from "../i18n/LocaleContext";

export interface TelemetrySector {
  id: string;
  label: string;
  shortLabel: string;
  facility: string;
  readingKw: string;
  consolePrefix: string;
  consoleSuffix: string;
}

export interface ChallengePillar {
  id: string;
  image: string;
  title: string;
  description: string;
}

export interface ContextualCase {
  index: string;
  highlighted: string;
  rest: string;
}

export interface InlineSentenceStep {
  id: number;
  beforeBadge: string;
  afterBadge: string;
  tag: string;
  cardText: string;
}

export const ANNOUNCEMENT_DATA = {
  text: "Cumplimiento automatizado para Programa País Carbono Neutralidad 2.0 e ISO 14064",
  cta: "Ver arquitectura",
  href: "#arquitectura",
};

export const NAV_LINKS_BY_LOCALE: Record<Locale, { label: string; href: string }[]> = {
  es: [
    { label: "Plataforma", href: "#plataforma" },
    { label: "Arquitectura", href: "#arquitectura" },
    { label: "Desafíos", href: "#desafios" },
    { label: "Industrias", href: "#industrias" },
    { label: "Precios", href: "/es/pricing" },
  ],
  en: [
    { label: "Platform", href: "#plataforma" },
    { label: "Architecture", href: "#arquitectura" },
    { label: "Challenges", href: "#desafios" },
    { label: "Industries", href: "#industrias" },
    { label: "Pricing", href: "/en/pricing" },
  ],
};

export const HERO_BY_LOCALE: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    sectors: TelemetrySector[];
    countryLabel: string;
    switchScenarioLabel: string;
    pauseLabel: string;
    playLabel: string;
    pauseShort: string;
    playShort: string;
  }
> = {
  es: {
    title: "Telemetría energética y control ESG en tiempo real",
    subtitle:
      "Monitoreo eléctrico inteligente para empresas en Costa Rica. Reduzca picos de demanda y audite su huella de carbono sin procesos manuales.",
    primaryCta: "Solicitar demo",
    secondaryCta: "Ver arquitectura",
    countryLabel: "Costa Rica",
    switchScenarioLabel: "Cambiar escenario",
    pauseLabel: "Pausar simulación",
    playLabel: "Simular telemetría",
    pauseShort: "Pausar",
    playShort: "Simular",
    sectors: [
      {
        id: "zonas-francas",
        label: "Zonas francas MedTech",
        shortLabel: "Zonas francas",
        facility: "Planta estéril · Alajuela",
        readingKw: "412.8 kW",
        consolePrefix: "Planta Alajuela en línea:",
        consoleSuffix: "sin picos de demanda.",
      },
      {
        id: "hoteleria",
        label: "Hotelería de gran escala",
        shortLabel: "Hotelería",
        facility: "Complejo Guanacaste · 280 llaves",
        readingKw: "684.5 kW",
        consolePrefix: "Complejo Guanacaste:",
        consoleSuffix: "con alerta punta preventiva.",
      },
      {
        id: "agroindustria",
        label: "Agroindustria exportadora",
        shortLabel: "Agroindustria",
        facility: "Empacadora y frío · Zona Norte",
        readingKw: "529.1 kW",
        consolePrefix: "Empacadora Zona Norte:",
        consoleSuffix: "auditados bajo ISO 14064.",
      },
    ],
  },
  en: {
    title: "Real-time energy telemetry and ESG control",
    subtitle:
      "Smart electrical monitoring for industrial operations in Costa Rica. Cut peak demand charges and audit your carbon footprint without manual spreadsheets.",
    primaryCta: "Request demo",
    secondaryCta: "View architecture",
    countryLabel: "Costa Rica",
    switchScenarioLabel: "Switch scenario",
    pauseLabel: "Pause simulation",
    playLabel: "Simulate telemetry",
    pauseShort: "Pause",
    playShort: "Simulate",
    sectors: [
      {
        id: "zonas-francas",
        label: "MedTech Free Trade Zones",
        shortLabel: "Free Zones",
        facility: "Cleanroom plant · Alajuela",
        readingKw: "412.8 kW",
        consolePrefix: "Alajuela plant online:",
        consoleSuffix: "zero demand spikes.",
      },
      {
        id: "hoteleria",
        label: "Large-scale hospitality",
        shortLabel: "Hospitality",
        facility: "Guanacaste resort · 280 keys",
        readingKw: "684.5 kW",
        consolePrefix: "Guanacaste resort:",
        consoleSuffix: "preventive peak alert active.",
      },
      {
        id: "agroindustria",
        label: "Export agribusiness",
        shortLabel: "Agribusiness",
        facility: "Cold chain & packing · North Zone",
        readingKw: "529.1 kW",
        consolePrefix: "North Zone packing plant:",
        consoleSuffix: "audited under ISO 14064.",
      },
    ],
  },
};

export const SPLIT_ARCHITECTURE_BY_LOCALE: Record<
  Locale,
  {
    seg1: string;
    seg2: string;
    seg3: string;
    seg4: string;
    paragraphTwo: string;
  }
> = {
  es: {
    seg1: "Los equipos de ingeniería integran telemetría en vivo",
    seg2: ", submedición por circuito",
    seg3: ", auditoría Alcance 1 y 2",
    seg4: "y alertas de demanda en sus plantas.",
    paragraphTwo:
      "Cada operación en Costa Rica y Centroamérica obtiene visibilidad granular por línea productiva y exporta evidencia técnica sin depender de conciliaciones manuales.",
  },
  en: {
    seg1: "Engineering teams connect live telemetry",
    seg2: ", circuit-level submetering",
    seg3: ", Scope 1 & 2 auditing",
    seg4: "and peak demand alerts across their facilities.",
    paragraphTwo:
      "Every site in Costa Rica and Central America gains granular visibility by production line and exports audit-ready evidence without manual reconciliation.",
  },
};

export const TRACEABILITY_BY_LOCALE: Record<
  Locale,
  {
    title: string;
    cta: string;
    nextAria: string;
    imageAlt: string;
    steps: InlineSentenceStep[];
  }
> = {
  es: {
    title: "Precisión verificable en cada circuito",
    cta: "Solicitar demo",
    nextAria: "Siguiente indicador de telemetría",
    imageAlt: "Campo cromático azul cobalto de telemetría KoraGrid",
    steps: [
      {
        id: 1,
        beforeBadge: "Mide cada circuito al",
        afterBadge: "minuto.",
        tag: "minuto",
        cardText:
          "Lectura directa cada 60 s en subestaciones, chillers y tableros críticos sin digitación manual.",
      },
      {
        id: 2,
        beforeBadge: "Detecta cualquier",
        afterBadge: "pico de demanda.",
        tag: "demanda",
        cardText:
          "Alertas preventivas en ventanas de 15 minutos antes de activar penalizaciones por horario punta.",
      },
      {
        id: 3,
        beforeBadge: "Calcula tu",
        afterBadge: "huella de carbono.",
        tag: "emisiones",
        cardText:
          "Conversión automática de kWh y combustible a tCO2e con factores oficiales actualizados de Costa Rica.",
      },
      {
        id: 4,
        beforeBadge: "Genera evidencia para",
        afterBadge: "ISO 14064 y GRI.",
        tag: "auditoría",
        cardText:
          "Respaldos auditables listos para Programa País Carbono Neutralidad 2.0, Bandera Azul y exportación.",
      },
      {
        id: 5,
        beforeBadge: "Y vincula cada",
        afterBadge: "compensación local.",
        tag: "Costa Rica",
        cardText:
          "Trazabilidad directa entre reducciones en planta y proyectos ambientales verificados en el país.",
      },
    ],
  },
  en: {
    title: "Verifiable precision on every circuit",
    cta: "Request demo",
    nextAria: "Next telemetry indicator",
    imageAlt: "KoraGrid cobalt blue telemetry chromatic field",
    steps: [
      {
        id: 1,
        beforeBadge: "Measure every circuit by the",
        afterBadge: "minute.",
        tag: "minute",
        cardText:
          "Direct 60-second sampling across substations, chillers, and critical panels without manual entry.",
      },
      {
        id: 2,
        beforeBadge: "Catch every",
        afterBadge: "demand spike.",
        tag: "demand",
        cardText:
          "Preventive 15-minute window alerts before triggering utility peak-hour tariff penalties.",
      },
      {
        id: 3,
        beforeBadge: "Calculate your",
        afterBadge: "carbon footprint.",
        tag: "emissions",
        cardText:
          "Automatic kWh and fuel conversion to tCO2e using official updated Costa Rica grid factors.",
      },
      {
        id: 4,
        beforeBadge: "Generate evidence for",
        afterBadge: "ISO 14064 and GRI.",
        tag: "audit",
        cardText:
          "Audit-ready backing prepared for Programa País Carbono Neutralidad 2.0, Bandera Azul, and exports.",
      },
      {
        id: 5,
        beforeBadge: "And link each",
        afterBadge: "local offset.",
        tag: "Costa Rica",
        cardText:
          "Direct traceability between plant reductions and verified environmental projects in the country.",
      },
    ],
  },
};

export const LIGHT_CHALLENGES_BY_LOCALE: Record<
  Locale,
  {
    stripLabel: string;
    title: string;
    subtitle: string;
    pillars: ChallengePillar[];
  }
> = {
  es: {
    stripLabel: "Ecosistema industrial y de telemetría en Costa Rica",
    title: "Los datos de planta existen, pero llegan fragmentados",
    subtitle:
      "Muchas operaciones industriales y turísticas aún consolidan recibos eléctricos y bitácoras de combustible semanas después del cierre mensual.",
    pillars: [
      {
        id: "fragmented-meters",
        image: "/images/pillar-bg-1.webp",
        title: "Medición dispersa entre sedes",
        description:
          "Lecturas aisladas en tableros eléctricos, generadores y hojas de cálculo impiden detectar desviaciones de carga cuando aún se pueden corregir.",
      },
      {
        id: "manual-esg",
        image: "/images/pillar-bg-2.webp",
        title: "Auditorías ambientales lentas",
        description:
          "Recopilar facturas y factores de emisión para Programa País Carbono Neutralidad 2.0 o Bandera Azul Ecológica consume semanas de trabajo técnico.",
      },
      {
        id: "export-compliance",
        image: "/images/pillar-bg-3.webp",
        title: "Exigencias de exportación global",
        description:
          "Clientes en EE. UU. y Europa solicitan trazabilidad verificable bajo ISO 14064 y GRI con respaldo auditado de cada tonelada reportada.",
      },
    ],
  },
  en: {
    stripLabel: "Industrial and telemetry ecosystem in Costa Rica",
    title: "Plant data exists, but arrives fragmented",
    subtitle:
      "Many industrial and hospitality operations still consolidate utility bills and fuel logs weeks after the monthly close.",
    pillars: [
      {
        id: "fragmented-meters",
        image: "/images/pillar-bg-1.webp",
        title: "Scattered metering across sites",
        description:
          "Isolated readings in electrical panels, backup generators, and spreadsheets prevent catching load drift while it can still be corrected.",
      },
      {
        id: "manual-esg",
        image: "/images/pillar-bg-2.webp",
        title: "Slow environmental audits",
        description:
          "Gathering utility invoices and emission factors for Programa País Carbono Neutralidad 2.0 or Bandera Azul Ecológica consumes weeks of engineering time.",
      },
      {
        id: "export-compliance",
        image: "/images/pillar-bg-3.webp",
        title: "Global export compliance",
        description:
          "Buyers in the US and Europe require verifiable ISO 14064 and GRI traceability with audited backing for every reported metric ton.",
      },
    ],
  },
};

export const CONTEXTUAL_CASES_BY_LOCALE: Record<
  Locale,
  {
    heading: string;
    cta: string;
    prevAria: string;
    nextAria: string;
    cases: ContextualCase[];
  }
> = {
  es: {
    heading: "Precisión operativa para cada industria",
    cta: "Explorar casos",
    prevAria: "Industria anterior",
    nextAria: "Siguiente industria",
    cases: [
      {
        index: "[01]",
        highlighted: "Zonas francas y manufactura MedTech",
        rest: "monitorean cuartos limpios, chillers y compresores en tiempo real para evitar picos de demanda y sostener certificaciones ISO 14064.",
      },
      {
        index: "[02]",
        highlighted: "Hotelería de gran escala",
        rest: "controla climatización, bombeo y consumo por ocupación para reducir costos eléctricos y documentar Bandera Azul Ecológica.",
      },
      {
        index: "[03]",
        highlighted: "Agroindustria exportadora",
        rest: "centraliza consumo eléctrico en cámaras de frío y combustible de calderas con reportes auditables exigidos por compradores de EE. UU. y Europa.",
      },
      {
        index: "[04]",
        highlighted: "Operadores logísticos y centros de distribución",
        rest: "coordinan refrigeración continua y carga de flota eléctrica sin exceder la capacidad contratada de la subestación.",
      },
    ],
  },
  en: {
    heading: "Operational precision for every industry",
    cta: "Explore cases",
    prevAria: "Previous industry",
    nextAria: "Next industry",
    cases: [
      {
        index: "[01]",
        highlighted: "Free Trade Zones and MedTech manufacturing",
        rest: "monitor cleanrooms, chillers, and compressors in real time to prevent demand spikes and maintain ISO 14064 certifications.",
      },
      {
        index: "[02]",
        highlighted: "Large-scale hospitality",
        rest: "tracks HVAC, water pumping, and occupancy-adjusted consumption to cut electricity costs and document Bandera Azul Ecológica.",
      },
      {
        index: "[03]",
        highlighted: "Export agribusiness",
        rest: "centralizes cold-storage power and boiler fuel consumption into audit-ready reports required by US and European buyers.",
      },
      {
        index: "[04]",
        highlighted: "Logistics operators and distribution hubs",
        rest: "coordinate continuous refrigeration and EV fleet charging without exceeding contracted substation capacity.",
      },
    ],
  },
};

export const FOOTER_COLUMNS_BY_LOCALE: Record<
  Locale,
  { heading: string; links: { label: string; href: string }[] }[]
> = {
  es: [
    {
      heading: "Plataforma",
      links: [
        { label: "Telemetría en tiempo real", href: "#plataforma" },
        { label: "Control de picos", href: "#trazabilidad" },
        { label: "Arquitectura de datos", href: "#arquitectura" },
      ],
    },
    {
      heading: "Cumplimiento",
      links: [
        { label: "Programa País 2.0", href: "#estandares" },
        { label: "ISO 14064 y GRI", href: "#desafios" },
        { label: "Bandera Azul Ecológica", href: "#industrias" },
      ],
    },
    {
      heading: "Operación",
      links: [
        { label: "Zonas francas MedTech", href: "#industrias" },
        { label: "Hotelería y agroindustria", href: "#industrias" },
        { label: "Costa Rica y Centroamérica", href: "#contacto" },
      ],
    },
  ],
  en: [
    {
      heading: "Platform",
      links: [
        { label: "Real-time telemetry", href: "#plataforma" },
        { label: "Peak demand control", href: "#trazabilidad" },
        { label: "Data architecture", href: "#arquitectura" },
      ],
    },
    {
      heading: "Compliance",
      links: [
        { label: "Programa País 2.0", href: "#estandares" },
        { label: "ISO 14064 & GRI", href: "#desafios" },
        { label: "Bandera Azul Ecológica", href: "#industrias" },
      ],
    },
    {
      heading: "Operations",
      links: [
        { label: "MedTech Free Trade Zones", href: "#industrias" },
        { label: "Hospitality & agribusiness", href: "#industrias" },
        { label: "Costa Rica & Central America", href: "#contacto" },
      ],
    },
  ],
};
