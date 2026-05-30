"use client";

import { ComponentPropsWithoutRef, useRef } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends ComponentPropsWithoutRef<"button"> {
  strength?: number;
}

export function MagneticButton({
  children,
  strength = 0.35,
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  };

  return (
    <button
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "transition-transform duration-300 ease-out will-change-transform",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
