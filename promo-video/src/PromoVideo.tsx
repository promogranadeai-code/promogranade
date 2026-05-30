import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { Laptop } from "./components/Laptop";
import { LiquidBg } from "./components/LiquidBg";
import { LogoMark } from "./components/LogoMark";

// ─────────────────────────────────────────────
// Timeline (30fps)
//  0 – 20f  : fade-in from black
// 20 – 50f  : laptop appears
// 50 – 110f : lid opens
// 110–140f  : logo fades on screen
// 140–180f  : screen expands to fill frame
// 180–240f  : liquid water fill + tagline
// 240–270f  : big logo + headline reveal
// 270–300f  : fade out
// ─────────────────────────────────────────────

export const PromoVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // ── PHASE OPACITIES ──────────────────────────
  const initialFadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  // Screen expansion (frame 140-180): clip from laptop size to full
  const expandProgress = interpolate(frame, [140, 178], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.76, 0, 0.24, 1),
  });

  // Laptop screen width/height at expansion start: 352 x 212
  const laptopW = 352;
  const laptopH = 212;
  const expandW = interpolate(expandProgress, [0, 1], [laptopW, width]);
  const expandH = interpolate(expandProgress, [0, 1], [laptopH, height]);
  const expandRadius = interpolate(expandProgress, [0, 1], [10, 0]);

  // Show liquid bg after expansion starts
  const liquidOpacity = interpolate(frame, [155, 185], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  // Laptop fades out as screen expands
  const laptopOpacityOut = interpolate(frame, [138, 155], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline
  const taglineOpacity = interpolate(frame, [192, 215], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const taglineY = interpolate(frame, [192, 215], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // Big logo + headline
  const heroOpacity = interpolate(frame, [242, 262], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const heroScale = interpolate(frame, [242, 262], [0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // Services word stagger reveal (frame 218-248)
  const services = [
    "Web Applications",
    "AI Automations",
    "SEO",
    "Marketing",
  ];

  // Final fade out
  const fadeOut = interpolate(frame, [282, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a0a",
        fontFamily: "'Arial', sans-serif",
        opacity: initialFadeIn * fadeOut,
        overflow: "hidden",
      }}
    >
      {/* ── SCENE 1–3: LAPTOP (frame 0-180) ── */}
      <Sequence from={0} durationInFrames={180}>
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            opacity: laptopOpacityOut,
          }}
        >
          <Laptop openStart={50} openEnd={110} logoIn={118} />
        </AbsoluteFill>
      </Sequence>

      {/* ── EXPANDING SCREEN OVERLAY (frame 140-300) ── */}
      {frame >= 140 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: expandW,
            height: expandH,
            borderRadius: expandRadius,
            background: "#050505",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Liquid BG inside expanding screen */}
          <LiquidBg opacity={liquidOpacity} />

          {/* Tagline (scene 4: 190-240) */}
          {frame >= 190 && frame < 242 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 24,
                opacity: taglineOpacity,
                transform: `translateY(${taglineY}px)`,
              }}
            >
              <LogoMark size={64} />
              <p
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "0.32em",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                PROMOGRANADE
              </p>

              {/* Service words stagger */}
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  maxWidth: 900,
                }}
              >
                {services.map((svc, i) => {
                  const svcOpacity = interpolate(
                    frame,
                    [218 + i * 8, 230 + i * 8],
                    [0, 1],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                      easing: Easing.bezier(0.22, 1, 0.36, 1),
                    }
                  );
                  const svcX = interpolate(
                    frame,
                    [218 + i * 8, 230 + i * 8],
                    [14, 0],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }
                  );
                  return (
                    <div
                      key={svc}
                      style={{
                        opacity: svcOpacity,
                        transform: `translateX(${svcX}px)`,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#dc1428",
                          display: "inline-block",
                        }}
                      />
                      <span
                        style={{
                          color: "rgba(255,255,255,0.75)",
                          fontSize: 14,
                          fontWeight: 500,
                          letterSpacing: "0.06em",
                        }}
                      >
                        {svc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Hero logo scene (frame 242-300) */}
          {frame >= 242 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 32,
                opacity: heroOpacity,
                transform: `scale(${heroScale})`,
              }}
            >
              <LogoMark size={120} />

              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    color: "white",
                    fontSize: 52,
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    margin: "0 0 8px",
                    lineHeight: 1,
                  }}
                >
                  PROMOGRANADE
                </p>
                <p
                  style={{
                    color: "#dc1428",
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    margin: 0,
                    textTransform: "uppercase",
                  }}
                >
                  Solutions that scale businesses
                </p>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: interpolate(frame, [258, 275], [0, 320], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.22, 1, 0.36, 1),
                  }),
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent, #dc1428, transparent)",
                }}
              />

              <p
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: 13,
                  letterSpacing: "0.22em",
                  margin: 0,
                  textTransform: "uppercase",
                  opacity: interpolate(frame, [270, 280], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                promogranade.com
              </p>
            </div>
          )}
        </div>
      )}

      {/* Subtle red corner accents (appear with liquid scene) */}
      {frame >= 185 && (
        <>
          {[
            { top: 0, left: 0 },
            { top: 0, right: 0 },
            { bottom: 0, left: 0 },
            { bottom: 0, right: 0 },
          ].map((pos, i) => {
            const accentOpacity = interpolate(
              frame,
              [185 + i * 4, 198 + i * 4],
              [0, 0.35],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  ...pos,
                  width: 120,
                  height: 120,
                  background: `radial-gradient(circle at ${"left" in pos ? "0%" : "100%"} ${"top" in pos ? "0%" : "100%"}, rgba(220,20,44,0.45), transparent 70%)`,
                  opacity: accentOpacity,
                  pointerEvents: "none",
                }}
              />
            );
          })}
        </>
      )}
    </AbsoluteFill>
  );
};
