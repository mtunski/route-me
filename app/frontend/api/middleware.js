import { isUndefined } from "lodash"

import { call } from "./client"
import { isApiAction } from "./utils"

export default ({ dispatch }) => next => action => {
  if (isApiAction(action) && isUndefined(action.status)) {
    next({ ...action, status: "pending" })

    return call(action.path, action.method, action.payload)
      .then(payload =>
        dispatch({
          ...action,
          payload,
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
