import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";

// Scene durations at 30fps
// Scene1: ~9s = 270 frames  (research intro + pills)
// Scene2: ~8s = 240 frames  (full text need)
// Scene3: ~8s = 240 frames  (Scopus intro)
// Scene4: ~11s = 330 frames (Locate Full Text feature)
// Total: ~36s = 1080 frames

export const ScopusVideo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "#0D1B2A",
      }}
    >
      <Series>
        <Series.Sequence durationInFrames={270}>
          <Scene1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <Scene2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <Scene3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={330}>
          <Scene4 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
