import { Howl } from "howler";
import { createContext, useContext } from "react";

export type AmbientContextType = {
  setAmbient: (audio?: Howl, fade?: number) => void;
};

const defaultState: AmbientContextType = {
  setAmbient: () => {
    throw new Error("Not Implemented");
  },
};

export const AmbientContext = createContext<AmbientContextType>(defaultState);

export const useAmbientFn = () => {
  const context = useContext(AmbientContext);
  return context.setAmbient;
};
