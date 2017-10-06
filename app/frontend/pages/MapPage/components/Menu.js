import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { calculateRoute } from '../../../redux/actions/route'

const mapStateToProps = (state) => ({
  locations: Object.values(state.locations),
  route: state.route,
})

const mapDispatchToProps = {
  calculateRoute,
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Menu extends PureComponent {
  componentDidMount() {
    this.DistanceMatrixService = new google.maps.DistanceMatrixService()
  }

  handleCalculateClick = () => {
    const latLngs = this.props.locations.map(location => new google.maps.LatLng(location.lat, location.lng))

    if (this.props.locations.length >= 3) {
      this.DistanceMatrixService.getDistanceMatrix({
          origins: latLngs,
          destinations: latLngs,
          travelMode: 'DRIVING',
      }, (distanceMatrix, status) => {
        const distances = []

        if (status === 'OK') {
          const matrixOrder = distanceMatrix.rows.length

          for (let i = 0; i < matrixOrder; i++) {
            for (let j = 0; j < matrixOrder; j++) {
              const element = distanceMatrix.rows[i].elements[j]

              if (element.status === 'OK') {
                distances.push({
                  from: this.props.locations[i].id,
                  to: this.props.locations[j].id,
                  distance: element.duration.value,
                })
              } else {
                console.log('Something went wrong.')
              }
            }
          }
        } else {
          console.log('Something went wrong.')
        }

        this.props.calculateRoute({
          locations: this.props.locations,
          distances,
        })
      })
    } else {
      console.log('Select at least 3 locations.')
    }
  }

  render = () =>
    <div>
      <button onClick={this.handleCalculateClick}>Calculate</button>
    </div>
}
