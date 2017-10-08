import Immutable from "seamless-immutable"
import { find } from "lodash"

import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "./actions"

const initialState = Immutable.from({})

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION: {
      const notification = action.payload
      const existing = find(state, { message: notification.message })

      return existing
        ? state
        : state.set(notification.id, notification)
    }
    case HIDE_NOTIFICATION:
      return state.without(action.payload)
    default:
      return state
  }
}
