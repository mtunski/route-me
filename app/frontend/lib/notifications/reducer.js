import Immutable from "seamless-immutable"

import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "./actions"

const initialState = Immutable.from({})

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return state.set(action.payload.id, action.payload)
    case HIDE_NOTIFICATION:
      return state.without(action.payload)
    default:
      return state
  }
}
