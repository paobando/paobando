import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText } from "../components/AnimatedText";

const BookIcon: React.FC<{ progress: number }> = ({ progress }) => {
  const scale = interpolate(progress, [0, 1], [0.3, 1]);
  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        fontSize: 140,
        lineHeight: 1,
      }}
    >
      📖
    </div>
  );
};

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [230, 250], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const iconProgress = spring({
    frame,
    fps,
    config: { damping: 60, stiffness: 120, mass: 0.8 },
  });

  const lineWidth = interpolate(frame, [30, 100], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0D1B2A 0%, #142233 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        opacity: fadeIn * fadeOut,
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}
    >
      <BookIcon progress={iconProgress} />

      <div style={{ height: 40 }} />

      <AnimatedText
        text="Pero también quieres profundizar"
        delay={20}
        style={{
          fontSize: 46,
          fontWeight: 700,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.3,
        }}
      />

      <div style={{ height: 16 }} />

      <AnimatedText
        text="en el texto completo de las fuentes"
        delay={30}
        style={{
          fontSize: 46,
          fontWeight: 700,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.3,
        }}
      />

      {/* Animated underline */}
      <div
        style={{
          width: `${lineWidth}%`,
          maxWidth: 560,
          height: 4,
          background: "linear-gradient(90deg, #FF6B35, #FFB74D)",
          borderRadius: 2,
          marginTop: 16,
          marginBottom: 40,
        }}
      />

      <AnimatedText
        text="Para ampliar la perspectiva del tema"
        delay={60}
        style={{
          fontSize: 28,
          fontWeight: 400,
          color: "#90A4AE",
          textAlign: "center",
        }}
      />
    </div>
  );
};
