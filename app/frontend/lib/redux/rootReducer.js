import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'
import tspReducer from 'tsp/reducer'
import realtimeReducer from 'realtime/reducer'
import notificationsReducer from 'notifications/reducer'

export default combineReducers({
  tsp: tspReducer,
  realtime: realtimeReducer,
  notifications: notificationsReducer,
  form: formReducer,
})
