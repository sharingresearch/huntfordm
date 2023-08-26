import { useEffect, useState } from "react";
import {
  getTransformMatrixForDistortion,
  LensEffectData,
} from "../../util/distort";
import { LensData } from "../lensed-galaxy";
import { StackResult, StackResultProps } from "./stack-result";

export type StackProps = {
  layers: string[];
  position: [number, number];
  lenses: LensData[];
  scale?: number;
} & Omit<StackResultProps, "layers" | "matrix" | "scale">;

export const Stack = ({
  layers,
  position,
  lenses,
  scale = 1,
  ...props
}: StackProps) => {
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
    <StackResult layers={layers} matrix={distort} scale={scale} {...props} />
  );
};
