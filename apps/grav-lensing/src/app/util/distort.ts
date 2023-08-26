export type LensEffectData = {
  angle: number;
  strength: number;
};

export type DarkMatter = {
  position: [x: number, y: number];
  mass: number;
};

const alpha = 2; // for efficiency reasons this is currently hard-coded to 2

export type TransformMatrix = [a: number, b: number, c: number, d: number];

/**
 * Calculates the angle and strength of lensing effects due to dark matter on a lensed source
 * at the provided position. Note this function assumes positions are grid positions with 0,0
 * being the top left of the grid.
 * @param darkMatter array of dark matter info
 * @param position position of lensed object
 * @returns Lens Effect Data to feed into getTranformMatrixForDistortion
 */
export const getLensEffectData = (
  darkMatter: DarkMatter[],
  position: [x: number, y: number]
): LensEffectData[] => {
  return darkMatter.map<LensEffectData>((dm) => {
    // invert y-axis when calculating vector since grid is positive down but we want positive up for calculations
    const vector = [
      dm.position[0] - position[0],
      -dm.position[1] + position[1],
    ];
    const distanceSq = Math.pow(vector[0], 2) + Math.pow(vector[1], 2);
    const strength = dm.mass / distanceSq;

    return {
      angle: Math.atan(vector[1] / vector[0]),
      strength,
    };
  });
};

/**
 * Calculates affine transform matrix for distortion due to lensing effects of supplied lenses. This
 * can be supplied as CSS property to distort an image.
 * @param lenses the lenses relative to this source that are applying the distortion
 * @returns Affine Transform Matrix to apply shear distortion to an image based on expected effects
 */
export const getTransformMatrixForDistortion = (
  lenses: LensEffectData[]
): TransformMatrix => {
  let gCosTheta = 0;
  let gSinTheta = 0;

  // Sum influences of each lens
  lenses.forEach(({ angle, strength }) => {
    gCosTheta += strength * Math.cos(2 * angle);
    gSinTheta += strength * Math.sin(2 * angle);
  });

  const m11 = 1 - gCosTheta;
  const m12 = -gSinTheta;
  const m22 = 1 + gCosTheta;

  const eigencomponent = Math.sqrt(
    Math.pow(m11 + m22, 2) - 4 * (m11 * m22 - Math.pow(m12, 2))
  );
  const eigenval1 = (m11 + m22 + eigencomponent) / 2;
  const eigenval2 = (m11 + m22 - eigencomponent) / 2;

  let eigenvec1x = 1;
  let eigenvec1y = 0;

  if (eigenval1 - eigenval2 < 1e-10) {
    if (Math.abs(m11 - m22) >= 1e-10) {
      eigenvec1x =
        -m12 / Math.sqrt(Math.pow(m12, 2) + Math.pow(m22 - eigenval1, 2));
      eigenvec1y =
        (0.5 * (m11 - m22)) /
        Math.sqrt(Math.pow(m12, 2) + 0.25 * Math.pow(m11 - m22, 2));
    }
  } else {
    if (Math.abs(m11 - eigenval1) < 1e-10) {
      const divisor = Math.sqrt(
        Math.pow(m12, 2) + Math.pow(m22 - eigenval1, 2)
      );
      eigenvec1x = (m22 - eigenval1) / divisor;
      eigenvec1y = -m12 / divisor;
    } else {
      const divisor = Math.sqrt(
        Math.pow(m12, 2) + Math.pow(m11 - eigenval1, 2)
      );
      eigenvec1x = -m12 / divisor;
      eigenvec1y = (m11 - eigenval1) / divisor;
    }
  }

  const rotateAngle = -Math.atan(eigenvec1y / eigenvec1x);

  const newM11 =
    eigenval1 * Math.pow(Math.cos(rotateAngle), 2) +
    (1 / eigenval1) * Math.pow(Math.sin(rotateAngle), 2);
  const newM12 =
    (eigenval1 - 1 / eigenval1) * Math.cos(rotateAngle) * Math.sin(rotateAngle);
  const newM22 =
    eigenval1 * Math.pow(Math.sin(rotateAngle), 2) +
    (1 / eigenval1) * Math.pow(Math.cos(rotateAngle), 2);

  return [newM11, newM12, newM12, newM22];
};
