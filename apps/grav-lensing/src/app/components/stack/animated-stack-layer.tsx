import { Keyframes } from "@emotion/serialize";
import styled from "@emotion/styled";
import { StackLayer, StackLayerProps } from "./stack-layer";

export type AnimatedStackLayerProps = {
  animation: Keyframes;
  delay: number;
  layerDuration?: number;
} & StackLayerProps;

export const AnimatedStackLayer = styled(StackLayer)<AnimatedStackLayerProps>`
  animation: ${(props) => props.animation}
    ${(props) => props.layerDuration || 0.5}s ${(props) => props.delay}s 1;
  animation-fill-mode: both;
`;
