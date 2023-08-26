import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  getTransformMatrixForDistortion,
  LensEffectData,
} from "../../util/distort";
import { LensData } from "../lensed-galaxy";
import { AnimatedStackLayer } from "./animated-stack-layer";

export type AnimatedStackProps = {
  layers: string[];
  duration: number;
  startPos?: [x: number, y: number];
  startPosRange?: [x: number, y: number];
  position: [number, number];
  lenses: LensData[];
  scale?: number;
};

const ViewBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
`;

export const AnimatedStack = ({
  layers,
  duration,
  startPos = [-150, -150],
  startPosRange = [20, 20],
  position,
  lenses,
  scale = 1,
}: AnimatedStackProps) => {
  const [distort, setDistort] = useState<[number, number, number, number]>([
    1, 0, 0, 1,
  ]); // default to no distortion

  useEffect(() => {
    const lensEffects: LensEffectData[] = [];
    lenses.forEach((lens) => {
      const vector = [
        lens.position[0] - position[0],
        lens.position[1] - position[1],
      ];
      const distanceSq = Math.pow(vector[0], 2) + Math.pow(vector[1], 2);
      const strength = lens.mass / distanceSq;

      lensEffects.push({
        angle: Math.atan(vector[1] / vector[0]),
        strength,
      });
    });
    setDistort(getTransformMatrixForDistortion(lensEffects));
  }, [lenses, position]);

  return (
    <ViewBox>
      {layers.map((layer, index) => {
        const layerAnimation = keyframes`
          from {
            transform: matrix(1,0,0,1,${
              startPos[0] + (Math.random() - 0.5) * startPosRange[0]
            }, ${
          startPos[1] + (Math.random() - 0.5) * startPosRange[1]
        }) scale(0) rotate(0.002deg);
            opacity: 1;
          }
          50% {
            transform: matrix(1,0,0,1,0,0) scale(${scale});
            opacity: 1;
          }
          to {
            transform: matrix(${distort[0]}, ${distort[1]}, ${distort[2]}, ${
          distort[3]
        }, 0, 0) scale(${scale});
            opacity: 0.3;
          }
        `;
        return (
          <AnimatedStackLayer
            image={layer}
            distort={distort}
            animation={layerAnimation}
            delay={duration * (1 - Math.pow(0.5, index / 5))}
            scale={scale}
          />
        );
      })}
    </ViewBox>
  );
};
