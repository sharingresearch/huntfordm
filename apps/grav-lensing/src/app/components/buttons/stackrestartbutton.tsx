import PrimaryButtonwide from "./primary-button-wide";
import { ReactComponent as ButtonArrow } from "../svg/gl-circle-arrow.svg";
import { ReactNode } from "react";
import { useState } from "react";
import React from "react";

export type StackButtonProps = {
  onClick?: () => void;
  children?: string;
};

export const StackRestartButton = ({ onClick, children }: StackButtonProps) => {
  return (
    <PrimaryButtonwide onClick={onClick}>
      {children || "Redo Stacking"}
      <ButtonArrow
        color="#f4ff24"
        style={{ height: "1.5em", paddingLeft: "0.5em" }}
      />
    </PrimaryButtonwide>
  );
};
