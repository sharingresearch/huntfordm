import { ReactComponent as ButtonArrow } from "../svg/gl-circle-arrow-back.svg";
import styled from "@emotion/styled";

export type PrimaryButtonProps = {
  onClick?: () => void;
};

const ButtonPill = styled.div`
  border-radius: 3em;
  height: 2.5em;
  width: 300px;
  background-color: #000A;
  font-size: 25px;
  display: flex;
  flex-direction:row
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align:center;
  cursor: pointer;
  padding-left:1.1em;
  padding-right:0.4em;
  padding-top:0.4em;
  padding-bottom:0.4em;
  color: white;
  font-weight: 600;
  margin: 20px;
  box-shadow: rgba(255,255,255,0.4) 0 0 10px;
  &:hover {
    box-shadow: 0 0 10px;
  }
`;

export const BackButton = ({ onClick }: PrimaryButtonProps) => {
  return (
    <ButtonPill onClick={onClick}>
      <ButtonArrow style={{ height: "1em", paddingRight: "0.5em" }} />
      BACK TO TUTORIAL
    </ButtonPill>
  );
};

export default BackButton;
