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
      defaultPosition={this.props.coordinates}
      onClick={this.handleClick}
      icon={{
        path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
        anchor: new google.maps.Point(12, 24),
        strokeColor: "#00796B",
        strokeOpacity: 1,
        strokeWeight: 0,
        fillColor: '#00796B',
        fillOpacity: 1,
        scale: 2,
      }}
      key={this.props.id}
    />
}
