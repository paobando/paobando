import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface PillProps {
  label: string;
  icon: string;
  delay?: number;
  color?: string;
}

export const Pill: React.FC<PillProps> = ({
  label,
  icon,
  delay = 0,
  color = "#FF6B35",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 60, stiffness: 180, mass: 0.6 },
  });

  const scale = interpolate(progress, [0, 1], [0.5, 1]);
  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: `${color}22`,
        border: `2px solid ${color}`,
        borderRadius: 40,
        padding: "10px 22px",
        transform: `scale(${scale})`,
        opacity,
        margin: 6,
      }}
    >
      <span style={{ fontSize: 26 }}>{icon}</span>
      <span
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: "#FFFFFF",
          fontFamily: "'Inter', sans-serif",
          letterSpacing: 0.3,
        }}
      >
        {label}
      </span>
    </div>
  );
};
