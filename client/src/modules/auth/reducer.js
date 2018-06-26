import { fromJS } from 'immutable'

import { ActionHandler } from './actions'

/**
 * Initial State
 */
const initialState = fromJS({
  login: {
    isOpenDialog: false,
    isLoading: false,
    item: {},
  },
  signUp: {
    isOpenDialog: false,
    isLoading: false,
    item: {},
  },
  data: null,
})
/**
 * Reducer
 */
export default function auth(currentState = initialState, action) {
  const handler = ActionHandler[action.type]
  return handler ? handler(currentState, action) : currentState
}
