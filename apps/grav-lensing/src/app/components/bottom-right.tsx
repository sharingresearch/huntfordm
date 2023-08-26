import styled from "@emotion/styled";

export const BottomRight = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding-bottom: 4em;
  padding-right: 4em;
  display: flex;
  flex-direction: row;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media (max-width: 1360px) {
    width: 25%;
    scale: 0.7;
    padding-bottom: 2em;
    padding-right: 2em;
    flex-direction: column;
  }
`;
