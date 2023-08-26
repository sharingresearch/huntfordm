import { Howl } from "howler";
import { ReactNode, useCallback, useRef, useState } from "react";
import { AmbientContext } from "./ambient-context";

export type AmbientProviderProps = {
  defaultCrossfadeDuration?: number;
  ambientVolume?: number;
  children?: ReactNode;
};

type AmbientAudioInstance = {
  audio?: Howl;
  id?: number;
};

export const AmbientProvider = ({
  defaultCrossfadeDuration,
  ambientVolume = 0.5,
  children,
}: AmbientProviderProps) => {
  const [currentAmbient, setCurrentAmbient] = useState<AmbientAudioInstance>(
    {}
  );

  const setAmbient = useCallback(
    (ambientAudio?: Howl, crossfade?: number) => {
      const fadeDuration = crossfade || defaultCrossfadeDuration;
      setCurrentAmbient((prev) => {
        if (prev.audio === ambientAudio) {
          return prev;
        }

        if (prev.audio) {
          const prevId = prev.id;
          if (fadeDuration) {
            const fadeout = prev.audio;
            fadeout.fade(ambientVolume, 0, fadeDuration, prevId);
            fadeout.once(
              "fade",
              () => {
                fadeout.stop(prevId);
              },
              prevId
            );
          } else {
            prev.audio.stop(prevId);
          }
        }

        if (ambientAudio) {
          const newId = ambientAudio.play();
          ambientAudio.loop(true, newId);
          if (fadeDuration) {
            ambientAudio.fade(0, ambientVolume, fadeDuration, newId);
          }
          const returnValue: AmbientAudioInstance = {
            audio: ambientAudio,
            id: newId,
          };
          return returnValue;
        } else {
          return {};
        }
      });
    },
    [defaultCrossfadeDuration, ambientVolume]
  );

  return (
    <AmbientContext.Provider value={{ setAmbient }}>
      {children}
    </AmbientContext.Provider>
  );
};
