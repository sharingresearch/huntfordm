import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import PrimaryButton from "../buttons/primary-button";
import { ScanResult } from "../game/game-manager-context";
import { stackLayers } from "../../config";
import { ClickSound } from "../audio/sound";
import { UpdatedAnimatedModal } from "../stack/updated-animated-modal";

type StackProp = {
  open: boolean;
  onClose: () => void;
  scanResult?: ScanResult;
  position: [number, number];
  boardSize: [number, number];
};

const StackOverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  zindex: 1000;
`;
const ImageDiv = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  border: 1px solid white;
  border-radius: 50%;
  background: black;
  zindex: 1000;
  overflow: visible;
`;
const DarkMatterDiv = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  border: 1px solid white;
  border-radius: 50%;
  background: #000;
  zindex: 1000;
`;
const DotDiv = styled.div`
  height: 12px;
  width: 12px;
  margin: 50% auto 50%;
  border-radius: 100%;
  background: yellow;
  position: flex;
  zindex: 1000;
`;
const StackFooter = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 80%;
  left: 50%;
  width: 600px;
  height: 300px;
  padding-top: 80px;
  transform: translate(-50%, -50%);
  zindex: 1000;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  color: white;
`;
const FooterText = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  height: 50px;
  width: 600px;
  transform: translate(-50%, -50%);
  zindex: 1000;
  text-align: center;
  font-size: 1.8em;
  font-weight: 600;
  color: white;
`;

const DarkMatterText = styled.div`
  position: fixed;
  left: 50%;
  top: 40%;
  width: 70vw;
  transform: translate(-50%, -50%);
  zindex: 1000;
  text-align: center;
  font-size: 1.8em;
  font-weight: 600;
  color: yellow;
`;

export const StackModal = ({
  open,
  scanResult,
  onClose,
  position,
  boardSize,
}: StackProp) => {
  const [lenPos, setLenPos] = useState<[number, number]>();

  const [counter, setCounter] = useState(0);
  const handleClick1 = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    const winHeight = window.innerHeight - 101;
    const winWidth = window.innerHeight * 1.33;
    const gridWidth = winWidth / boardSize[0];
    const gridHeight = winHeight / boardSize[1];
    const boardMed = [winWidth / 2 / gridWidth, (winHeight * 0.4) / gridHeight];
    setLenPos([
      (position[0] + 0.5 - boardMed[0]) * gridWidth,
      (position[1] + 0.75 - boardMed[1]) * gridHeight,
    ]);
  }, [position, boardSize]);

  if (open === true && scanResult) {
    if (scanResult.hasDarkMatter) {
      return (
        <>
          <StackOverLay onClick={onClose} />
          <div onClick={onClose}>
            {/* <ImageDiv imgSrc = {'./assets/img/darkmatterbg.jpg'}></ImageDiv> */}
            <DarkMatterDiv>
              <DotDiv></DotDiv>
            </DarkMatterDiv>
            <StackFooter>
              <DarkMatterText>
                You've found a clump of Dark Matter!
              </DarkMatterText>
              <PrimaryButton
                onClick={() => {
                  ClickSound.play();
                  onClose();
                }}
              >
                NEXT
              </PrimaryButton>
            </StackFooter>
          </div>
        </>
      );
    }
    if (counter == 2) {
      return <></>;
    }
    return (
      <>
        <StackOverLay
          onClick={() => {
            onClose();
            handleClick1();
          }}
        />
        <div
          onClick={() => {
            onClose();
            handleClick1();
          }}
        >
          <ImageDiv>
            {scanResult.distortion && (
              <UpdatedAnimatedModal
                layers={stackLayers}
                duration={1}
                layerDuration={0.4}
                distort={scanResult.distortion}
                scale={0.5}
                // startPos = {[((position[0]-Math.floor(boardSize[0]/2))*70),((position[1]-Math.floor(boardSize[1]/2)+0.5)*50)]}
                startPos={lenPos}
              />
            )}
          </ImageDiv>
          <StackFooter>
            <FooterText>No Dark Matter to be found here</FooterText>
            <PrimaryButton
              fontSize={"1.2em"}
              width={"6em"}
              onClick={() => {
                ClickSound.play();
                onClose();
                handleClick1();
              }}
            >
              TRY AGAIN
            </PrimaryButton>
          </StackFooter>
        </div>
      </>
    );
  }
  return null;
};

export default StackModal;
