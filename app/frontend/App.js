import React from 'react'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui'
import { teal } from 'material-ui/colors';

import configureStore from './redux/configureStore'
import MapPage from './pages/MapPage'

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
      <MapPage />
    </MuiThemeProvider>
  </Provider>

export default App
