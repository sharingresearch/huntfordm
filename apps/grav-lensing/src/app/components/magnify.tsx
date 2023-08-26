import styled from "@emotion/styled";
import { ReactNode } from "react";

export type MagnifyProps = {
  children?: ReactNode;
} & MagnifyRootProps;

export type MagnifyRootProps = {
  position: [string, string];
  scale?: number;
  img?: string;
};

const MagnifyDisplay = styled.div`
  position: absolute;
  left: 54%;
  top: 0px;
  width: 46%;
  height: 59%;
  border-radius: 5px;
  border: 2px solid yellow;
`;

const MagnifyDisplayBorder = styled.div`
  position: absolute;
  inset: 2px;
  border-radius: 3px;
  border: 3px solid white;
`;

const MagnifyDisplayRoot = styled.div<MagnifyRootProps>`
  position: absolute;
  top: ${(props) => props.position[1]};
  left: ${(props) => props.position[0]};
  width: min(60vw, 848px);
  height: min(30vw, 400px);
  transform: translate(min(-20%, -93px), -80%) scale(${(props) => props.scale});
  transition: left 0.5s, top 0.5s;
`;
const Magnifycontainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const Magnify = ({
  children,
  position,
  img = "assets/img/gl-magnify.png",
  scale = 1,
}: MagnifyProps) => {
  return (
    <Magnifycontainer>
      <MagnifyDisplayRoot position={position} scale={scale}>
        <img
          style={{ width: "100%", height: "100%" }}
          src={img}
          alt="Galaxy"
          draggable="false"
        />
        <MagnifyDisplay>
          {children}
          <MagnifyDisplayBorder />
        </MagnifyDisplay>
      </MagnifyDisplayRoot>
    </Magnifycontainer>
  );
};
