import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'
import locationsReducer from './reducers/locations'
import routeReducer from './reducers/route'
import clientReducer from './reducers/client'
import notificationsReducer from '../lib/notifications/reducer'

export default combineReducers({
  locations: locationsReducer,
  route: routeReducer,
  client: clientReducer,
  notifications: notificationsReducer,
  form: formReducer,
})
