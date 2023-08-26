import styled from "@emotion/styled";

export type CenterCenterProps = {
  width: string;
};

export const CenterCenter = styled.div<CenterCenterProps>`
  position: absolute;
  bottom: 35%;
  left: 50%;
  width: ${(props) => props.width};
  transform: translate(-50%, 0);
  padding-bottom: 1em;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
