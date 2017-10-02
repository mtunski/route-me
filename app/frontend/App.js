import React from 'react'
import { Provider } from 'react-redux'

import configureStore from './configureStore'
import MapPage from './pages/MapPage'

const App = () =>
  <Provider store={configureStore()}>
    <MapPage />
  </Provider>

export default App
