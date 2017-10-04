import Immutable from 'seamless-immutable'

import { ADD_LOCATION, REMOVE_LOCATION } from '../actions/locations'

// const initialState = Immutable.from({})

const initialState = Immutable.from({
   "7127f465-ae83-76f8-3c70-bee8203056cb": {"id":"7127f465-ae83-76f8-3c70-bee8203056cb","lat":-33.847607629887406,"lng":148.6614990234375},
   "eaae6563-0420-588a-6447-1db740382433": {"id":"eaae6563-0420-588a-6447-1db740382433","lat":-33.41310221370828,"lng":149.578857421875},
   "cf8b50b5-fe3e-b1a4-3ef4-0d9f6104a78d": {"id":"cf8b50b5-fe3e-b1a4-3ef4-0d9f6104a78d","lat":-33.89321737944088,"lng":151.2158203125},
   "af08c889-ccbd-0fc1-fa4f-00d88427f50e": {"id":"af08c889-ccbd-0fc1-fa4f-00d88427f50e","lat":-34.777715803604686,"lng":149.732666015625},
   "4e0ebafd-a49c-1172-fcc3-20e781b340cf": {"id":"4e0ebafd-a49c-1172-fcc3-20e781b340cf","lat":-34.46127728843705,"lng":148.7164306640625}
})

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      return state.merge({ [action.payload.id]: action.payload })
    case REMOVE_LOCATION:
      return state.without(action.payload)
    default:
      return state
  }
}
