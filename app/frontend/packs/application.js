import React from 'react'
import { render } from 'react-dom'

import MapPage from '../pages/MapPage'

document.addEventListener('DOMContentLoaded', () =>
  render(<MapPage />, document.querySelector('#app'))
)
