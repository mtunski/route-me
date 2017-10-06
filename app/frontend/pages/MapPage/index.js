import React from 'react'

import TopBar from './components/TopBar'
import Menu from './components/Menu'
import Map from './components/Map'

const MapPage = () =>
  [
    <TopBar key="top-bar" />,
    <Menu key="menu" />,
    <Map key="map" />
  ]

export default MapPage
