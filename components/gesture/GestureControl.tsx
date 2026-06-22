"use client";

/**
 * Place this file at: components/gesture/GestureControl.tsx
 *
 * Webcam hand-tracking that drives page scroll with two distinct
 * gestures, so accidental hand movement doesn't trigger scrolling:
 *   - 1 finger (index only) moving down  -> scroll down
 *   - 2 fingers (index + middle) moving up -> scroll up
 *
 * A gesture only counts once it's held for a few consecutive frames
 * (see GESTURE_HOLD_FRAMES) — this is the "training" pass that filters
 * out transient/ambiguous hand shapes instead of reacting to every
 * frame's raw landmark output.
 *
 * Toggled from the header (components/layout/Navigation.tsx, via
 * lib/gesture-control-context.tsx) and mounted globally in
 * components/layout/DeferredShell.tsx so it can run on any page.
 *
 * Uses @mediapipe/tasks-vision's HandLandmarker, which runs fully
 * client-side (WASM + a small model fetched from Google's CDN on first
 * use) — no server round-trip per frame.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hand, X } from "lucide-react";
import { useGestureControl } from "@/lib/gesture-control-context";

type Status = "loading" | "tracking" | "no-hand" | "denied" | "error";
type GestureMode = "one" | "two" | "none";

// MediaPipe hand-landmark ids: [tip, pip] per finger.
const INDEX: [number, number] = [8, 6];
const MIDDLE: [number, number] = [12, 10];
const RING: [number, number] = [16, 14];
const PINKY: [number, number] = [20, 18];

// A finger counts as "extended" only when its tip clears the pip joint
// by this margin (normalized 0-1 frame height) — avoids false positives
// from a half-curled finger.
const EXTEND_MARGIN = 0.02;

// A raw gesture reading must repeat this many consecutive frames before
// it's accepted, so a momentary mis-read can't flip the active mode.
const GESTURE_HOLD_FRAMES = 4;

// How much normalized fingertip movement (0-1 of frame height) per frame
// translates into scroll pixels. Tuned for a smooth, controllable feel.
const SENSITIVITY = 3600;
// Ignore sub-pixel jitter from the detector so the page doesn't creep.
const DEADZONE = 0.0015;
// Caps a single frame's contribution so a momentary mis-detection (hand
// re-entering frame, occlusion) can't cause a jarring jump.
const MAX_FRAME_DELTA = 0.05;
// Exponential moving average factor for the fingertip's y position.
const SMOOTHING = 0.35;

function isExtended(landmarks: { y: number }[], [tip, pip]: [number, number]) {
  return landmarks[tip].y < landmarks[pip].y - EXTEND_MARGIN;
}

function classifyGesture(landmarks: { y: number }[]): GestureMode {
  const index = isExtended(landmarks, INDEX);
  const middle = isExtended(landmarks, MIDDLE);
  const ring = isExtended(landmarks, RING);
  const pinky = isExtended(landmarks, PINKY);

  if (index && !middle && !ring && !pinky) return "one";
  if (index && middle && !ring && !pinky) return "two";
  return "none";
}

export default function GestureControl() {
  const { enabled, toggle } = useGestureControl();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [activeMode, setActiveMode] = useState<GestureMode>("none");

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let rafId = 0;
    let stream: MediaStream | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let landmarker: any = null;
    let prevY: number | null = null;
    let smoothedY: number | null = null;
    let confirmedMode: GestureMode = "none";
    let pendingMode: GestureMode = "none";
    let pendingCount = 0;

    async function start() {
      setStatus("loading");
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 320, height: 240 },
          audio: false,
        });
      } catch {
        if (!cancelled) setStatus("denied");
        return;
      }
      if (cancelled || !videoRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      const video = videoRef.current;
      video.srcObject = stream;
      await video.play();

      try {
        const { FilesetResolver, HandLandmarker } = await import(
          "@mediapipe/tasks-vision"
        );
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm"
        );
        landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numHands: 1,
        });
      } catch {
        if (!cancelled) setStatus("error");
        stream?.getTracks().forEach((t) => t.stop());
        return;
      }

      if (cancelled) {
        landmarker.close();
        return;
      }

      loop();
    }

    function loop() {
      const video = videoRef.current;
      if (!video || !landmarker || video.readyState < 2) {
        rafId = requestAnimationFrame(loop);
        return;
      }

      const result = landmarker.detectForVideo(video, performance.now());
      const landmarks = result.landmarks?.[0];

      if (landmarks) {
        setStatus("tracking");

        // Hysteresis on the gesture classification: only switch modes
        // once the same reading has held for GESTURE_HOLD_FRAMES.
        const rawMode = classifyGesture(landmarks);
        if (rawMode === pendingMode) {
          pendingCount += 1;
        } else {
          pendingMode = rawMode;
          pendingCount = 1;
        }
        if (pendingCount >= GESTURE_HOLD_FRAMES && confirmedMode !== pendingMode) {
          confirmedMode = pendingMode;
          setActiveMode(confirmedMode);
        }

        const rawY = landmarks[INDEX[0]].y;
        const nextSmoothedY: number =
          smoothedY == null ? rawY : smoothedY + (rawY - smoothedY) * SMOOTHING;
        smoothedY = nextSmoothedY;

        if (prevY != null) {
          let deltaY = nextSmoothedY - prevY;
          deltaY = Math.max(-MAX_FRAME_DELTA, Math.min(MAX_FRAME_DELTA, deltaY));
          const movingDown = deltaY > DEADZONE;
          const movingUp = deltaY < -DEADZONE;

          // 1 finger only scrolls down; 2 fingers only scrolls up — each
          // gesture is deliberately one-directional so the two can't be
          // confused for each other.
          if (confirmedMode === "one" && movingDown) {
            window.scrollBy({ top: deltaY * SENSITIVITY, behavior: "auto" });
          } else if (confirmedMode === "two" && movingUp) {
            window.scrollBy({ top: deltaY * SENSITIVITY, behavior: "auto" });
          }
        }
        prevY = nextSmoothedY;
      } else {
        setStatus("no-hand");
        prevY = null;
        pendingMode = "none";
        pendingCount = 0;
        if (confirmedMode !== "none") {
          confirmedMode = "none";
          setActiveMode("none");
        }
      }

      rafId = requestAnimationFrame(loop);
    }

    start();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      landmarker?.close();
      stream?.getTracks().forEach((t) => t.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      setActiveMode("none");
    };
  }, [enabled]);

  return (
    <AnimatePresence>
      {enabled && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-[9998] w-48"
        >
          <div
            className="overflow-hidden rounded-2xl border"
            style={{
              background: "var(--nav-bg)",
              borderColor: "var(--nav-border)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 24px 60px -12px rgba(0,0,0,0.35)",
            }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <video
                ref={videoRef}
                muted
                playsInline
                className="h-full w-full object-cover"
                style={{ transform: "scaleX(-1)" }}
              />
              <StatusOverlay status={status} activeMode={activeMode} />
            </div>
            <div className="flex items-center justify-between gap-2 px-3 py-2">
              <span
                className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider"
                style={{ color: "var(--foreground)" }}
              >
                <Hand className="h-3 w-3 text-[var(--accent)]" />
                Gesture scroll
              </span>
              <button
                type="button"
                aria-label="Disable gesture scroll"
                onClick={toggle}
                className="flex h-5 w-5 items-center justify-center rounded-full transition-colors"
                style={{ color: "var(--muted-foreground)" }}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Instructions, shown below the preview so users know the gestures. */}
          <div
            className="mt-2 space-y-1 rounded-xl border px-3 py-2 text-[10px] leading-relaxed"
            style={{
              background: "var(--nav-bg)",
              borderColor: "var(--nav-border)",
              color: "var(--muted-foreground)",
              backdropFilter: "blur(20px)",
            }}
          >
            <p>
              <span className="font-semibold" style={{ color: "var(--foreground)" }}>
                ☝️ 1 finger, move down
              </span>{" "}
              — scroll down
            </p>
            <p>
              <span className="font-semibold" style={{ color: "var(--foreground)" }}>
                ✌️ 2 fingers, move up
              </span>{" "}
              — scroll up
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatusOverlay({
  status,
  activeMode,
}: {
  status: Status;
  activeMode: GestureMode;
}) {
  if (status === "tracking") {
    const label =
      activeMode === "one"
        ? "1 finger — scroll down"
        : activeMode === "two"
        ? "2 fingers — scroll up"
        : "Hand detected";
    return (
      <span className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-black/55 px-2 py-1 text-[9px] font-medium text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {label}
      </span>
    );
  }
  const message: Record<Exclude<Status, "tracking">, string> = {
    loading: "Starting camera…",
    "no-hand": "Show your hand",
    denied: "Camera access denied",
    error: "Couldn't start tracking",
  };
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/55 px-3 text-center text-[10px] font-medium text-white/80">
      {message[status]}
    </div>
  );
}
