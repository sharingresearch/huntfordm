import styled from "@emotion/styled";
import { Route, Switch } from "react-router-dom";
import { DarkMatterPage } from "./pages/dark-matter-page";
import { DirectPage } from "./pages/direct-page";
import { InteractiveLensPage } from "./pages/interactive-lens-page";
import { SLRarePage } from "./pages/slrare-page";
import { MassPage } from "./pages/mass-page";
import { ObstaclePage } from "./pages/obstacle-page";
import { StarPage } from "./pages/star-page";
// import { StrangeGalaxiesPage } from './pages/strange-galaxies-page'
import { GameStartPage } from "./pages/game-start-page";
import { TitlePage } from "./pages/title-page";
// import { StackedGalaxiesPage } from './pages/stacked-galaxies-page'
import { StackedGalaxiesPage1 } from "./pages/stacked1-galaxies1";
import { StackedGalaxiesPage2 } from "./pages/stacked2-galaxies2";
import { StackedGalaxiesPage3 } from "./pages/stacked3-galaxies3";
import { Routes } from "./routes";
import Game from "./game";
import { EndOfTutPage } from "./pages/end-of-tutorial-page";
import { AmbientProvider } from "./components/audio/ambient-provider";
import { ImagePreloader } from "./components/image-preloader";
import { preloadImages } from "./config";
import { NewDarkMatterPage } from "./pages/newdark-matterpage";
import { StackedGalaxiesLoaderPage } from "./pages/stackedVideoInitial";

const StyledApp = styled.div`
  font-family: canada-type-gibson, sans-serif;
  min-width: 300px;
  max-width: 600px;
  margin: 50px auto;

  .gutter-left {
    margin-left: 9px;
  }

  .col-span-2 {
    grid-column: span 2;
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  header {
    background-color: #143055;
    color: white;
    padding: 5px;
    border-radius: 3px;
  }

  main {
    padding: 0 36px;
  }

  p {
    text-align: left;
    margin: 0;
  }

  h1 {
    text-align: left;
    margin: 0;
    font-size: 24px;
  }

  h2 {
    text-align: center;
    font-size: 20px;
    margin: 40px 0 10px 0;
  }
`;

export function App() {
  return (
    <StyledApp>
      <ImagePreloader images={preloadImages}>
        <AmbientProvider defaultCrossfadeDuration={1500} ambientVolume={0.1}>
          <Switch>
            <Route path="/title" component={TitlePage} />
            <Route path="/tutorial/star" component={StarPage} />
            <Route path="/tutorial/direct" component={DirectPage} />
            <Route path="/tutorial/obstacle" component={ObstaclePage} />
            <Route path="/tutorial/mass" component={MassPage} />
            <Route path="/tutorial/darkmatter" component={DarkMatterPage} />
            <Route
              path="/tutorial/newdarkmatter"
              component={NewDarkMatterPage}
            />
            <Route
              path="/tutorial/interactivelens"
              component={InteractiveLensPage}
            />
            <Route path="/tutorial/slrare" component={SLRarePage} />
            {/* <Route path='/tutorial/strangegalaxies' component={StrangeGalaxiesPage} /> // page no longer used */}
            <Route path={`${Routes.Game}/:level`} component={Game} />
            <Route
              path="/tutorial/stackedgalaxiesLoader"
              component={StackedGalaxiesLoaderPage}
            />
            {/* <Route path='/tutorial/stackedgalaxies' component={StackedGalaxiesPage} /> //page no longer used */}
            <Route
              path="/tutorial/stackedgalaxies1"
              component={StackedGalaxiesPage1}
            />
            <Route
              path="/tutorial/stackedgalaxies2"
              component={StackedGalaxiesPage2}
            />
            <Route
              path="/tutorial/stackedgalaxies3"
              component={StackedGalaxiesPage3}
            />
            <Route path={Routes.Game} component={GameStartPage} />
            <Route path="/tutorial/ending" component={EndOfTutPage} />
            <Route path="/" component={TitlePage} />
          </Switch>
        </AmbientProvider>
      </ImagePreloader>
    </StyledApp>
  );
}

export default App;
