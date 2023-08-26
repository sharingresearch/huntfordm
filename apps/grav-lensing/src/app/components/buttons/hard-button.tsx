import PrimaryButton from "./primary-button";
import { ReactComponent as ButtonArrow } from "../svg/gl-circle-arrow.svg";
export type MediumButtonProps = {
  onClick?: () => void;
};

export const HardButton = ({ onClick }: MediumButtonProps) => {
  return (
    <div style={{ marginLeft: "1em", marginRight: "1em" }}>
      <PrimaryButton onClick={onClick}>
        HARD
        <ButtonArrow
          color="#ff0000"
          style={{ height: "1em", paddingLeft: "0.5em" }}
        />
      </PrimaryButton>
    </div>
  );
};
