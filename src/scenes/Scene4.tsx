import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText } from "../components/AnimatedText";

const Checkmark: React.FC<{ visible: boolean; color: string; label: string; sublabel: string }> = ({
  visible,
  color,
  label,
  sublabel,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: visible ? frame : 0,
    fps,
    config: { damping: 70, stiffness: 200, mass: 0.5 },
  });

  const scale = interpolate(progress, [0, 1], [0.3, 1]);
  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "left center",
        background: "rgba(255,255,255,0.05)",
        border: `2px solid ${color}44`,
        borderRadius: 20,
        padding: "24px 36px",
        minWidth: 380,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: `${color}22`,
          border: `3px solid ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: 28,
        }}
      >
        {color === "#4CAF50" ? "✅" : "📬"}
      </div>
      <div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: 17, color: "#90A4AE", fontWeight: 400 }}>
          {sublabel}
        </div>
      </div>
    </div>
  );
};

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [310, 330], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const buttonProgress = interpolate(frame, [20, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const buttonScale = interpolate(
    Math.sin((frame / 60) * Math.PI),
    [-1, 1],
    [0.97, 1.03]
  );

  const secondsScale = interpolate(frame, [80, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0D1B2A 0%, #0F2135 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        opacity: fadeIn * fadeOut,
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Feature button */}
      <div
        style={{
          background: "linear-gradient(135deg, #FF6B35 0%, #FF8F65 100%)",
          borderRadius: 16,
          padding: "18px 40px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          opacity: buttonProgress,
          transform: `scale(${buttonScale})`,
          marginBottom: 48,
          boxShadow: "0 8px 40px rgba(255, 107, 53, 0.5)",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: 32 }}>🔎</span>
        <span
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: 0.5,
          }}
        >
          Locate Full Text
        </span>
      </div>

      {/* Speed indicator */}
      <div
        style={{
          opacity: secondsScale,
          transform: `scale(${secondsScale})`,
          marginBottom: 52,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 72,
            fontWeight: 900,
            background: "linear-gradient(90deg, #4FC3F7, #81C784)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "block",
            lineHeight: 1,
          }}
        >
          En segundos
        </span>
        <span
          style={{
            fontSize: 22,
            color: "#78909C",
            display: "block",
            marginTop: 8,
          }}
        >
          sabrás si el texto completo está disponible
        </span>
      </div>

      {/* Two outcome cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Checkmark
          visible={frame > 110}
          color="#4CAF50"
          label="Disponible para descargar"
          sublabel="Acceso inmediato al texto completo"
        />
        <Checkmark
          visible={frame > 155}
          color="#FFB74D"
          label="Solicitar a la biblioteca"
          sublabel="Gestión rápida desde la plataforma"
        />
      </div>

      {/* Tagline */}
      <div style={{ marginTop: 48 }}>
        <AnimatedText
          text="Tu investigación, más fácil que nunca"
          delay={200}
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: "#FF6B35",
            textAlign: "center",
            letterSpacing: 0.3,
          }}
        />
      </div>
    </div>
  );
};
