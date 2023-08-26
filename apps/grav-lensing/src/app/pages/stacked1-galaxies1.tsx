import { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BottomRight } from "../components/bottom-right";
import { Background } from "../components/background";
import { TutorialHeader } from "../components/tutorial-header";
import { BottomCenter } from "../components/bottom-center";
import { NextButton } from "../components/buttons/next-button";
import { Magnify } from "../components/magnify";
import { AnimatedStack } from "../components/stack/animated-stack";
import { Stack } from "../components/stack/stack";
import { MagnifyViewer } from "../components/magnify-viewer";
import { MagnifyClip } from "../components/magnify-clip";
import { TopLeft } from "../components/top-left";
import { Label } from "../components/label";
import { labelSize, labelFontSize, stackLayers } from "../config";
import { BottomLeft } from "../components/bottom-left";
import { TutorialSlider } from "../components/tutorial-slider";
import { TutorialText } from "../components/tutorial-text";
import { ClickSound } from "../components/audio/sound";
import { ObstacleMass } from "../components/audio/sound";
import { StackedGalaxies } from "../components/audio/sound";
import { TutorialAmbience } from "../components/audio/sound";
import { useAmbientFn } from "../components/audio/ambient-context";

import { BeginSound } from "../components/audio/sound";

import amplitude from "amplitude-js";
import UseRefPlayer from "../components/videostacking/video-player1";

const initialMassValue = 0.05;
const massValueMultiplier = 0.05;

export const StackedGalaxiesPage1 = () => {
  const history = useHistory();

  const [lensMass, setLensMass] = useState(initialMassValue);

  const handleNext = useCallback(() => {
    amplitude
      .getInstance()
      .logEvent("Click on Next Button", { CurrentPage: "Stacked Galaxies 1" });
    history.push("/tutorial/stackedgalaxies2");
    ClickSound.play();
    BeginSound.play();
  }, [history]);
  const [firstChange, setFirstChange] = useState(false);
  const handleMassAdjust = useCallback(
    (val: number) => {
      setLensMass((val + 0.5) * massValueMultiplier);
      setFirstChange(true);
    },
    [setLensMass]
  );

  const setAmbient = useAmbientFn();

  useEffect(() => {
    setAmbient(TutorialAmbience, 3000);
  }, [setAmbient]);

  

  return (
    <Background imgSrc="/assets/img/gl-bg-1.jpg">
        <UseRefPlayer />
        <TutorialHeader currentChapter={3} />
        <BottomCenter width="70%"></BottomCenter>
        <BottomRight>
          <NextButton onClick={handleNext} />
        </BottomRight>
        <BottomLeft>
          <TutorialText
            heading={
              'But what if we combine ("stack") all the galaxy images in one patch of the sky?'
            }
          />
        </BottomLeft>
    </Background>
  );
};
