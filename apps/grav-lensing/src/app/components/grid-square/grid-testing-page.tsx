import { Background } from "../background";
import { TopLeft } from "../top-left";
import { HeaderLogo } from "../header-logo";
import GameView from "../game/game-view";
import { RouteComponentProps } from "react-router-dom";

export const GridPage = (props: RouteComponentProps<{ level: string }>) => {
  console.log(props.match.params.level);
  const difficulty = props.match.params.level;
  if (difficulty === "easy") {
    return (
      <Background imgSrc="/assets/img/gl-bg-1.jpg">
        <TopLeft>
          <HeaderLogo></HeaderLogo>
        </TopLeft>
        <GameView cols={5} rows={5} difficulty={difficulty} />
      </Background>
    );
  } else if (difficulty === "medium") {
    return (
      <Background imgSrc="/assets/img/gl-bg-1.jpg">
        <TopLeft>
          <HeaderLogo></HeaderLogo>
        </TopLeft>
        <GameView cols={10} rows={10} difficulty={difficulty} />
      </Background>
    );
  } else if (difficulty === "hard") {
    return (
      <Background imgSrc="/assets/img/gl-bg-1.jpg">
        <TopLeft>
          <HeaderLogo></HeaderLogo>
        </TopLeft>
        <GameView cols={18} rows={14} difficulty={difficulty} />
      </Background>
    );
  }
  return <div />;
};
