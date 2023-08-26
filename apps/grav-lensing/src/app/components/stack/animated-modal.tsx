import { keyframes } from "@emotion/react";
import { AnimatedStackLayer } from "./animated-stack-layer";

type AnimatedModalProp = {
  layers: string[];
  duration: number;
  startPos?: [x: number, y: number];
  startPosRange?: [x: number, y: number];
  distort: [a: number, b: number, c: number, d: number];
  scale?: number;
  layerDuration?: number;
};

export const AnimatedModal = ({
  layers,
  duration,
  startPos = [-150, -150],
  startPosRange = [20, 20],
  distort,
  layerDuration,
  scale = 1,
}: AnimatedModalProp) => {
  return (
    <div>
      {layers.map((layer, index) => {
        const layerAnimation = keyframes`
            from {
                transform: matrix(1,0,0,1,${
                  startPos[0] + (Math.random() - 0.5) * startPosRange[0]
                }, ${
          startPos[1] + (Math.random() - 0.5) * startPosRange[1]
        }) scale(0);
                opacity: 1;
            }
            50% {
                transform: matrix(1,0,0,1,0,0) scale(${scale});
                opacity: 1;
            }
            to {
                transform: matrix(${distort[0]}, ${distort[1]}, ${
          distort[2]
        }, ${distort[3]}, 0, 0) scale(${scale});
                opacity: 0.3;
            }
            `;
        return (
          <AnimatedStackLayer
            image={layer}
            distort={distort}
            animation={layerAnimation}
            layerDuration={layerDuration}
            delay={duration * (1 - Math.pow(0.5, index / 5))}
            scale={scale}
          />
        );
      })}
    </div>
  );
};
