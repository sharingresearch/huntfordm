import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BottomLeft } from "../components/bottom-left";
import { BottomRight } from "../components/bottom-right";
import { Earth } from "../components/earth";
import { Galaxy } from "../components/galaxy";
import { Line } from "../components/line";
import { Background } from "../components/background";
import { TutorialHeader } from "../components/tutorial-header";
import { Viewer } from "../components/viewer";
import { NextButton } from "../components/buttons/next-button";
import { labelSize, labelFontSize } from "../config";
import amplitude from "amplitude-js";

import { ClickSound } from "../components/audio/sound";
import { TutorialAmbience } from "../components/audio/sound";
import { useAmbientFn } from "../components/audio/ambient-context";

const lineRotations = [45, 90, 135, 180, 225, 270, 315];
const galaxyPos: [string, string] = ["20%", "50%"];
export const DirectPage = () => {
  const history = useHistory();

  const handleNext = useCallback(() => {
    amplitude
      .getInstance()
      .logEvent("Click on Next Button", { CurrentPage: "Direct Light" });
    history.push("/tutorial/obstacle");
    ClickSound.play();
  }, [history]);

  const setAmbient = useAmbientFn();

  useEffect(() => {
    setAmbient(TutorialAmbience, 3000);
  }, [setAmbient]);

  return (
    <Background imgSrc="/assets/img/gl-bg-1.jpg">
      <Galaxy position={galaxyPos} />
      {lineRotations.map((rotation) => (
        <Line
          key={rotation}
          start={galaxyPos}
          length="200px"
          rotation={rotation}
        />
      ))}
      <Line
        start={galaxyPos}
        length="50%"
        rotation={0}
        lineColor={[255, 255, 0]}
      />
      <Earth />
      <TutorialHeader currentChapter={0} />
      <BottomLeft>
        <Viewer
          heading="Normally light travels in a straight line."
          subheading="We just see the light shining in our direction."
          labelSize={labelSize}
          labelFontSize={labelFontSize}
        >
          <Galaxy position={["50%", "50%"]} scale={0.6} />
        </Viewer>
      </BottomLeft>
      <BottomRight>
        <NextButton onClick={handleNext} />
      </BottomRight>
    </Background>
  );
};
