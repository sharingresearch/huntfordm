import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BottomLeft } from "../components/bottom-left";
import { BottomRight } from "../components/bottom-right";
import { Galaxy } from "../components/galaxy";
import { Background } from "../components/background";
import { TutorialHeader } from "../components/tutorial-header";
import { Viewer } from "../components/viewer";
import { NextButton } from "../components/buttons/next-button";
import { Line } from "../components/line";
import { labelSize, labelFontSize } from "../config";
import amplitude from "amplitude-js";

import { ClickSound } from "../components/audio/sound";
import { TutorialAmbience } from "../components/audio/sound";
import { useAmbientFn } from "../components/audio/ambient-context";

export const StarPage = () => {
  const history = useHistory();

  const handleNext = useCallback(() => {
    amplitude
      .getInstance()
      .logEvent("Click on Next Button", { CurrentPage: "Star" });
    history.push("/tutorial/direct");
    ClickSound.play();
  }, [history]);

  const setAmbient = useAmbientFn();

  useEffect(() => {
    setAmbient(TutorialAmbience, 3000);
  }, [setAmbient]);

  const lineRotations = [45, 90, 135, 180, 225, 270, 315, 360];
  const galaxyPos: [string, string] = ["50%", "50%"];

  return (
    <Background imgSrc="/assets/img/gl-bg-1.jpg">
      <Galaxy position={["50%", "50%"]} />
      {lineRotations.map((rotation) => (
        <Line
          key={rotation}
          start={galaxyPos}
          length="200px"
          rotation={rotation}
        />
      ))}

      <TutorialHeader currentChapter={0} />
      <BottomLeft>
        <Viewer
          heading="Galaxies shine light in all directions."
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
