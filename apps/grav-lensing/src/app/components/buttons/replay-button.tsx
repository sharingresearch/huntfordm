import { ReactComponent as ButtonArrow } from "../svg/gl-circle-arrow-replay.svg";
import styled from "@emotion/styled";

export type PrimaryButtonProps = {
  onClick?: () => void;
};

const ButtonPill = styled.div`
  border-radius: 3em;
  height: 2.5em;
  width: 200px;
  background-color: #000A;
  font-size: 25px;
  display: flex;
  flex-direction:row
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align:center;
  cursor: pointer;
  padding: 0.4em 0.9em;
  padding-left:1.5em;
  color: white;
  font-weight: 600;
  margin: 20px;
  box-shadow: rgba(255,255,255,0.4) 0 0 10px;
  &:hover {
    box-shadow: 0 0 10px;
  }
`;

export const ReplayButton = ({ onClick }: PrimaryButtonProps) => {
  return (
    <ButtonPill onClick={onClick}>
      PLAY AGAIN
      <ButtonArrow style={{ height: "1em", paddingLeft: "0.5em" }} />
    </ButtonPill>
  );
};

export default ReplayButton;
