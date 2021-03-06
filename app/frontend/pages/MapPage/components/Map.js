import React, { PureComponent } from 'react'
import { withProps } from 'recompose'
import { connect } from 'react-redux'
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps'
import { pick, defer } from 'lodash'
import Guid from 'guid'

import { addLocation } from 'tsp/actions'
import { showNotification } from "notifications/actions"
import MapMarker from './MapMarker'
import MapControls from './MapControls'

const mapStateToProps = (state) => ({
  locations: state.tsp.locations,
  route: state.tsp.route,
})

const mapDispatchToProps = {
  addLocation,
  showNotification,
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
    if (Object.keys(this.props.locations).length === 24) {
      this.props.showNotification("We only support up to 24 locations for now, sorry!", "error")
    } else {
      this.props.addLocation({
        id: Guid.raw(),
        lat: ev.latLng.lat(),
        lng: ev.latLng.lng(),
      })
    }
  }

  state = {
    directions: null,
    zoom: 6,
  }

  componentDidMount() {
    this.directionsService = new google.maps.DirectionsService()
    this.fixCenter()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ directions: null })

    if (this.props.route !== nextProps.route) {
      let [start, ...waypoints] = nextProps.route.asMutable()
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
          this.props.showNotification("Some locations are unreachable!", "error")
        }
      })
    }
  }

  fixCenter = () =>
    this.map.panBy(-150, -30)

  zoomIn = () =>
    this.setState({ zoom: this.state.zoom + 1 })

  zoomOut = () =>
    this.setState({ zoom: this.state.zoom - 1 })

  handleZoomchanged = (ev) =>
    this.setState({ zoom: this.map.getZoom() })

  render = () =>
    <div>
      <GoogleMap
        zoom={this.state.zoom}
        defaultCenter={{ lat: 51.1079, lng: 17.0385 }}
        defaultClickableIcons={false}
        defaultOptions={{
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
        }}
        onClick={this.handleClick}
        onZoomChanged={this.handleZoomchanged}
        ref={(map) => map && (this.map = map)}
      >
        {Object.values(this.props.locations).map(location =>
          <MapMarker
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
              strokeColor: '#009688',
              strokeWeight: 6,
              strokeOpacity: 0.6
            }
          }}
        />}
      </GoogleMap>
      <MapControls
        onZoomIn={this.zoomIn}
        onZoomOut={this.zoomOut}
       />
    </div>
}
