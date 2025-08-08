import { useEffect, useRef } from "react";

// Dark, moody starfield with subtle cloud-like gradients
// Uses HSL colors and pointer-events-none so it never blocks UI
export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const getSize = () => ({ w: canvas.clientWidth, h: canvas.clientHeight });

    type Star = { x: number; y: number; r: number; baseA: number; tw: number; ph: number };
    let stars: Star[] = [];

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    // Read HSL tokens from CSS variables; fallback to sensible values
    const css = getComputedStyle(document.documentElement);
    const primary = css.getPropertyValue("--primary").trim() || "260 60% 50%";
    const secondary = css.getPropertyValue("--secondary").trim() || "280 50% 45%";

    const resize = () => {
      const { w, h } = getSize();
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rebuild scene on resize with density tied to area
      const density = Math.max(120, Math.floor((w * h) / 8000));
      stars = Array.from({ length: density }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.4, 1.4),
        baseA: rand(0.35, 0.9),
        tw: rand(0.0015, 0.004), // twinkle speed
        ph: rand(0, Math.PI * 2), // phase
      }));

      // Prepaint soft cloud blobs into background layer
      paintBackground();
    };

    const paintBackground = () => {
      const { w, h } = getSize();
      ctx.clearRect(0, 0, w, h);

      // Base vignette gradient
      const g1 = ctx.createRadialGradient(w * 0.5, h * 0.6, 0, w * 0.5, h * 0.6, Math.max(w, h));
      g1.addColorStop(0, `hsl(${primary} / 0.08)`);
      g1.addColorStop(1, `hsl(${secondary} / 0.02)`);
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Cloud clusters (large, soft circles with radial fades)
      const clusters = 8;
      for (let i = 0; i < clusters; i++) {
        const cx = rand(-w * 0.2, w * 1.2);
        const cy = rand(-h * 0.1, h * 1.1);
        const r = rand(Math.max(w, h) * 0.25, Math.max(w, h) * 0.55);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `hsl(${primary} / ${rand(0.05, 0.12).toFixed(2)})`);
        g.addColorStop(1, `hsl(${secondary} / 0)`);
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    let t = 0;
    const draw = () => {
      const { w, h } = getSize();

      // Keep the soft background
      // Draw stars on top with twinkle
      ctx.save();
      // Slight transparent paint over stars area for a subtle trail
      ctx.fillStyle = "hsla(240 10% 5% / 0.02)"; // very dark wash in HSL
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        const a = s.baseA * (0.7 + 0.3 * Math.sin(t * s.tw + s.ph));
        // Star glow
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
        g.addColorStop(0, `hsla(0 0% 100% / ${Math.min(1, a).toFixed(3)})`);
        g.addColorStop(1, `hsla(0 0% 100% / 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Star core
        ctx.fillStyle = `hsla(0 0% 100% / ${Math.min(1, a + 0.1).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      t += 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Subtle gradient overlay to blend with theme background using semantic tokens */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/70" />
    </div>
  );
}
