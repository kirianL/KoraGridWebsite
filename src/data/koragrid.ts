export interface TelemetrySector {
  id: string;
  label: string;
  facility: string;
  commandSnippet: string;
  readingKw: string;
  peakThresholdKw: string;
  emissionFactor: string;
  statusText: string;
  savingsEstimate: string;
}

export interface TraceabilityStep {
  id: number;
  word: string;
  title: string;
  detail: string;
  cardCaption: string;
  liveMetric: string;
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
  sector: string;
  standard: string;
}

export const ANNOUNCEMENT_DATA = {
  text: "Cumplimiento automatizado para Programa País Carbono Neutralidad 2.0 e ISO 14064",
  cta: "Ver arquitectura",
  href: "#arquitectura",
};

export const NAV_LINKS = [
  { label: "Plataforma", href: "#plataforma" },
  { label: "Arquitectura", href: "#arquitectura" },
  { label: "Desafíos", href: "#desafios" },
  { label: "Industrias", href: "#industrias" },
];

export const HERO_DATA = {
  title: "Telemetría energética y control ESG en tiempo real",
  subtitle:
    "Monitoreo eléctrico inteligente para empresas en Costa Rica. Reduzca picos de demanda y audite su huella de carbono sin procesos manuales.",
  primaryCta: "Solicitar demo",
  secondaryCta: "Ver arquitectura",
};

export const TELEMETRY_SECTORS: TelemetrySector[] = [
  {
    id: "zonas-francas",
    label: "Zonas francas MedTech",
    facility: "Planta estéril · Alajuela",
    commandSnippet:
      "<medidor circuito='chiller-02' /> Carga actual en 412.8 kW dentro de banda segura. Factor de emisión ICE actualizado sin intervención manual.",
    readingKw: "412.8 kW",
    peakThresholdKw: "460.0 kW",
    emissionFactor: "0.024 tCO2e/MWh",
    statusText: "Sin riesgo de pico tarifario",
    savingsEstimate: "-14.2% en demanda máxima",
  },
  {
    id: "hoteleria",
    label: "Hotelería de gran escala",
    facility: "Complejo Guanacaste · 280 llaves",
    commandSnippet:
      "<alerta umbral='17:30' /> Deslastre automático sugerido en bombas de enfriamiento antes de bloque horario punta.",
    readingKw: "684.5 kW",
    peakThresholdKw: "710.0 kW",
    emissionFactor: "0.024 tCO2e/MWh",
    statusText: "Alerta preventiva activa",
    savingsEstimate: "-18.6% en recargo punta",
  },
  {
    id: "agroindustria",
    label: "Agroindustria exportadora",
    facility: "Empacadora y frío · Zona Norte",
    commandSnippet:
      "<inventario alcance='1+2' /> Registro continuo de diésel en calderas y kWh de túneles de enfriamiento listo para auditoría europea.",
    readingKw: "529.1 kW",
    peakThresholdKw: "590.0 kW",
    emissionFactor: "0.118 tCO2e/h",
    statusText: "Evidencia exportable al día",
    savingsEstimate: "100% trazabilidad GRI",
  },
  {
    id: "logistica",
    label: "Operadores logísticos",
    facility: "Centro de distribución · GAM",
    commandSnippet:
      "<telemetria flota='carga-ev' /> Balanceo dinámico entre cargadores de patio y refrigeración sin superar capacidad contratada.",
    readingKw: "318.4 kW",
    peakThresholdKw: "380.0 kW",
    emissionFactor: "0.021 tCO2e/MWh",
    statusText: "Balanceo de carga activo",
    savingsEstimate: "-11.8% costo operativo",
  },
];

export const TRUST_STANDARDS = [
  { id: "iso-14064", name: "ISO 14064", subtitle: "Inventario GEI" },
  { id: "gri", name: "GRI", subtitle: "Estándar global" },
  { id: "programa-pais", name: "Programa País", subtitle: "Carbono Neutralidad 2.0" },
  { id: "bandera-azul", name: "Bandera Azul", subtitle: "Categoría ecológica" },
  { id: "iso-50001", name: "ISO 50001", subtitle: "Gestión energética" },
];

export const SPLIT_TRACEABILITY = {
  title: "Precisión verificable en cada circuito",
  lead: "Auditoría continua, sin hojas de cálculo.",
  steps: [
    {
      id: 1,
      word: "lectura",
      title: "Lectura continua de medidores",
      detail: "Muestreo por minuto desde analizadores de red y submedidores industriales.",
      cardCaption:
        "[telemetría] Lectura directa cada 60 s en subestación principal y líneas críticas sin digitación manual.",
      liveMetric: "99.94% disponibilidad",
    },
    {
      id: 2,
      word: "picos",
      title: "Control preventivo de demanda",
      detail: "Alertas tempranas antes de superar el umbral tarifario en horario punta.",
      cardCaption:
        "[demanda] Proyección de ventana de 15 minutos con aviso operativo antes de penalización tarifaria.",
      liveMetric: "-16.4% picos mensuales",
    },
    {
      id: 3,
      word: "huella",
      title: "Cálculo automático de emisiones",
      detail: "Conversión inmediata de kWh y combustible a toneladas de CO2 equivalente.",
      cardCaption:
        "[alcance 1 y 2] Factores oficiales de Costa Rica aplicados automáticamente por sede y periodo.",
      liveMetric: "0.024 tCO2e/MWh",
    },
    {
      id: 4,
      word: "evidencia",
      title: "Trazabilidad lista para auditoría",
      detail: "Bitácora inmutable de respaldos para ISO 14064, GRI y Bandera Azul Ecológica.",
      cardCaption:
        "[auditoría] Paquete estructurado con facturas, lecturas de planta y anexos metodológicos.",
      liveMetric: "4 estándares activos",
    },
    {
      id: 5,
      word: "compensación",
      title: "Vínculo con proyectos en Costa Rica",
      detail: "Conciliación transparente entre reducciones operativas y compensaciones verificadas.",
      cardCaption:
        "[compensación] Trazabilidad directa hacia proyectos forestales y de energía limpia verificados en el país.",
      liveMetric: "Balance neto auditado",
    },
  ] as TraceabilityStep[],
};

export const SPLIT_ARCHITECTURE = {
  paragraphOne:
    "Los equipos de ingeniería integran medidores inteligentes, sensores de planta y registros de combustible en una sola arquitectura de datos verificable.",
  paragraphTwo:
    "Cada operación en Costa Rica y Centroamérica obtiene visibilidad granular por línea productiva y exporta evidencia técnica sin depender de conciliaciones manuales.",
  highlights: [
    { id: "telemetry", label: "telemetría en vivo" },
    { id: "submetering", label: "submedición por circuito" },
    { id: "esg", label: "auditoría Alcance 1 y 2" },
  ],
};

export const LIGHT_CHALLENGES = {
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
  ] as ChallengePillar[],
};

export const CONTEXTUAL_CASES: ContextualCase[] = [
  {
    index: "[01]",
    highlighted: "Zonas francas y manufactura MedTech",
    rest: "monitorean cuartos limpios, chillers y compresores en tiempo real para evitar picos de demanda y sostener certificaciones ISO 14064.",
    sector: "Manufactura avanzada · Costa Rica",
    standard: "ISO 14064 · ISO 50001",
  },
  {
    index: "[02]",
    highlighted: "Hotelería de gran escala",
    rest: "controla climatización, bombeo y consumo por ocupación para reducir costos eléctricos y documentar Bandera Azul Ecológica.",
    sector: "Turismo sostenible · Guanacaste y Pacífico",
    standard: "Bandera Azul Ecológica · Programa País",
  },
  {
    index: "[03]",
    highlighted: "Agroindustria exportadora",
    rest: "centraliza consumo eléctrico en cámaras de frío y combustible de calderas con reportes auditables exigidos por compradores de EE. UU. y Europa.",
    sector: "Exportación agrícola · Zona Norte y Caribe",
    standard: "GRI · GHG Protocol",
  },
  {
    index: "[04]",
    highlighted: "Operadores logísticos y centros de distribución",
    rest: "coordinan refrigeración continua y carga de flota eléctrica sin exceder la capacidad contratada de la subestación.",
    sector: "Logística regional · Centroamérica",
    standard: "Programa País Carbono Neutralidad 2.0",
  },
];

export const CLOSING_CTA = {
  title: "Infraestructura energética medida con rigor de ingeniería",
  subtitle:
    "Implemente telemetría en vivo y automatice su inventario de emisiones en Costa Rica y Centroamérica sin fricción operativa.",
  primaryCta: "Solicitar demo",
  secondaryCta: "Hablar con ingeniería",
};

export const FOOTER_COLUMNS = [
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
];
