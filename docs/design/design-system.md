# Sistema de diseÃ±o â€” KoraGrid (`docs/design/design-system.md`)

> **Alcance y trazabilidad**: este sistema de diseÃ±o sintetiza los patrones visuales de las 3 referencias en `projects/KoraGrid/references/` (`Ref 1`: Cartesia Sonic-3, `Ref 2`: Cartesia v1, `Ref 3`: AgentFlow). Cada decisiÃ³n se etiqueta explÃ­citamente como:
> - **`[observed]`**: propiedad medida o vista directamente en las referencias.
> - **`[inferred]`**: token, escala o comportamiento deducido a partir de las proporciones y el ritmo visual de las referencias.
> - **`[substituted]`**: adaptaciÃ³n semÃ¡ntica o de marca especÃ­fica para **KoraGrid** (idioma espaÃ±ol, regla de *Sentence case* y dominio de telemetrÃ­a energÃ©tica / cumplimiento ambiental en Costa Rica).

---

## 1. Principios rectores y reglas de fidelidad (`AGENTS.md`)

1. **EstÃ©tica tÃ©cnica de alto contraste (`[observed]` + `[substituted]`)**: predominio de lienzo oscuro profundo (`#0D0E0E` / `#111212`) con rieles estructurales verticales de `1px`, bandas separadoras tipo trama vertical (*hatch*), acentos esmeralda/lima (`#22C55E`, `#84E174`, `#4ADE80`) y una secciÃ³n intermedia en superficie clara (`#FFFFFF` / `#F8FAF9`) heredada de `Ref 3` para generar contraste editorial.
2. **Sentence case obligatorio (`[substituted]`)**: todo texto de interfaz en espaÃ±ol (tÃ­tulos, subtÃ­tulos, botones, etiquetas, menÃºs, badges y listas) lleva mayÃºscula inicial **Ãºnicamente en la primera palabra**, salvo nombres propios, instituciones o siglas (`KoraGrid`, `Costa Rica`, `ISO 14064`, `GRI`, `Programa PaÃ­s Carbono Neutralidad 2.0`, `Bandera Azul EcolÃ³gica`, `MedTech`, `EE. UU.`).
3. **Anti-AI Slop estricto (`[substituted]`)**:
   - Sin kickers en mayÃºsculas sobre tÃ­tulos (se omiten los kickers en *all-caps* como `"MEET SONIC-3"` o `"THE CHALLENGE"` para cumplir `AGENTS.md`; en su lugar se usan Ã­ndices monospace sobrios como `[01]` cuando la referencia lo estructura asÃ­).
   - Sin `border-l-4` de colores, sin iconos encerrados en cajas con fondos pastel, sin sombras difusas (`shadow-md`/`shadow-lg`) ni resplandores morados/azules.
   - Sin emojis en ningÃºn componente; iconografÃ­a **100% SVG** de trazo limpio (`1.5px` stroke).
   - Copywriting sobrio y tÃ©cnico (prohibido usar *"potencia"*, *"eleva"*, *"revoluciona"* o *"sin fisuras"*).

---

## 2. Paleta de color

### 2.1 Superficies y fondos

| Token | Valor HEX | Origen | Uso principal |
| :--- | :--- | :--- | :--- |
| `--bg-canvas` | `#0D0E0E` | `[observed]` Ref 1, Ref 3 | Fondo principal del documento en modo oscuro |
| `--bg-surface-primary` | `#111212` | `[observed]` Ref 1, Ref 2 | Contenedor principal delimitado por rieles laterales `1px` |
| `--bg-surface-elevated` | `#161817` | `[observed]` Ref 1, Ref 2 | Consola de telemetrÃ­a en hero, tarjetas oscuras, modal/drawer |
| `--bg-surface-interactive` | `#1C1F1E` | `[inferred]` Ref 1 | Hover de pills, celdas activas y botones secundarios oscuros |
| `--bg-light-canvas` | `#FFFFFF` | `[observed]` Ref 3 | SecciÃ³n de contraste claro (banda de aliados y diagnÃ³stico) |
| `--bg-light-subtle` | `#F8FAF9` | `[observed]` Ref 3 | Superficie secundaria en secciÃ³n clara / fondo de tarjetas claras |

### 2.2 Acentos esmeralda y lima

| Token | Valor HEX | Origen | Uso principal |
| :--- | :--- | :--- | :--- |
| `--accent-emerald` | `#22C55E` | `[observed]` Ref 1 | Barra superior, indicadores activos, bloques de espectrograma |
| `--accent-lime` | `#84E174` | `[observed]` Ref 3 | CTA primario en variantes de alto contraste, foco de estado activo |
| `--accent-mint` | `#4ADE80` | `[observed]` Ref 1 | Resaltado tipogrÃ¡fico en carrusel `[01]..[03]` y etiquetas de cÃ³digo |
| `--accent-teal` | `#10B981` | `[observed]` Ref 1, Ref 3 | Gradientes estructurales del visual editorial y barras de telemetrÃ­a |
| `--accent-surface` | `rgba(34, 197, 94, 0.12)` | `[inferred]` Ref 1, Ref 3 | Fondo sutil de pill seleccionada o estado activo en consola |

### 2.3 Texto y bordes

| Token | Valor HEX / RGBA | Origen | Uso principal |
| :--- | :--- | :--- | :--- |
| `--text-primary` | `#F5F7F6` | `[observed]` Ref 1, Ref 2 | TÃ­tulos y texto principal sobre fondo oscuro |
| `--text-secondary` | `#9CA3AF` | `[observed]` Ref 1, Ref 2 | SubtÃ­tulos, descripciones y navegaciÃ³n inactiva en oscuro |
| `--text-muted` | `#525855` | `[observed]` Ref 1 | Texto atenuado en contraste de carrusel `[01]..[03]` e Ã­ndices |
| `--text-on-light-primary` | `#0D0E0E` | `[observed]` Ref 3 | TÃ­tulos y texto principal sobre `#FFFFFF` / `#F8FAF9` |
| `--text-on-light-secondary` | `#4B5563` | `[observed]` Ref 3 | Cuerpo de texto sobre superficie clara |
| `--border-subtle` | `rgba(255, 255, 255, 0.10)` | `[observed]` Ref 1, Ref 2 | Rieles verticales, divisores de logos, borde de consola `1px` |
| `--border-strong` | `rgba(255, 255, 255, 0.20)` | `[inferred]` Ref 1 | Hover en botones outline y controles circulares |
| `--border-light-subtle` | `rgba(13, 14, 14, 0.12)` | `[observed]` Ref 3 | Bordes `1px` de tarjetas y divisores en la secciÃ³n clara |

---

## 3. TipografÃ­a

### 3.1 Familias tipogrÃ¡ficas (`[inferred]` + `[substituted]`)
- **Sans-serif principal (`--font-sans`)**: `'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif`.
  - En `Ref 1` y `Ref 2` se observa una sans-serif geomÃ©trica/neogrotesca de trazos limpios y apertura amplia en tÃ­tulos (`tracking-tight`). `Plus Jakarta Sans` o `Inter` reproducen con alta fidelidad la geometrÃ­a y el peso visual de los encabezados.
- **Monospace tÃ©cnico (`--font-mono`)**: `'JetBrains Mono', 'Geist Mono', ui-monospace, monospace`.
  - Usada en `Ref 1` para etiquetas de cÃ³digo/telemetrÃ­a dentro de la consola (`<emotion ... />` â†’ en KoraGrid: parÃ¡metros de carga, `kWh`, `tCO2e`, `[01]`, `[02]`, `[03]`).
  - Regla obligatoria: aplicar `font-variant-numeric: tabular-nums` en todas las mÃ©tricas, contadores e Ã­ndices.

### 3.2 Escala tipogrÃ¡fica

| Rol | Desktop (`1440px`) | Tablet (`768px`) | Mobile (`390px`) | Line-height | Tracking | Peso | Origen |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-hero` (`h1`) | `56px` (`3.5rem`) | `44px` (`2.75rem`) | `34px` (`2.125rem`) | `1.08` | `-0.03em` | `500` | `[observed]` Ref 1/2/3 |
| `section-title` (`h2`) | `40px` (`2.5rem`) | `32px` (`2rem`) | `28px` (`1.75rem`) | `1.14` | `-0.025em` | `500` | `[observed]` Ref 1/3 |
| `carousel-quote` | `36px` (`2.25rem`) | `28px` (`1.75rem`) | `22px` (`1.375rem`) | `1.22` | `-0.02em` | `400` | `[observed]` Ref 1 |
| `editorial-lead` | `24px` (`1.5rem`) | `20px` (`1.25rem`) | `18px` (`1.125rem`) | `1.40` | `-0.015em` | `400` | `[observed]` Ref 2 |
| `body-lg` | `17px` (`1.0625rem`) | `16px` (`1rem`) | `15px` (`0.9375rem`) | `1.55` | `-0.005em` | `400` | `[inferred]` Ref 1/3 |
| `body-sm` | `14px` (`0.875rem`) | `14px` (`0.875rem`) | `14px` (`0.875rem`) | `1.50` | `0` | `400` | `[observed]` Ref 1/3 |
| `mono-telemetry` | `13px` (`0.8125rem`) | `13px` (`0.8125rem`) | `12px` (`0.75rem`) | `1.55` | `0` | `400` | `[observed]` Ref 1 |
| `mono-index` | `12px` (`0.75rem`) | `12px` (`0.75rem`) | `11px` (`0.6875rem`) | `1.0` | `0.04em` | `500` | `[observed]` Ref 1 |

---

## 4. Sistema de layout, retÃ­cula y ritmos estructurales

### 4.1 Rieles arquitectÃ³nicos (`[observed]` Ref 1, Ref 2)
- El contenido principal se aloja dentro de un marco central de ancho mÃ¡ximo `1200px` (`--container-max`) flanqueado por **dos lÃ­neas verticales continuas de `1px`** (`--border-subtle`).
- En `1440Ã—900`, quedan `120px` de margen oscuro (`#0D0E0E`) a cada lado del marco central (`#111212`).

### 4.2 Bandas separadoras (`[observed]` Ref 1, Ref 2)
- Entre secciones mayores (por ejemplo, debajo de la banda de logos y antes del carrusel `[01]..[03]`), se utiliza una **banda separadora horizontal de `36px` de alto** con borde superior e inferior `1px solid var(--border-subtle)` y un patrÃ³n interno de lÃ­neas verticales repetidas (`repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 6px)`).

### 4.3 Puntos de registro en esquinas (`[observed]` Ref 3)
- Las tarjetas de la secciÃ³n clara (heredadas de `Ref 3`) usan esquinas rectas (`border-radius: 0px` o `2px`) con borde `1px solid var(--border-light-subtle)` y **4 marcadores cuadrados de `4px Ã— 4px`** en `#0D0E0E` posicionados en las esquinas exteriores (`-2px` offset) como detalle tÃ©cnico de precisiÃ³n, sin sombras.

### 4.4 Breakpoints y comportamiento responsivo

| Breakpoint | Viewport de prueba | Contenedor | Comportamiento clave |
| :--- | :--- | :--- | :--- |
| **Desktop** | `1440Ã—900` | `1200px` con rieles laterales `1px` | Navbar completa horizontal; consola hero `860px`; banda de logos 5 columnas; secciones editoriales en 2 columnas (`5fr / 7fr` y `6fr / 6fr`); tarjetas en fila de 3. |
| **Tablet** | `768Ã—1024` | `100%` con padding `24px` | Rieles laterales pegados al borde (`24px` inset); banda de logos en 3+2 o scroll horizontal limpio; secciones editoriales apiladas (`1fr`); consola hero al `100%` con wrap de pills. |
| **Mobile** | `390Ã—844` | `100%` con padding `16px` | Navbar compacta (logo + CTA + menÃº hamburguesa SVG); hero CTAs apilados o en fila compacta; consola hero con scroll horizontal en pills de casos de uso; tarjetas en 1 columna vertical. |

---

## 5. Tokens CSS (`tokens.css`)

```css
:root {
  /* === Superficies oscuras [observed] === */
  --bg-canvas: #0d0e0e;
  --bg-surface-primary: #111212;
  --bg-surface-elevated: #161817;
  --bg-surface-interactive: #1c1f1e;

  /* === Superficies claras de contraste [observed Ref 3] === */
  --bg-light-canvas: #ffffff;
  --bg-light-subtle: #f8faf9;

  /* === Acentos esmeralda / lima [observed] === */
  --accent-emerald: #22c55e;
  --accent-lime: #84e174;
  --accent-mint: #4ade80;
  --accent-teal: #10b981;
  --accent-surface: rgba(34, 197, 94, 0.12);
  --accent-border: rgba(74, 222, 128, 0.32);

  /* === Texto [observed / inferred] === */
  --text-primary: #f5f7f6;
  --text-secondary: #9ca3af;
  --text-muted: #525855;
  --text-on-light-primary: #0d0e0e;
  --text-on-light-secondary: #4b5563;

  /* === Bordes tÃ©cnicos 1px [observed] === */
  --border-subtle: rgba(255, 255, 255, 0.10);
  --border-strong: rgba(255, 255, 255, 0.22);
  --border-light-subtle: rgba(13, 14, 14, 0.12);

  /* === TipografÃ­a [inferred / substituted] === */
  --font-sans: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Geist Mono', ui-monospace, SFMono-Regular, monospace;

  /* === Escala de espaciado [inferred] === */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;

  /* === Radios [observed] === */
  --radius-none: 0px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 9999px;

  /* === Layout [inferred] === */
  --container-max: 1200px;
  --rail-color: var(--border-subtle);
  --hatch-pattern: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.06) 0px,
    rgba(255, 255, 255, 0.06) 1px,
    transparent 1px,
    transparent 6px
  );

  /* === Transiciones (transitions-dev) [inferred] === */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 150ms;
  --duration-base: 220ms;
}
```

---

## 6. EspecificaciÃ³n de componentes interactivos

### 6.1 Barra superior y navegaciÃ³n (`[observed]` Ref 1 + `[substituted]`)
- **Top banner** (opcional segÃºn referencia): `32px` de alto, fondo `--accent-emerald` (`#22C55E`), texto `#0D0E0E` en `12px` medium, centrado, con enlace discreto (`Ver actualizaciÃ³n` + flecha SVG).
- **Navbar**: `64px` de alto dentro del contenedor con borde inferior `1px solid var(--border-subtle)`.
  - Izquierda: isotipo SVG geomÃ©trico de KoraGrid + wordmark `KoraGrid`.
  - Centro: enlaces en *Sentence case* (`Plataforma`, `Normativas`, `Casos de uso`, `DocumentaciÃ³n`, `Precios`).
  - Derecha: botÃ³n ghost `Iniciar sesiÃ³n` y CTA pill blanco `#F5F7F6` con texto `#0D0E0E` (`Solicitar demo`).

### 6.2 Consola de telemetrÃ­a en hero (`[observed]` Ref 1/2 + `[substituted]`)
- **Contenedor**: tarjeta flotante centrada (`max-width: 860px`), fondo `--bg-surface-elevated` (`#161817`), borde `1px solid var(--border-subtle)`, `border-radius: var(--radius-lg)` (`12px`), superpuesta sobre una banda visual de bloques/espectrograma verde (`#22C55E` / `#4ADE80` / `#10B981`).
- **Ãrea superior (visor de telemetrÃ­a)**:
  - TipografÃ­a `--font-mono`, `13px`, `tabular-nums`.
  - Etiqueta inicial resaltada en `--accent-mint` (`#4ADE80`) o fondo sutil `--accent-surface`, mostrando el payload en tiempo real segÃºn el caso de uso seleccionado (ej. `<sensor id="planta-alajuela" norma="ISO 14064" /> Demanda activa: 412.8 kW Â· Factor de emisiÃ³n: 0.024 tCO2e/MWh`).
- **Barra de tabs / pills de casos de uso (fila media)**:
  - Pills horizontales con icono SVG de `14px` (sin caja pastel) + etiqueta en *Sentence case*:
    - `Manufactura MedTech`
    - `Zonas francas`
    - `Red de frÃ­o`
    - `Agroindustria`
    - `Edificios corporativos`
  - Estado inactivo: texto `--text-secondary`, fondo transparente.
  - Estado activo: texto `--text-primary`, fondo `--accent-surface`, borde `1px solid var(--accent-border)`, transiciÃ³n `150ms var(--ease-out-expo)`.
- **Barra inferior de control**:
  - Izquierda: selector compacto de estÃ¡ndar/sede (SVG de nodo/regiÃ³n + `Costa Rica Â· ISO 14064` + chevron SVG).
  - Derecha: botÃ³n pill blanco (`#F5F7F6` fondo, `#0D0E0E` texto) con icono SVG de play/pausa (`Simular flujo` / `Pausar`). Al activarse, anima la actualizaciÃ³n numÃ©rica (`tabular-nums`) de la telemetrÃ­a y pulsa sutilmente las barras del espectrograma verde de fondo.

### 6.3 Banda de aliados / certificaciones (`[observed]` Ref 1, Ref 2, Ref 3)
- Grid de 5 columnas iguales (`grid-template-columns: repeat(5, 1fr)`) con divisores verticales `1px solid var(--border-subtle)` y borde superior/inferior `1px`.
- En la secciÃ³n clara (`Ref 3`), encabezada a la izquierda por texto corto (`Organizaciones que auditan su huella energÃ©tica en Costa Rica`) y logos monocromÃ¡ticos a la derecha.
- **Nota de fidelidad**: logos SVG monocromÃ¡ticos reales o placeholders tipogrÃ¡ficos sobrios alineados a estÃ¡ndares/entidades relevantes (`ISO 14064`, `GRI`, `Programa PaÃ­s Carbono Neutralidad 2.0`, `Bandera Azul EcolÃ³gica`, `MedTech`), sin inventar marcas falsas si no se proveen.

### 6.4 Carrusel de precisiÃ³n contextual `[01]..[03]` (`[observed]` Ref 1 + `[substituted]`)
- **Cabecera**: tÃ­tulo a la izquierda (`PrecisiÃ³n contextual para auditorÃ­a real`) con botÃ³n pill blanco (`Explorar metodologÃ­a`), y a la derecha **dos botones circulares** (`36px Ã— 36px`) con flechas SVG `<` y `>` (inactivo: `#1C1F1E` con borde `--border-subtle`; activo: `#F5F7F6` con icono `#0D0E0E`).
- **Cuerpo del slide**:
  - Ãndice monospace superior en `--text-muted`: `[01]`, `[02]`, `[03]`.
  - Frase grande (`36px` desktop, `line-height: 1.22`, `font-weight: 400`) dividida semÃ¡nticamente en dos tonos:
    - Segmento clave resaltado en `--accent-mint` (`#4ADE80`).
    - Contexto complementario en `--text-muted` (`#525855`) o `--text-secondary` (`#9CA3AF`) para replicar el contraste tipogrÃ¡fico exacto de `Ref 1`.
- **InteracciÃ³n**: teclado (`ArrowLeft` / `ArrowRight`), clic en botones circulares y transiciÃ³n suave de opacidad/desplazamiento (`220ms var(--ease-out-expo)`).

### 6.5 SecciÃ³n de contraste claro â€” DiagnÃ³stico del problema (`[observed]` Ref 3 + `[substituted]`)
- **Fondo**: `--bg-light-canvas` (`#FFFFFF`) rompiendo el bloque oscuro antes del cierre.
- **TÃ­tulo**: `Los datos de planta existen, pero llegan fragmentados` (sin kicker en mayÃºsculas encima, cumpliendo `AGENTS.md`).
- **Grid de 3 bloques tÃ©cnicos**:
  - Borde `1px solid var(--border-light-subtle)` + 4 puntos de registro cuadrados (`4px Ã— 4px`, `#0D0E0E`) en las esquinas exteriores.
  - Mitad superior: recuadro oscuro (`#0D0E0E`) con textura verde esmeralda sutil en esquina y un icono SVG blanco centrado (`32px`, trazo limpio).
  - Mitad inferior: fondo `--bg-light-canvas`, tÃ­tulo en *Sentence case* (`MediciÃ³n manual tardÃ­a`, `Hojas de cÃ¡lculo aisladas`, `Reportes sin trazabilidad`) y descripciÃ³n breve en `--text-on-light-secondary` (`14px`).

### 6.6 Modal / Drawer de contacto y demo (`[inferred]` + `[substituted]`)
- **ActivaciÃ³n**: desde cualquier CTA primario (`Solicitar demo`, `Hablar con ingenierÃ­a`).
- **PresentaciÃ³n**:
  - Desktop/Tablet: modal centrado (`max-width: 520px`) con backdrop `rgba(13, 14, 14, 0.80)` y `backdrop-filter: blur(6px)`.
  - Mobile (`390Ã—844`): bottom drawer deslizable con borde superior `1px solid var(--border-subtle)`.
- **EstÃ©tica**:
  - Superficie `--bg-surface-elevated` (`#161817`), borde `1px solid var(--border-subtle)`, `border-radius: var(--radius-lg)`.
  - Encabezado con Ã­ndice monospace `[demo]` y botÃ³n cerrar (`X` SVG `20px`).
  - Campos con fondo `#0D0E0E`, borde `1px solid var(--border-subtle)`, focus `1px solid var(--accent-emerald)` (sin glow difuso), etiquetas en *Sentence case*: `Nombre completo`, `Correo corporativo`, `OrganizaciÃ³n`, `EstÃ¡ndar prioritario` (`ISO 14064`, `GRI`, `Programa PaÃ­s Carbono Neutralidad 2.0`, `Bandera Azul EcolÃ³gica`), `Volumen de medidores o sedes`.
  - BotÃ³n de envÃ­o pill blanco `#F5F7F6` con texto `#0D0E0E` (`Enviar solicitud`) y estado de confirmaciÃ³n inline sin recargar la pÃ¡gina.

---

## 7. Checklist de verificaciÃ³n antes de declarar fidelidad

- [ ] Todos los textos visibles en espaÃ±ol cumplen *Sentence case* estricto (solo nombres propios/siglas capitalizados).
- [ ] Cero emojis, cero iconos en cajas pastel, cero `border-l-4`, cero glows morados/azules, cero palabras prohibidas.
- [ ] Rieles verticales `1px` y bandas *hatch* presentes en desktop (`1440Ã—900`).
- [ ] Contraste verificado en superficie oscura (`#0D0E0E`/`#111212`) y superficie clara (`#FFFFFF`/`#F8FAF9`).
- [ ] Consola hero interactiva, carrusel `[01]..[03]` y modal/drawer de demo funcionales y probados con Playwright en `1440Ã—900`, `768Ã—1024` y `390Ã—844`.
