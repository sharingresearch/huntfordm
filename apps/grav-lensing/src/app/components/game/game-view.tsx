import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import { TopRight } from "../top-right";
import Grid from "../grid-square/grid";
import StackModal from "../grid-square/stack-modal";
import {
  ScanResult,
  useGameDarkMatterRemaining,
  useGameFunding,
  useGameScanGridSquare,
  useGameRevealGridSquare,
} from "./game-manager-context";
import { Routes } from "../../routes";
import { BottomCenter } from "../bottom-center";
import { GameEndScreen } from "../grid-square/game-end-screen";
import amplitude from "amplitude-js";

import { GameAmbience, TutorialAmbience } from "../audio/sound";
import { EndWithSurplus } from "../audio/sound";
import { EndWithDeficit } from "../audio/sound";

import { useAmbientFn } from "../audio/ambient-context";
import { ClickSound } from "../audio/sound";
import { BottomRight } from "../bottom-right";
import { HelpButton } from "../buttons/help-button";

const BottomText = styled.div`
  color: white;
`;

const Text = styled.div`
  color: white;
  width: 180px;
  font-size: 1.1em;
  justify-content: center;
  text-align: left;
  padding-top: 0.15em;
  padding-left: 0.5em;
`;

const Funding = styled.div`
  color: yellow;
  font-size: 2.8em;
  font-weight: 600;
`;

const Amount = styled.div`
  color: yellow;
  font-size: 2.8em;
  font-weight: 600;
  position: relative;
  justify-content: center;
  text-align: center;
`;

const GameViewContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const GameGridContainer = styled.div`
  margin: auto;
  margin-top: 70px;
  width: 95vw;
  height: calc(100% - 101px);
`;

type GameViewProps = {
  cols: number;
  rows: number;
  difficulty: string;
};

export const GameView = ({ cols, rows, difficulty }: GameViewProps) => {
  const setAmbient = useAmbientFn();

  const history = useHistory();
  const funding = useGameFunding();
  const darkMatterRemaining = useGameDarkMatterRemaining();
  const scanGridSquare = useGameScanGridSquare();
  const revealGridSquare = useGameRevealGridSquare();
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [displayScanResult, setDisplayScanResult] = useState<ScanResult>();
  const [firstClick, setFirstClick] = useState(true);
  const [stackPos, setStackPos] = useState<[number, number]>([10, 10]);

  useEffect(() => {
    setShowEndScreen(darkMatterRemaining === 0);
  }, [darkMatterRemaining]);

  useEffect(() => {
    if (showEndScreen) {
      if (funding > 0) {
        console.log("[Game View] Setting ambient to End With Surplus");
        setAmbient(EndWithSurplus, 3000);
      } else {
        console.log("[Game View] Setting ambient to End With Deficit");
        setAmbient(EndWithDeficit, 3000);
      }
    } else {
      console.log("[Game View] Setting ambient to Game Ambience");
      setAmbient(GameAmbience, 3000);
    }
  }, [showEndScreen, funding, setAmbient]);

  useEffect(() => {
    if (showEndScreen) {
      amplitude
        .getInstance()
        .logEvent("Player completed game", { funding, difficulty });
    }
  }, [showEndScreen, funding, difficulty]);

  const handleScanGridClick = (
    position: [number, number],
    existingResult?: ScanResult
  ) => {
    setFirstClick(false);
    ClickSound.play();

    if (existingResult) {
      setDisplayScanResult(existingResult);
      setStackPos(position);
      return existingResult;
    }

    const scanResult = scanGridSquare(position);
    setDisplayScanResult(scanResult);
    setStackPos(position);
    return scanResult;
  };

  const handleRevealGrid = useCallback(
    (position: [number, number]) => {
      return revealGridSquare(position);
    },
    [revealGridSquare]
  );

  const handleBack = useCallback(() => {
    ClickSound.play();
    amplitude.getInstance().logEvent("Click on Back To Tutorial");
    setAmbient(TutorialAmbience, 3000);
    history.push("/");
  }, [history, setAmbient]);

  const handleReplay = useCallback(() => {
    ClickSound.play();
    amplitude.getInstance().logEvent("Click on Play Again");
    history.push(Routes.Game);
  }, [history]);

  return (
    <GameViewContainer>
      <TopRight>
        <Funding>${funding.toLocaleString()}</Funding>
        <Text>
          FUNDING
          <br />
          REMAINING
        </Text>
        <Amount>{darkMatterRemaining}</Amount>
        <Text>
          DARK MATTER
          <br />
          CLUMPS REMAINING
        </Text>
      </TopRight>
      <GameGridContainer>
        <Grid
          columns={cols}
          rows={rows}
          scanGridCallback={handleScanGridClick}
          revealGridCallback={handleRevealGrid}
          displayAll={showEndScreen}
        />
      </GameGridContainer>
      <BottomCenter width="60%">
        <BottomText>
          {firstClick && (
            <h2
              style={{
                fontSize: "2.3em",
                fontWeight: 600,
                lineHeight: "1.35em",
                paddingBottom: "2em",
              }}
            >
              Click on squares in the sky to conduct a scan.
            </h2>
          )}
        </BottomText>
      </BottomCenter>
      <BottomRight>{showEndScreen && <HelpButton />}</BottomRight>
      <GameEndScreen
        open={showEndScreen}
        onClose={() => setShowEndScreen(false)}
        isMore={funding > 50000}
        isLess={funding < 0}
        back={handleBack}
        replay={handleReplay}
        gameLevel={difficulty}
      >
        ${funding.toLocaleString()}
      </GameEndScreen>
      {darkMatterRemaining >= 1 ? (
        <StackModal
          open={!!displayScanResult}
          onClose={() => {
            setDisplayScanResult(undefined);
          }}
          scanResult={displayScanResult}
          position={stackPos}
          boardSize={[cols, rows]}
        />
      ) : null}
    </GameViewContainer>
  );
};

export default GameView;
