import React from 'react'
import { render } from 'react-dom'

import App from '../App'

document.addEventListener('DOMContentLoaded', () => {
  const mountNode = document.querySelector('#app')

  render(<App />, mountNode)
  if (module.hot) {
    module.hot.accept('../App', () => {
      const NextRootComponent = require('../App').default
      render(<NextRootComponent />, mountNode)
    })
  }
})
