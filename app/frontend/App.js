import React from 'react'
import { Provider } from 'react-redux'

import configureStore from './redux/configureStore'
import MapPage from './pages/MapPage'

import 'App.css'

const App = () =>
  <Provider store={configureStore()}>
    <MapPage />
  </Provider>

export default App
