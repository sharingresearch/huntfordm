import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  getTransformMatrixForDistortion,
  LensEffectData,
} from "../util/distort";

export type LensData = {
  position: [number, number];
  mass: number;
};

export type LensedGalaxyProps = {
  displayPosition: [string, string];
  position: [number, number];
  lenses: LensData[];
  scale?: number;
};

type LensedGalaxyDisplayProps = {
  distort: [a: number, b: number, c: number, d: number];
} & Omit<LensedGalaxyProps, "lenses" | "position">;

const LensedGalaxyDisplay = styled.img<LensedGalaxyDisplayProps>`
  position: absolute;
  left: ${(props) => props.displayPosition[0]};
  top: ${(props) => props.displayPosition[1]};
  transform: translate(-50%, -50%) scale(${(props) => props.scale})
    matrix(
      ${(props) =>
        `${props.distort[0]}, ${props.distort[1]}, ${props.distort[2]}, ${props.distort[3]}, 0, 0`}
    );
  transition: left 0.5s, top 0.5s;
`;

export const LensedGalaxy = ({
  position,
  displayPosition,
  scale = 1,
  lenses = [],
}: LensedGalaxyProps) => {
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
    <LensedGalaxyDisplay
      src="assets/img/gl-galaxy.png"
      alt="Lensed Galaxy"
      displayPosition={displayPosition}
      scale={scale}
      distort={distort}
    />
  );
};
