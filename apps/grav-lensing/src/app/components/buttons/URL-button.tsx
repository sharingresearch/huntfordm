import { ReactComponent as ButtonLink } from "../svg/gl-circle-link.svg";
import styled from "@emotion/styled";
import { useGetGameUrl } from "../game/game-manager-context";
import { useCallback } from "react";
import { ClickSound } from "../audio/sound";

export interface URLButtonProps {
  onClick?: () => void;
}

const ButtonPill = styled.div`
  border-radius: 3em;
  height: 2.5em;
  background-color: #000A;
  font-size: 25px;
  display: flex;
  flex-direction:row
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align:center;
  cursor: pointer;
  padding: 0.4em 0.9em;
  padding-left:1.5em;
  color: white;
  font-weight: 600;
  margin: 20px;
  box-shadow: rgba(255,255,255,0.4) 0 0 10px;
  &:hover {
    box-shadow: 0 0 10px;
  }
`;
export const URLButton = ({ onClick }: URLButtonProps) => {
  const getUrl = useGetGameUrl();

  const handleClick = useCallback(() => {
    // Play click sound and copy URL to clipboard.
    ClickSound.play();
    const url = getUrl();
    if (url) {
      navigator.clipboard
        .writeText(url)
        .catch((e) => {
          console.error(`Error copying to clipboard: ${e}`);
        })
        .then(() => {
          console.log(`Successfully copied url to clipboard: ${url}`);
        });
    }
    // Handle onClick callback, such as for displaying a notification.
    if (onClick) onClick();
  }, [getUrl, onClick]);

  return (
    <ButtonPill onClick={handleClick}>
      COPY URL FOR THIS UNIVERSE
      <ButtonLink style={{ height: "1em", paddingLeft: "0.5em" }} />
    </ButtonPill>
  );
};
