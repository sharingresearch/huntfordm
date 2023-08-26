import PrimaryButton from "./primary-button";
import { ReactComponent as ButtonArrow } from "../svg/gl-circle-arrow.svg";
import { ReactNode } from "react";
import { useState } from "react";
import React from "react";

export type StackButtonProps = {
  onClick?: () => void;
  children?: string;
};

export const StackingButton = ({ onClick, children }: StackButtonProps) => {
  return (
    <PrimaryButton onClick={onClick}>
      {children || "Stack"}
      <ButtonArrow
        color="#f4ff24"
        style={{ height: "1.5em", paddingLeft: "0.5em" }}
      />
    </PrimaryButton>
  );
};
