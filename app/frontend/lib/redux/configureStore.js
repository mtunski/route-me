import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"

import rootReducer from "./rootReducer"
import apiMiddleware from "../api/middleware"

export default props => {
  const initialState = { ...props }

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware, apiMiddleware))
  )

  if (module.hot) {
    module.hot.accept("./rootReducer", () => {
      const nextRootReducer = require("./rootReducer") // eslint-disable-line
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
