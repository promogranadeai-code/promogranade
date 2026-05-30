import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { LogoMark } from "./LogoMark";

interface LaptopProps {
  /** Frame at which the lid starts opening */
  openStart?: number;
  /** Frame at which the lid finishes opening */
  openEnd?: number;
  /** Frame at which logo fades in */
  logoIn?: number;
}

export const Laptop: React.FC<LaptopProps> = ({
  openStart = 50,
  openEnd = 110,
  logoIn = 120,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Laptop entrance: fade + scale up
  const laptopOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const laptopScale = interpolate(frame, [20, 45], [0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // Lid opening: rotateX from -86deg (flat/closed) to 0deg (open)
  const lidAngle = interpolate(frame, [openStart, openEnd], [-86, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // Screen height: grows as lid opens
  const screenH = interpolate(frame, [openStart, openEnd], [6, 220], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // Logo on screen
  const logoOpacity = interpolate(frame, [logoIn, logoIn + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const logoY = interpolate(frame, [logoIn, logoIn + 18], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // Screen glow pulses after opening
  const glowOpacity = interpolate(
    frame,
    [openEnd, openEnd + 10, openEnd + 20],
    [0, 0.7, 0.3],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: laptopOpacity,
        transform: `scale(${laptopScale})`,
      }}
    >
      {/* SCREEN / LID */}
      <div
        style={{
          width: 360,
          height: screenH,
          transformOrigin: "bottom center",
          transform: `perspective(1400px) rotateX(${lidAngle}deg)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Outer bezel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#181818",
            borderRadius: "12px 12px 0 0",
            border: "1px solid #2e2e2e",
          }}
        />

        {/* Camera dot */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#2a2a2a",
          }}
        />

        {/* Screen inner */}
        <div
          style={{
            position: "absolute",
            inset: 4,
            borderRadius: "10px 10px 0 0",
            background: "#050505",
            overflow: "hidden",
          }}
        >
          {/* Scanlines */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.04,
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
            }}
          />

          {/* Screen glow after opening */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(220,20,44,0.25) 0%, transparent 70%)",
              opacity: glowOpacity,
            }}
          />

          {/* Logo content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              opacity: logoOpacity,
              transform: `translateY(${logoY}px)`,
            }}
          >
            <LogoMark size={44} />
            <p
              style={{
                color: "white",
                fontSize: 10,
                fontFamily: "sans-serif",
                fontWeight: 700,
                letterSpacing: "0.28em",
                margin: 0,
                opacity: 0.9,
              }}
            >
              PROMOGRANADE
            </p>
          </div>
        </div>
      </div>

      {/* HINGE */}
      <div
        style={{
          width: 372,
          height: 3,
          background: "#202020",
          borderRadius: 2,
        }}
      />

      {/* BASE / KEYBOARD */}
      <div
        style={{
          width: 378,
          height: 18,
          background: "#181818",
          borderRadius: "0 0 16px 16px",
          border: "1px solid #252525",
          borderTop: "none",
          transform: "perspective(1400px) rotateX(-8deg)",
          transformOrigin: "top center",
        }}
      />

      {/* Desk shadow */}
      <div
        style={{
          marginTop: 8,
          width: 180,
          height: 8,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)",
        }}
      />
    </div>
  );
};
