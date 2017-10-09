import Immutable from 'seamless-immutable'

import { SET_CLIENT_ID } from '../actions/client'

const initialState = Immutable.from({})

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CLIENT_ID:
      return state.set('id', action.payload)
    default:
      return state
  }
}
