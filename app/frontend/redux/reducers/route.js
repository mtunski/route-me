import Immutable from 'seamless-immutable'

import { isPending, isSuccess } from "../../api/utils"
import { API_CALCULATE_ROUTE } from '../actions/route'
import { REALTIME_CREATE_ROUTE } from '../../lib/realtime/actions'

const initialState = Immutable.from({
  waypoints: [],
  calculating: false,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case REALTIME_CREATE_ROUTE:
      return state.merge({
        waypoints: action.payload.route,
        calculating: false,
      })
    case API_CALCULATE_ROUTE:
      return isPending(action) ? state.set('calculating', true) : state
    default:
      return state
  }
}
