import styled from "@emotion/styled";

export type EarthProps = {};

const GalaxyDisplay = styled.img<EarthProps>`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const Earth = () => {
  return (
    <GalaxyDisplay
      src="assets/img/gl-earth.png"
      alt="Earth"
      draggable="false"
    />
  );
};
