/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/
export const showNotification = (message, duration = 10000) => ({
  type: SHOW_NOTIFICATION,
  message,
  duration,
})

export const hideNotification = (event, reason) => ({
  type: reason !== 'clickaway' ? HIDE_NOTIFICATION : null,
})

/**
|--------------------------------------------------
| Handlers
|--------------------------------------------------
*/
export const ActionHandler = {
  [SHOW_NOTIFICATION]: (state, action) =>
    state
      .set('isOpen', true)
      .set('message', action.message)
      .set('duration', action.duration),
  [HIDE_NOTIFICATION]: (state, action) =>
    state.set('isOpen', false).set('message', ''),
}
