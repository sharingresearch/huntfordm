import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PrimaryButton } from "../components/buttons/primary-button";
import { Background } from "../components/background";
import { TopRight } from "../components/top-right";
import { ReactComponent as ButtonArrow } from "../components/svg/gl-circle-arrow.svg";
import { SkipButton } from "../components/buttons/skip-button";
import amplitude from "amplitude-js";

import { TutorialAmbience } from "../components/audio/sound";
import { ClickSound } from "../components/audio/sound";
import { BeginSound } from "../components/audio/sound";

import { useAmbientFn } from "../components/audio/ambient-context";
import { BottomRight } from "../components/bottom-right";
import { HelpButton } from "../components/buttons/help-button";
import { FooterBar } from "../components/footer-bar";

import isMobileDevice from "../util/isMobileDevice";
import WarningMessage from "../components/WarningMessage";

const CentredImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const CentredImage = styled.img`
  max-width: 90%;
  margin: auto;
`;

const ButtonPosition = styled.div`
  position: absolute;
  top: 63%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

type LogoProps = {
  height: string;
};

const Logo = styled.img<LogoProps>`
  height: ${(props) => props.height};
  margin: auto 0;
`;

export const TitlePage = () => {
  const [showWarning, setShowWarning] = useState(isMobileDevice());

  const handleContinue = () => {
    setShowWarning(false);
  };

  const setAmbient = useAmbientFn();

  //put this useEffect on other pages to continue playing if user goes back to other page
  useEffect(() => {
    setAmbient(TutorialAmbience, 3000);
    // if want to stop after this page is left
    //const setAmbientInstance = setAmbient
    //return() => {setAmbientInstance(null, timeoffadeout)}
  }, [setAmbient]);

  const history = useHistory();

  const handleBegin = useCallback(() => {
    amplitude.getInstance().logEvent("Click On Begin");
    history.push("/tutorial/star");
    ClickSound.play();
    BeginSound.play();
  }, [history]);

  useEffect(() => {
    amplitude.getInstance().logEvent("Lands on landing page");
  }, []);

  if (showWarning) {
    return (
      <Background imgSrc="/assets/img/gl-bg-1.jpg">
        <WarningMessage onContinue={handleContinue} />
      </Background>
    );
  }

  return (
    <Background imgSrc="/assets/img/gl-bg-1.jpg">
      <CentredImageContainer>
        <CentredImage
          src="/assets/img/gl-title-main.png"
          alt="The Hunt for Dark Matter"
          draggable="false"
        />
      </CentredImageContainer>
      <ButtonPosition>
        <PrimaryButton onClick={handleBegin}>
          BEGIN
          <ButtonArrow
            color="#FF0"
            style={{ height: "1em", paddingLeft: "0.5em" }}
          />
        </PrimaryButton>
      </ButtonPosition>
      <TopRight>
        <SkipButton>{"skip tutorial"}</SkipButton>
      </TopRight>
      <FooterBar height="5em">
        <Logo
          height="80%"
          src="/assets/img/logos/LOGO-ERC_negatif_long.png"
          alt="European Research Council Logo"
        />
        <Logo
          height="55%"
          src="/assets/img/logos/laCaixaFoundation.png"
          alt="la Caixa Foundation Logo"
        />
   {/*<Logo
          height="55%"
          src="/assets/img/logos/Royal_society_transparent.png"
          alt="The Royal Society Logo"
  />*/}
        <Logo
          height="55%"
          src="/assets/img/logos/Centre-national.png"
          alt="Centre-national Logo"
        />
      </FooterBar>
      <HelpButton />
    </Background>
  );
};
