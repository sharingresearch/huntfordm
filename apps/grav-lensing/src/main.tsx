import React, { StrictMode, Suspense } from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import amplitude from "amplitude-js";
import { environment } from "./environments/environment";

import "./app.css";
import { LoadingPage } from "./app/pages/loading-page";
const App = React.lazy(() => import("./app/app"));

amplitude.getInstance().init(environment.amplitudeApiKey, undefined, {
  includeReferrer: true,
  disableCookies: true
});

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
  document.getElementById("root")
);
