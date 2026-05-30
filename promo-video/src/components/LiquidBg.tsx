import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

// Frame-driven animated liquid background using SVG turbulence + gradient layers.
// No CSS transitions — all values are computed from the current frame.
export const LiquidBg: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow drift: one full cycle every 6 seconds
  const t = frame / (fps * 6);

  // Two animated gradient centres (simulate flowing liquid)
  const x1 = 20 + Math.sin(t * Math.PI * 2) * 18;
  const y1 = 30 + Math.cos(t * Math.PI * 1.3) * 20;
  const x2 = 75 + Math.cos(t * Math.PI * 1.7) * 14;
  const y2 = 65 + Math.sin(t * Math.PI * 2.4) * 16;
  const x3 = 50 + Math.sin(t * Math.PI * 0.9 + 1) * 22;
  const y3 = 80 + Math.cos(t * Math.PI * 1.1) * 14;

  // Turbulence seed advances every 2 frames for a slow shimmer
  const seed = Math.floor(frame / 2) % 200;

  // Frequency oscillates slightly for breathing feel
  const freq = interpolate(
    Math.sin(t * Math.PI * 2),
    [-1, 1],
    [0.012, 0.020]
  );

  const filterId = "liquid-turbulence";
  const displacId = "liquid-displace";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        overflow: "hidden",
      }}
    >
      {/* SVG filter definition */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={`${freq} ${freq * 0.65}`}
              numOctaves={4}
              seed={seed}
              result="noise"
            />
            <feDisplacementMap
              id={displacId}
              in="SourceGraphic"
              in2="noise"
              scale={110}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feComposite in="displaced" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Base colour */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#0a0a0a",
        }}
      />

      {/* Gradient blob 1 — primary red */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 55% 40% at ${x1}% ${y1}%, rgba(220,20,44,0.65) 0%, transparent 70%)`,
          filter: `url(#${filterId})`,
        }}
      />

      {/* Gradient blob 2 — deeper crimson */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 50% 45% at ${x2}% ${y2}%, rgba(160,10,28,0.55) 0%, transparent 68%)`,
          filter: `url(#${filterId})`,
        }}
      />

      {/* Gradient blob 3 — accent */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 40% 38% at ${x3}% ${y3}%, rgba(200,15,38,0.40) 0%, transparent 65%)`,
          filter: `url(#${filterId})`,
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />
    </div>
  );
};
