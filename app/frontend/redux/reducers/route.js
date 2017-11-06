import Immutable from 'seamless-immutable'

import { isSuccess } from "../../api/utils"
import { API_CALCULATE_ROUTE } from '../actions/route'
import { REALTIME_CREATE_ROUTE } from '../../lib/realtime/actions'

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case REALTIME_CREATE_ROUTE:
      return action.payload.route
    case API_CALCULATE_ROUTE:
      return state
    default:
      return state
  }
}
