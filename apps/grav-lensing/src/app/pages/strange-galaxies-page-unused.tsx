import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BottomRight } from "../components/bottom-right";
import { Background } from "../components/background";
import { TutorialHeader } from "../components/tutorial-header";
import { BottomCenter } from "../components/bottom-center";
import { NextButton } from "../components/buttons/next-button";
import { Magnify } from "../components/magnify";
import { TopLeft } from "../components/top-left";
import { Label } from "../components/label";
import { MagnifyClip } from "../components/magnify-clip";
import { labelSize, labelFontSize } from "../config";
import { TutStyledText } from "../components/tutorial-styled-text";
import { ClickSound } from "../components/audio/sound";
import { TutorialAmbience } from "../components/audio/sound";
import { useAmbientFn } from "../components/audio/ambient-context";
import amplitude from "amplitude-js";

//page is now unused

export const StrangeGalaxiesPage = () => {
  const history = useHistory();

  const handleNext = useCallback(() => {
    amplitude
      .getInstance()
      .logEvent("Click on Next Button", { CurrentPage: "Strange Galaxies" });
    history.push("/tutorial/stackedgalaxiesLoader");
    ClickSound.play();
  }, [history]);

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
      </Magnify>
      <BottomCenter width="70%">
        <TutStyledText>
          Strong lensing, that obvious, is rare, but a weak lensing distortion
          exists almost everywhere.
        </TutStyledText>
      </BottomCenter>
      <BottomRight>
        <NextButton onClick={handleNext} />
      </BottomRight>
    </Background>
  );
};
