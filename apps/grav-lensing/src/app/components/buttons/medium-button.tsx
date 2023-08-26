import PrimaryButton from "./primary-button";
import { ReactComponent as ButtonArrow } from "../svg/gl-circle-arrow.svg";
export type HardButtonProps = {
  onClick?: () => void;
};

export const MediumButton = ({ onClick }: HardButtonProps) => {
  return (
    <div style={{ marginLeft: "1em", marginRight: "1em" }}>
      <PrimaryButton width={"5.5em"} onClick={onClick}>
        MEDIUM
        <ButtonArrow
          color="#00ffff"
          style={{ height: "1em", paddingLeft: "0.5em" }}
        />
      </PrimaryButton>
    </div>
  );
};
