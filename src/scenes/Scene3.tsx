import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText } from "../components/AnimatedText";

const ScopusLogo: React.FC<{ progress: number }> = ({ progress }) => {
  const scale = interpolate(progress, [0, 1], [0.6, 1]);
  const opacity = interpolate(progress, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 48,
      }}
    >
      {/* Scopus-style logo representation */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 16,
          background: "linear-gradient(135deg, #FF6B35 0%, #FF8F65 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(255, 107, 53, 0.4)",
        }}
      >
        <span style={{ fontSize: 38 }}>🔬</span>
      </div>
      <div>
        <div
          style={{
            fontSize: 54,
            fontWeight: 800,
            color: "#FF6B35",
            letterSpacing: -1,
            lineHeight: 1,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Scopus
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#90A4AE",
            letterSpacing: 2,
            textTransform: "uppercase",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          by Elsevier
        </div>
      </div>
    </div>
  );
};

export const Scene3: React.FC = () => {
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

  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 70, stiffness: 150, mass: 0.7 },
  });

  const cardProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 80, stiffness: 200, mass: 0.5 },
  });

  const cardScale = interpolate(cardProgress, [0, 1], [0.85, 1]);
  const cardOpacity = interpolate(frame - 40, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0D1B2A 0%, #1A2740 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        opacity: fadeIn * fadeOut,
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}
    >
      <ScopusLogo progress={logoProgress} />

      <AnimatedText
        text="Cuando uses Scopus, podrás acceder"
        delay={25}
        style={{
          fontSize: 40,
          fontWeight: 600,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.4,
        }}
      />
      <div style={{ height: 8 }} />
      <AnimatedText
        text="a artículos académicos de una manera más fácil"
        delay={33}
        style={{
          fontSize: 40,
          fontWeight: 600,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.4,
        }}
      />

      <div style={{ height: 52 }} />

      {/* Feature cards */}
      <div
        style={{
          display: "flex",
          gap: 24,
          transform: `scale(${cardScale})`,
          opacity: cardOpacity,
        }}
      >
        {[
          { icon: "🔍", label: "Búsqueda avanzada" },
          { icon: "📄", label: "Texto completo" },
          { icon: "📊", label: "Métricas de impacto" },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,107,53,0.3)",
              borderRadius: 16,
              padding: "24px 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              minWidth: 180,
            }}
          >
            <span style={{ fontSize: 44 }}>{card.icon}</span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#ECEFF1",
                textAlign: "center",
              }}
            >
              {card.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
