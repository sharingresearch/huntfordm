import { useCallback } from "react";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Background } from "./components/background";
import { GameManager, GameManagerProps } from "./components/game/game-manager";
import GameView from "./components/game/game-view";
import { HeaderLogo } from "./components/header-logo";
import { TopLeft } from "./components/top-left";
import { DarkMatter } from "./util/distort";

const defaultProps: Omit<GameManagerProps, "children" | "defaultGridSize"> = {
  initialFunding: 50000,
  defaultDarkMatterCount: 2,
  defaultDarkMatterMassRange: [0.2, 0.3],
  scanCost: 5000,
  foundDarkMatterReward: 10000,
};

export const Game = (props: RouteComponentProps<{ level: string }>) => {
  const [gridSize, setGridSize] = useState<[number, number]>([5, 5]);
  const [darkMatterCount, setDarkMatterCount] = useState<number>(
    defaultProps.defaultDarkMatterCount
  );
  const [darkMatterMassRange, setDarkMatterMassRange] = useState<
    [number, number]
  >(defaultProps.defaultDarkMatterMassRange);
  const [darkMatterOverride, setDarkMarkMatterOverride] =
    useState<DarkMatter[]>();
  const [initialFunding, setInitialFunding] = useState<number>(
    defaultProps.initialFunding
  );
  const [scanCost, setScanCost] = useState<number>(defaultProps.scanCost);
  const [foundDarkmatterReward, setFoundDarkMatterReward] = useState<number>(
    defaultProps.foundDarkMatterReward
  );
  const level = props.match.params.level;

  const setCustomGame = useCallback((gameDataJson: string): boolean => {
    const gameData = JSON.parse(gameDataJson);
    if (
      typeof gameData.gridSize === "object" &&
      typeof gameData.gridSize[0] === "number"
    ) {
      setGridSize([gameData.gridSize[0], gameData.gridSize[1]]);
    } else {
      return false;
    }

    if (
      typeof gameData.darkMatter === "object" &&
      typeof gameData.darkMatter[0] === "object"
    ) {
      setDarkMarkMatterOverride(gameData.darkMatter);
      setDarkMatterCount(gameData.darkMatter.length);
    } else {
      return false;
    }

    return true;
  }, []);

  useEffect(() => {
    if (level === "custom") {
      const data = new URLSearchParams(props.location.search);
      const gameDataEncoded = data.get("game");
      if (gameDataEncoded) {
        const gameData = atob(gameDataEncoded);
        setCustomGame(gameData);
      }
    } else if (level === "easy") {
      setGridSize([5, 5]);
      setDarkMatterCount(3);
      setDarkMatterMassRange([0.2, 0.3]);
    } else if (level === "medium") {
      setGridSize([10, 10]);
      setDarkMatterCount(10);
      setScanCost(4000);
      setDarkMatterMassRange([0.4, 0.6]);
    } else {
      setGridSize([18, 14]);
      setDarkMatterCount(25);
      setDarkMatterMassRange([0.6, 0.75]);
      setScanCost(3000);
    }
  }, [level, setCustomGame, props.location.search]);

  return (
    <Background imgSrc="/assets/img/star-background.jpg">
      <GameManager
        defaultGridSize={gridSize}
        defaultDarkMatterCount={darkMatterCount}
        defaultDarkMatterMassRange={darkMatterMassRange}
        initialFunding={initialFunding}
        scanCost={scanCost}
        foundDarkMatterReward={foundDarkmatterReward}
        darkMatterOverride={darkMatterOverride}
      >
        <GameView cols={gridSize[0]} rows={gridSize[1]} difficulty={level} />
      </GameManager>
      <TopLeft>
        <HeaderLogo />
      </TopLeft>
    </Background>
  );
};

export default Game;
