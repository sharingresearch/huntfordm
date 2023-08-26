import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BottomLeft } from "../components/bottom-left";
import { BottomRight } from "../components/bottom-right";
import { Earth } from "../components/earth";
import { Galaxy } from "../components/galaxy";
import { Line } from "../components/line";
import { Obstacle } from "../components/obstacle";
import { Slider } from "../components/slider";
import { Background } from "../components/background";
import { TutorialHeader } from "../components/tutorial-header";
import { Viewer } from "../components/viewer";
import { NextButton } from "../components/buttons/next-button";
import { labelSize, labelFontSize } from "../config";
import amplitude from "amplitude-js";

import { ClickSound } from "../components/audio/sound";
import { MoveObstacle } from "../components/audio/sound";

import { TutorialAmbience } from "../components/audio/sound";
import { useAmbientFn } from "../components/audio/ambient-context";

const lineRotations = [45, 90, 135, 180, 225, 270, 315];
const galaxyPos: [string, string] = ["20%", "50%"];
const obstacleCentre: [string, string] = ["50%", "50%"];
const obstacleMovementWidth = 350;
const obstacleRadius = 50;

export const ObstaclePage = () => {
  const history = useHistory();
  const [obstaclePos, setObstaclePos] = useState<number>(0);
  const [lineLength, setLineLength] = useState("50%");

  const handleNext = useCallback(() => {
    amplitude.getInstance().logEvent("Click on Next Button", {
      CurrentPage: "Obstacle Blocks Light",
    });
    history.push("/tutorial/mass");
    ClickSound.play();
    MoveObstacle.stop();
  }, [history]);

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
        `calc(${obstacleCentre[0]} - ${galaxyPos[0]} - ${Math.sqrt(
          Math.pow(obstacleRadius, 2) - Math.pow(offset, 2)
        )}px)`
      );
    }
  }, [obstaclePos]);

  return (
    <>
      <Background imgSrc="/assets/img/gl-bg-1.jpg" draggable="false">
        <Galaxy position={galaxyPos} />
        {lineRotations.map((rotation) => (
          <Line
            key={rotation}
            start={galaxyPos}
            length="200px"
            rotation={rotation}
          />
        ))}
        <Line
          start={galaxyPos}
          length={lineLength}
          rotation={0}
          lineColor={[255, 255, 0]}
        />
        <Earth />
        <Obstacle
          showRing
          offset={obstaclePos}
          center={obstacleCentre}
          movementWidth={obstacleMovementWidth}
          size={obstacleRadius}
          imageSrc="/assets/img/gl-obstacle.svg"
        />
        <Slider
          center={obstacleCentre}
          width={350}
          axis="y"
          onValueUpdated={setObstaclePos}
          sliderSound={MoveObstacle}
          railThickness={0}
        />
        <TutorialHeader currentChapter={1} />
        <BottomLeft>
          <Viewer
            heading="Unless something gets in the way."
            subheading="Try moving the obstacle."
            labelSize={labelSize}
            labelFontSize={labelFontSize}
          >
            <Galaxy position={["50%", "50%"]} scale={0.4} />
            <Obstacle
              center={["50%", "50%"]}
              offset={obstaclePos}
              movementWidth={320}
              size={obstacleRadius}
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
