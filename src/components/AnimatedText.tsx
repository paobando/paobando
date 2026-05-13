import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface AnimatedTextProps {
  text: string;
  delay?: number;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = spring({
    frame: frame - delay,
    fps,
    config: { damping: 80, stiffness: 200, mass: 0.5 },
  });

  const y = interpolate(translateY, [0, 1], [30, 0]);

  return (
    <span
      style={{
        display: "inline-block",
        opacity,
        transform: `translateY(${y}px)`,
        ...style,
      }}
    >
      {text}
    </span>
  );
};
