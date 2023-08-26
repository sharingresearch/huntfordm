import { createContext, useContext } from "react";
import { TransformMatrix } from "../../util/distort";

export type ScanResult = {
  hasDarkMatter?: boolean;
  distortion?: TransformMatrix;
};

export type GameManagerContextType = {
  funding: number;
  darkMatterRemaining: number;
  scanGridSquare: (pos: [x: number, y: number]) => ScanResult;
  revealGridSquare: (pos: [x: number, y: number]) => ScanResult | undefined;
  getEncodedUrl: () => string | null;
};

const defaultContext: GameManagerContextType = {
  funding: 0,
  darkMatterRemaining: 1,
  scanGridSquare: () => {
    throw new Error("Not Implemented");
  },
  revealGridSquare: () => {
    throw new Error("Not Implemented");
  },
  getEncodedUrl: () => {
    throw new Error("Not Implemented");
  },
};

export const GameManagerContext =
  createContext<GameManagerContextType>(defaultContext);

export const useGameManager = () => {
  const context = useContext(GameManagerContext);
  return context;
};

export const useGameFunding = () => {
  const context = useContext(GameManagerContext);
  return context.funding;
};

export const useGameDarkMatterRemaining = () => {
  const context = useContext(GameManagerContext);
  return context.darkMatterRemaining;
};

export const useGameScanGridSquare = () => {
  const context = useContext(GameManagerContext);
  return context.scanGridSquare;
};

export const useGameRevealGridSquare = () => {
  const context = useContext(GameManagerContext);
  return context.revealGridSquare;
};

export const useGetGameUrl = () => {
  const context = useContext(GameManagerContext);
  return context.getEncodedUrl;
};
