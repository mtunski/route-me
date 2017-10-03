import { combineReducers } from 'redux'

import locationsReducer from './reducers/locations'
import routeReducer from './reducers/route'

export default combineReducers({
  locations: locationsReducer,
  route: routeReducer,
})
