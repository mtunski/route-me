import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'
import locationsReducer from './reducers/locations'
import routeReducer from './reducers/route'
import notificationsReducer from '../lib/notifications/reducer'

export default combineReducers({
  locations: locationsReducer,
  route: routeReducer,
  notifications: notificationsReducer,
  form: formReducer,
})
