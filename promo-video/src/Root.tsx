import { Composition } from "remotion";
import { PromoVideo } from "./PromoVideo";

// 10 seconds @ 30fps = 300 frames
export const RemotionRoot = () => {
  return (
    <Composition
      id="PromoVideo"
      component={PromoVideo}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
