import PrimaryButton from "./primary-button";
import { ReactComponent as ButtonArrow } from "../svg/gl-circle-arrow.svg";
import { ReactNode } from "react";

export type NextButtonProps = {
  onClick?: () => void;
  children?: string;
};

export const NextButton = ({ onClick, children }: NextButtonProps) => {
  return (
    <PrimaryButton onClick={onClick}>
      {children || "NEXT"}
      <ButtonArrow
        color="#f4ff24"
        style={{ height: "1.5em", paddingLeft: "0.5em" }}
      />
    </PrimaryButton>
  );
};
