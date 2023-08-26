import { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BottomRight } from "../components/bottom-right";
import { Background } from "../components/background";
import { TutorialHeader } from "../components/tutorial-header";
import { NextButton } from "../components/buttons/next-button";
import { Magnify } from "../components/magnify";
import { MagnifyViewer } from "../components/magnify-viewer";
import { MagnifyClip } from "../components/magnify-clip";
import { labelSize, labelFontSize } from "../config";
import { BottomLeft } from "../components/bottom-left";
import { TutorialSlider } from "../components/tutorial-slider";
import { TutorialText } from "../components/tutorial-text";
import { GridStack } from "../components/grid-stack-component/grid-stack";
import StackPopUp from "../components/grid-stack-component/grid-stack-popup";
import { ClickSound } from "../components/audio/sound";
import { ObstacleMass } from "../components/audio/sound";

import { TutorialAmbience } from "../components/audio/sound";
import { useAmbientFn } from "../components/audio/ambient-context";
import amplitude from "amplitude-js";
import { ContainedImage } from "../components/contained-image";

import { StackRestartButton } from "../components/buttons/stackrestartbutton";

const initialMassValue = 0.025;
const massValueMultiplier = 0.05;

export const EndOfTutPage = () => {
  const history = useHistory();

  const [lensMass, setLensMass] = useState(initialMassValue);

  const handleNext = useCallback(() => {
    amplitude
      .getInstance()
      .logEvent("Click on Next Button", { CurrentPage: "End of Tutorial" });
    history.push("/game");
    ClickSound.play();
  }, [history]);

  const setAmbient = useAmbientFn();

  useEffect(() => {
    setAmbient(TutorialAmbience, 3000);
  }, [setAmbient]);

  const [showVictory, setShowVictory] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasDm, setHasDm] = useState(false);

  const handleMassAdjust = useCallback(
    (val: number) => {
      setLensMass((val + 0.5) * massValueMultiplier);
    },
    [setLensMass]
  );

  const handleStackClick = (position: [number, number]) => {
    if (position[0] === 1 && position[1] === 1) {
      setShowModal(true);
      setHasDm(true);
      setShowVictory(true);
      return true;
    }
    setHasDm(false);
    setShowModal(true);
    return false;
  };

  const handleRestack = useCallback(() => {
    amplitude
      .getInstance()
      .logEvent("Click on Restack Button", { CurrentPage: "End of Tutorial" });
    history.push("/tutorial/stackedgalaxiesloader");
    ClickSound.play();
    // BeginSound.play()
  }, [history]);

  const [giveUpClicked, setGiveUpClicked] = useState(false);
  const handleGiveUp = useCallback(() => {
    amplitude
      .getInstance()
      .logEvent("Click on ShowMe Button", { CurrentPage: "End of Tutorial" });
    setShowModal(true);
    setHasDm(true);
    setShowVictory(true);
    setGiveUpClicked(true);
  }, []);

  return (
    <Background imgSrc="/assets/img/gl-bg-1.jpg">
      <TutorialHeader currentChapter={3} />
      <Magnify
        position={["35%", "50%"]}
        scale={1}
        img="/assets/img/gl-magnify-mult.png"
      >
        <MagnifyClip>
          <ContainedImage src="assets/img/bg-galaxies-lrg.jpg" />
        </MagnifyClip>
        <MagnifyViewer
          position={["0px", "min(33vh,288px)"]}
          style={{ width: "100%", height: "100%", overflow: "clip" }}
        >
          <div
            style={{
              position: "absolute",
              top: -1,
              left: -1,
              width: "calc(100% + 1px)",
              height: "calc(100% + 1px)",
            }}
          >
            <GridStack
              columns={5}
              rows={5}
              mass={lensMass}
              scanStackCallBack={handleStackClick}
              giveUpClicked={giveUpClicked}
            />
          </div>
        </MagnifyViewer>
      </Magnify>
      <BottomRight>
        {/* <StackRestartButton onClick={handleRestack} /> */}

        {showVictory ? (
          <NextButton children={"FINISH"} onClick={handleNext} />
        ) : (
          <NextButton children={"Show me"} onClick={handleGiveUp} />
        )}
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
          disabled={showVictory}
          sliderSound={ObstacleMass}
        />

        {showVictory === false ? (
          <TutorialText
            heading={"We've hidden some dark matter for you."}
            subheading={
              "At the top you can see the galaxies. At the bottom we've stacked some of them in a grid. Adjust the dark matter mass slider on the left until you think you know where the dark matter is, then click on it in the grid."
            }
          />
        ) : (
          <TutorialText
            heading={"Well done, you discovered Dark Matter!"}
            subheading={
              "You're now ready to track down all the invisible dark matter in our virtual Universe. Good luck dark matter hunter!"
            }
          />
        )}
      </BottomLeft>
      {showVictory === false ? (
        <StackPopUp
          open={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          scanResult={hasDm}
        />
      ) : (
        <StackPopUp
          open={hasDm}
          onClose={() => {
            setShowModal(false);
            setHasDm(false);
          }}
          scanResult={hasDm}
        />
      )}
    </Background>
  );
};
