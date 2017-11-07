import Immutable from 'seamless-immutable'

import { isPending } from "api/utils"
import { ADD_LOCATION, REMOVE_LOCATION, API_TSP_SOLVE, REALTIME_TSP_SOLVE } from './actions'

const initialState = Immutable.from({
  locations: {},
  route: [],
  solving: false,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      return state.setIn(['locations', action.payload.id], action.payload)
    case REMOVE_LOCATION:
      return state.set('locations', state.locations.without(action.payload))
    case API_TSP_SOLVE:
      return isPending(action) ? state.set('solving', true) : state
    case REALTIME_TSP_SOLVE:
      return state.merge({
        route: action.payload.route,
        solving: false,
      })
    default:
      return state
  }
}
