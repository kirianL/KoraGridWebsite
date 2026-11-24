import React, { useEffect, useRef } from "react";

export interface AsciiParticleCanvasProps {
  src: string;
  alt: string;
  ramp?: string;
  theme?: "light" | "dark";
  glyphColor?: [number, number, number];
  speed?: number;
  cellWidth?: number;
  deadZone?: number;
  className?: string;
  palette?: string[];
}

// Simplex 2D noise (compact implementation)
function createNoise() {
  const F2 = 0.5 * (Math.sqrt(3) - 1);
  const G2 = (3 - Math.sqrt(3)) / 6;
  const grad3 = [
    [1, 1], [-1, 1], [1, -1], [-1, -1],
    [1, 0], [-1, 0], [0, 1], [0, -1],
  ];
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  // Fisher-Yates shuffle with fixed seed for determinism
  let seed = 42;
  for (let i = 255; i > 0; i--) {
    seed = (seed * 16807 + 0) % 2147483647;
    const j = seed % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  function dot2(g: number[], x: number, y: number) {
    return g[0] * x + g[1] * y;
  }

  return function noise2D(xin: number, yin: number): number {
    let n0 = 0, n1 = 0, n2 = 0;
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;
    let i1: number, j1: number;
    if (x0 > y0) { i1 = 1; j1 = 0; }
    else { i1 = 0; j1 = 1; }
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;
    const ii = i & 255;
    const jj = j & 255;
    const gi0 = perm[ii + perm[jj]] % 8;
    const gi1 = perm[ii + i1 + perm[jj + j1]] % 8;
    const gi2 = perm[ii + 1 + perm[jj + 1]] % 8;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 < 0) n0 = 0;
    else { t0 *= t0; n0 = t0 * t0 * dot2(grad3[gi0], x0, y0); }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 < 0) n1 = 0;
    else { t1 *= t1; n1 = t1 * t1 * dot2(grad3[gi1], x1, y1); }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 < 0) n2 = 0;
    else { t2 *= t2; n2 = t2 * t2 * dot2(grad3[gi2], x2, y2); }
    return 70 * (n0 + n1 + n2);
  };
}

const noise2D = createNoise();

// Multi-octave noise
function fbm(x: number, y: number, octaves: number = 4): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise2D(x * frequency, y * frequency);
    amplitude *= 0.5;
    frequency *= 2;
  }
  return value;
}

// Default purple/blue palette
const DEFAULT_PALETTE = [
  [0.231, 0.510, 0.965], // #3b82f6 system blue
  [0.376, 0.647, 0.980], // #60a5fa light blue
  [0.596, 0.780, 0.992], // #97c7fd pale blue
  [0.776, 0.878, 0.996], // #c6e0fe very pale blue
  [0.145, 0.388, 0.922], // #2563eb deep blue
  [0.055, 0.055, 0.055], // #0e0e0e near-black
];

export const AsciiParticleCanvas: React.FC<AsciiParticleCanvasProps> = ({
  src,
  alt,
  ramp = "01",
  theme = "light",
  glyphColor,
  speed = 1,
  cellWidth = 8,
  deadZone = 0.06,
  className = "",
  palette = DEFAULT_PALETTE.map((c) => `rgb(${Math.round(c[0] * 255)}, ${Math.round(c[1] * 255)}, ${Math.round(c[2] * 255)})`),
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: 0 });
  const imgRef = useRef<HTMLImageElement | null>(null);
  const imgLoadedRef = useRef(false);
  const particlesRef = useRef<{
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    char: string;
    lum: number;
    color: [number, number, number];
  }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let disposed = false;
    let inView = true;
    const isLight = theme === "light";

    // Load image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (disposed) return;
      imgRef.current = img;
      imgLoadedRef.current = true;
      initParticles();
    };
    img.src = src;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = container!.getBoundingClientRect();
      canvas!.width = Math.max(1, Math.round(rect.width * dpr));
      canvas!.height = Math.max(1, Math.round(rect.height * dpr));
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = `${rect.height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (imgLoadedRef.current) initParticles();
    }

    function initParticles() {
      const img = imgRef.current;
      if (!img) return;
      const rect = container!.getBoundingClientRect();
      const cw = rect.width;
      const ch = rect.height;
      if (cw <= 0 || ch <= 0) return;

      // Contain fit
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = cw / ch;
      let drawW: number, drawH: number, offsetX: number, offsetY: number;
      if (canvasAspect > imgAspect) {
        drawH = ch * 0.98;
        drawW = drawH * imgAspect;
        offsetX = (cw - drawW) / 2;
        offsetY = (ch - drawH) / 2;
      } else {
        drawW = cw * 0.98;
        drawH = drawW / imgAspect;
        offsetX = (cw - drawW) / 2;
        offsetY = (ch - drawH) / 2;
      }

      // Sample image into offscreen canvas
      const offscreen = document.createElement("canvas");
      offscreen.width = Math.round(drawW);
      offscreen.height = Math.round(drawH);
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;
      offCtx.drawImage(img, 0, 0, offscreen.width, offscreen.height);
      const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
      const pixels = imageData.data;

      const cellSize = cellWidth;
      const cols = Math.floor(drawW / cellSize);
      const rows = Math.floor(drawH / cellSize);
      const particles: typeof particlesRef.current = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const px = Math.floor(col * cellSize + cellSize / 2);
          const py = Math.floor(row * cellSize + cellSize / 2);
          if (px >= offscreen.width || py >= offscreen.height) continue;
          const idx = (py * offscreen.width + px) * 4;
          const r = pixels[idx] / 255;
          const g = pixels[idx + 1] / 255;
          const b = pixels[idx + 2] / 255;
          const a = pixels[idx + 3] / 255;
          if (a < 0.1) continue;

          const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          // For light images, invert so dark content becomes particles
          const effectiveLum = isLight ? 1 - lum : lum;
          if (effectiveLum < deadZone) continue;

          // Character from ramp
          const charIdx = Math.floor(effectiveLum * (ramp.length - 1));
          const char = ramp[Math.min(charIdx, ramp.length - 1)] || "0";

          // Color from palette based on luminance and position
          const paletteIdx = Math.floor(effectiveLum * (palette.length - 1));
          const colorStr = palette[Math.min(paletteIdx, palette.length - 1)];
          const colorMatch = colorStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          const color: [number, number, number] = colorMatch
            ? [parseInt(colorMatch[1]) / 255, parseInt(colorMatch[2]) / 255, parseInt(colorMatch[3]) / 255]
            : [0.463, 0.329, 0.839];

          const baseX = offsetX + col * cellSize + cellSize / 2;
          const baseY = offsetY + row * cellSize + cellSize / 2;

          particles.push({
            x: baseX,
            y: baseY,
            baseX,
            baseY,
            vx: 0,
            vy: 0,
            char,
            lum: effectiveLum,
            color,
          });
        }
      }

      particlesRef.current = particles;
    }

    function draw(time: number) {
      if (disposed || !inView) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      const dt = lastTimeRef.current ? (time - lastTimeRef.current) / 1000 : 0.016;
      lastTimeRef.current = time;
      timeRef.current += dt * speed;

      const rect = container!.getBoundingClientRect();
      const cw = rect.width;
      const ch = rect.height;
      ctx!.clearRect(0, 0, cw, ch);

      const particles = particlesRef.current;
      const t = timeRef.current;
      const mouse = mouseRef.current;

      // Font setup
      const fontSize = cellWidth * 1.3;
      ctx!.font = `600 ${fontSize}px "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Perlin noise displacement (multi-octave) — subtle to preserve shape
        const noiseX = fbm(p.baseX * 0.004 + t * 0.12, p.baseY * 0.004 + t * 0.08, 2) * 3;
        const noiseY = fbm(p.baseX * 0.004 + 100 + t * 0.1, p.baseY * 0.004 + 100 + t * 0.06, 2) * 3;

        // Attraction to base position
        const dx = p.baseX - p.x;
        const dy = p.baseY - p.y;
        // attraction handled by dx/dy terms below

        // Mouse interaction
        const mouseDx = p.x - mouse.x * cw;
        const mouseDy = p.y - mouse.y * ch;
        const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        const mouseRadius = 80;
        let mouseForceX = 0;
        let mouseForceY = 0;
        if (mouse.active > 0.01 && mouseDist < mouseRadius && mouseDist > 0) {
          const force = (1 - mouseDist / mouseRadius) * 3 * mouse.active;
          mouseForceX = (mouseDx / mouseDist) * force;
          mouseForceY = (mouseDy / mouseDist) * force;
        }

        // Update velocity
        p.vx += (noiseX + dx * 0.15 + mouseForceX - p.vx * 0.1) * 0.15;
        p.vy += (noiseY + dy * 0.15 + mouseForceY - p.vy * 0.1) * 0.15;

        // Damping
        p.vx *= 0.88;
        p.vy *= 0.88;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Color variation based on noise and time
        const colorNoise = fbm(p.baseX * 0.005 + t * 0.05, p.baseY * 0.005 + t * 0.03, 2);
        const colorIdx = Math.floor(((p.lum + colorNoise * 0.3 + 0.5) % 1) * palette.length);
        const colorStr = palette[Math.max(0, Math.min(palette.length - 1, colorIdx))];
        const colorMatch = colorStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        const color = colorMatch
          ? `rgb(${colorMatch[1]}, ${colorMatch[2]}, ${colorMatch[3]})`
          : `rgb(${Math.round(p.color[0] * 255)}, ${Math.round(p.color[1] * 255)}, ${Math.round(p.color[2] * 255)})`;

        // Draw character
        ctx!.fillStyle = color;
        ctx!.globalAlpha = 0.85 + p.lum * 0.15;
        ctx!.fillText(p.char, p.x, p.y);
      }

      ctx!.globalAlpha = 1;

      if (!disposed) {
        animFrameRef.current = requestAnimationFrame(draw);
      }
    }

    // Mouse tracking
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
      mouseRef.current.active = 1;
    };
    const onPointerLeave = () => {
      mouseRef.current.active = 0;
    };
    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    // Intersection observer for visibility
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
      },
      { rootMargin: "100px" }
    );
    io.observe(container);

    // Reduced motion check
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    resize();
    window.addEventListener("resize", resize);

    if (!prefersReduced) {
      animFrameRef.current = requestAnimationFrame(draw);
    } else {
      // Static render
      draw(0);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      io.disconnect();
    };
  }, [src, ramp, theme, glyphColor, speed, cellWidth, deadZone, palette]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden bg-white ${className}`}
      role="img"
      aria-label={alt}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
};
