export const ADD_LOCATION = "ADD_LOCATION"
export const REMOVE_LOCATION = "REMOVE_LOCATION"

export const addLocation = payload => ({
  type: ADD_LOCATION,
  payload,
})

export const removeLocation = payload => ({
  type: REMOVE_LOCATION,
  payload,
})
