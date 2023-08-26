import styled from "@emotion/styled";
import { useCallback, useRef } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { ReactComponent as DragHeadIcon } from "./svg/gl-arrows-4dir.svg";
import { Howl } from "howler";

type DragPointProps = {
  center: [string, string];
};

type DragHeadProps = {
  size: number;
};

export type DragControlProps = {
  dragSound?: Howl;
  onValueUpdated?: (val: [number, number]) => void;
} & DragPointProps &
  DragHeadProps;

const DragPoint = styled.div<DragPointProps>`
  position: absolute;
  left: ${(props) => props.center[0]};
  top: ${(props) => props.center[1]};
  width: 0px;
  height: 0px;
`;

const DragHead = styled.div<DragHeadProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  position: absolute;
  left: -${(props) => props.size / 2}px;
  top: -${(props) => props.size / 2}px;
`;

export const DragControl = ({
  onValueUpdated,
  center,
  dragSound,
  size,
}: DragControlProps) => {
  const isPlaying = useRef(false);

  function handleDragStop() {
    if (isPlaying.current === true) {
      dragSound!.fade(0.7, 0, 1000);
      isPlaying.current = false;
    }
    setTimeout(function () {
      dragSound!.stop;
    }, 1000);
  }

  const handleDrag = useCallback(
    (event: DraggableEvent, data: DraggableData) => {
      if (isPlaying.current === false) {
        dragSound!.play();
        dragSound!.fade(0, 0.7, 1000);
        isPlaying.current = true;
      }

      onValueUpdated?.([data.x, data.y]);
    },
    [onValueUpdated]
  );

  return (
    <DragPoint center={center}>
      <Draggable onDrag={handleDrag} onStop={handleDragStop}>
        <DragHead size={size}>
          <DragHeadIcon width={size} height={size} color={"#FF0"} />
        </DragHead>
      </Draggable>
    </DragPoint>
  );
};
