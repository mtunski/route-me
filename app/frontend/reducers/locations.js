import Immutable from 'seamless-immutable'

const initialState = Immutable.from({
  '1': { id: '1', lat: -34.397, lng: 150.644 },
})

export default (state = initialState) => state
