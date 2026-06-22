"use client";

/**
 * Place this file at: components/gesture/GestureControl.tsx
 *
 * Webcam hand-tracking that drives page scroll: move your index fingertip
 * up to scroll up, down to scroll down. Toggled from the header
 * (components/layout/Navigation.tsx, via lib/gesture-control-context.tsx)
 * and mounted globally in components/layout/DeferredShell.tsx so it can
 * run on any page.
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

// Index fingertip landmark id in the MediaPipe hand model.
const INDEX_FINGER_TIP = 8;

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

export default function GestureControl() {
  const { enabled, toggle } = useGestureControl();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let rafId = 0;
    let stream: MediaStream | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let landmarker: any = null;
    let prevY: number | null = null;
    let smoothedY: number | null = null;

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
        const rawY = landmarks[INDEX_FINGER_TIP].y;
        const nextSmoothedY: number =
          smoothedY == null ? rawY : smoothedY + (rawY - smoothedY) * SMOOTHING;
        smoothedY = nextSmoothedY;

        if (prevY != null) {
          let deltaY = nextSmoothedY - prevY;
          deltaY = Math.max(-MAX_FRAME_DELTA, Math.min(MAX_FRAME_DELTA, deltaY));
          if (Math.abs(deltaY) > DEADZONE) {
            // Finger moves up (y decreases) -> scroll up; finger moves down -> scroll down.
            window.scrollBy({ top: deltaY * SENSITIVITY, behavior: "auto" });
          }
        }
        prevY = nextSmoothedY;
      } else {
        setStatus("no-hand");
        prevY = null;
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
          className="fixed bottom-6 right-6 z-[9998] w-44 overflow-hidden rounded-2xl border border-white/15 bg-black/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
            <video
              ref={videoRef}
              muted
              playsInline
              className="h-full w-full object-cover"
              style={{ transform: "scaleX(-1)" }}
            />
            <StatusOverlay status={status} />
          </div>
          <div className="flex items-center justify-between gap-2 px-3 py-2">
            <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-white/70">
              <Hand className="h-3 w-3 text-[#FF3030]" />
              Gesture scroll
            </span>
            <button
              type="button"
              aria-label="Disable gesture scroll"
              onClick={toggle}
              className="flex h-5 w-5 items-center justify-center rounded-full text-white/60 hover:text-white transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatusOverlay({ status }: { status: Status }) {
  if (status === "tracking") {
    return (
      <span className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-1 text-[9px] font-medium text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Tracking
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
