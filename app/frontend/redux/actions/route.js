export const API_CALCULATE_ROUTE = "API_CALCULATE_ROUTE"

export const calculateRoute = payload => ({
  type: API_CALCULATE_ROUTE,
  path: "tsp",
  method: "POST",
  payload,
})
