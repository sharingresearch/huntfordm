import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { ScanResult } from "../game/game-manager-context";
import GridButton, { GridButtonProps } from "../game/grid-button";

export type LayoutProps = {
  columns: number;
  rows: number;
};

export type GridProps = {
  scanGridCallback: (
    position: [number, number],
    existingResult?: ScanResult
  ) => ScanResult;
  revealGridCallback: (position: [number, number]) => ScanResult | undefined;
  displayAll: boolean;
} & LayoutProps;

export const GridContainer = styled.div<LayoutProps>`
  height: 100%;
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(
    ${(props) => props.columns},
    ${(props) => 100 / props.columns}%
  );
  grid-template-rows: repeat(
    ${(props) => props.rows},
    ${(props) => 100 / props.rows}%
  );
  border: 1px solid rgba(108, 122, 137, 0.2);
`;

export const Grid = ({
  columns,
  rows,
  scanGridCallback,
  revealGridCallback,
  displayAll,
}: GridProps) => {
  const [buttonList, setButtonList] = useState<GridButtonProps[]>([]);
  useEffect(() => {
    const buttonProps: GridButtonProps[] = [];

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < columns; col += 1) {
        buttonProps.push({
          onClick: (existingResult) => {
            return scanGridCallback([col, row], existingResult);
          },
          onReveal: () => {
            return revealGridCallback([col, row]);
          },
          displayGrid: displayAll,
        });
      }
    }
    setButtonList(buttonProps);
  }, [columns, rows, scanGridCallback, revealGridCallback, displayAll]);

  return (
    <GridContainer columns={columns} rows={rows}>
      {buttonList.map((props, index) => (
        <GridButton key={index} {...props} />
      ))}
    </GridContainer>
  );
};

export default Grid;
