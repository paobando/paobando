import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { Pill } from "../components/Pill";

const PILLS = [
  { label: "Fuentes relevantes", icon: "📚", delay: 20, color: "#4FC3F7" },
  { label: "Autores clave", icon: "👤", delay: 35, color: "#81C784" },
  { label: "Tendencias", icon: "📈", delay: 50, color: "#FFB74D" },
  { label: "Temas emergentes", icon: "💡", delay: 65, color: "#F06292" },
  { label: "Redes de colaboración", icon: "🔗", delay: 80, color: "#CE93D8" },
  { label: "Métricas", icon: "📊", delay: 95, color: "#4DB6AC" },
];

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [250, 270], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0D1B2A 0%, #1B2B3B 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        opacity: bgOpacity * fadeOut,
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 48,
        }}
      >
        <div
          style={{
            width: 6,
            height: 56,
            background: "#FF6B35",
            borderRadius: 3,
          }}
        />
        <AnimatedText
          text="Cuando estás investigando..."
          delay={5}
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.2,
          }}
        />
      </div>

      {/* Subtitle */}
      <div style={{ marginBottom: 56, textAlign: "center" }}>
        <AnimatedText
          text="Quieres encontrar información útil y de vanguardia"
          delay={12}
          style={{
            fontSize: 28,
            color: "#B0BEC5",
            fontWeight: 400,
          }}
        />
      </div>

      {/* Pills grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 960,
          gap: 4,
        }}
      >
        {PILLS.map((pill) => (
          <Pill
            key={pill.label}
            label={pill.label}
            icon={pill.icon}
            delay={pill.delay}
            color={pill.color}
          />
        ))}
      </div>

      {/* Bottom goal text */}
      <div style={{ marginTop: 52 }}>
        <AnimatedText
          text="Para tomar mejores decisiones"
          delay={110}
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: "#FF6B35",
            letterSpacing: 0.5,
          }}
        />
      </div>
    </div>
  );
};
