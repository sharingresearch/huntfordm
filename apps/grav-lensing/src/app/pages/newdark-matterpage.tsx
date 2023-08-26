import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BottomRight } from "../components/bottom-right";
import { Background } from "../components/background";
import { TutorialHeader } from "../components/tutorial-header";
import { CenterCenter } from "../components/center-center";
import { NextButton } from "../components/buttons/next-button";
import { TutStyledText } from "../components/tutorial-styled-text";
import { BottomLeft } from "../components/bottom-left";
import styled from "@emotion/styled";
import { ClickSound } from "../components/audio/sound";
import amplitude from "amplitude-js";
import { useAmbientFn } from "../components/audio/ambient-context";
import { TutorialAmbience } from "../components/audio/sound";

const StyledText = styled.a`
  color: white;
`;

export const NewDarkMatterPage = () => {
  const history = useHistory();

  const handleNext = useCallback(() => {
    amplitude
      .getInstance()
      .logEvent("Click on Next Button", { CurrentPage: "New Dark Matter" });
    history.push("/tutorial/darkmatter");
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
        <TutStyledText>
          80% of the mass in the Universe is made of invisible stuff called
          "dark matter"
        </TutStyledText>
      </CenterCenter>
      <BottomLeft></BottomLeft>
      <BottomRight>
        <NextButton onClick={handleNext} />
      </BottomRight>
    </Background>
  );
};
