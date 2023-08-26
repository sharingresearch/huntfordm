import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BottomRight } from "../components/bottom-right";
import { Background } from "../components/background";
import { TutorialHeader } from "../components/tutorial-header";
import { BottomCenter } from "../components/bottom-center";
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

export const DarkMatterPage = () => {
  const history = useHistory();

  const handleNext = useCallback(() => {
    amplitude
      .getInstance()
      .logEvent("Click on Next Button", { CurrentPage: "Dark Matter" });
    history.push("/tutorial/interactivelens");
    ClickSound.play();
  }, [history]);

  const setAmbient = useAmbientFn();

  useEffect(() => {
    setAmbient(TutorialAmbience, 3000);
  }, [setAmbient]);

  return (
    <Background imgSrc="/assets/img/gl-bg-2.jpg">
      <TutorialHeader currentChapter={2} />
      <BottomCenter width="70%">
        <TutStyledText>
          If we could turn on "dark matter vision" and see the invisible mass
          this is what we expect the universe to look like. Galaxies live in
          this giant cosmic web.
        </TutStyledText>
      </BottomCenter>
      <BottomLeft>
        <StyledText
          href="https://www.tng-project.org/"
          target="_blank"
          rel="noreferrer"
        >
          D. Nelson / IllustrisTNG Collaboration
        </StyledText>
      </BottomLeft>
      <BottomRight>
        <NextButton onClick={handleNext} />
      </BottomRight>
    </Background>
  );
};
