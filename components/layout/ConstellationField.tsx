"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";

const ACCENT = "#e0142c";
const PARTICLE_COUNT = 72;
const MAX_DIST = 160;
const SPEED = 0.18;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  accent: boolean;
  opacity: number;
  pulseOffset: number;
}

function makeParticles(w: number, h: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * SPEED,
    vy: (Math.random() - 0.5) * SPEED,
    r: 1 + Math.random() * 2,
    accent: i % 9 === 0,
    opacity: 0.25 + Math.random() * 0.45,
    pulseOffset: Math.random() * Math.PI * 2,
  }));
}

export function ConstellationField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef<number>(0);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = resolvedTheme !== "light";
    // foreground colour for dots / lines
    const fg = isDark ? "255,255,255" : "0,0,0";

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particles.current.length === 0)
        particles.current = makeParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    let t = 0;

    const draw = () => {
      raf.current = requestAnimationFrame(draw);
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      const ps = particles.current;

      // Move
      if (!reduceMotion) {
        for (const p of ps) {
          // gentle mouse attraction
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            p.vx += (dx / dist) * 0.004;
            p.vy += (dy / dist) * 0.004;
          }
          // drift damping
          p.vx *= 0.992;
          p.vy *= 0.992;
          // keep speed bounded
          const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (spd > SPEED * 2.5) { p.vx *= SPEED * 2.5 / spd; p.vy *= SPEED * 2.5 / spd; }
          p.x += p.vx;
          p.y += p.vy;
          // wrap
          if (p.x < 0) p.x += W;
          if (p.x > W) p.x -= W;
          if (p.y < 0) p.y += H;
          if (p.y > H) p.y -= H;
        }
      }

      // Draw edges
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.18;
            const useAccent = ps[i].accent || ps[j].accent;
            if (useAccent) {
              ctx.strokeStyle = `rgba(224,20,44,${alpha * 1.6})`;
            } else {
              ctx.strokeStyle = `rgba(${fg},${alpha})`;
            }
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const p of ps) {
        const pulse = 0.7 + 0.3 * Math.sin(t * 1.8 + p.pulseOffset);
        const op = p.opacity * pulse;
        if (p.accent) {
          // Glow
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
          g.addColorStop(0, `rgba(224,20,44,${op * 0.55})`);
          g.addColorStop(1, `rgba(224,20,44,0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
          ctx.fill();
          // Core
          ctx.fillStyle = `rgba(224,20,44,${op})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${fg},${op * 0.6})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [resolvedTheme, reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden
    />
  );
}

export default ConstellationField;
