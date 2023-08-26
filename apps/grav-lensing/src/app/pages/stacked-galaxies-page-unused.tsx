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
import amplitude from "amplitude-js";

// Page now no longer used

const initialMassValue = 0.05;
const massValueMultiplier = 0.05;

export const StackedGalaxiesPage = () => {
  const history = useHistory();

  const [lensMass, setLensMass] = useState(initialMassValue);

  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying === false) {
    StackedGalaxies.play();
    setIsPlaying(true);
  }

  const handleNext = useCallback(() => {
    amplitude
      .getInstance()
      .logEvent("Click on Next Button", { CurrentPage: "Stacked Galaxies" });
    history.push("/tutorial/stackedgalaxies1");
    ClickSound.play();
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
      <TutorialHeader currentChapter={3} />
      <Magnify position={["35%", "50%"]} scale={1}>
        <MagnifyClip>
          <img
            src="assets/img/gl-cu-sector.jpg"
            alt="Galaxy"
            draggable="false"
          />
        </MagnifyClip>
        <TopLeft spacing={0.5}>
          <Label height={labelSize} fontSize={labelFontSize}>
            Distant Galaxies
          </Label>
        </TopLeft>
        <MagnifyViewer
          position={["0px", "288px"]}
          style={{ width: "100%", height: "100%" }}
        >
          {firstChange ? (
            <Stack
              background="black"
              size="100%"
              layers={stackLayers}
              position={[0.5, 0.5]}
              lenses={[{ position: [0.75, 0.75], mass: lensMass }]}
              scale={0.7}
            />
          ) : (
            <AnimatedStack
              layers={stackLayers}
              position={[0.5, 0.5]}
              lenses={[{ position: [0.75, 0.75], mass: lensMass }]}
              startPos={[-565, -70]}
              startPosRange={[35, 20]}
              duration={8}
              scale={0.7}
            />
          )}
        </MagnifyViewer>
      </Magnify>

      <BottomCenter width="70%"></BottomCenter>
      <BottomRight>
        <NextButton onClick={handleNext} />
      </BottomRight>
      <BottomLeft>
        <TutorialSlider
          label="Dark Matter Mass"
          labelHeight={labelSize}
          labelFontSize={labelFontSize}
          initialValue={initialMassValue / massValueMultiplier - 0.5}
          onValueUpdated={handleMassAdjust}
          tutorialText="See what happens to the stack when you change the dark matter's mass"
          tutorialTextSize="1.05em"
          sliderSound={ObstacleMass}
        />
        <TutorialText
          heading={
            "It can be measured by combining (“stacking”) images of many galaxies."
          }
        />
      </BottomLeft>
    </Background>
  );
};
