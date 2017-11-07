import Immutable from 'seamless-immutable'

import { SET_CLIENT_ID } from './actions'

const initialState = Immutable.from({
  clientId: null,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CLIENT_ID:
      return state.set('clientId', action.payload)
    default:
      return state
  }
}
