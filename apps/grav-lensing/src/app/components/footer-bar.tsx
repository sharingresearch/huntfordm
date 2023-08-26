import styled from "@emotion/styled";

export type FooterBarProps = {
  height: string;
};

export const FooterBar = styled.div<FooterBarProps>`
  position: absolute;
  background: black;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.height};
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8em;
  @media (max-width: 1080px) {
    gap: 1em;
  }
`;
