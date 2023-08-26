import styled from "@emotion/styled";

export type ObstacleVisualProps = {
  size: number;
  imageSrc: string;
};

type ObstaclePositionProps = {
  center: [string, string];
  offset: number;
};

export type ObstacleProps = {
  movementWidth: number;
  showRing?: boolean;
} & ObstaclePositionProps &
  ObstacleVisualProps;

const ObstaclePosition = styled.div<ObstaclePositionProps>`
  position: absolute;
  top: ${(props) => props.center[1]};
  left: ${(props) => props.center[0]};
  width: 0px;
  height: 0px;
  transform: translate(0, ${(props) => props.offset}px);
`;

const ObstacleRing = styled.div<ObstacleVisualProps>`
  position: absolute;
  top: 0;
  width: ${(props) => props.size * 2.5}px;
  height: ${(props) => props.size * 2.5}px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid #ff0;
`;

const ObstacleVisual = styled.div<ObstacleVisualProps>`
  position: absolute;
  top: 0;
  width: ${(props) => props.size * 2}px;
  height: ${(props) => props.size * 2}px;
  transform: translate(-50%, -50%);
  background: url(${(props) => props.imageSrc});
  background-size: contain;
  background-position: center;
`;

export const Obstacle = ({
  movementWidth,
  center,
  offset,
  showRing,
  ...visualProps
}: ObstacleProps) => {
  return (
    <ObstaclePosition center={center} offset={offset * movementWidth}>
      {showRing && <ObstacleRing {...visualProps} />}
      <ObstacleVisual {...visualProps} />
    </ObstaclePosition>
  );
};
