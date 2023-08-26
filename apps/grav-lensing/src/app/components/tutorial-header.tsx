import { TutorialSteps } from "../config";
import { HeaderLogo } from "./header-logo";
import { ProgressBar } from "./progress-bar";
import { TopLeft } from "./top-left";
import { TopRight } from "./top-right";
import { SkipButton } from "./buttons/skip-button";

export type TutorialHeaderProps = {
  currentChapter: number;
};

export const TutorialHeader = ({ currentChapter }: TutorialHeaderProps) => {
  return (
    <>
      <TopLeft>
        <HeaderLogo />
      </TopLeft>
      <TopRight>
        <ProgressBar
          steps={TutorialSteps}
          currentStep={TutorialSteps[currentChapter]}
        />
        <SkipButton></SkipButton>
      </TopRight>
    </>
  );
};
