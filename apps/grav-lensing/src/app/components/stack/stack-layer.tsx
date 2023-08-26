import styled from "@emotion/styled";

export type StackLayerProps = {
  image: string;
  distort: [a: number, b: number, c: number, d: number];
  scale: number;
  opacity?: number;
};

export const StackLayer = styled.div<StackLayerProps>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  mix-blend-mode: screen;
  opacity: ${(props) => props.opacity || 0.3};
  transform: matrix(
      ${(props) => props.distort[0]},
      ${(props) => props.distort[1]},
      ${(props) => props.distort[2]},
      ${(props) => props.distort[3]},
      0,
      0
    )
    scale(${(props) => props.scale});
`;
