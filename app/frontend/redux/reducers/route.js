import Immutable from 'seamless-immutable'

import { isSuccess } from "../../api/utils"
import { API_CALCULATE_ROUTE } from '../actions/route'

const initialState = Immutable.from({})

export default (state = initialState, action) => {
  switch (action.type) {
    case API_CALCULATE_ROUTE:
      return isSuccess(action)
        ? action.payload.data.route
        : state
    default:
      return state
  }
}
