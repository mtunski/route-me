import { isUndefined } from "lodash"

import { call } from "./client"
import { isApiAction } from "./utils"

export default ({ getState, dispatch }) => next => action => {
  if (isApiAction(action) && isUndefined(action.status)) {
    next({ ...action, status: "pending" })

    const payload = action.payload
    payload.clientId = getState().client.id

    return call(action.path, action.method, payload)
      .then(response =>
        dispatch({
          ...action,
          payload: response,
          status: "success",
        })
      )
      .catch(error =>
        dispatch({
          ...action,
          error,
          status: "error",
        })
      )
  }

  return next(action)
}
