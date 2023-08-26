import { useCallback, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BottomLeft } from "../components/bottom-left";
import { BottomRight } from "../components/bottom-right";
import { CenterCenter } from "../components/center-center";
import { Background } from "../components/background";
import { TutorialHeader } from "../components/tutorial-header";
import { TutorialText } from "../components/tutorial-text";
import { DragControl } from "../components/drag-control";
import { GravitationalLensingSimulation } from "@web/gravitational-lensing-simulation";
import { NextButton } from "../components/buttons/next-button";
import { TutorialSlider } from "../components/tutorial-slider";
import amplitude from "amplitude-js";
import { TutStyledText } from "../components/tutorial-styled-text";

import { labelSize, labelFontSize } from "../config";

import { ClickSound } from "../components/audio/sound";
import { ObstacleMass } from "../components/audio/sound";
import { InteractiveLens } from "../components/audio/sound";

import { TutorialAmbience } from "../components/audio/sound";
import { useAmbientFn } from "../components/audio/ambient-context";

export const SLRarePage = () => {
  const history = useHistory();

  const handleNext = useCallback(() => {
    amplitude
      .getInstance()
      .logEvent("Click on Next Button", { CurrentPage: "SL rare WL not rare" });
    history.push("/tutorial/stackedgalaxiesLoader");
    ClickSound.play();
  }, [history]);

  const setAmbient = useAmbientFn();

  useEffect(() => {
    setAmbient(TutorialAmbience, 3000);
  }, [setAmbient]);

  return (
    <Background imgSrc="/assets/img/gl-bg-1.jpg">
      <TutorialHeader currentChapter={2} />
      <CenterCenter width="70%">
        <TutorialText
          heading={
            " Strong lensing that obvious is rare, but a weak lensing distortion exists almost everywhere."
          }
          subheading={"Click NEXT to zoom in on a small patch of the sky."}
        />
      </CenterCenter>
      <BottomLeft></BottomLeft>
      <BottomRight>
        <NextButton onClick={handleNext} />
      </BottomRight>
    </Background>
  );
};
