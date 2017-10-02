import React from 'react'
import { render } from 'react-dom'

import MapPage from '../pages/MapPage'

document.addEventListener('DOMContentLoaded', () => {
  const mountNode = document.querySelector('#app')

  render(<MapPage />, mountNode)
  if (module.hot) {
    module.hot.accept('../pages/MapPage', () => {
      const NextRootComponent = require('../pages/MapPage').default
      render(<NextRootComponent />, mountNode)
    })
  }
})
