import React, { PureComponent } from 'react'
import { Marker } from 'react-google-maps'
import { connect } from 'react-redux'

import { removeLocation } from '../../../redux/actions/locations'

const mapDispatchToProps = {
  removeLocation,
}

@connect(null, mapDispatchToProps)
export default class Location extends PureComponent {
  handleClick = (ev) => {
    this.props.removeLocation(this.props.id)
  }

  render = () =>
    <Marker
      position={this.props.coordinates}
      onClick={this.handleClick}
      key={this.props.id}
    />
}
