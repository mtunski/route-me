import React from 'react'
import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { pick } from 'lodash'

const mapStateToProps = (state) => ({
  locations: Object.values(state.locations),
})

const Map = compose(
  connect(mapStateToProps),
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.locations.map(location =>
      <Marker key={location.id} position={pick(location, 'lat', 'lng')} />
    )}
  </GoogleMap>
)

export default Map
