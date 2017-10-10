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
    recombinationProbability: 80,
    mutationProbability: 10,
  }
})
export default class Form extends PureComponent {
  componentDidMount() {
    this.DistanceMatrixService = new google.maps.DistanceMatrixService()
  }

  handleSubmit = (algorithmParameters) => {
    if (this.props.locations.length >= 3) {
      return this.props.calculateRoute({
        locations: this.props.locations,
        algorithmParameters,
      })
    } else {
      return this.props.showNotification("Select at least 3 cities.", "info")
    }
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
        name="recombinationProbability"
        label="Recombination (crossover) probability"
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
