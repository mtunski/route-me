import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import TopBar from './components/TopBar'
import Menu from './components/Menu'
import Map from './components/Map'
import MapOverlay from './components/MapOverlay'

const mapStateToProps = (state) => ({
  locations: state.locations,
  calculatingRoute: state.route.calculating,
})

@connect(mapStateToProps)
export default class MapPage extends PureComponent {
  render = () =>
    [
      <TopBar key="top-bar" />,
      <Menu key="menu" />,
      <Map key="map" />,
      <MapOverlay key="map-overlay" visible={this.props.calculatingRoute} />
    ]
}
