import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import {
  DarkMatter,
  getLensEffectData,
  getTransformMatrixForDistortion,
} from "../../util/distort";
import { GameManagerContext, ScanResult } from "./game-manager-context";
import { Routes } from "../../routes";

export type GameManagerProps = {
  initialFunding: number;
  defaultGridSize: [number, number];
  defaultDarkMatterCount: number;
  defaultDarkMatterMassRange: [number, number];
  scanCost: number;
  foundDarkMatterReward: number;
  darkMatterOverride?: DarkMatter[];
  children: ReactNode;
};

type GridSquareScanState = {
  scanResult?: ScanResult;
};

// Old way to distribute dark matter in game (ends up with dark matter more spread out than a uniformly random sampling of cells)

{
  /*const getRandomisedDarkMatter = (gridSize: [number, number], darkMatterCount: number, darkMatterMass: [number, number]) => {
  let dmIndex = 0
  const darkMatter: DarkMatter[] = []
  for (dmIndex; dmIndex < darkMatterCount; dmIndex += 1) {
    let currentDistance = 0
    let currentPoint: [number, number] = [0,0]
    for (let sampleIndex = 0; sampleIndex < 10; sampleIndex++) {
      const newPoint: [number, number] = [
        Math.floor(Math.random() * gridSize[0]),
        Math.floor(Math.random() * gridSize[1])
      ]
      let minDistance = -1
      darkMatter.forEach((existingDarkMatter) => {
        const sqDistance = Math.pow(newPoint[0] - existingDarkMatter.position[0], 2) + Math.pow(newPoint[1] - existingDarkMatter.position[1], 2)
        if (minDistance < 0 || sqDistance < minDistance) {
          minDistance = sqDistance
        }
      })

      if (minDistance < 0 || minDistance > currentDistance) {
        currentDistance = minDistance
        currentPoint = newPoint
      }
    }

    darkMatter.push({
      position: currentPoint,
      mass: darkMatterMass[0] + (Math.random() * (darkMatterMass[1] - darkMatterMass[0]))
    })
  }

  return darkMatter
} */
}

// Distribute dark matter randomly with each cell having an equal chance to have dark matter in it

const getRandomisedDarkMatter = (
  gridSize: [number, number],
  darkMatterCount: number,
  darkMatterMass: [number, number]
) => {
  let dmIndex = 0;
  const darkMatter: DarkMatter[] = [];

  const totalGridPoints = gridSize[0] * gridSize[1];
  let chosenPoints = new Set<number>();

  while (dmIndex < darkMatterCount) {
    let randomPoint = Math.floor(Math.random() * totalGridPoints);

    if (chosenPoints.has(randomPoint)) continue; // Skip if point is already chosen

    chosenPoints.add(randomPoint);
    const gridX = Math.floor(randomPoint / gridSize[1]);
    const gridY = randomPoint % gridSize[1];

    darkMatter.push({
      position: [gridX, gridY],
      mass:
        darkMatterMass[0] +
        Math.random() * (darkMatterMass[1] - darkMatterMass[0]),
    });

    dmIndex++;
  }

  return darkMatter;
};

const getNewGameGrid = (gridSize: [number, number]): GridSquareScanState[] => {
  const totalSize = gridSize[0] * gridSize[1];
  const newGrid: GridSquareScanState[] = [];
  for (let i = 0; i < totalSize; i += 1) {
    newGrid.push({});
  }

  return newGrid;
};

export const GameManager = ({
  initialFunding,
  defaultGridSize,
  defaultDarkMatterCount,
  defaultDarkMatterMassRange,
  scanCost,
  foundDarkMatterReward,
  darkMatterOverride,
  children,
}: GameManagerProps) => {
  const [gridSize, setGridSize] = useState<[number, number]>(defaultGridSize);
  const [darkMatter, setDarkMatter] = useState<DarkMatter[]>([]);
  const [funding, setFunding] = useState(initialFunding);
  const [darkMatterCount, setDarkMatterCount] = useState(1);
  const [darkMatterFound, setDarkMatterFound] = useState(0);
  const [darkMatterMassRange, setDarkMatterMassRange] = useState<
    [number, number]
  >(defaultDarkMatterMassRange);
  const gameGrid = useRef<GridSquareScanState[]>([]);
  const gameOver = useRef<boolean>(false);

  const scanGridSquare = useCallback(
    (pos: [number, number]): ScanResult => {
      const gridIndex = pos[0] + pos[1] * gridSize[0];
      if (gridIndex >= gameGrid.current.length) {
        throw new Error("Out of bounds");
      }

      const prevScanResult = gameGrid.current[gridIndex].scanResult;
      if (prevScanResult) {
        console.log("[Game Manager] Previous scan exists, returning that");
        return prevScanResult;
      }

      const scanResult: ScanResult = {};
      darkMatter.forEach((dm) => {
        if (dm.position[0] === pos[0] && dm.position[1] === pos[1]) {
          scanResult.hasDarkMatter = true;
        }
      });

      if (scanResult.hasDarkMatter) {
        console.log("[Game Manager] Scan found dark matter");
        gameGrid.current[gridIndex].scanResult = scanResult;
        setFunding((prevValue) => {
          return prevValue + foundDarkMatterReward;
        });
        setDarkMatterFound((val) => val + 1);
        return scanResult;
      }

      console.log("[Game Manager] Scan found no dark matter");
      scanResult.distortion = getTransformMatrixForDistortion(
        getLensEffectData(darkMatter, pos)
      );
      gameGrid.current[gridIndex].scanResult = scanResult;
      setFunding((prevValue) => {
        return prevValue - scanCost;
      });

      return scanResult;
    },
    [darkMatter, scanCost, foundDarkMatterReward, gridSize]
  );

  const revealGridSquare = useCallback(
    (pos: [number, number]): ScanResult | undefined => {
      if (!gameOver.current) {
        // forbid reveal until all dark matter found
        return undefined;
      }

      const scanResult: ScanResult = {};
      darkMatter.forEach((dm) => {
        if (dm.position[0] === pos[0] && dm.position[1] === pos[1]) {
          scanResult.hasDarkMatter = true;
        }
      });

      if (scanResult.hasDarkMatter) {
        return scanResult;
      }

      scanResult.distortion = getTransformMatrixForDistortion(
        getLensEffectData(darkMatter, pos)
      );
      return scanResult;
    },
    [darkMatter]
  );

  const getEncodedUrl = useCallback(() => {
    if (darkMatter.length > 0) {
      const exportData = {
        gridSize,
        darkMatter,
      };
      // encode data as base64 as a quick and easy way to make it not immediately readable
      const packet = btoa(JSON.stringify(exportData));
      if (
        window.location.ancestorOrigins &&
        window.location.ancestorOrigins.length > 0
      ) {
        console.log(
          `Ancestor origins, probably framed. Getting top level url: ${
            window.location.ancestorOrigins[
              window.location.ancestorOrigins.length - 1
            ]
          }`
        );
        const url = new URL(
          window.location.ancestorOrigins[
            window.location.ancestorOrigins.length - 1
          ]
        );
        url.searchParams.set("game", packet);
        return url.toString();
      } else {
        console.log(
          `Creating base url from route: ${Routes.Game}/custom and host: ${window.location.origin}`
        );
        const url = new URL(`${Routes.Game}/custom`, window.location.origin);
        url.searchParams.set("game", packet);
        return url.toString();
      }
    }

    return null;
  }, [gridSize, darkMatter]);

  useEffect(() => {
    setFunding(initialFunding);
  }, [initialFunding]);

  useEffect(() => {
    setDarkMatterCount(defaultDarkMatterCount);
  }, [defaultDarkMatterCount]);

  useEffect(() => {
    setGridSize(defaultGridSize);
  }, [defaultGridSize]);

  useEffect(() => {
    setDarkMatterMassRange(defaultDarkMatterMassRange);
  }, [defaultDarkMatterMassRange]);

  useEffect(() => {
    if (darkMatterOverride) {
      setDarkMatter(darkMatterOverride);
    } else {
      setDarkMatter(
        getRandomisedDarkMatter(gridSize, darkMatterCount, darkMatterMassRange)
      );
    }

    gameGrid.current = getNewGameGrid(gridSize);
  }, [gridSize, darkMatterCount, darkMatterMassRange, darkMatterOverride]);

  useEffect(() => {
    gameOver.current = darkMatterFound === darkMatterCount;
  }, [darkMatterFound, darkMatterCount]);

  return (
    <GameManagerContext.Provider
      value={{
        funding,
        darkMatterRemaining: darkMatterCount - darkMatterFound,
        scanGridSquare,
        revealGridSquare,
        getEncodedUrl,
      }}
    >
      {children}
    </GameManagerContext.Provider>
  );
};
