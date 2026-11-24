# Inventario de Assets — KoraGrid (`docs/design/asset-inventory.md`)

Inventario completo de activos visuales para la landing page de **KoraGrid** (telemetría energética en tiempo real y gestión ESG en Costa Rica), derivado de las 3 capturas de referencia en `projects/KoraGrid/references/`.

> **Criterio de clasificación:**
> - **`GENERATE_INDEPENDENT` (`recraftv4_1_flash_v2`)**: Fondos atmosféricos, texturas orgánico-técnicas con grano y volúmenes 3D de vidrio oscuro/esmeralda. Ninguna imagen generada contendrá texto, botones, iconos ni UI chrome.
> - **`USE_CODE_SVG_OR_CSS`**: Logotipo, diagramas wireframe isométricos, iconos de interfaz, insignias numeradas, retículas divisoras y logotipos monocromáticos de estándares/clientes. Cero emojis y cero iconos raster.

---

## 1. Resumen de estrategia por tipo de asset

| Categoría | Origen / Referencia | Estrategia | Formato / Destino | Estado de fidelidad |
| :--- | :--- | :--- | :--- | :--- |
| Logotipo KoraGrid (isotipo + wordmark) | Ref 1, Ref 2, Ref 3 (header) | `USE_CODE_SVG_OR_CSS` | Componente React SVG inline | `substituted` (marca KoraGrid) |
| Backdrop mosaic verde esmeralda (Hero) | Ref 1 (detrás de consola) | `GENERATE_INDEPENDENT` (`recraftv4_1_flash_v2`) | `public/images/hero-emerald-mosaic.png` | `observed` (composición) / `substituted` (uso) |
| Backdrop bloques 3D vidrio esmeralda (Hero alt / acento) | Ref 3 (laterales hero) | `GENERATE_INDEPENDENT` (`recraftv4_1_flash_v2`) | `public/images/hero-glass-stacks.png` | `observed` (composición) |
| Tarjeta visual sección split ("Precisión operativa") | Ref 1 (bloque derecho cuadrado) | `GENERATE_INDEPENDENT` (`recraftv4_1_flash_v2`) | `public/images/split-emerald-field.png` | `observed` (gradiente/grano) |
| Diagrama isométrico wireframe de telemetría | Ref 2 (sección arquitectura) | `USE_CODE_SVG_OR_CSS` | Componente React SVG inline | `observed` (geometría) / `substituted` (dominio) |
| Miniaturas de los 3 retos/pilares (fondos) | Ref 3 (sección retos, 3 cards) | `GENERATE_INDEPENDENT` (`recraftv4_1_flash_v2`) | `public/images/pillar-bg-{1,2,3}.png` | `observed` (vidrio oscuro + luz esmeralda) |
| Iconos centrales de los 3 retos/pilares | Ref 3 (superpuestos sobre cards) | `USE_CODE_SVG_OR_CSS` | SVG inline `strokeWidth={1.5}` en código | `substituted` (dominio energía/ESG) |
| Iconos de UI, consola e inline capabilities | Ref 1, Ref 2, Ref 3 | `USE_CODE_SVG_OR_CSS` | SVG inline / Lucide-style stroke SVG | `observed` + `substituted` |
| Bandas divisoras de líneas verticales (`1px`) | Ref 1, Ref 2 | `USE_CODE_SVG_OR_CSS` | CSS `repeating-linear-gradient` | `observed` |
| Logos monocromáticos de estándares / alianzas | Ref 1, Ref 2, Ref 3 (logo bar) | `USE_CODE_SVG_OR_CSS` | SVG monocromáticos inline | `substituted` (estándares ESG/CR) |

---

## 2. Assets Raster a generar con Recraft (`recraftv4_1_flash_v2`)

Todos los prompts están redactados en inglés limpio, optimizados para `recraftv4_1_flash_v2`, con prohibición explícita de texto, tipografía, botones o elementos de interfaz.

### 2.1 `hero-emerald-mosaic`
- **id**: `hero-emerald-mosaic`
- **filename**: `public/images/hero-emerald-mosaic.png`
- **strategy**: `GENERATE_INDEPENDENT` (`recraftv4_1_flash_v2`)
- **aspectRatio**: `16:9`
- **size**: `1536x864`
- **referencia**: Ref 1 — franja luminosa pixelada/modular detrás de la consola central del hero.
- **prompt**:
  > Abstract horizontal band of stepped pixel-like vertical rectangular blocks in deep forest green, vibrant emerald green, and soft lime highlights, subtle optical glass diffusion and smooth vertical gradient transitions, dark obsidian edges fading to pure charcoal black on top and bottom, precision engineering aesthetic, minimalist dark mode background, zero text, no letters, no buttons, no UI elements.

### 2.2 `hero-glass-stacks`
- **id**: `hero-glass-stacks`
- **filename**: `public/images/hero-glass-stacks.png`
- **strategy**: `GENERATE_INDEPENDENT` (`recraftv4_1_flash_v2`)
- **aspectRatio**: `16:9`
- **size**: `1536x864`
- **referencia**: Ref 3 — columnas simétricas de bloques de vidrio 3D iluminados en verde esmeralda flanqueando la consola oscura.
- **prompt**:
  > Architectural 3D dark smoked glass rectangular blocks stacked in symmetrical stepped columns on the left and right edges, leaving a wide pure pitch-black void in the center, crisp emerald green edge rim-lighting and subtle internal refraction, precision industrial telemetry aesthetic, studio dark mode lighting, no text, no icons, no UI chrome, no watermarks.

### 2.3 `split-emerald-field`
- **id**: `split-emerald-field`
- **filename**: `public/images/split-emerald-field.png`
- **strategy**: `GENERATE_INDEPENDENT` (`recraftv4_1_flash_v2`)
- **aspectRatio**: `1:1`
- **size**: `1024x1024`
- **referencia**: Ref 1 — panel visual cuadrado derecho de la sección split. El texto de telemetría, el botón pill y el control de estado se superponen en HTML/CSS.
- **prompt**:
  > Minimalist square abstract light field gradient transitioning smoothly from warm chartreuse-lime at the top center into rich emerald green and deep pine shadow at the bottom, delicate organic film grain texture, soft atmospheric light diffusion, clean uninterrupted surface, zero text, no typography, no buttons, no icons, no borders.

### 2.4 `pillar-bg-1`
- **id**: `pillar-bg-1`
- **filename**: `public/images/pillar-bg-1.png`
- **strategy**: `GENERATE_INDEPENDENT` (`recraftv4_1_flash_v2`)
- **aspectRatio**: `4:3`
- **size**: `1365x1024`
- **referencia**: Ref 3 — primera miniatura de la sección de retos/pilares.
- **prompt**:
  > Macro dark studio photograph of sleek black obsidian glass curved ribbons sweeping across the upper-left and lower-right corners, subtle translucent emerald green rim light glowing along the bevels, vast pure deep black center space, precision industrial hardware aesthetic, ultra clean, zero text, no icons, no symbols, no UI elements.

### 2.5 `pillar-bg-2`
- **id**: `pillar-bg-2`
- **filename**: `public/images/pillar-bg-2.png`
- **strategy**: `GENERATE_INDEPENDENT` (`recraftv4_1_flash_v2`)
- **aspectRatio**: `4:3`
- **size**: `1365x1024`
- **referencia**: Ref 3 — segunda miniatura de la sección de retos/pilares.
- **prompt**:
  > Macro dark studio render of architectural dark smoked glass fins and layered bevels positioned along the bottom-left and bottom-right edges, faint emerald green subsurface light refraction, deep pitch-black upper and central area for clean visual breathing room, precision engineering style, no text, no icons, no logos, no UI chrome.

### 2.6 `pillar-bg-3`
- **id**: `pillar-bg-3`
- **filename**: `public/images/pillar-bg-3.png`
- **strategy**: `GENERATE_INDEPENDENT` (`recraftv4_1_flash_v2`)
- **aspectRatio**: `4:3`
- **size**: `1365x1024`
- **referencia**: Ref 3 — tercera miniatura de la sección de retos/pilares.
- **prompt**:
  > Minimalist macro dark composition with a smooth curved dark emerald-tinted glass ridge along the lower third, subtle luminous green specular highlight along the edge, deep matte black background across the center and top, precision instrumentation aesthetic, zero text, no numbers, no icons, no UI elements.

---

## 3. Assets Vectoriales y CSS en Código (`USE_CODE_SVG_OR_CSS`)

### 3.1 Logotipo KoraGrid
- **id**: `koragrid-logo`
- **strategy**: `USE_CODE_SVG_OR_CSS`
- **especificación**: Isotipo geométrico SVG (`24×24`, `viewBox="0 0 24 24"`) + wordmark tipográfico `KoraGrid`.

### 3.2 Diagrama Isométrico Wireframe de Arquitectura de Telemetría (Ref 2)
- **id**: `telemetry-architecture-wireframe`
- **strategy**: `USE_CODE_SVG_OR_CSS`
- **especificación**: `<svg viewBox="0 0 420 320" fill="none">` con trazos finos (`strokeWidth="1"`).

### 3.3 Iconos centrales de los 3 Retos / Pilares (Ref 3)
- **id**: `pillar-icons-1-2-3`
- **strategy**: `USE_CODE_SVG_OR_CSS`

### 3.4 Iconos de UI, Consola e Inline Capabilities (Ref 1 & Ref 2)
- **id**: `ui-inline-icons`
- **strategy**: `USE_CODE_SVG_OR_CSS`

### 3.5 Logotipos de Estándares y Sector en Logo Bar (Ref 1, Ref 2, Ref 3)
- **id**: `trust-bar-logos`
- **strategy**: `USE_CODE_SVG_OR_CSS`

### 3.6 Texturas y Separadores Estructurales
- **id**: `vertical-hatch-divider`
- **strategy**: `USE_CODE_SVG_OR_CSS`
