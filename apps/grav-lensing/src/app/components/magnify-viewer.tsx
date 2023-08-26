import styled from "@emotion/styled";

export type MagnifyViewerProps = {
  position: [string, string];
};

export const MagnifyViewer = styled.div<MagnifyViewerProps>`
  position: absolute;
  top: ${(props) => props.position[1]};
  left: ${(props) => props.position[0]};
  border: 1px solid #aaa;
  border-radius: 5px;
  overflow: visible;
`;
