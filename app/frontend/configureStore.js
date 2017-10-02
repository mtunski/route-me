import { createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import rootReducer from "./rootReducer"

export default props => {
  const initialState = { ...props }

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools()
  )

  if (module.hot) {
    module.hot.accept("./rootReducer", () => {
      const nextRootReducer = require("./rootReducer") // eslint-disable-line
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
