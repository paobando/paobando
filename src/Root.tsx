import React from "react";
import { Composition } from "remotion";
import { ScopusVideo } from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ScopusVideo"
        component={ScopusVideo}
        durationInFrames={1080}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
