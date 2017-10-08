import Guid from 'guid'

export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION"
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION"

export const showNotification = (message, type) => ({
  type: SHOW_NOTIFICATION,
  payload: {
    id: Guid.raw(),
    message,
    type,
  },
})

export const hideNotification = (id) => ({
  type: HIDE_NOTIFICATION,
  payload: id,
})
