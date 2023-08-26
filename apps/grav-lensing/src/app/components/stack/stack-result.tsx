import styled from "@emotion/styled";
import { TransformMatrix } from "../../util/distort";
import { StackLayer } from "./stack-layer";

export type StackResultProps = {
  layers: string[];
  layerOpacity?: number;
  matrix: TransformMatrix;
  scale?: number;
} & Partial<ViewBoxProps>;

type ViewBoxProps = {
  background: string;
  size: string;
};

const ViewBox = styled.div<ViewBoxProps>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-color: ${(props) => props.background};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StackResult = ({
  layers,
  layerOpacity,
  matrix,
  background = "transparent",
  scale = 1,
  size = "75%",
}: StackResultProps) => {
  return (
    <ViewBox background={background} size={size}>
      {layers.map((layer) => {
        return (
          <StackLayer
            key={layer}
            opacity={layerOpacity}
            image={layer}
            distort={matrix}
            scale={scale}
          />
        );
      })}
    </ViewBox>
  );
};
