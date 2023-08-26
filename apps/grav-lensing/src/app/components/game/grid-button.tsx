import styled from "@emotion/styled";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { flattenedStackLayers } from "../../config";
import { ScanResult } from "./game-manager-context";
import { StackResult } from "../stack/stack-result";
import { DarkMatterFound } from "../audio/sound";
import { NoDarkMatterFound } from "../audio/sound";

export type GridButtonProps = {
  onClick: (result?: ScanResult) => ScanResult;
  onReveal: () => ScanResult | undefined;
  displayGrid: boolean;
};

type ButtonProps = {
  border: string;
};

const StyledButton = styled.button<ButtonProps>`
  border: ${(props) => props.border};
  background: transparent;
  cursor: default;
  overflow: hidden;
  outline: none;
  position: relative;
  &:hover {
    border: solid yellow;
  }
  justify-content: center;
  padding: 0px;
  margin: 0px;
`;

export const DotDiv = styled.div`
  height: 12px;
  width: 12px;
  margin: auto;
  border-radius: 100%;
  background: yellow;
  position: flex;
  justify-content: center;
`;

const Transparent = styled.div`
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const defaultBorder = "1px solid rgba(108, 122, 137, 0.7)";

export const GridButton = ({
  onClick,
  onReveal,
  displayGrid,
}: GridButtonProps) => {
  const [buttonContent, setButtonContent] = useState<ReactNode>();
  const [scanResult, setScanResult] = useState<ScanResult>();
  const [border, setBorder] = useState(defaultBorder);

  const handleScanClick = useCallback(() => {
    const newResult = onClick(scanResult);
    setScanResult(newResult);
  }, [onClick, scanResult]);

  useEffect(() => {
    if (displayGrid) {
      const newResult = onReveal();
      setScanResult(newResult);
    }
  }, [displayGrid, onReveal]);

  useEffect(() => {
    if (scanResult && scanResult.hasDarkMatter) {
      setButtonContent(<DotDiv />);
      setBorder("1px solid yellow");
      if (!displayGrid) {
        DarkMatterFound.play();
      }
    } else if (scanResult && scanResult.distortion) {
      setButtonContent(
        <StackResult
          matrix={scanResult.distortion}
          layers={flattenedStackLayers}
          layerOpacity={0.8}
        />
      );
      setBorder("1px solid white");
      if (!displayGrid) {
        NoDarkMatterFound.play();
      }
    } else {
      setButtonContent(<Transparent />);
      setBorder(defaultBorder);
    }
  }, [scanResult, displayGrid]);

  return (
    <StyledButton border={border} onClick={handleScanClick}>
      {buttonContent}
    </StyledButton>
  );
};

export default GridButton;
