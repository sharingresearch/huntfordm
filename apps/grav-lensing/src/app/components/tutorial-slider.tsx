import styled from "@emotion/styled";
import { Label } from "./label";
import { Slider, SliderProps } from "./slider";
import { Howl } from "howler";

export type TutorialSliderProps = {
  label: string;
  labelHeight?: string;
  labelFontSize?: string;
  tutorialText?: string;
  tutorialTextSize?: string;
  sliderSound?: Howl;
} & Pick<SliderProps, "onValueUpdated" | "initialValue" | "disabled">;

type TutorialTextProp = {
  size?: string;
};

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 320px;
  margin-left: 2em;
  @media (max-width: 1360px) {
    position: fixed;
    left: 0;
    top: 7em;
  }
`;

const StyledText = styled.div`
  color: white;
  margin-left: 1.2em;
`;
const StyledH3 = styled.h3<TutorialTextProp>`
  font-size: ${(props) => props.size || "1.15em"};
  font-weight: 400;
  text-transform: uppercase;
`;
const massSliderCentre: [string, string] = ["160px", "35px"];

export const TutorialSlider = ({
  label,
  labelHeight,
  labelFontSize,
  onValueUpdated,
  sliderSound,
  initialValue,
  tutorialText,
  tutorialTextSize,
  disabled,
}: TutorialSliderProps) => {
  return (
    <Layout>
      <Label
        style={{ marginBottom: 40 }}
        height={labelHeight}
        fontSize={labelFontSize}
      >
        {label}
      </Label>
      <Slider
        center={massSliderCentre}
        width={320}
        axis="x"
        onValueUpdated={onValueUpdated}
        sliderSound={sliderSound}
        initialValue={initialValue}
        disabled={disabled}
      />
      <StyledText>
        <StyledH3 size={tutorialTextSize}>{tutorialText}</StyledH3>
      </StyledText>
    </Layout>
  );
};
