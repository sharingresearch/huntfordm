import { GridContainer } from "../grid-square/grid";
import { StackButton } from "./stack-button";
import { StackButtonProps } from "./stack-button";
import { LayoutProps } from "../grid-square/grid";
import { useState, useEffect } from "react";

type GridStackProps = {
  mass: number;
  scanStackCallBack: (position: [number, number]) => boolean;
  giveUpClicked?: boolean;
};
type StackLensProp = {
  position: [number, number];
  lensPosition: [number, number];
} & StackButtonProps;

export const GridStack = (props: LayoutProps & GridStackProps) => {
  const [buttonList, setButtonList] = useState<StackLensProp[]>([]);
  useEffect(() => {
    const buttonPropsFirst: StackLensProp[] = [];
    const buttonPropsSecond: StackLensProp[] = [];
    const buttonPropsThird: StackLensProp[] = [];
    const buttonPropsForth: StackLensProp[] = [];
    const buttonPropsFifth: StackLensProp[] = [];

    for (let col = 0; col < props.columns; col += 1) {
      const row = 0;
      buttonPropsFirst.push({
        rows: row,
        columns: col,
        position: [0.5, 0.5],
        lensPosition: [0.7 - col * 0.2, 0.2],
        onClick: () => {
          return props.scanStackCallBack([row, col]);
        },
      });
    }
    buttonPropsSecond.push({
      rows: 1,
      columns: 0,
      position: [0.5, 0.5],
      lensPosition: [0.9, 0.5],
      onClick: () => {
        return props.scanStackCallBack([1, 0]);
      },
    });
    for (let col = 1; col < props.columns; col += 1) {
      const row = 1;
      buttonPropsSecond.push({
        rows: row,
        columns: col,
        position: [0.5, 0.5],
        lensPosition: [0.8 + col * 0.1, 0.5],
        onClick: () => {
          return props.scanStackCallBack([row, col]);
        },
      });
    }
    for (let col = 0; col < props.columns; col += 1) {
      const row = 2;
      buttonPropsThird.push({
        rows: 2,
        columns: col,
        position: [0.5, 0.5],
        lensPosition: [0.3 + col * 0.2, 0.2],
        onClick: () => {
          return props.scanStackCallBack([row, col]);
        },
      });
    }
    for (let col = 0; col < props.columns; col += 1) {
      const row = 3;
      buttonPropsForth.push({
        rows: row,
        columns: col,
        position: [0.5, 0.5],
        lensPosition: [0.4 + col * 0.1, -0.1],
        onClick: () => {
          return props.scanStackCallBack([row, col]);
        },
      });
    }
    for (let col = 0; col < props.columns; col += 1) {
      const row = 4;
      buttonPropsFifth.push({
        rows: row,
        columns: col,
        position: [0.8, 0.8],
        lensPosition: [0.7 + col * 0.1, 0.1],
        onClick: () => {
          return props.scanStackCallBack([row, col]);
        },
      });
    }

    setButtonList([
      ...buttonPropsFirst,
      ...buttonPropsSecond,
      ...buttonPropsThird,
      ...buttonPropsForth,
      ...buttonPropsFifth,
    ]);
  }, []);

  return (
    <GridContainer columns={props.columns} rows={props.rows}>
      {buttonList.map((e, index) =>
        e.rows === 1 && e.columns === 1 ? (
          <StackButton
            giveUpClicked={props.giveUpClicked}
            key={index}
            layers={[]}
            position={[0.5, 0.5]}
            lenses={[{ position: [0, 2], mass: 0 }]}
            onClick={e.onClick}
          />
        ) : e.rows === 1 && e.columns === 2 ? (
          <StackButton
            key={index}
            layers={[]}
            position={[0.5, 0.5]}
            lenses={[{ position: [0, 2], mass: 0 }]}
            onClick={e.onClick}
          />
        ) : e.rows === 3 && e.columns === 2 ? (
          <StackButton
            key={index}
            layers={[]}
            position={[0.5, 0.5]}
            lenses={[{ position: [0, 2], mass: 0 }]}
            onClick={e.onClick}
          />
        ) : e.rows === 2 && e.columns === 3 ? (
          <StackButton
            key={index}
            layers={[]}
            position={[0.5, 0.5]}
            lenses={[{ position: [0, 2], mass: 0 }]}
            onClick={e.onClick}
          />
        ) : (
          <StackButton
            key={index}
            layers={["assets/img/stack/gl-stack-flattened.png"]}
            position={e.position}
            lenses={[{ position: e.lensPosition, mass: props.mass }]}
            onClick={e.onClick}
          />
        )
      )}
    </GridContainer>
  );
};
