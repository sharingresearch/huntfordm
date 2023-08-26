import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { ReactComponent as SliderHeadIcon } from "./svg/gl-horiz-scroll.svg";
import { Howl } from "howler";

export type SliderRailProps = {
  center: [string, string];
  width: number;
  axis?: "x" | "y";
  railThickness?: number;
  railColor?: string;
};

type SliderHeadProps = {
  height: string;
  axis?: "x" | "y";
};

type SliderPointProps = {
  initialOffset: number;
  axis?: "x" | "y";
};

export type SliderProps = {
  disabled?: boolean;
  onValueUpdated?: (val: number) => void;
  initialValue?: number;
  sliderHeadHeight?: string;
  sliderSound?: Howl;
} & SliderRailProps;

const SliderRail = styled.div<SliderRailProps>`
  position: absolute;
  left: ${(props) => props.center[0]};
  top: ${(props) => props.center[1]};
  width: ${(props) =>
    props.axis === "y"
      ? props.railThickness !== undefined
        ? props.railThickness
        : 1
      : props.width}px;
  height: ${(props) =>
    props.axis === "y"
      ? props.width
      : props.railThickness !== undefined
      ? props.railThickness
      : 1}px;
  background-color: ${(props) => props.railColor || "#FF0"};
  transform: translate(-50%, -50%);
`;

const SliderPoint = styled.div<SliderPointProps>`
  position: absolute;
  left: ${(props) =>
    props.axis === "y" ? "50%" : `${(props.initialOffset + 0.5) * 100}%`};
  top: ${(props) =>
    props.axis === "y" ? `${(props.initialOffset + 0.5) * 100}%` : "50%"};
  width: 0px;
  height: 0px;
`;

const SliderHead = styled.div<SliderHeadProps>`
  width: calc(${(props) => props.height} * 1.5385);
  height: ${(props) => props.height};
  transform: translate(-50%, -50%)
    ${(props) => (props.axis === "y" ? "rotate(90deg)" : "")};
`;

export const Slider = ({
  disabled,
  onValueUpdated,
  initialValue = 0,
  sliderHeadHeight = "20px",
  sliderSound,
  ...railProps
}: SliderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [firstPlay, setFirstPlay] = useState(false);

  function handleDragStop() {
    if (isPlaying == true) {
      sliderSound!.fade(sliderSound!.volume(), 0, 1000);
      setIsPlaying(false);
    }
  }

  const handleDrag = useCallback(
    (event: DraggableEvent, data: DraggableData) => {
      if (isPlaying == false) {
        if (firstPlay == false) {
          sliderSound!.play();
          setFirstPlay(true);
        }

        sliderSound!.fade(sliderSound!.volume(), 0.15, 1000);
        setIsPlaying(true);
      }

      onValueUpdated?.(
        (railProps.axis === "y" ? data.y : data.x) / railProps.width +
          initialValue
      );
    },
    [onValueUpdated, railProps, initialValue]
  );

  return (
    <SliderRail {...railProps}>
      <Draggable
        axis={railProps.axis}
        bounds={{
          left: railProps.width * -(initialValue + 0.5),
          right: railProps.width * -(initialValue - 0.5),
          top: railProps.width * -(initialValue + 0.5),
          bottom: railProps.width * -(initialValue - 0.5),
        }}
        onDrag={handleDrag}
        onStop={handleDragStop}
        disabled={disabled}
      >
        <SliderPoint initialOffset={initialValue}>
          <SliderHead height={sliderHeadHeight} axis={railProps.axis}>
            <SliderHeadIcon
              color={railProps.railColor || "#FF0"}
              height={sliderHeadHeight}
            />
          </SliderHead>
        </SliderPoint>
      </Draggable>
    </SliderRail>
  );
};
