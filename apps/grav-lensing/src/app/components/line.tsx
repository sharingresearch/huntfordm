import styled from "@emotion/styled";
import { ReactComponent as ArrowHead } from "./svg/arrowHead.svg";

type LinePositionProps = {
  start: [string, string];
  rotation: number;
  length: string;
};

type LineSegmentProps = {
  lineColor: [number, number, number];
};

export type LineProps = Partial<LineSegmentProps> & LinePositionProps;

const LineLayout = styled.div<LinePositionProps>`
  position: absolute;
  left: ${(props) => props.start[0]};
  top: ${(props) => props.start[1]};
  width: ${(props) => props.length};
  transform-origin: left;
  transform: translate(0, -50%) rotate(${(props) => props.rotation}deg);
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LineSegment = styled.div<LineSegmentProps>`
  height: 1px;
  flex-grow: 1;
  background: linear-gradient(
    90deg,
    ${({ lineColor }) =>
      `rgba(${lineColor[0]}, ${lineColor[1]}, ${lineColor[2]},0)`}0%,
    ${({ lineColor }) =>
        `rgba(${lineColor[0]}, ${lineColor[1]}, ${lineColor[2]},1)`}
      90%
  );
`;

export const Line = ({
  lineColor = [255, 255, 255],
  ...positionProps
}: LineProps) => {
  return (
    <LineLayout {...positionProps}>
      <LineSegment lineColor={lineColor} />
      <ArrowHead
        height="7px"
        color={`rgb(${lineColor[0]}, ${lineColor[1]}, ${lineColor[2]})`}
      />
    </LineLayout>
  );
};
