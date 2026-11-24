# AnÃ¡lisis visual de referencias â€” KoraGrid

**Rol:** `@visual-analyst` (solo lectura)  
**Destino sugerido:** `docs/design/visual-analysis.md`  
**Referencias analizadas:**
- **Ref 1 (Cartesia Green):** [50688775391_s_whatsapp_net-3A8C878081E3E545FB4C.jpg](file:///C:/Users/Kirian/Desktop/LandingFactory/projects/KoraGrid/references/50688775391_s_whatsapp_net-3A8C878081E3E545FB4C.jpg)
- **Ref 2 (Cartesia Classic / Wireframe):** [50688775391_s_whatsapp_net-3ACE61DC48A10D5F3545.jpg](file:///C:/Users/Kirian/Desktop/LandingFactory/projects/KoraGrid/references/50688775391_s_whatsapp_net-3ACE61DC48A10D5F3545.jpg)
- **Ref 3 (AgentFlow Dark/Light):** [50688775391_s_whatsapp_net-3AFDDEE5E90A3AC8B01A.jpg](file:///C:/Users/Kirian/Desktop/LandingFactory/projects/KoraGrid/references/50688775391_s_whatsapp_net-3AFDDEE5E90A3AC8B01A.jpg)

---

## 1. ArticulaciÃ³n de las tres referencias

La arquitectura visual de **KoraGrid** adopta la estructura editorial oscura, retÃ­cula acotada por lÃ­neas guÃ­a de `1px` y paleta verde esmeralda/lima de **Ref 1 (Cartesia Green)** como sistema dominante, e integra mÃ³dulos estructurales especÃ­ficos de **Ref 2** (ilustraciÃ³n isomÃ©trica tÃ©cnica en wireframe y texto editorial con iconos inline) y de **Ref 3 (AgentFlow)** (bloque contrastado en modo claro para los 3 retos operativos con miniaturas oscuras de acento verde y puntos de registro en las esquinas).

| DecisiÃ³n de composiciÃ³n | Origen | Etiqueta | JustificaciÃ³n para KoraGrid |
| :--- | :--- | :--- | :--- |
| Barra superior de anuncio verde sÃ³lida (`~32px`) | Ref 1 | `observed` | Anuncia cumplimiento o lanzamientos regulatorios (ej. Programa PaÃ­s Carbono Neutralidad 2.0 / ISO 14064) sin ocupar espacio del hero. |
| Navbar oscura minimalista con divisoria inferior de `1px` | Ref 1 + Ref 2 | `observed` | Mantiene navegaciÃ³n limpia a la izquierda y 2 acciones a la derecha; se omiten badges en mayÃºsculas si rompen Sentence case. |
| Contenedor principal acotado por lÃ­neas guÃ­a verticales de `1px` | Ref 1 + Ref 2 | `observed` | Crea un marco arquitectÃ³nico continuo de `~1160pxâ€“1200px` que unifica todas las secciones oscuras. |
| Hero centrado con consola interactiva sobre backdrop grÃ¡fico verde | Ref 1 | `observed` | Permite demostrar telemetrÃ­a energÃ©tica en vivo (kWh, factor de emisiÃ³n, sensores de planta) sobre un mosaico verde geomÃ©trico. |
| Barra de 5 logos en celdas iguales con divisores verticales de `1px` | Ref 1 + Ref 2 | `observed` | Presenta 5 sectores/clientes clave o estÃ¡ndares de Costa Rica y CentroamÃ©rica con jerarquÃ­a monocromÃ¡tica neutra. |
| Bandas divisoras horizontales con patrÃ³n de lÃ­neas verticales sutiles | Ref 1 + Ref 2 | `observed` | Separan bloques mayores mediante una franja de textura vertical tipo cÃ³digo de barras oscuro (`~48pxâ€“56px` de alto). |
| Split 2 columnas: texto interactivo con Ã­ndices `[1]..[5]` + tarjeta cuadrada de gradiente verde | Ref 1 | `observed` | Ideal para explicar auditorÃ­a automÃ¡tica y trazabilidad en tiempo real con un bloque visual orgÃ¡nico verde y audio/estado en vivo. |
| Split 2 columnas: pÃ¡rrafo editorial con iconos SVG inline + ilustraciÃ³n isomÃ©trica wireframe | Ref 2 | `observed` | Representa la topologÃ­a de medidores inteligentes, subestaciones y sensores de planta sin recurrir a fotos genÃ©ricas. |
| SecciÃ³n contrastada en fondo claro (`#FFFFFF` / `#F7F8F9`) con 3 tarjetas de retos, miniaturas oscuras con acento verde y puntos de registro en esquinas | Ref 3 | `observed` | Rompe la monotonÃ­a oscura para exponer los 3 cuellos de botella ESG/energÃ©ticos (datos fragmentados, auditorÃ­as manuales, riesgo de exportaciÃ³n). |
| SecciÃ³n de precisiÃ³n contextual con Ã­ndice `[01]`, texto con resaltado verde y flechas de carrusel | Ref 1 | `observed` | Muestra casos reales por industria (Zona Franca MedTech, hotelerÃ­a, agroindustria, logÃ­stica) con navegaciÃ³n secuencial. |
| Cierre oscuro con CTA final y footer tÃ©cnico | Ref 3 (secciÃ³n inferior oscura) + Ref 1 | `inferred` | Cierra el flujo devolviendo el contraste al lienzo oscuro principal con lÃ­neas guÃ­a de `1px`. |

> [!IMPORTANT]
> **ResoluciÃ³n de conflictos con `AGENTS.md` (Anti-AI Slop y Sentence case):**
> - En **Ref 1** (`MEET SONIC-3 FOR AGENTS`) y **Ref 3** (`â–  THE CHALLENGE`) aparecen kickers en mayÃºsculas encima de los tÃ­tulos `H1`/`H2`. Por regla estricta de `AGENTS.md` (*"prohibido usar kickers o subtÃ­tulos en mayÃºsculas encima de los tÃ­tulos"* y *"Sentence case obligatorio"*), estos kickers se **suprimen** (`substituted`) o se reemplazan por Ã­ndice tÃ©cnico minimalista cuando corresponda (como `[01]` en la secciÃ³n de precisiÃ³n contextual, que es numÃ©rico).
> - Todos los textos de interfaz, botones, menÃºs, etiquetas de consola y tarjetas usarÃ¡n **Sentence case estricto en espaÃ±ol**, sin dos o mÃ¡s palabras seguidas con mayÃºscula inicial salvo siglas o nombres propios reales (`KoraGrid`, `Costa Rica`, `CentroamÃ©rica`, `ISO 14064`, `GRI`, `SINPE`, `BCCR`, `Bandera Azul EcolÃ³gica`, `Programa PaÃ­s Carbono Neutralidad 2.0`).

---

## 2. AnatomÃ­a secciÃ³n por secciÃ³n

### 2.1. Barra superior de anuncio (Announcement bar)
- **Referencia base:** Ref 1 (`observed`).
- **GeometrÃ­a y proporciones:** Ancho completo (`100vw`), altura compacta (`~32pxâ€“36px`), sin bordes redondeados.
- **Color y contraste:** Fondo verde sÃ³lido vibrante (`observed` en Ref 1, tono esmeralda medio-alto), texto principal en blanco puro centrado y enlace secundario en verde claro o blanco con flecha `â€º` sutil.
- **Contenido (`substituted`):** Comunicado breve en Sentence case sobre compatibilidad con **Programa PaÃ­s Carbono Neutralidad 2.0** e **ISO 14064**, mÃ¡s enlace `Ver detalles â€º`.

### 2.2. Barra de navegaciÃ³n (Navbar)
- **Referencia base:** Ref 1 (`observed`) + estructura limpia de Ref 2 (`observed`).
- **GeometrÃ­a y proporciones:** Altura `~64pxâ€“72px`, fondo oscuro (`#111111` / `#121212`), borde inferior `1px solid` sutil (`rgba(255,255,255,0.08)`).
- **AlineaciÃ³n:**
  - **Izquierda:** Isotipo geomÃ©trico SVG monocromÃ¡tico + wordmark `KoraGrid` (`observed` en ubicaciÃ³n y peso respecto a Cartesia). Enlaces horizontales en una sola lÃ­nea (`Plataforma`, `TelemetrÃ­a`, `Cumplimiento`, `Sectores`, `DocumentaciÃ³n`), separados por `24pxâ€“32px`, en gris claro (`#A1A1AA`) con hover blanco.
  - **Derecha:** Enlace de texto `Contactar ventas`, botÃ³n secundario oscuro con borde de `1px` (`Iniciar sesiÃ³n`) y botÃ³n primario tipo pÃ­ldora blanca con texto oscuro (`Solicitar demo`). Se descarta el botÃ³n rectangular verde neÃ³n de Ref 3 para mantener la coherencia cromÃ¡tica de Ref 1 (`substituted`).

### 2.3. Hero centrado con consola interactiva sobre backdrop verde
- **Referencia base:** Ref 1 (`observed`).
- **GeometrÃ­a y proporciones:**
  - Contenedor centrado dentro de las guÃ­as verticales de `1px` (`max-width: 1180px`).
  - Padding superior amplio (`~72pxâ€“88px`), sin kicker en mayÃºsculas encima del tÃ­tulo (`substituted` respecto a Ref 1 por regla de `AGENTS.md`).
  - **H1:** Centrado, 2 lÃ­neas mÃ¡ximo, `tracking-tight`, tamaÃ±o display (`~52pxâ€“64px`), blanco puro.
  - **SubtÃ­tulo:** Centrado, mÃ¡ximo 2 lÃ­neas (`max-width: 580px`), gris medio (`#9CA3AF`), tamaÃ±o `~16pxâ€“18px`.
  - **CTAs:** 2 botones centrados lado a lado (`gap: 12px`): pÃ­ldora blanca (`Solicitar demo`) y pÃ­ldora oscura con borde `1px` (`Explorar arquitectura`).
- **Consola interactiva y backdrop (`observed` en Ref 1):**
  - **Backdrop:** Banda rectangular horizontal (`~260pxâ€“300px` de alto) compuesta por bloques/teselas geomÃ©tricas en degradado verde bosque, esmeralda y lima suave (implementable vÃ­a CSS grid/canvas o SVG geomÃ©trico, sin usar screenshots ni glows neÃ³n genÃ©ricos).
  - **Consola flotante:** Tarjeta oscura (`#18191B`) centrada sobre el backdrop (`max-width: 780px`), radio `12px`, borde `1px solid rgba(255,255,255,0.12)`, sombra sutil de profundidad.
  - **AnatomÃ­a interna de la consola (`observed` en Ref 1, `substituted` en dominio KoraGrid):**
    - Ãrea superior de lectura/telemetrÃ­a: muestra un flujo estructurado en vivo con etiquetas inline resaltadas en verde (ej. `<medidor id="ZF-MED-04" />` y `[pico 412 kW]`) y texto legible en blanco.
    - Fila intermedia de 5 pestaÃ±as/chips con iconos SVG lineales pequeÃ±os (`Manufactura`, `MedTech`, `HotelerÃ­a`, `Agroindustria`, `LogÃ­stica`).
    - Barra inferior: selector de norma/regiÃ³n a la izquierda (`Costa Rica Â· ISO 14064` con dropdown SVG) y botÃ³n pÃ­ldora blanco a la derecha (`Simular lectura` con icono play/pulso SVG).

### 2.4. Barra de 5 logos / estÃ¡ndares con divisores verticales de `1px`
- **Referencia base:** Ref 1 + Ref 2 (`observed`).
- **GeometrÃ­a:** Contenedor de ancho completo dentro de las guÃ­as laterales, delimitado arriba y abajo por lÃ­neas horizontales de `1px`.
- **DistribuciÃ³n:** Grid de 5 columnas iguales (`grid-cols-5` en desktop, `2+2+1` o scroll limpio en mÃ³vil), separadas por divisores verticales de `1px` de altura completa (`height: ~96pxâ€“110px`).
- **Contenido (`substituted`):** 5 logotipos/sellos institucionales o sectoriales en monocromo blanco/gris (`ISO 14064`, `GRI`, `Bandera Azul EcolÃ³gica`, `Carbono Neutralidad 2.0`, `Zonas Francas CR`), sin fondos ni cajas pastel.

### 2.5. Banda divisora de lÃ­neas verticales sutiles
- **Referencia base:** Ref 1 + Ref 2 (`observed`).
- **GeometrÃ­a:** Franja horizontal de `~48pxâ€“56px` de alto dentro del contenedor, acotada por bordes superior e inferior de `1px`.
- **Textura:** PatrÃ³n repetitivo de lÃ­neas verticales de `1px` muy sutiles (`repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 6px)`), sin texto ni elementos interactivos.

### 2.6. SecciÃ³n Split 2 columnas â€” Trazabilidad y telemetrÃ­a en vivo (Estilo Ref 1)
- **Referencia base:** Ref 1 (`observed`).
- **GeometrÃ­a y proporciones:** Grid de 2 columnas (`45%` izquierda / `55%` derecha) dividido por una lÃ­nea vertical continua de `1px`. Padding interno generoso (`40pxâ€“56px`).
- **Columna izquierda:**
  - `H2` en 2 lÃ­neas (`~36pxâ€“42px`, `tracking-tight`, blanco).
  - PÃ¡rrafo interactivo multi-oraciÃ³n: la oraciÃ³n activa se muestra en blanco puro con un indicador numÃ©rico cuadrado (`[1]`) y las siguientes oraciones en gris atenuado (`#6B7280`) con `[2]`, `[3]`, `[4]`, `[5]` clicables para alternar el estado del panel derecho.
- **Columna derecha:**
  - Tarjeta cuadrada (`aspect-square`, radio `8pxâ€“12px`) con gradiente orgÃ¡nico verde/lima/esmeralda y textura de grano fino (`noise` SVG sutil).
  - Texto central translÃºcido/blanco mostrando la lectura o evidencia auditada correspondiente al paso `[1..5]` (ej. `[emisiÃ³n validada] Planta Alajuela Â· 0.042 tCO2e/h`).
  - Esquina inferior izquierda: botÃ³n pÃ­ldora blanco (`Ver trazabilidad`).
  - Esquina inferior derecha: botÃ³n circular oscuro translÃºcido con icono SVG de pulso/onda o pausa.

### 2.7. Banda divisora de lÃ­neas verticales sutiles (2.Âª apariciÃ³n)
- **Referencia base:** Ref 1 (`observed`). Repite exactamente la geometrÃ­a de 2.5 para separar bloques.

### 2.8. SecciÃ³n Split 2 columnas â€” Arquitectura de red e ilustraciÃ³n isomÃ©trica (Estilo Ref 2)
- **Referencia base:** Ref 2 (`observed`).
- **GeometrÃ­a y proporciones:** Mismo contenedor con guÃ­as laterales de `1px`, dividido en 2 columnas (`50% / 50%` o `52% / 48%`), sin fondo de tarjeta en ninguno de los dos lados (respira directamente sobre el fondo oscuro).
- **Columna izquierda:** Dos pÃ¡rrafos editoriales amplios (`~22pxâ€“26px`, interlineado `1.45`, gris claro `#D4D4D8` con tÃ©rminos clave en blanco) que intercalan pequeÃ±os iconos SVG lineales inline (`medidores`, `subestaciones`, `sensores de planta`, `auditorÃ­a`).
- **Columna derecha:** IlustraciÃ³n SVG isomÃ©trica en wireframe (`stroke` gris medio `#52525B` con nodos de acento verde sutil `#22C55E`) que representa bloques modulares de planta elÃ©ctrica, medidores y nodos de telemetrÃ­a interconectados.

### 2.9. Banda divisora de lÃ­neas verticales sutiles (3.Âª apariciÃ³n)
- **Referencia base:** Ref 2 (`observed`). Prepara la transiciÃ³n hacia el bloque claro contrastado.

### 2.10. SecciÃ³n contrastada en modo claro â€” Los 3 retos operativos (Estilo Ref 3)
- **Referencia base:** Ref 3 (`observed` en estructura clara, tarjetas con miniaturas oscuras y puntos de registro; `substituted` en eliminaciÃ³n del kicker en mayÃºsculas y adaptaciÃ³n cromÃ¡tica).
- **TransiciÃ³n Dark â†’ Light:** El fondo cambia limpiamente a blanco/gris muy claro (`#FFFFFF` / `#F8F9FA`) con borde superior e inferior de `1px` (`#E5E7EB`).
- **Cabecera izquierda:**
  - Sin kicker en mayÃºsculas encima del tÃ­tulo (`substituted` por `AGENTS.md`).
  - `H2` oscuro (`#111827`, `~36pxâ€“44px`, `tracking-tight`): *"La energÃ­a se mide, pero la evidencia llega tarde"* (Sentence case).
  - PÃ¡rrafo descriptivo corto (`max-width: 560px`, gris `#4B5563`).
- **Grid de 3 pilares (`grid-cols-3` en desktop, `1 col` en mÃ³vil):**
  - **Importante (`observed` en Ref 3):** Las 3 tarjetas se justifican porque replican fielmente la secciÃ³n explÃ­cita de Ref 3: cada tarjeta tiene borde `1px solid #E5E7EB`, fondo blanco, y **4 puntos cuadrados de registro (`3px Ã— 3px`, `#111827`) posicionados exactamente en las 4 esquinas** del contenedor exterior.
  - **Miniatura superior de cada tarjeta (`observed`):** Recuadro oscuro (`#090A0A`) con formas geomÃ©tricas 3D/lÃ­neas con reflejo verde esmeralda en la base y un icono SVG vectorial blanco centrado (sin cajas pastel ni emojis).
  - **Cuerpo inferior:** TÃ­tulo corto en Sentence case (`#111827`) y descripciÃ³n de 3 lÃ­neas (`#4B5563`) sin formato `**Concepto:** explicaciÃ³n`.
  - **Temas (`substituted`):**
    1. *MediciÃ³n dispersa entre plantas* (hojas de cÃ¡lculo y recibos mensuales sin telemetrÃ­a por lÃ­nea).
    2. *AuditorÃ­as manuales y lentas* (recolecciÃ³n tardÃ­a para ISO 14064, GRI y Bandera Azul EcolÃ³gica).
    3. *Riesgo en exportaciÃ³n regulada* (exigencias de huella de carbono verificable para EE. UU. y Europa).

### 2.11. SecciÃ³n de precisiÃ³n contextual con Ã­ndice `[01]` y carrusel (Estilo Ref 1)
- **Referencia base:** Ref 1 (`observed`).
- **Retorno al modo oscuro (`#121212`):** Delimitado por guÃ­as laterales de `1px`.
- **Fila de cabecera:**
  - Izquierda: `H2` en 2 lÃ­neas (`PrecisiÃ³n operativa para cada industria`) + botÃ³n pÃ­ldora blanco debajo (`Explorar casos`).
  - Derecha: Par de botones circulares de carrusel (`<` oscuro con borde sutil, `>` blanco con flecha oscura).
- **Contenido del slide:**
  - Etiqueta tÃ©cnica monoespaciada `[01]` en gris apagado (`#71717A`).
  - Texto display grande (`~32pxâ€“40px`, `tracking-tight`) donde el segmento activo/clave aparece en verde esmeralda (`#4ADE80` / `#34D399`) y el resto de la frase en gris medio (`#71717A`), rotando entre `[01]` Manufactura / Zonas Francas MedTech, `[02]` HotelerÃ­a de gran escala, `[03]` Agroindustria exportadora y `[04]` Operadores logÃ­sticos.

### 2.12. Cierre y Footer tÃ©cnico
- **Referencia base:** Ref 3 (bloque inferior oscuro) + Ref 1 (`inferred` para continuidad del layout).
- **AnatomÃ­a:** Bloque final oscuro dentro de las guÃ­as de `1px` con `H2` centrado, subtÃ­tulo breve sobre cumplimiento en Costa Rica y CentroamÃ©rica, 2 CTAs (pÃ­ldora blanca + pÃ­ldora oscura con borde) y footer minimalista con columnas limpias de enlaces y nota legal/tÃ©cnica.

---

## 3. Reglas de verificaciÃ³n y fidelidad (Responsive y Copy)

- **Breakpoints obligatorios para QA con Playwright:**
  - `1440Ã—900` (desktop completo con guÃ­as laterales de `1px` visibles).
  - `768Ã—1024` (tablet: las secciones split pasan a 2 columnas compactas o apilado limpio; barra de 5 logos pasa a grid responsive sin desbordamiento).
  - `390Ã—844` (mÃ³vil: apilado vertical de consola, tarjetas y pilares; divisores verticales de `1px` ajustados para no romper el ancho).
- **Checklist de copywriting (`AGENTS.md`):**
  - Sentence case estricto en todo texto visible (solo primera letra en mayÃºscula, mÃ¡s nombres propios/siglas).
  - Cero palabras prohibidas (*potencia, eleva, revoluciona, sin fisuras*).
  - Cero emojis en la UI; 100% iconos SVG vectoriales.
  - Cero kickers en mayÃºsculas encima de tÃ­tulos y cero cajas pastel alrededor de iconos.
