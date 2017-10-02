import Immutable from 'seamless-immutable'

import { ADD_LOCATION, REMOVE_LOCATION } from '../actions/locations'

const initialState = Immutable.from({})

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      return state.merge({ [action.payload.id]: action.payload })
    case REMOVE_LOCATION:
      return state.without(action.payload)
    default:
      return state
  }
}
