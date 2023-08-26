import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BottomLeft } from "../components/bottom-left";
import { BottomRight } from "../components/bottom-right";
import { Earth } from "../components/earth";
import { Galaxy } from "../components/galaxy";
import { Line } from "../components/line";
import { Obstacle } from "../components/obstacle";
import { Background } from "../components/background";
import { TutorialHeader } from "../components/tutorial-header";
import { Viewer } from "../components/viewer";
import { NextButton } from "../components/buttons/next-button";
import { ResponsiveCanvas } from "@web/responsive-canvas";
import { GravitationalLensingSimulation } from "@web/gravitational-lensing-simulation";
import { labelSize, labelFontSize } from "../config";
import { TutorialSlider } from "../components/tutorial-slider";
import { ClickSound } from "../components/audio/sound";
import { ObstacleMass } from "../components/audio/sound";
import { TutorialAmbience } from "../components/audio/sound";
import { useAmbientFn } from "../components/audio/ambient-context";
import amplitude from "amplitude-js";

const galaxyPos: [number, number] = [0.2, 0.5];
const obstacleCentre: [number, number] = [0.5, 0.5];
const galaxyPosCss: [string, string] = [
  `${galaxyPos[0] * 100}%`,
  `${galaxyPos[1] * 100}%`,
];
const obstacleCentreCss: [string, string] = [
  `${obstacleCentre[0] * 100}%`,
  `${obstacleCentre[1] * 100}%`,
];
const obstacleMovementWidth = 350;

const arrowLength = 8;
const arrowWidth = 2;
const bendMultiplier = 0.5;

const strokeLine = (
  context: CanvasRenderingContext2D,
  [startX, startY]: [number, number],
  angle: number,
  [massX, massY]: [number, number],
  deflectionStrength: number
) => {
  context.moveTo(startX, startY);
  const dirVec = [Math.cos(angle), Math.sin(angle)];
  const length = Math.sqrt(
    Math.pow(massX - startX, 2) + Math.pow(massY - startY, 2)
  );

  const cpX = startX + dirVec[0] * length;
  const cpY = startY + dirVec[1] * length;

  const dist = Math.sqrt(Math.pow(massX - cpX, 2) + Math.pow(massY - cpY, 2));
  const bend = bendMultiplier * (dist / length);
  const curveStartX = startX + dirVec[0] * (1 - bend) * length;
  const curveStartY = startY + dirVec[1] * (1 - bend) * length;
  const deflection =
    massY - cpY > 0
      ? deflectionStrength * (1 / dist)
      : -deflectionStrength * (1 / dist);

  const endLength = length * bend;
  const deflectedVec = [
    Math.cos(angle + deflection),
    Math.sin(angle + deflection),
  ];
  const curveEndX = cpX + endLength * deflectedVec[0];
  const curveEndY = cpY + endLength * deflectedVec[1];
  const endX = curveEndX + (1 - bend) * deflectedVec[0] * length * 0.5;
  const endY = curveEndY + (1 - bend) * deflectedVec[1] * length * 0.5;
  context.lineTo(curveStartX, curveStartY);
  context.quadraticCurveTo(cpX, cpY, curveEndX, curveEndY);
  context.lineTo(endX, endY);
  context.stroke();

  const baseVec = [
    arrowWidth * Math.cos(angle + deflection + Math.PI / 2),
    arrowWidth * Math.sin(angle + deflection + Math.PI / 2),
  ];
  const baseMid = [
    endX - arrowLength * deflectedVec[0],
    endY - arrowLength * deflectedVec[1],
  ];
  context.beginPath();
  context.moveTo(endX, endY);
  context.lineTo(baseMid[0] + baseVec[0], baseMid[1] + baseVec[1]);
  context.lineTo(baseMid[0] - baseVec[0], baseMid[1] - baseVec[1]);
  context.lineTo(endX, endY);
  context.closePath();
  context.fill();
};

export const MassPage = () => {
  const history = useHistory();
  const [obstaclePos, setObstaclePos] = useState<number>(0);
  const [isTablet, setIsTablet] = useState(false);
  const [obstacleRadius, setObstacleRadius] = useState<number>(60);
  const [lineLength, setLineLength] = useState("50%");

  const handleNext = useCallback(() => {
    amplitude
      .getInstance()
      .logEvent("Click on Next Button", { CurrentPage: "Mass Bending Light" });
    history.push("/tutorial/newdarkmatter");
    ClickSound.play();
    ObstacleMass.stop();
  }, [history]);

  const handleMassAdjust = useCallback((mass: number) => {
    if (isTablet) {
      console.log(obstacleRadius);
      setObstacleRadius(60 + mass * 20);
      console.log(obstacleRadius);
    } else {
      setObstacleRadius(60 + mass * 20);
    }
  }, []);

  const setAmbient = useAmbientFn();

  useEffect(() => {
    setAmbient(TutorialAmbience, 3000);
  }, [setAmbient]);

  useEffect(() => {
    const offset = Math.abs(obstaclePos * obstacleMovementWidth);
    if (offset > obstacleRadius) {
      setLineLength("50%");
    } else {
      setLineLength(
        `calc(${obstacleCentreCss[0]} - ${galaxyPosCss[0]} - ${Math.sqrt(
          Math.pow(50, 2) - Math.pow(offset, 2)
        )}px)`
      );
    }
  }, [obstaclePos, obstacleRadius]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsTablet(window.innerWidth <= 1080);
    });
    setIsTablet(window.innerWidth <= 1080);
    setObstacleRadius(isTablet ? 53 : 60);
  }, []);

  const draw = useCallback(
    (size: [number, number], canvas: HTMLCanvasElement) => {
      const context = canvas.getContext("2d");
      const massPos: [number, number] = [
        size[0] * obstacleCentre[0],
        size[1] * obstacleCentre[1] + obstaclePos * obstacleMovementWidth,
      ];
      if (context) {
        context.clearRect(0, 0, size[0], size[1]);
        context.strokeStyle = "#FFF";
        context.fillStyle = "#FFF";
        for (
          let angle = Math.PI / 32;
          angle < Math.PI / 8;
          angle += Math.PI / 32
        ) {
          strokeLine(
            context,
            [size[0] * galaxyPos[0], size[1] * galaxyPos[1]],
            angle,
            massPos,
            (obstacleRadius - 50) * 1.5
          );
        }
        for (
          let angle = Math.PI * 2 - Math.PI / 32;
          angle > Math.PI * 2 - Math.PI / 8;
          angle -= Math.PI / 32
        ) {
          strokeLine(
            context,
            [size[0] * galaxyPos[0], size[1] * galaxyPos[1]],
            angle,
            massPos,
            (obstacleRadius - 50) * 1.5
          );
        }
      }
    },
    [obstaclePos, obstacleRadius]
  );

  return (
    <>
      <Background imgSrc="/assets/img/gl-bg-1.jpg">
        <Galaxy position={galaxyPosCss} />
        <ResponsiveCanvas id="LightBending" singleDraw={draw} />
        <Line
          start={galaxyPosCss}
          length={lineLength}
          rotation={0}
          lineColor={[255, 255, 0]}
        />
        <Earth />
        <Obstacle
          showRing
          offset={obstaclePos}
          center={obstacleCentreCss}
          movementWidth={obstacleMovementWidth}
          size={isTablet ? 20 : 50}
          imageSrc="/assets/img/gl-obstacle.svg"
        />
        <TutorialHeader currentChapter={1} />
        <BottomLeft direction="column">
          <div style={{ position: "relative" }}>
            <TutorialSlider
              label="Obstacle Mass"
              labelHeight={labelSize}
              labelFontSize={labelFontSize}
              tutorialText="Try changing the obstacle's mass"
              onValueUpdated={handleMassAdjust}
              initialValue={0}
              sliderSound={ObstacleMass}
            />
          </div>
          <Viewer
            heading="Albert Einstein discovered an amazing thing!"
            subheading="If the object is massive enough, its gravity can actually bend light."
            labelSize={labelSize}
            labelFontSize={labelFontSize}
          >
            <GravitationalLensingSimulation
              lensCenter={[0, 0]} // Default centre is middle of canvas
              lensOffset={[0, obstaclePos]}
              lensMass={(obstacleRadius - 50) * 0.005}
              textureSrc={"assets/img/gl-galaxy.png"}
              textureAspect={1}
              textureScale={0.25} // Shrink image down a bit to see more of galaxy
            />
            <Obstacle
              center={["50%", "50%"]}
              offset={obstaclePos}
              movementWidth={320}
              size={isTablet ? 20 : 50}
              imageSrc="/assets/img/gl-obstacle.svg"
            />
          </Viewer>
        </BottomLeft>
        <BottomRight>
          <NextButton onClick={handleNext} />
        </BottomRight>
      </Background>
    </>
  );
};
