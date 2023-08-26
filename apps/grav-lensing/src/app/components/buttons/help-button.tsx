import styled from "@emotion/styled";
import { ReactComponent as HelpIcon } from "../svg/help-icon.svg";
import { AboutModal } from "../about-modal";
import { useCallback, useState } from "react";

const CustomBottomRight = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding-bottom: 4em;
  padding-right: 4em;
  display: flex;
  flex-direction: row;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media (max-width: 1360px) {
    padding-bottom: 4em;
    padding-right: 0em;
    flex-direction: column;
  }
`;

const ButtonPill = styled.div`
  border-radius: 2.4em;
  height: 2.4em;
  width: 2.4em;

  background-color: #000A;
  display: flex;
  flex-direction:row
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align:center;
  cursor: pointer;
  padding: 0.1em;
  color: white;
  margin: 20px;
  box-shadow: rgba(255,255,255,0.4) 0 0 10px;
  &:hover {
    box-shadow: 0 0 10px;
  }
  @media (max-width: 1360px) {
    scale: 0.7;
  }
`;

export type HelpButtonProps = {
  onClick?: () => void;
};

export const HelpButton = ({ onClick }: HelpButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = useCallback(() => {
    setModalOpen((prev) => {
      return !prev;
    });
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  const handleClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <CustomBottomRight>
      <ButtonPill onClick={handleClick}>
        <HelpIcon
          color="#fff"
          style={{ height: "2em", width: "2em", margin: "0.2em" }}
        />
      </ButtonPill>
      <AboutModal open={modalOpen} onClose={handleClose} />
    </CustomBottomRight>
  );
};
