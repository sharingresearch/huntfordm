import { useCallback, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BottomLeft } from "../components/bottom-left";
import { BottomRight } from "../components/bottom-right";
import { Background } from "../components/background";
import { TutorialHeader } from "../components/tutorial-header";
import { TutorialText } from "../components/tutorial-text";
import { DragControl } from "../components/drag-control";
import { GravitationalLensingSimulation } from "@web/gravitational-lensing-simulation";
import { NextButton } from "../components/buttons/next-button";
import { TutorialSlider } from "../components/tutorial-slider";
import amplitude from "amplitude-js";
import { labelSize, labelFontSize } from "../config";

import { ClickSound } from "../components/audio/sound";
import { ObstacleMass } from "../components/audio/sound";
import { InteractiveLens } from "../components/audio/sound";

import { TutorialAmbience } from "../components/audio/sound";
import { useAmbientFn } from "../components/audio/ambient-context";

const darkMatterCentre: [number, number] = [0.5, 0.5];
const darkMatterCentreWebGl: [number, number] = [
  (darkMatterCentre[0] - 0.5) / 2,
  (darkMatterCentre[1] - 0.5) / 2,
];
const darkMatterCentreCss: [string, string] = [
  `${darkMatterCentre[0] * 100}%`,
  `${darkMatterCentre[1] * 100}%`,
];

const tutorialTextHeading =
  'Can we use Einstein\'s gravitational lensing as a kind of "dark matter vision"?';
const tutorialTextSubheading =
  "Try moving this clump of invisible dark matter to see how it changes our view of distant galaxies.";

const textureSrc = "assets/img/gl-bg-1.jpg";
const textureAspect = 8 / 5;
const textureScale = 0.5;

export const InteractiveLensPage = () => {
  const history = useHistory();
  const [darkMatterPosOffset, setDarkMatterPosOffset] = useState<
    [number, number]
  >([0, 0]);
  const [darkmatterMass, setDarkMatterMass] = useState<number>(0.005);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    amplitude
      .getInstance()
      .logEvent("Click on Next Button", { CurrentPage: "Interactive Lens" });
    history.push("/tutorial/slrare");
    ClickSound.play();
  }, [history]);

  const setAmbient = useAmbientFn();

  useEffect(() => {
    setAmbient(TutorialAmbience, 3000);
  }, [setAmbient]);

  const handlePositionUpdate = useCallback((pos: [number, number]) => {
    if (backgroundRef.current) {
      setDarkMatterPosOffset([
        pos[0] / backgroundRef.current.clientWidth,
        pos[1] / backgroundRef.current.clientHeight,
      ]);
    }
  }, []);

  const handleMassAdjust = useCallback((mass: number) => {
    setDarkMatterMass((mass + 0.5) * 0.01);
  }, []);

  return (
    <Background ref={backgroundRef} imgSrc="/assets/img/gl-bg-1.jpg">
      <GravitationalLensingSimulation
        lensCenter={darkMatterCentreWebGl}
        lensOffset={darkMatterPosOffset}
        lensMass={darkmatterMass}
        textureSrc={textureSrc}
        textureScale={textureScale}
        textureAspect={textureAspect}
      />
      <DragControl
        center={darkMatterCentreCss}
        dragSound={InteractiveLens}
        size={50}
        onValueUpdated={handlePositionUpdate}
      />
      <TutorialHeader currentChapter={2} />
      <BottomLeft style={{ gap: "20px" }}>
        <TutorialSlider
          label="Obstacle Mass"
          labelHeight={labelSize}
          labelFontSize={labelFontSize}
          tutorialText="Try changing the obstacle's mass"
          onValueUpdated={handleMassAdjust}
          initialValue={0}
          sliderSound={ObstacleMass}
        />
        <TutorialText
          heading={tutorialTextHeading}
          subheading={tutorialTextSubheading}
        />
      </BottomLeft>
      <BottomRight>
        <NextButton onClick={handleNext} />
      </BottomRight>
    </Background>
  );
};
