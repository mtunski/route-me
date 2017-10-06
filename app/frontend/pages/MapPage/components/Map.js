import React, { PureComponent } from 'react'
import { withProps } from 'recompose'
import { connect } from 'react-redux'
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps'
import { pick, defer } from 'lodash'
import Guid from 'guid'

import { addLocation } from '../../../redux/actions/locations'
import Location from './Location'

const mapStateToProps = (state) => ({
  locations: state.locations,
  route: state.route,
})

const mapDispatchToProps = {
  addLocation,
}

@connect(mapStateToProps, mapDispatchToProps)
@withProps({
  loadingElement: <div style={{ width: '100%', height: '100%' }} />,
  containerElement: <div style={{ width: '100%', height: '100%' }} />,
  mapElement: <div style={{ width: '100%', height: '100%' }} />,
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

  state = {
    directions: null,
  }

  componentDidMount() {
    this.directionsService = new google.maps.DirectionsService()
    this.fixCenter()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ directions: null })

    if (this.props.route !== nextProps.route) {
      let [start, ...waypoints] = nextProps.route
      start = new google.maps.LatLng(this.props.locations[start].lat, this.props.locations[start].lng)
      waypoints = waypoints.map(id => ({
        location: new google.maps.LatLng(this.props.locations[id].lat, this.props.locations[id].lng)
      }))

      this.directionsService.route({
        origin: start,
        destination: start,
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (directions, status) => {
        if (status === 'OK') {
          this.setState({ directions })
          defer(this.fixCenter)
        } else {
          console.log('Something went wrong.')
        }
      })
    }
  }

  fixCenter = () =>
    this.map.panBy(-150, 0)

  render = () =>
    <GoogleMap
      defaultZoom={6}
      defaultCenter={{ lat: 51.1079, lng: 17.0385 }}
      defaultClickableIcons={false}
      defaultOptions={{
        mapTypeControl:false,
        streetViewControl:false,
      }}
      onClick={this.handleClick}
      ref={(map) => map && (this.map = map)}
    >
      {Object.values(this.props.locations).map(location =>
        <Location
          id={location.id}
          coordinates={pick(location, 'lat', 'lng')}
          key={location.id}
        />
      )}
      {this.state.directions && <DirectionsRenderer
        directions={this.state.directions}
        defaultOptions={{
          suppressMarkers: true,
          polylineOptions: {
            clickable: false,
            strokeColor: '#0088FF',
            strokeWeight: 6,
            strokeOpacity: 0.6
          }
        }}
      />}
    </GoogleMap>
}
