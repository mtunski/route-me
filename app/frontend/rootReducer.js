import { combineReducers } from 'redux'

import locationsReducer from './reducers/locations'

export default combineReducers({
  locations: locationsReducer,
})
