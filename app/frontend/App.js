import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import PageNotFound from "./pages/PageNotFound"
import MapPage from "./pages/MapPage"
import AboutPage from "./pages/AboutPage"

const App = (props, railsContext) =>
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={MapPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </BrowserRouter>

export default App
