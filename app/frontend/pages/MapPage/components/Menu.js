import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Typography, Button, TextField } from 'material-ui'

import { calculateRoute } from '../../../redux/actions/route'

import './Menu.css'

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
    <div className="menu">
      <Typography type="title">Algorithm settings</Typography>
      <TextField
        label="Population size"
        helperText="Keep below 500"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Max generations"
        helperText="Keep below 500"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Mutation"
        helperText="Keep below 20"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Crossover"
        helperText="Keep below 20"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Crossover"
        helperText="Keep below 20"
        fullWidth
        margin="normal"
      />
      <Button
        raised
        color="primary"
        className="submit"
        onClick={this.handleCalculateClick}
      >
        Calculate
      </Button>
    </div>
}
