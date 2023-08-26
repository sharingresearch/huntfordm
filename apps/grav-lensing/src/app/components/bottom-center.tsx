import styled from "@emotion/styled";

export type BottomCenterProps = {
  width: string;
};

export const BottomCenter = styled.div<BottomCenterProps>`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: ${(props) => props.width};
  transform: translate(-50%, 0);
  padding-bottom: 1em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 1080px) {
    padding-bottom: 5em;
  }
`;
