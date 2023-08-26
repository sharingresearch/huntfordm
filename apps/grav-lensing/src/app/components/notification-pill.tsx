import styled from "@emotion/styled";
import { useState, useRef, useEffect } from "react";

export interface NotificationPillProps {
  text?: string;
  bgCol?: string | number;
  textCol?: string | number;
  duration?: number;
  fadeTime?: number;
  position?: [number, number];
  padding?: [number, number];
  borderRadius?: number;
  fadeoutCallback?: () => void;
}

export interface NotificationPillStyleProps {
  bgCol: string | number;
  textCol: string | number;
  position: [number, number];
  padding: [number, number];
  borderRadius: number;
  doFade: boolean;
  fadeTime: number;
}

const NotificationPillDiv = styled.div<NotificationPillStyleProps>`
  position: absolute;
  transform: translate(-50%, -50%);
  left: ${(props) => props.position[0] * 100}%;
  top: ${(props) => props.position[1] * 100}%;
  background: ${(props) => props.bgCol};
  color: ${(props) => props.textCol};
  padding-left: ${(props) => props.padding[0]}px;
  padding-right: ${(props) => props.padding[0]}px;
  padding-top: ${(props) => props.padding[1]}px;
  padding-bottom: ${(props) => props.padding[1]}px;
  border-radius: ${(props) => props.borderRadius}rem;
  z-index: 100;
  font-size: 1.5em;
  ${(props) =>
    props.doFade
      ? `
  transition: opacity ${props.fadeTime}s ease;
  opacity: 0;`
      : "opacity: 1"}
`;

/** Displays a pill container to display notification text for a set of amount of time.
 * @param text (string) Text displayed on pill. Default: "Default Notification".
 * @param bgCol (string or number) Value of background colour to be used. Default: "black".
 * @param textCol (string or number) Value of text colour to be used. Default: "white".
 * @param duration (number) Time (in seconds) before pill starts fading away. Default: 1.
 * @param fadeTime (number) Duration (in seconds) of fade. Default: 1.
 * @param position ([number, number]) Global position (as normalised values) to display on screen. Default: [0.5, 0.5].
 * @param padding ([number, number]) X and Y padding (in px) for pill box. Default: [4, 4].
 * @param borderRadius (number) Border radius (in rem) for pill box. Default: 3.
 * @param fadeoutCallback (() => void) Callback function to call once pill has faded out (e.g. to hide this component). Default: undefined.
 */
export const NotificationPill = ({
  text = "Default Notification",
  bgCol = "black",
  textCol = "white",
  duration = 1,
  fadeTime = 1,
  position = [0.5, 0.5],
  padding = [15, 10],
  borderRadius = 3,
  fadeoutCallback,
}: NotificationPillProps) => {
  const [doFade, setDoFade] = useState(false); // When to start the fade-out.

  useEffect(() => {
    // Start fading after duration elapses.
    setTimeout(() => {
      // Start fading and hide element once faded out.
      setDoFade(true);
      setTimeout(() => {
        if (fadeoutCallback) fadeoutCallback();
        setDoFade(false);
      }, fadeTime * 1000);
    }, duration * 1000);
  }, [duration, fadeTime, fadeoutCallback]);

  return (
    <NotificationPillDiv
      id="notification"
      bgCol={bgCol}
      textCol={textCol}
      position={position}
      padding={padding}
      borderRadius={borderRadius}
      doFade={doFade}
      fadeTime={fadeTime}
    >
      {text}
    </NotificationPillDiv>
  );
};
