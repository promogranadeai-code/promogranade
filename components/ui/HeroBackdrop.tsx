/**
 * Static, non-WebGL hero backdrop used on every page except the home
 * page (which keeps the animated SiteLiquid shader as its signature
 * effect). A soft brand-red glow plus a fine grid line pattern — cheap,
 * theme-aware via the ambient --accent/--section-border vars already
 * scoped by the section-a/section-b wrapper this is mounted inside.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute left-1/2 top-0 h-[34rem] w-[60rem] -translate-x-1/2 -translate-y-1/3 rounded-full"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          opacity: 0.14,
          filter: "blur(110px)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-[26rem] w-[26rem] translate-x-1/4 translate-y-1/4 rounded-full"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          opacity: 0.08,
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--section-border) 1px, transparent 1px), linear-gradient(to bottom, var(--section-border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          opacity: 0.5,
        }}
      />
    </div>
  );
}

export default HeroBackdrop;
