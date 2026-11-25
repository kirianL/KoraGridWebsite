import React, { useEffect, useRef } from "react";
import { getLenisVelocity } from "../hooks/useLenis";

export type ProceduralAsciiScene = "wind-turbine" | "grid-globe" | "load-pulse" | "audit-torus";

export interface AsciiMotionCanvasProps {
  mediaType?: "procedural" | "image" | "video";
  scene?: ProceduralAsciiScene;
  src?: string;
  alt: string;
  ramp?: string;
  theme?: "light" | "dark";
  glyphColor?: [number, number, number];
  speed?: number;
  cellWidth?: number;
  deadZone?: number;
  className?: string;
}

const GLYPH_SIZE = 128;

const VERT_SHADER = `#version 300 es
in vec2 a_position;
out vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG_SHADER = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 outColor;

uniform sampler2D u_source;
uniform sampler2D u_atlas;
uniform vec2 u_resolution;
uniform vec2 u_sourceSize;
uniform vec2 u_cellSize;
uniform vec2 u_mouse;
uniform float u_mouseActive;
uniform float u_time;
uniform float u_scrollVelocity;
uniform float u_glyphCount;
uniform float u_mode;
uniform float u_scene;
uniform float u_isLight;
uniform vec3 u_glyphColor;
uniform float u_speed;
uniform float u_deadZone;

float bayer4x4(vec2 pos) {
  int x = int(mod(pos.x, 4.0));
  int y = int(mod(pos.y, 4.0));
  int idx = y * 4 + x;
  float m[16] = float[16](
     0.0,  8.0,  2.0, 10.0,
    12.0,  4.0, 14.0,  6.0,
     3.0, 11.0,  1.0,  9.0,
    15.0,  7.0, 13.0,  5.0
  );
  return (m[idx] / 16.0) - 0.5;
}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

mat2 rot2(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float sdCapsule(vec3 p, vec3 a, vec3 b, float r) {
  vec3 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - r;
}

float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float sdLoadPulse(vec3 p, float t) {
  vec3 q = p;
  q.xz *= rot2(t * 0.3926991);
  q.xy *= rot2(sin(t * 0.7853982) * 0.20 + 0.12);

  // Subtle breathing pulse (8s period)
  float pulse = 1.0 + 0.045 * sin(t * 0.7853982);
  float r = 0.92 * pulse;
  float thick = 0.085;

  // 6 symmetric 3D rays through the origin = 12-point starburst (exact SDF, 180-deg Y symmetric)
  float d = sdCapsule(q, vec3(-r, 0.0, 0.0), vec3(r, 0.0, 0.0), thick);
  d = smin(d, sdCapsule(q, vec3(0.0, -r, 0.0), vec3(0.0, r, 0.0), thick), 0.14);
  d = smin(d, sdCapsule(q, vec3(0.0, 0.0, -r), vec3(0.0, 0.0, r), thick), 0.14);

  vec3 d1 = normalize(vec3(1.0, 1.0, 0.45)) * r * 0.92;
  vec3 d2 = normalize(vec3(-1.0, 1.0, 0.45)) * r * 0.92;
  vec3 d3 = normalize(vec3(0.45, 1.0, -1.0)) * r * 0.88;
  d = smin(d, sdCapsule(q, -d1, d1, thick * 0.9), 0.14);
  d = smin(d, sdCapsule(q, -d2, d2, thick * 0.9), 0.14);
  d = smin(d, sdCapsule(q, -d3, d3, thick * 0.9), 0.14);

  return d;
}

float sdAuditTorus(vec3 p, float t) {
  vec3 q = p;
  q.xz *= rot2(t * 0.3926991);
  q.xy *= rot2(sin(t * 0.7853982) * 0.24 + 0.42);

  // Subtle traveling telemetry wave along the ring (8s period), keeping the center hole clean
  float ang = atan(q.y, q.x);
  float wave = sin(ang * 4.0 + t * 0.7853982) * 0.025;
  float minorR = 0.25 + wave;
  float majorR = 0.72;

  return sdTorus(q.xzy, vec2(majorR, minorR));
}

float mapScene(vec3 p, float t) {
  return u_scene < 0.5 ? sdLoadPulse(p, t) : sdAuditTorus(p, t);
}

vec3 calcNormal(vec3 p, float t) {
  vec2 e = vec2(0.0025, 0.0);
  return normalize(vec3(
    mapScene(p + e.xyy, t) - mapScene(p - e.xyy, t),
    mapScene(p + e.yxy, t) - mapScene(p - e.yxy, t),
    mapScene(p + e.yyx, t) - mapScene(p - e.yyx, t)
  ));
}

vec2 coverUv(vec2 uv, vec2 res, vec2 srcSize) {
  float resAspect = res.x / max(res.y, 1.0);
  float srcAspect = srcSize.x / max(srcSize.y, 1.0);
  vec2 scale = vec2(1.0);
  if (resAspect > srcAspect) scale.y = srcAspect / resAspect;
  else scale.x = resAspect / srcAspect;
  return (uv - 0.5) * scale + 0.5;
}

void main() {
  vec2 fragPx = vec2(v_uv.x, 1.0 - v_uv.y) * u_resolution;
  vec2 cellIndex = floor(fragPx / u_cellSize);
  vec2 cellLocal = fract(fragPx / u_cellSize);
  vec2 cellUv = (cellIndex + 0.5) * u_cellSize / u_resolution;

  // MODE 0: Procedural 3D Raymarched ASCII (for light cards)
  if (u_mode < 0.5) {
    vec2 p = (cellUv - 0.5) * 2.0;
    p.x *= u_resolution.x / max(u_resolution.y, 1.0);

    vec2 mouseTilt = (u_mouse - 0.5) * u_mouseActive * 0.35;
    float t = u_time * u_speed + clamp(u_scrollVelocity * 0.025, -0.4, 0.4);

    vec3 ro = vec3(mouseTilt.x * 0.4, -mouseTilt.y * 0.4, 1.85);
    vec3 rd = normalize(vec3(p, -1.55));

    vec3 bg = u_isLight > 0.5 ? vec3(1.0) : vec3(0.0392, 0.0431, 0.0549);

    // Fast bounding-sphere early-out to skip empty background cells
    float bProj = dot(ro, rd);
    float bDisc = bProj * bProj - (dot(ro, ro) - 1.55 * 1.55);
    if (bDisc < 0.0) {
      outColor = vec4(bg, 1.0);
      return;
    }

    float dist = max(0.0, -bProj - sqrt(bDisc));
    bool hit = false;
    for (int i = 0; i < 32; i++) {
      float d = mapScene(ro + rd * dist, t);
      if (d < 0.004) {
        hit = true;
        break;
      }
      if (dist > 3.8) break;
      dist += d;
    }

    if (!hit) {
      outColor = vec4(bg, 1.0);
      return;
    }

    vec3 pos = ro + rd * dist;
    vec3 n = calcNormal(pos, t);
    float diff = clamp(dot(n, normalize(vec3(0.55, 0.75, 0.85))), 0.0, 1.0);
    float fresnel = max(dot(n, -rd), 0.0);
    float edgeFade = smoothstep(0.0, 0.14, fresnel);
    float density = clamp(0.32 + diff * 0.56 + (1.0 - fresnel) * 0.14, 0.0, 1.0);
    float dithered = clamp(density + bayer4x4(cellIndex) * 0.13, 0.0, 1.0);

    float glyphIdx = floor(dithered * (u_glyphCount - 1.0) + 0.5);
    glyphIdx = clamp(glyphIdx, 1.0, u_glyphCount - 1.0);

    vec2 atlasUv = vec2((glyphIdx + cellLocal.x) / u_glyphCount, cellLocal.y);
    float glyphAlpha = texture(u_atlas, atlasUv).a;

    // Multi-tone blue gradient (deep blue core -> system blue -> soft sky blue rim)
    vec3 deepBlue = u_glyphColor * vec3(0.58, 0.72, 0.98);
    vec3 skyBlue = mix(u_glyphColor, vec3(0.58, 0.78, 0.99), 0.55);
    vec3 inkColor = mix(skyBlue, deepBlue, clamp(diff * 0.7 + fresnel * 0.3, 0.0, 1.0));

    float inkStrength = mix(0.68, 1.0, density) * mix(0.45, 1.0, edgeFade) * glyphAlpha;
    outColor = vec4(mix(bg, inkColor, inkStrength), 1.0);
    return;
  }

  // MODE 1: ASCII halftone from image (contain fit, no cropping)
  float resAspect = u_resolution.x / max(u_resolution.y, 1.0);
  float srcAspect = u_sourceSize.x / max(u_sourceSize.y, 1.0);
  vec2 fitScale = vec2(1.0);
  if (resAspect > srcAspect) {
    fitScale.x = resAspect / srcAspect;
  } else {
    fitScale.y = srcAspect / resAspect;
  }
  // Slight margin so the full image is never clipped
  fitScale *= 0.92;
  vec2 sUv = (cellUv - 0.5) * fitScale + vec2(0.5, 0.5);

  // Sample 2x2 sub-cell average + 4-tap wide blur for volumetric glow behind the tower
  vec2 texStep = (u_cellSize / u_resolution) * fitScale * 0.32;
  float maxSub = 0.0;
  float avgSub = 0.0;
  for (int oy = 0; oy <= 1; oy++) {
    for (int ox = 0; ox <= 1; ox++) {
      vec2 oUv = sUv + (vec2(float(ox), float(oy)) - 0.5) * texStep;
      bool inBounds = oUv.x >= 0.0 && oUv.x <= 1.0 && oUv.y >= 0.0 && oUv.y <= 1.0;
      vec4 sc = inBounds ? texture(u_source, oUv) : vec4(u_isLight > 0.5 ? 1.0 : 0.0, u_isLight > 0.5 ? 1.0 : 0.0, u_isLight > 0.5 ? 1.0 : 0.0, 1.0);
      vec3 rgb = mix(vec3(u_isLight > 0.5 ? 1.0 : 0.0), sc.rgb, sc.a);
      float v = max(rgb.r, max(rgb.g, rgb.b));
      maxSub = max(maxSub, v);
      avgSub += v * 0.25;
    }
  }
  float rawLum = mix(avgSub, maxSub, 0.55);
  float lum = smoothstep(0.09, 0.78, rawLum);
  // In image mode on light theme, invert so dark content on light bg becomes visible dots
  if (u_mode > 0.5 && u_isLight > 0.5) {
    lum = 1.0 - smoothstep(0.22, 0.85, rawLum);
  }

  // Wide atmospheric bloom around the tower structure
  float bloom = 0.0;
  vec2 bStep = vec2(0.028, 0.022);
  bloom += max(0.0, texture(u_source, clamp(sUv + vec2( bStep.x,  0.0), 0.0, 1.0)).b) * 0.25;
  bloom += max(0.0, texture(u_source, clamp(sUv + vec2(-bStep.x,  0.0), 0.0, 1.0)).b) * 0.25;
  bloom += max(0.0, texture(u_source, clamp(sUv + vec2( 0.0,  bStep.y), 0.0, 1.0)).b) * 0.25;
  bloom += max(0.0, texture(u_source, clamp(sUv + vec2( 0.0, -bStep.y), 0.0, 1.0)).b) * 0.25;

  // Animated telemetry pulse traveling along tower & cables + cursor glow
  float scanSpeed = 1.4 + clamp(abs(u_scrollVelocity) * 0.12, 0.0, 2.0);
  float scanWave = pow(max(0.0, sin(cellUv.y * 4.0 - u_time * scanSpeed)), 6.0);
  float tick = floor(u_time * 12.0);
  float cellNoise = hash21(cellIndex + vec2(tick * 0.17, tick * 0.11)) - 0.5;

  vec2 mouseDelta = (cellUv - u_mouse) * vec2(resAspect, 1.0);
  float mouseGlow = exp(-length(mouseDelta) * 5.5) * u_mouseActive;

  // Background: solid for image mode (no atmospheric haze), atmospheric for procedural mode
  vec3 bgColor;
  if (u_mode > 0.5) {
    bgColor = u_isLight > 0.5 ? vec3(1.0) : vec3(0.0392, 0.0431, 0.0549);
  } else {
    float hazeTopRight = exp(-length(cellUv - vec2(0.76, 0.22)) * 2.1);
    float hazeMidLeft  = exp(-length(cellUv - vec2(0.20, 0.52)) * 2.5);
    vec3 bgBase = vec3(0.115, 0.105, 0.125);
    vec3 bgHaze = vec3(0.290, 0.325, 0.415);
    bgColor = mix(bgBase, bgHaze, clamp(hazeTopRight * 0.85 + hazeMidLeft * 0.55 + bloom * 0.45, 0.0, 0.92));
  }

  float dynamicLum = lum;
  if (lum > u_deadZone) {
    dynamicLum = clamp(lum + scanWave * 0.35 + cellNoise * 0.12 + mouseGlow * 0.4, 0.0, 1.0);
  }

  if (dynamicLum <= u_deadZone) {
    if (u_mode > 0.5) {
      outColor = vec4(0.0, 0.0, 0.0, 0.0);
    } else {
      outColor = vec4(bgColor, 1.0);
    }
    return;
  }

  // Glyph-based ASCII rendering
  float normLum = clamp((dynamicLum - u_deadZone) / (1.0 - u_deadZone), 0.0, 1.0);
  float dithered = clamp(normLum + bayer4x4(cellIndex + vec2(floor(u_time * 3.0), floor(u_time * 2.0))) * 0.14, 0.0, 1.0);
  float glyphIdx = floor(dithered * (u_glyphCount - 1.0) + 0.5);
  glyphIdx = clamp(glyphIdx, 1.0, u_glyphCount - 1.0);

  vec2 atlasUv = vec2((glyphIdx + cellLocal.x) / u_glyphCount, cellLocal.y);
  float glyphAlpha = texture(u_atlas, atlasUv).a;
  float inkStrength = mix(0.55, 1.0, normLum) * glyphAlpha;

  if (u_mode > 0.5) {
    outColor = vec4(u_glyphColor, inkStrength);
  } else {
    outColor = vec4(mix(bgColor, u_glyphColor, inkStrength), 1.0);
  }
}
`;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createGlyphAtlasTexture(gl: WebGL2RenderingContext, ramp: string): WebGLTexture | null {
  const count = ramp.length;
  const atlas = document.createElement("canvas");
  atlas.width = count * GLYPH_SIZE;
  atlas.height = GLYPH_SIZE;
  const ctx = atlas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, atlas.width, atlas.height);
  ctx.fillStyle = "#ffffff";
  ctx.font = `600 ${Math.round(GLYPH_SIZE * 0.78)}px "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 0; i < count; i++) {
    const ch = ramp[i];
    if (ch !== " ") {
      ctx.fillText(ch, i * GLYPH_SIZE + GLYPH_SIZE / 2, GLYPH_SIZE / 2 + 2);
    }
  }

  const texture = gl.createTexture();
  if (!texture) return null;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return texture;
}

export const AsciiMotionCanvas: React.FC<AsciiMotionCanvasProps> = ({
  mediaType = "procedural",
  scene = "wind-turbine",
  src,
  alt,
  ramp = " .:+=-14579",
  theme = "light",
  glyphColor = [0.2314, 0.5098, 0.9647],
  speed = 1,
  cellWidth = 10,
  deadZone = 0.07,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    let disposed = false;
    let rafId = 0;
    let inView = true;
    let mediaReady = mediaType === "procedural";
    let sourceWidth = 1200;
    let sourceHeight = 1500;
    let smoothVelocity = 0;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const forceAnimate =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("animate") === "1";
    const isAutomatedCapture =
      !forceAnimate &&
      typeof navigator !== "undefined" &&
      Boolean(navigator.webdriver);

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SHADER);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    const quadVao = gl.createVertexArray();
    const quadBuf = gl.createBuffer();
    gl.bindVertexArray(quadVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    let atlasTex = createGlyphAtlasTexture(gl, ramp);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (disposed) return;
        const freshAtlas = createGlyphAtlasTexture(gl, ramp);
        if (freshAtlas) {
          if (atlasTex) gl.deleteTexture(atlasTex);
          atlasTex = freshAtlas;
          if ((prefersReduced || isAutomatedCapture) && mediaReady) drawFrame(1200);
        }
      });
    }

    const sourceTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, sourceTex);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([9, 9, 11, 255])
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const uSource = gl.getUniformLocation(program, "u_source");
    const uAtlas = gl.getUniformLocation(program, "u_atlas");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uSourceSize = gl.getUniformLocation(program, "u_sourceSize");
    const uCellSize = gl.getUniformLocation(program, "u_cellSize");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uMouseActive = gl.getUniformLocation(program, "u_mouseActive");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uScrollVelocity = gl.getUniformLocation(program, "u_scrollVelocity");
    const uGlyphCount = gl.getUniformLocation(program, "u_glyphCount");
    const uMode = gl.getUniformLocation(program, "u_mode");
    const uScene = gl.getUniformLocation(program, "u_scene");
    const uIsLight = gl.getUniformLocation(program, "u_isLight");
    const uGlyphColor = gl.getUniformLocation(program, "u_glyphColor");
    const uSpeed = gl.getUniformLocation(program, "u_speed");
    const uDeadZone = gl.getUniformLocation(program, "u_deadZone");

    let mouseX = 0.5;
    let mouseY = 0.5;
    let mouseActive = 0;
    let targetMouseActive = 0;

    const getTargetDpr = () => {
      const maxDpr =
        typeof navigator !== "undefined" && navigator.webdriver ? 2 : 1.5;
      return Math.min(window.devicePixelRatio || 1, maxDpr);
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = getTargetDpr();
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const drawFrame = (timeMs: number) => {
      if (disposed || !atlasTex || !mediaReady) return;

      const dpr = getTargetDpr();
      const isCompact = container.clientWidth < 460;
      const effCellW = (isCompact ? Math.max(6, cellWidth - 1) : cellWidth) * dpr;
      const effCellH = Math.round(effCellW / 0.58);

      mouseActive += (targetMouseActive - mouseActive) * 0.12;
      smoothVelocity += (getLenisVelocity() - smoothVelocity) * 0.15;

      gl.useProgram(program);
      gl.bindVertexArray(quadVao);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, sourceTex);
      gl.uniform1i(uSource, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, atlasTex);
      gl.uniform1i(uAtlas, 1);

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uSourceSize, sourceWidth, sourceHeight);
      gl.uniform2f(uCellSize, effCellW, effCellH);
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.uniform1f(uMouseActive, mouseActive);
      gl.uniform1f(uTime, timeMs * 0.001);
      gl.uniform1f(uScrollVelocity, smoothVelocity);
      gl.uniform1f(uGlyphCount, ramp.length);
      gl.uniform1f(uMode, mediaType === "procedural" ? 0.0 : 1.0);
      gl.uniform1f(uScene, scene === "wind-turbine" || scene === "load-pulse" ? 0.0 : 1.0);
      gl.uniform1f(uIsLight, theme === "light" ? 1.0 : 0.0);
      gl.uniform3f(uGlyphColor, glyphColor[0], glyphColor[1], glyphColor[2]);
      gl.uniform1f(uSpeed, speedRef.current);
      gl.uniform1f(uDeadZone, deadZone);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    resize();

    if (mediaType === "image" && src) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (disposed) return;
        sourceWidth = img.naturalWidth || 1200;
        sourceHeight = img.naturalHeight || 1500;
        gl.bindTexture(gl.TEXTURE_2D, sourceTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        mediaReady = true;
        if (prefersReduced || isAutomatedCapture) drawFrame(1200);
      };
      img.src = src;
    } else if (prefersReduced || isAutomatedCapture) {
      drawFrame(1200);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if ((prefersReduced || isAutomatedCapture) && mediaReady) drawFrame(1200);
    });
    resizeObserver.observe(container);

    const startLoop = () => {
      if (rafId || prefersReduced || isAutomatedCapture || !inView || document.hidden) return;
      const loop = (t: number) => {
        if (disposed || !inView || document.hidden) {
          rafId = 0;
          return;
        }
        const manualTime = (window as unknown as { __asciiTimeMs?: number }).__asciiTimeMs;
        drawFrame(typeof manualTime === "number" ? manualTime : t);
        rafId = window.requestAnimationFrame(loop);
      };
      rafId = window.requestAnimationFrame(loop);
    };

    const onManualTick = () => {
      const manualTime = (window as unknown as { __asciiTimeMs?: number }).__asciiTimeMs;
      if (typeof manualTime === "number" && mediaReady) {
        drawFrame(manualTime);
      }
    };
    window.addEventListener("ascii-tick", onManualTick);

    const stopLoop = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        if (inView) {
          if (prefersReduced || isAutomatedCapture) {
            if (mediaReady) drawFrame(1200);
          } else {
            startLoop();
          }
        } else {
          stopLoop();
        }
      },
      { rootMargin: "120px" }
    );
    io.observe(container);

    const onVisibilityChange = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
      targetMouseActive = 1;
    };
    const onPointerLeave = () => {
      targetMouseActive = 0;
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    startLoop();

    return () => {
      disposed = true;
      stopLoop();
      io.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("ascii-tick", onManualTick);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      if (sourceTex) gl.deleteTexture(sourceTex);
      if (atlasTex) gl.deleteTexture(atlasTex);
      if (quadBuf) gl.deleteBuffer(quadBuf);
      if (quadVao) gl.deleteVertexArray(quadVao);
      gl.deleteProgram(program);
    };
  }, [mediaType, scene, src, ramp, theme, glyphColor, cellWidth, deadZone]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full touch-pan-y overflow-hidden ${
        theme === "light" ? "bg-white" : "bg-[#0a0b0e]"
      } ${className}`}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        className="block h-full w-full"
      />
    </div>
  );
};
