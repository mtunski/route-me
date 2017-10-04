import React, { PureComponent } from 'react'
import { withProps } from 'recompose'
import { connect } from 'react-redux'
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps'
import { pick } from 'lodash'
import Guid from 'guid'

import { addLocation } from '../../../redux/actions/locations'
import Location from './Location'

const mapStateToProps = (state) => ({
  locations: Object.values(state.locations),
})

const mapDispatchToProps = {
  addLocation,
}

@connect(mapStateToProps, mapDispatchToProps)
@withProps({
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `400px` }} />,
  mapElement: <div style={{ height: `100%` }} />,
})
@withGoogleMap
export default class Map extends PureComponent {
  handleClick = (ev) => {
    this.props.addLocation({
      id: Guid.raw(),
      lat: ev.latLng.lat(),
      lng: ev.latLng.lng(),
    })
  }

  render = () =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      defaultClickableIcons={false}
      defaultOptions={{
        mapTypeControl:false,
        streetViewControl:false,
      }}
      onClick={this.handleClick}
    >
      {this.props.locations.map(location =>
        <Location
          id={location.id}
          coordinates={pick(location, 'lat', 'lng')}
          key={location.id}
        />
      )}
    </GoogleMap>
}
