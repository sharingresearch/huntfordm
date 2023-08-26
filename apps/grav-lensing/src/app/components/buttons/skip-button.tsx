import TextButton from "./text-button";
import { ReactComponent as SkipArrows } from "../svg/gl-arrows.svg";
import { useHistory, useLocation } from "react-router-dom";
import { useCallback } from "react";
import amplitude from "amplitude-js";
import { Routes } from "../../routes";

type SkipProp = {
  children?: React.ReactNode;
};

export const SkipButton = ({ children = "skip" }: SkipProp) => {
  const history = useHistory();
  const location = useLocation();

  const handleSkip = useCallback(() => {
    amplitude
      .getInstance()
      .logEvent("Skip", { currentPage: location.pathname });
    history.push(Routes.Game);
  }, [location, history]);

  return (
    <TextButton onClick={handleSkip}>
      {children}
      <SkipArrows
        style={{ height: "1.5em", color: "white", paddingLeft: "0.5em" }}
      />
    </TextButton>
  );
};
