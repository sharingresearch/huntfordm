import PrimaryButton from "./primary-button";
import { ReactComponent as ButtonArrow } from "../svg/gl-circle-arrow.svg";
export type EasyButtonProps = {
  onClick?: () => void;
};

export const EasyButton = ({ onClick }: EasyButtonProps) => {
  return (
    <div style={{ marginLeft: "1em", marginRight: "1em" }}>
      <PrimaryButton onClick={onClick}>
        EASY
        <ButtonArrow
          color="#f4ff24"
          style={{ height: "1em", paddingLeft: "0.5em" }}
        />
      </PrimaryButton>
    </div>
  );
};
