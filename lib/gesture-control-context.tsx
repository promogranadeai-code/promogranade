"use client";

/**
 * Shared on/off state for webcam gesture-scroll, so the header toggle
 * (components/layout/Navigation.tsx) and the engine that actually reads
 * the camera (components/gesture/GestureControl.tsx) can live in
 * different parts of the tree.
 */
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type GestureControlContextValue = {
  enabled: boolean;
  toggle: () => void;
};

const GestureControlContext = createContext<GestureControlContextValue | null>(null);

export function GestureControlProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const value = useMemo(
    () => ({ enabled, toggle: () => setEnabled((v) => !v) }),
    [enabled]
  );
  return (
    <GestureControlContext.Provider value={value}>
      {children}
    </GestureControlContext.Provider>
  );
}

export function useGestureControl() {
  const ctx = useContext(GestureControlContext);
  if (!ctx) {
    throw new Error("useGestureControl must be used within GestureControlProvider");
  }
  return ctx;
}
