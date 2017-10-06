import { combineReducers } from 'redux'

import locationsReducer from './reducers/locations'
import routeReducer from './reducers/route'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  locations: locationsReducer,
  route: routeReducer,
  form: formReducer,
})
