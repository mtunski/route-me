import React from 'react'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui'
import { teal } from 'material-ui/colors';

import configureStore from './redux/configureStore'
import MapPage from './pages/MapPage'
import Notifications from './lib/notifications/components/Notifications'
import RealtimeManager from './lib/realtime/components/RealtimeManager'

import 'App.css'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: teal,
  },
})

const App = () =>
  <Provider store={configureStore()}>
    <MuiThemeProvider theme={theme}>
      <div className="app-container">
        <MapPage />
        <Notifications />
        <RealtimeManager />
      </div>
    </MuiThemeProvider>
  </Provider>

export default App
