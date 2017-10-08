import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button, TextField } from 'material-ui'

import { showNotification } from "../../../lib/notifications/actions"
import { calculateRoute } from '../../../redux/actions/route'

const renderField = ({ input, type, label, helperText, meta: { touched, error } }) => (
  <TextField
    {...input}
    type={type}
    label={label}
    helperText={helperText}
    fullWidth
    margin="normal"
  />
)

const mapStateToProps = (state) => ({
  locations: Object.values(state.locations),
  route: state.route,
})

const mapDispatchToProps = {
  calculateRoute,
  showNotification,
}

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
  form: 'Form',
  initialValues: {
    populationSize: 500,
    maxGenerations: 100,
    crossoverProbability: 80,
    mutationProbability: 10,
  }
})
export default class Form extends PureComponent {
  componentDidMount() {
    this.DistanceMatrixService = new google.maps.DistanceMatrixService()
  }

  handleSubmit = (algorithmConfig) => {
    const latLngs = this.props.locations.map(location => new google.maps.LatLng(location.lat, location.lng))
    const distances = []

    if (this.props.locations.length >= 3) {
      this.DistanceMatrixService.getDistanceMatrix({
          origins: latLngs,
          destinations: latLngs,
          travelMode: 'DRIVING',
      }, (distanceMatrix, status) => {

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
                return this.props.showNotification("Some locations are unreachable!", "error")
              }
            }
          }
        }
      })
    } else {
      return this.props.showNotification("Select at least 3 cities.", "info")
    }

    return this.props.calculateRoute({
      locations: this.props.locations,
      distances,
      ...algorithmConfig,
    })
  }

  render = () =>
    <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
      <Field
        component={renderField}
        name="populationSize"
        label="Population size"
        helperText="Adjust to number of locations"
      />
      <Field
        component={renderField}
        name="maxGenerations"
        label="Max generations"
        helperText="Adjust to number of locations"
      />
      <Field
        component={renderField}
        name="crossoverProbability"
        label="Crossover probability"
        helperText="Optimal =~ 80%"
      />
      <Field
        component={renderField}
        name="mutationProbability"
        label="Mutation probability"
        helperText="Optimal =~ 10%"
      />
      <Button
        raised
        color="primary"
        className="submit"
        type="submit"
        disabled={this.props.submitting}
      >
        Calculate
      </Button>
    </form>
}
