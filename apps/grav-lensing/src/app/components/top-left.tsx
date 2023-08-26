import styled from "@emotion/styled";

export type TopLeftProps = {
  spacing?: number;
};

export const TopLeft = styled.div<TopLeftProps>`
  position: absolute;
  top: 0;
  left: 0;
  padding-top: ${(props) => props.spacing || 1.8}em;
  padding-left: ${(props) => props.spacing || 1}em;
  display: flex;
  flex-direction: row;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
