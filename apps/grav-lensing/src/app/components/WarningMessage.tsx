import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import isMobileDevice from "../util/isMobileDevice";
import { PrimaryButton } from "../components/buttons/primary-button-wide"; 
import { ReactComponent as ButtonArrow } from "../components/svg/gl-circle-arrow.svg";

const ButtonPosition = styled.div`
  position: absolute;
  left: 0;
  top: 200%;
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
type WarningMessageProps = {
  onContinue: () => void;
};

const WarningMessage: React.FC<WarningMessageProps> = ({ onContinue }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  if (isMobile) {
    return (
      <div
        style={{
          backgroundColor: "yellow",
          padding: "10px",
          position: "fixed",
          top: 150,
          left: 15,
          right: 15,
          zIndex: 9999,
          textAlign: "center",
        }}
      >
        <p>
          Notice: The Hunt for Dark Matter is optimized for
          desktop, so won't display correctly on small screens and most mobile devices. For
          the best experience, we recommend using your full screen on a desktop/laptop, or using an iPad in landscape mode.
        </p>
        <ButtonPosition>
          <PrimaryButton onClick={onContinue}>
            Continue Anyway
            <ButtonArrow
              color="#FF0"
              style={{ height: "1em", paddingLeft: "0.5em" }}
            />
          </PrimaryButton>
        </ButtonPosition>
      </div>
    );
  }

  return null;
};

export default WarningMessage;
