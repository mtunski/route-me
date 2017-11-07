import React from "react"
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { MuiThemeProvider, createMuiTheme } from 'material-ui'
import { teal } from 'material-ui/colors';

import configureStore from './lib/redux/configureStore'

import RealtimeManager from 'realtime/components/RealtimeManager'
import NotificationsManager from 'notifications/components/NotificationsManager'

import PageNotFound from "./pages/PageNotFound"
import MapPage from "./pages/MapPage"
import AboutPage from "./pages/AboutPage"

import "./App.css"

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: teal,
  },
})

const App = (props, railsContext) =>
  <Provider store={configureStore()}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MapPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
      <RealtimeManager />
      <NotificationsManager />
    </MuiThemeProvider>
  </Provider>

export default App
