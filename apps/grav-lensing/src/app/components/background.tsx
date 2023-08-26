import styled from "@emotion/styled";

export type BackgroundProps = {
  imgSrc: string;
};

export const Background = styled.div<BackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("${(props) => props.imgSrc}");
  background-position: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
