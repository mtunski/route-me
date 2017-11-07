export const ADD_LOCATION = "ADD_LOCATION"
export const REMOVE_LOCATION = "REMOVE_LOCATION"

export const API_TSP_SOLVE = "API_TSP_SOLVE"

export const REALTIME_TSP_SOLVE = "REALTIME_TSP_SOLVE"

export const addLocation = payload => ({
  type: ADD_LOCATION,
  payload,
})

export const removeLocation = payload => ({
  type: REMOVE_LOCATION,
  payload,
})

export const solve = payload => ({
  type: API_TSP_SOLVE,
  path: "tsp",
  method: "POST",
  payload,
})

export const realtimeSolve = (payload) => ({
  type: REALTIME_TSP_SOLVE,
  payload,
})
