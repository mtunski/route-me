import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { calculateRoute } from '../../../redux/actions/route'

const mapStateToProps = (state) => ({
  locations: Object.values(state.locations),
})

const mapDispatchToProps = {
  calculateRoute,
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Menu extends PureComponent {
  handleCalculateClick = () => {
    const latLngs = this.props.locations.map(location => new google.maps.LatLng(location.lat, location.lng))
    new google.maps.DistanceMatrixService().getDistanceMatrix({
        origins: latLngs,
        destinations: latLngs,
        travelMode: 'DRIVING',
    }, (response, status) => {
      let durationsMatrix
      if (status === 'OK') {
        const matrix = response
        const matrixOrder = matrix.rows.length
        durationsMatrix = []
        matrix.rows.forEach(row =>
          durationsMatrix.push(
            row.elements.map(element => {
              if (element.status === 'OK') {
                return element.duration.value
              } else {
                throw new Error('Unreachable destination.')
              }
            })
          )
        )
      } else {
        throw new Error('Something went wrong.')
      }
      console.log(durationsMatrix)
    })
  }

  render = () =>
    <div>
      <button onClick={this.handleCalculateClick}>Calculate</button>
    </div>
}
