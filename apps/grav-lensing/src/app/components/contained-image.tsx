import styled from "@emotion/styled";

export type ContainedImageProps = {
  src: string;
};

export const ContainedImage = styled.div<ContainedImageProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
