import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import MainLayout from "layouts/MainLayout"
import Menu from './components/Menu'
import Map from './components/Map'
import MapOverlay from './components/MapOverlay'

const mapStateToProps = (state) => ({
  tspSolving: state.tsp.solving,
})

@connect(mapStateToProps)
export default class MapPage extends PureComponent {
  render = () =>
    <MainLayout>
      <Menu />
      <Map />
      <MapOverlay visible={this.props.tspSolving} />
    </MainLayout>
}
