import { useCallback, useEffect, useState } from "react";
import { ResponsiveCanvas } from "@web/responsive-canvas";
import { Lens, LensingSimulationProgram, RenderMode } from "./simulation";

export type GravitationalLensingSimulationProps = {
  lensCenter: [number, number];
  lensOffset?: [number, number];
  lensMass: number;
  textureSrc: string;
  textureAspect?: number;
  textureScale?: number;
};

const defaultMeshResolution: [number, number] = [1024, 1024];
const defaultLensOffset: [number, number] = [0, 0];
const defaultTextureAspect = 1;
const defaultTextureScale = 1;

/**
 * Gravitational Lensing Simulation Component
 * To Do:
 * - Handle resizing
 * - Make lens positions entirely relative (remove pixel-based offset)
 *
 */
export function GravitationalLensingSimulation({
  lensCenter,
  lensOffset = defaultLensOffset,
  lensMass = 0.2,
  textureSrc,
  textureAspect = defaultTextureAspect,
  textureScale = defaultTextureScale,
}: GravitationalLensingSimulationProps) {
  const [simulation, setSimulation] = useState<LensingSimulationProgram>();
  const [lenses, setLenses] = useState<Lens[]>([{ position: [0, 0], mass: 0 }]);

  const handleResize = useCallback(
    (newSize: [number, number]) => {
      if (simulation) {
        simulation.updateTextureScale([
          1 / (textureScale * textureAspect),
          1 / textureScale,
        ]);
        simulation.drawScene(newSize);
      }
    },
    [simulation, textureScale, textureAspect]
  );

  useEffect(() => {
    setLenses([
      {
        position: [
          lensCenter[0] + lensOffset[0],
          lensCenter[1] + lensOffset[1],
        ],
        mass: lensMass,
      },
    ]);
  }, [lensCenter, lensOffset, lensMass]);

  const simulationDraw = useCallback(
    (size: [number, number], canvas: HTMLCanvasElement) => {
      if (!simulation) {
        const context = canvas.getContext("webgl");
        if (!context) {
          console.error(
            "[Gravitational Lensing Simulation] Unable to get WebGL Context!"
          );
          return;
        }

        const newSim = new LensingSimulationProgram(
          context,
          defaultMeshResolution,
          textureSrc,
          // invert scale values since increasing scale means smaller texture
          [1 / (textureScale * textureAspect), 1 / textureScale],
          lenses
        );
        newSim.activeProgramVariant = RenderMode.image;
        setSimulation(newSim);
        newSim.drawScene(size);
      } else {
        simulation.drawScene(size, lenses);
      }
    },
    [simulation, lenses, textureSrc, textureScale, textureAspect]
  );

  const draw = useCallback(
    (size: [number, number], canvas: HTMLCanvasElement) => {
      const context = canvas.getContext("2d");
      console.log("Drawing Dark Matter. Context: ", context);
      if (context) {
        context.clearRect(0, 0, size[0], size[1]);
        context.beginPath();
        context.ellipse(
          lensCenter[0] * size[0] + lensOffset[0],
          lensCenter[1] * size[1] + lensOffset[1],
          20,
          20,
          0,
          0,
          2 * Math.PI
        );
        context.fill();
      }
    },
    [lensCenter, lensOffset]
  );

  return (
    <ResponsiveCanvas
      id="LensingSimulation"
      singleDraw={simulationDraw}
      onResize={handleResize}
    />
  );
}

export default GravitationalLensingSimulation;
