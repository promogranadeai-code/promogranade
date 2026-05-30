import React from "react";

export const LogoMark: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size}>
    <circle cx="32" cy="32" r="30" fill="#dc1428" />
    <g transform="rotate(-30, 32, 32)" fill="#0a0a0a">
      <rect x="28.5" y="12" width="7" height="40" rx="3.5" />
      <rect x="12" y="28.5" width="40" height="7" rx="3.5" />
    </g>
  </svg>
);
