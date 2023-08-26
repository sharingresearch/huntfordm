import styled from "@emotion/styled";

export type GalaxyProps = {
  position: [string, string];
  scale?: number;
};

const GalaxyDisplay = styled.img<GalaxyProps>`
  position: absolute;
  left: ${(props) => props.position[0]};
  top: ${(props) => props.position[1]};
  transform: translate(-50%, -50%) scale(${(props) => props.scale});
  transition: left 0.5s, top 0.5s;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const Galaxy = ({ position, scale = 1 }: GalaxyProps) => {
  return (
    <GalaxyDisplay
      src="assets/img/gl-galaxy.png"
      alt="Galaxy"
      position={position}
      scale={scale}
      draggable="false"
    />
  );
};
