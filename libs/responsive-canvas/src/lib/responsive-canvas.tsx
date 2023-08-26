import { useCallback, useEffect, useRef, useState } from "react";
import getElementSize from "./get-element-size";

export type ResponsiveCanvasProps = {
  id?: string;
  onResize?: (newSize: [number, number]) => void;
  singleDraw?: (size: [number, number], canvas: HTMLCanvasElement) => void;
};

export const ResponsiveCanvas = ({
  id,
  onResize,
  singleDraw,
}: ResponsiveCanvasProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState<[number, number]>([0, 0]);

  const setSize = useCallback((): [number, number] => {
    if (parentRef.current) {
      const newSize = getElementSize(parentRef.current);
      setCanvasSize(newSize);
      return newSize;
    } else {
      return [0, 0];
    }
  }, []);

  const handleResize = useCallback(() => {
    const newSize = setSize();
    if (onResize) {
      onResize(newSize);
    }
  }, [setSize, onResize]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (singleDraw && canvasRef.current) {
      singleDraw(canvasSize, canvasRef.current);
    }
  }, [canvasSize, singleDraw]);

  // Trigger resize calculation on first run or if resize callback changes
  useEffect(() => {
    handleResize();
  }, [handleResize]);

  return (
    <div
      ref={parentRef}
      style={{ width: "100%", height: "100%", overflow: "clip" }}
    >
      <canvas
        ref={canvasRef}
        id={id}
        width={canvasSize[0]}
        height={canvasSize[1]}
        style={{ width: canvasSize[0], height: canvasSize[1] }}
      />
    </div>
  );
};

export default ResponsiveCanvas;
