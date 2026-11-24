# Plan de implementaciÃ³n â€” KoraGrid (`docs/design/implementation-plan.md`)

> **Rol:** `@implementation-planner` (solo lectura â€” ningÃºn archivo fue creado ni modificado)  
> **Fuentes analizadas:**
> - [visual-analysis.md](file:///C:/Users/Kirian/Desktop/LandingFactory/projects/KoraGrid/docs/design/visual-analysis.md)
> - [design-system.md](file:///C:/Users/Kirian/Desktop/LandingFactory/projects/KoraGrid/docs/design/design-system.md)
> - [asset-inventory.md](file:///C:/Users/Kirian/Desktop/LandingFactory/projects/KoraGrid/docs/design/asset-inventory.md)
> - Proyecto de referencia del monorepo: [package.json](file:///C:/Users/Kirian/Desktop/LandingFactory/projects/DataWebsite/package.json), [vite.config.ts](file:///C:/Users/Kirian/Desktop/LandingFactory/projects/DataWebsite/vite.config.ts), [tsconfig.json](file:///C:/Users/Kirian/Desktop/LandingFactory/projects/DataWebsite/tsconfig.json), [index.html](file:///C:/Users/Kirian/Desktop/LandingFactory/projects/DataWebsite/index.html), [index.css](file:///C:/Users/Kirian/Desktop/LandingFactory/projects/DataWebsite/src/index.css), [tokens.css](file:///C:/Users/Kirian/Desktop/LandingFactory/projects/DataWebsite/src/styles/tokens.css)

---

## 1. Stack tÃ©cnico y estructura de archivos

### 1.1 Stack del monorepo (alineado con `projects/DataWebsite/`)

| Capa | Paquete / VersiÃ³n | PropÃ³sito |
| :--- | :--- | :--- |
| Bundler | `vite` (`^6.0.7`) + `@vitejs/plugin-react` (`^4.3.4`) | Build rÃ¡pido y HMR en desarrollo |
| UI Runtime | `react` (`^19.0.0`) + `react-dom` (`^19.0.0`) | Componentes declarativos y estado interactivo |
| Lenguaje | `typescript` (`^5.7.2`) | Tipado estricto (`strict: true`, `noUnusedLocals`, `noUnusedParameters`) |
| Estilos | `tailwindcss` (`^4.0.0`) + `@tailwindcss/vite` (`^4.0.0`) | Utilidades CSS v4 + tokens semÃ¡nticos en CSS custom properties |
| MÃ©tricas animadas (opcional) | `@number-flow/react` (`^0.6.2`) | TransiciÃ³n numÃ©rica fluida con `tabular-nums` en la consola de telemetrÃ­a (misma dependencia usada en `DataWebsite`) |
| VerificaciÃ³n E2E / Visual | Playwright (en el entorno de `LandingFactory`) | Capturas y auditorÃ­a de layout en `1440Ã—900`, `768Ã—1024` y `390Ã—844` |

### 1.2 Ãrbol de archivos en `projects/KoraGrid/`

```text
projects/KoraGrid/
â”œâ”€â”€ index.html
â”œâ”€â”€ package.json
â”œâ”€â”€ tsconfig.json
â”œâ”€â”€ vite.config.ts
â”œâ”€â”€ public/
â”‚   â””â”€â”€ images/
â”‚       â”œâ”€â”€ hero-emerald-mosaic.png
â”‚       â”œâ”€â”€ hero-glass-stacks.png
â”‚       â”œâ”€â”€ split-emerald-field.png
â”‚       â”œâ”€â”€ pillar-bg-1.png
â”‚       â”œâ”€â”€ pillar-bg-2.png
â”‚       â””â”€â”€ pillar-bg-3.png
â””â”€â”€ src/
    â”œâ”€â”€ main.tsx
    â”œâ”€â”€ App.tsx
    â”œâ”€â”€ styles/
    â”‚   â”œâ”€â”€ tokens.css
    â”‚   â””â”€â”€ global.css
    â”œâ”€â”€ data/
    â”‚   â””â”€â”€ koragrid.ts
    â””â”€â”€ components/
        â”œâ”€â”€ Icons.tsx
        â”œâ”€â”€ AnnouncementBar.tsx
        â”œâ”€â”€ Navbar.tsx
        â”œâ”€â”€ HeroTelemetry.tsx
        â”œâ”€â”€ StandardsBar.tsx
        â”œâ”€â”€ VerticalHatchDivider.tsx
        â”œâ”€â”€ SplitTraceability.tsx
        â”œâ”€â”€ SplitArchitecture.tsx
        â”œâ”€â”€ TelemetryArchitectureSvg.tsx
        â”œâ”€â”€ LightChallengesSection.tsx
        â”œâ”€â”€ ContextualPrecisionCarousel.tsx
        â”œâ”€â”€ ClosingCtaAndFooter.tsx
        â””â”€â”€ DemoContactModal.tsx
```

### 1.3 ConfiguraciÃ³n base de archivos raÃ­z y estilos

1. **`package.json`**:
   - `"name": "koragrid"`, `"private": true`, `"type": "module"`.
   - Scripts idÃ©nticos a `DataWebsite`: `"dev": "vite"`, `"build": "tsc -b && vite build"`, `"preview": "vite preview"`, `"typecheck": "tsc -b --noEmit"`.
   - Dependencias: `react`, `react-dom`, `@number-flow/react` (y `landing-factory: "file:../.."` si se mantiene el enlace al workspace raÃ­z).
2. **`vite.config.ts`** y **`tsconfig.json`**:
   - IdÃ©nticos a los de [DataWebsite/vite.config.ts](file:///C:/Users/Kirian/Desktop/LandingFactory/projects/DataWebsite/vite.config.ts) (`plugins: [react(), tailwindcss()]`) y [DataWebsite/tsconfig.json](file:///C:/Users/Kirian/Desktop/LandingFactory/projects/DataWebsite/tsconfig.json) (`ES2022`, `react-jsx`, `strict: true`).
3. **`index.html`**:
   - `<html lang="es-CR">`, `background-color: #0d0e0e` en `html, body` y `<meta name="theme-color" content="#0d0e0e" />` (adaptado al lienzo oscuro de KoraGrid, a diferencia del `#d7fc6e` de `DataWebsite`).
   - Carga de Google Fonts para `Plus Jakarta Sans` (400, 500, 600, 700), `Inter` (400, 500, 600) y `JetBrains Mono` (400, 500).
   - TÃ­tulo: `KoraGrid â€” telemetrÃ­a energÃ©tica y trazabilidad ambiental en Costa Rica`.
4. **`src/styles/tokens.css`**:
   - Implementa exactamente los tokens de `design-system.md`:
     - Superficies oscuras (`--bg-canvas: #0d0e0e`, `--bg-surface-primary: #111212`, `--bg-surface-elevated: #161817`, `--bg-surface-interactive: #1c1f1e`).
     - Superficies claras (`--bg-light-canvas: #ffffff`, `--bg-light-subtle: #f8faf9`).
     - Acentos (`--accent-emerald: #22c55e`, `--accent-lime: #84e174`, `--accent-mint: #4ade80`, `--accent-teal: #10b981`, `--accent-surface: rgba(34, 197, 94, 0.12)`, `--accent-border: rgba(74, 222, 128, 0.32)`).
     - Texto y bordes tÃ©cnicos (`--border-subtle: rgba(255, 255, 255, 0.10)`, `--border-strong: rgba(255, 255, 255, 0.22)`, `--border-light-subtle: rgba(13, 14, 14, 0.12)`).
     - TipografÃ­a (`--font-sans`, `--font-mono`), layout (`--container-max: 1200px`, `--hatch-pattern`), y motion (`--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`, `--duration-fast: 150ms`, `--duration-base: 220ms`).
5. **`src/styles/global.css`** (importado en `src/main.tsx`):
   - `@import "tailwindcss";` y `@import "./tokens.css";`.
   - `@layer base`: `html, body` con `background-color: var(--bg-canvas)`, `color: var(--text-primary)`, `font-family: var(--font-sans)`, antialiasing y `scroll-behavior: smooth`.
   - Clases utilitarias de sistema:
     - `.tabular-nums { font-variant-numeric: tabular-nums; }`
     - `.koragrid-rail-shell`: contenedor `max-width: var(--container-max)` centrado con `border-left: 1px solid var(--border-subtle); border-right: 1px solid var(--border-subtle);` en desktop (`>= 1024px`) y padding lateral limpio en tablet/mÃ³vil.
     - `.vertical-hatch-divider`: banda de `40px`â€“`48px` con `background-image: var(--hatch-pattern)` y bordes superior/inferior `1px solid var(--border-subtle)`.
     - Transiciones suaves (`transitions-dev`) respetando `prefers-reduced-motion: reduce`.

---

## 2. Arquitectura de datos (`src/data/koragrid.ts`)

Centralizar todo el copy y estado simulado en un mÃ³dulo tipado garantiza que **Sentence case**, tÃ©rminos propios y mÃ©tricas `tabular-nums` se auditen en un solo lugar:

- `ANNOUNCEMENT`: texto del banner superior y enlace que abre el modal o navega a `#cumplimiento`.
- `NAV_LINKS`: `Plataforma`, `TelemetrÃ­a`, `Cumplimiento`, `Sectores`, `DocumentaciÃ³n`.
- `HERO_SECTORS` (`id`, `label`, `meterId`, `standard`, `kw`, `co2PerHour`, `emissionFactor`, `statusNote`):
  1. `medtech`: `Zonas Francas MedTech` (`ZF-MED-04`, `ISO 14064`, `412.8 kW`, `0.024 tCO2e/MWh`, `0.0099 tCO2e/h`)
  2. `hospitality`: `HotelerÃ­a` (`HTL-GUA-12`, `Bandera Azul EcolÃ³gica`, `286.4 kW`, `0.024 tCO2e/MWh`, `0.0069 tCO2e/h`)
  3. `agro`: `Agroindustria` (`AGR-CAR-07`, `GRI`, `538.2 kW`, `0.024 tCO2e/MWh`, `0.0129 tCO2e/h`)
  4. `logistics`: `LogÃ­stica` (`LOG-LIM-02`, `Programa PaÃ­s Carbono Neutralidad 2.0`, `194.5 kW`, `0.024 tCO2e/MWh`, `0.0047 tCO2e/h`)
  5. `manufacturing`: `Manufactura` (`MNF-ALA-09`, `ISO 14064`, `618.0 kW`, `0.024 tCO2e/MWh`, `0.0148 tCO2e/h`)
- `STANDARDS_BAR`: 5 elementos monocromÃ¡ticos (`ISO 14064`, `GRI`, `Programa PaÃ­s Carbono Neutralidad 2.0`, `Bandera Azul EcolÃ³gica`, `Zonas Francas CR`).
- `TRACEABILITY_STEPS` (`[1]..[5]`): cada paso incluye `index`, `sentence`, `badge`, `reading`, `location` y `rate` para actualizar la tarjeta cuadrada `split-emerald-field.png`.
- `CHALLENGE_PILLARS` (3 pilares para la secciÃ³n clara de Ref 3):
  1. `MediciÃ³n dispersa entre plantas` (`pillar-bg-1.png` + icono SVG de medidor/red)
  2. `AuditorÃ­as manuales y lentas` (`pillar-bg-2.png` + icono SVG de documento/verificaciÃ³n)
  3. `Riesgo en exportaciÃ³n regulada` (`pillar-bg-3.png` + icono SVG de nodo/trazabilidad)
- `CONTEXTUAL_SLIDES` (`[01]..[04]`): cada slide tiene `index` (`[01]`..`[04]`), `sector`, `highlightText` (en `--accent-mint`) y `mutedText` (en `--text-muted`).

---

## 3. Orden de implementaciÃ³n secciÃ³n por secciÃ³n (fiel a Ref 1, Ref 2 y Ref 3)

Todas las secciones oscuras comparten el marco central `koragrid-rail-shell` delimitado por rieles verticales de `1px`. El orden exacto de renderizado en `App.tsx` es:

### Paso 1 â€” `AnnouncementBar.tsx` (Ref 1 `observed`)
- **GeometrÃ­a**: ancho completo (`100%`), altura `34px`, sin bordes redondeados.
- **Estilo**: fondo `#22c55e` con sutil gradiente lineal hacia `#16a34a`, texto oscuro de alto contraste (`#0d0e0e`, `12px`, `font-medium`), centrado.
- **Copy (Sentence case)**: `Compatibilidad nativa con Programa PaÃ­s Carbono Neutralidad 2.0 e ISO 14064` + enlace `Ver detalles` con chevron SVG inline (`>`).

### Paso 2 â€” `Navbar.tsx` (Ref 1 + Ref 2 `observed`)
- **GeometrÃ­a**: barra fija/sticky o superior dentro del flujo oscuro (`#111212`), altura `68px`, borde inferior `1px solid var(--border-subtle)`.
- **Izquierda**: componente `KoraGridLogo` (isotipo SVG `24Ã—24` + wordmark `KoraGrid`) + 5 links horizontales en `14px` (`--text-secondary`, hover `--text-primary`).
- **Derecha**: enlace discreto `Contactar ventas`, botÃ³n secundario oscuro con borde `1px solid var(--border-subtle)` (`Iniciar sesiÃ³n`) y botÃ³n primario pill blanco `#f5f7f6` con texto `#0d0e0e` (`Solicitar demo`, abre `DemoContactModal`).
- **Responsive (`768px` / `390px`)**: en mÃ³vil se muestran logo + `Solicitar demo` + botÃ³n menÃº hamburguesa SVG (`1.5px` stroke) que despliega un drawer lateral limpio.

### Paso 3 â€” `HeroTelemetry.tsx` (Ref 1 `observed`)
- **Cabecera centrada**: sin kicker en mayÃºsculas encima del `H1` (cumplimiento `AGENTS.md`).
  - `H1` (`56px` desktop / `44px` tablet / `34px` mÃ³vil, `tracking: -0.03em`, `line-height: 1.08`, blanco `#f5f7f6`): `TelemetrÃ­a energÃ©tica y evidencia ambiental en tiempo real`.
  - SubtÃ­tulo (`17px`, `max-width: 580px`, `--text-secondary`): `Centraliza el consumo por lÃ­nea de planta, calcula factores de emisiÃ³n y genera trazabilidad verificable para Costa Rica y CentroamÃ©rica.`
  - 2 CTAs centrados (`gap: 12px`): pill blanco `Solicitar demo` y pill oscuro con borde `1px` `Explorar arquitectura`.
- **Backdrop grÃ¡fico + Consola interactiva**:
  - Banda horizontal de fondo (`~280px` de alto) con `public/images/hero-emerald-mosaic.png` (`object-cover`) y mÃ¡scara/degradado vertical hacia `#111212` en bordes superior e inferior; opcionalmente en pantallas anchas (`>= 1280px`) se puede usar `hero-glass-stacks.png` como capa lateral sutil o alternativa de profundidad sin ocultar el mosaico.
  - **Consola flotante (`max-width: 860px`)**: fondo `--bg-surface-elevated` (`#161817`), borde `1px solid var(--border-subtle)`, radio `12px`.
    1. *Visor superior (`--font-mono`, `13px`, `tabular-nums`)*: etiqueta `<medidor id="..." norma="..." />` resaltada en `--accent-mint` sobre `--accent-surface`, seguida de las 3 mÃ©tricas en vivo: `Demanda: 412.8 kW`, `Factor: 0.024 tCO2e/MWh`, `EmisiÃ³n: 0.0099 tCO2e/h`.
    2. *Fila media de selectores de sector*: 5 pills con icono SVG `14px` (sin cajas pastel): `Zonas Francas MedTech`, `HotelerÃ­a`, `Agroindustria`, `LogÃ­stica`, `Manufactura`. En mÃ³vil (`390Ã—844`) usan `overflow-x: auto` sin romper el ancho.
    3. *Barra inferior*: a la izquierda, selector compacto de norma/regiÃ³n (`Costa Rica Â· ISO 14064` con icono de nodo y chevron SVG); a la derecha, botÃ³n pill blanco `Simular lectura` / `Pausar simulaciÃ³n` con icono play/pausa SVG. Al activar la simulaciÃ³n, un `setInterval` cada `1200ms` varÃ­a ligeramente `kW` y recalcula `tCO2e/h` en `tabular-nums` con transiciÃ³n fluida.

### Paso 4 â€” `StandardsBar.tsx` (Ref 1 + Ref 2 `observed`)
- Contenedor dentro de `koragrid-rail-shell`, acotado arriba y abajo por `1px solid var(--border-subtle)`.
- Grid de 5 columnas iguales (`grid-cols-5` en desktop, `grid-cols-2` con Ãºltimo Ã­tem centrado o `grid-cols-1` limpio en mÃ³vil) separadas por `border-right: 1px solid var(--border-subtle)`.
- Cada celda (`height: 96px`) contiene el sello/logotipo SVG monocromÃ¡tico correspondiente (`ISO 14064`, `GRI`, `Programa PaÃ­s Carbono Neutralidad 2.0`, `Bandera Azul EcolÃ³gica`, `Zonas Francas CR`) en `#9ca3af` con hover a `#f5f7f6`.

### Paso 5 â€” `VerticalHatchDivider.tsx` (1.Âª apariciÃ³n â€” Ref 1 + Ref 2 `observed`)
- Franja horizontal de `44px` de altura dentro de `koragrid-rail-shell` con la clase `.vertical-hatch-divider`. Sin texto ni elementos interactivos.

### Paso 6 â€” `SplitTraceability.tsx` (Ref 1 `observed`)
- Grid de 2 columnas (`45%` / `55%` en desktop; 1 columna en tablet/mÃ³vil) con divisor vertical `1px solid var(--border-subtle)` y padding interno amplio (`40px`â€“`56px`).
- **Columna izquierda**:
  - `H2` (`40px` desktop, `tracking: -0.025em`): `Cada kilovatio queda respaldado para auditorÃ­a`.
  - PÃ¡rrafo interactivo continuo con 5 oraciones clicables prefijadas por `[1]`, `[2]`, `[3]`, `[4]`, `[5]` en `--font-mono`. La oraciÃ³n seleccionada resalta en `#f5f7f6` y las demÃ¡s permanecen en `#525855` con hover sutil.
- **Columna derecha**:
  - Contenedor cuadrado (`aspect-square`, `border-radius: 10px`, `overflow: hidden`) con `public/images/split-emerald-field.png` como fondo.
  - SuperposiciÃ³n HTML/CSS limpia: etiqueta monoespaciada de la lectura activa en el centro (`tabular-nums`), botÃ³n pill blanco `Ver trazabilidad` en la esquina inferior izquierda (abre el modal o salta a `#arquitectura`), y botÃ³n circular oscuro translÃºcido con icono SVG de onda/pulso en la esquina inferior derecha.

### Paso 7 â€” `VerticalHatchDivider.tsx` (2.Âª apariciÃ³n)

### Paso 8 â€” `SplitArchitecture.tsx` + `TelemetryArchitectureSvg.tsx` (Ref 2 `observed`)
- Grid de 2 columnas (`52%` / `48%` en desktop) sobre el fondo oscuro `#111212` sin tarjetas ni bordes alrededor del texto (layout editorial abierto).
- **Columna izquierda**: dos pÃ¡rrafos en `editorial-lead` (`24px` desktop, `line-height: 1.40`, `--text-secondary` con frases clave en `#f5f7f6`) que intercalan iconos SVG lineales inline (`18px`, `strokeWidth={1.5}`): medidores inteligentes, subestaciones elÃ©ctricas, sensores de lÃ­nea y registro criptogrÃ¡fico para auditorÃ­a.
- **Columna derecha**: componente `TelemetryArchitectureSvg.tsx` (`viewBox="0 0 420 320"`, `fill="none"`). Dibuja en wireframe isomÃ©trico (`stroke="#52525b"`, `strokeWidth="1"`) tres mÃ³dulos interconectados (subestaciÃ³n, medidores de planta y nodo de consolidaciÃ³n) con rutas de seÃ±al y nodos activos en `#22c55e` / `#4ade80`.

### Paso 9 â€” `VerticalHatchDivider.tsx` (3.Âª apariciÃ³n)

### Paso 10 â€” `LightChallengesSection.tsx` (Ref 3 `observed` + `AGENTS.md`)
- **Cambio de superficie**: secciÃ³n de ancho completo con fondo `#ffffff` (`--bg-light-canvas`), bordes superior e inferior `1px solid var(--border-light-subtle)` y texto oscuro `#0d0e0e`.
- **Cabecera izquierda**: sin kicker en mayÃºsculas encima del tÃ­tulo.
  - `H2` (`40px` desktop, `tracking: -0.025em`): `La energÃ­a se mide, pero la evidencia llega tarde`.
  - PÃ¡rrafo corto (`max-width: 560px`, `--text-on-light-secondary`): `Las plantas industriales operan con datos fragmentados entre medidores, hojas de cÃ¡lculo y facturas mensuales.`
- **Grid de 3 tarjetas (`grid-cols-1 md:grid-cols-3`, `gap-6`)**:
  - Contenedor `relative border border-[var(--border-light-subtle)] bg-white` sin sombras (`shadow-none`) ni `border-l-4`.
  - **4 puntos de registro**: 4 `<span>` absolutos de `4px Ã— 4px` en `#0d0e0e` posicionados en `top-[-2px] left-[-2px]`, `top-[-2px] right-[-2px]`, `bottom-[-2px] left-[-2px]`, `bottom-[-2px] right-[-2px]`.
  - **Mitad superior**: recuadro `aspect-[4/3] bg-[#090a0a] relative overflow-hidden` con `public/images/pillar-bg-{1,2,3}.png` (`object-cover`) y un icono SVG blanco centrado (`36px`, `strokeWidth={1.5}`, sin caja pastel).
  - **Mitad inferior**: padding `24px`, tÃ­tulo en Sentence case (`18px`, `font-medium`, `#0d0e0e`) y descripciÃ³n de 3 lÃ­neas (`14px`, `#4b5563`), sin formato `**Concepto:** explicaciÃ³n`.

### Paso 11 â€” `ContextualPrecisionCarousel.tsx` (Ref 1 `observed`)
- Retorno al lienzo oscuro `#111212` dentro de `koragrid-rail-shell`.
- **Cabecera**: izquierda con `H2` (`PrecisiÃ³n operativa para cada industria`) + botÃ³n pill blanco `Explorar casos`; derecha con 2 botones circulares (`36px Ã— 36px`) `<` y `>` con soporte de teclado (`ArrowLeft` / `ArrowRight`) y `aria-label` descriptivo.
- **Cuerpo del slide**:
  - Ãndice monoespaciado superior (`[01]` a `[04]`) en `--text-muted` con `tabular-nums`.
  - Frase en `carousel-quote` (`36px` desktop / `28px` tablet / `22px` mÃ³vil, `line-height: 1.22`) combinando el segmento clave en `--accent-mint` (`#4ade80`) y el contexto complementario en `--text-muted` (`#525855`) o `#9ca3af`.

### Paso 12 â€” `ClosingCtaAndFooter.tsx` + `DemoContactModal.tsx` (Ref 3 + Ref 1 `inferred`)
- **Bloque de cierre oscuro**: dentro de `koragrid-rail-shell`, `H2` centrado (`Audita tu huella energÃ©tica con precisiÃ³n continua`), subtÃ­tulo breve sobre despliegue en Costa Rica y CentroamÃ©rica, y 2 CTAs (`Solicitar demo` y `Hablar con ingenierÃ­a`).
- **Footer minimalista**: columnas limpias con enlaces en Sentence case, copyright tÃ©cnico de `KoraGrid` y sin ruido visual.
- **Modal / Drawer (`DemoContactModal.tsx`)**:
  - Desktop/Tablet: modal centrado (`max-width: 520px`, `bg-[#161817]`, borde `1px solid var(--border-subtle)`, backdrop `rgba(13, 14, 14, 0.80)` + `backdrop-filter: blur(6px)`).
  - Mobile (`390Ã—844`): bottom drawer deslizable con borde superior `1px`.
  - Campos con fondo `#0d0e0e`, borde `1px solid var(--border-subtle)`, focus `1px solid var(--accent-emerald)`: `Nombre completo`, `Correo corporativo`, `OrganizaciÃ³n`, `EstÃ¡ndar prioritario` (`ISO 14064`, `GRI`, `Programa PaÃ­s Carbono Neutralidad 2.0`, `Bandera Azul EcolÃ³gica`), `Cantidad aproximada de medidores`.
  - BotÃ³n pill blanco `Enviar solicitud` con confirmaciÃ³n inline accesible (`role="status"`).

---

## 4. Plan de assets: generaciÃ³n vs. cÃ³digo SVG/CSS

| Asset / Elemento | Estrategia | Herramienta / ImplementaciÃ³n | Destino |
| :--- | :--- | :--- | :--- |
| `hero-emerald-mosaic` | `GENERATE_INDEPENDENT` | `recraftv4_1_flash_v2` (`16:9`, `1536Ã—864`, sin texto ni UI) | `public/images/hero-emerald-mosaic.png` |
| `hero-glass-stacks` | `GENERATE_INDEPENDENT` | `recraftv4_1_flash_v2` (`16:9`, `1536Ã—864`, sin texto ni UI) | `public/images/hero-glass-stacks.png` |
| `split-emerald-field` | `GENERATE_INDEPENDENT` | `recraftv4_1_flash_v2` (`1:1`, `1024Ã—1024`, sin texto ni botones) | `public/images/split-emerald-field.png` |
| `pillar-bg-1`, `pillar-bg-2`, `pillar-bg-3` | `GENERATE_INDEPENDENT` | `recraftv4_1_flash_v2` (`4:3`, `1365Ã—1024`, vidrio oscuro + borde esmeralda) | `public/images/pillar-bg-{1,2,3}.png` |
| Logotipo `KoraGrid` | `USE_CODE_SVG_OR_CSS` | SVG inline `24Ã—24` + wordmark tipogrÃ¡fico | `src/components/Icons.tsx` |
| Diagrama isomÃ©trico wireframe | `USE_CODE_SVG_OR_CSS` | SVG inline (`viewBox="0 0 420 320"`, `strokeWidth="1"`) | `src/components/TelemetryArchitectureSvg.tsx` |
| Iconos UI, consola, inline y 3 pilares | `USE_CODE_SVG_OR_CSS` | SVG vectoriales `strokeWidth={1.5}` (cero emojis, cero raster) | `src/components/Icons.tsx` |
| Logos monocromÃ¡ticos de estÃ¡ndares (5) | `USE_CODE_SVG_OR_CSS` | SVG monocromÃ¡ticos limpios | `src/components/StandardsBar.tsx` |
| Bandas divisoras de lÃ­neas verticales | `USE_CODE_SVG_OR_CSS` | CSS `repeating-linear-gradient(90deg, ...)` | `src/styles/global.css` |
| Puntos de registro (`4px Ã— 4px`) | `USE_CODE_SVG_OR_CSS` | CSS absoluto en esquinas de tarjetas claras | `src/components/LightChallengesSection.tsx` |

---

## 5. Reglas de verificaciÃ³n y criterios de aceptaciÃ³n

Antes de declarar la implementaciÃ³n completa en fases posteriores:

1. **Sentence case estricto**: revisar cada cadena en `src/data/koragrid.ts` y en los componentes `.tsx` para confirmar que solo la primera palabra de cada tÃ­tulo, botÃ³n, etiqueta, menÃº y tarjeta inicia en mayÃºscula (salvo nombres propios reales y siglas: `KoraGrid`, `Costa Rica`, `CentroamÃ©rica`, `ISO 14064`, `GRI`, `Programa PaÃ­s Carbono Neutralidad 2.0`, `Bandera Azul EcolÃ³gica`, `Zonas Francas MedTech`).
2. **Anti-AI Slop y SVG-only**:
   - Cero kickers en mayÃºsculas sobre `H1` o `H2`.
   - Cero `border-l-4`, cero cajas pastel alrededor de iconos, cero degradados morados/azules, cero glows neÃ³n, cero sombras difusas en tarjetas.
   - Cero emojis y cero palabras prohibidas (*potencia*, *eleva*, *revoluciona*, *sin fisuras*), ni listas con `**Concepto:** explicaciÃ³n`.
   - `font-variant-numeric: tabular-nums` aplicado a todas las lecturas `kW`, `tCO2e/MWh`, `tCO2e/h` e Ã­ndices `[1]..[5]`, `[01]..[04]`.
3. **ValidaciÃ³n tÃ©cnica y Playwright**:
   - Ejecutar `npm run typecheck` y `npm run build` sin errores.
   - Levantar el servidor y validar con Playwright en los 3 viewports obligatorios:
     - `1440Ã—900` (rieles verticales `1px` visibles, consola centrada, 5 columnas de estÃ¡ndares, split 2 columnas, 3 tarjetas claras con puntos de registro, carrusel `[01]..[04]`).
     - `768Ã—1024` (sin desbordamiento horizontal, transiciÃ³n limpia a 1 o 2 columnas).
     - `390Ã—844` (menÃº mÃ³vil funcional, pills de consola con scroll horizontal contenido, modal convertido en bottom drawer, cero texto cortado).
   - Probar interacciones reales: cambio de sector en consola, botÃ³n `Simular lectura`, selecciÃ³n de pasos `[1]..[5]` en split, navegaciÃ³n `<` / `>` del carrusel y apertura/envÃ­o de `DemoContactModal`.
