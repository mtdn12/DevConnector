import { fromJS } from 'immutable'
import { ActionHandler } from './actions'

/**
 * Initial State
 */
const initialState = fromJS({

})

/**
 * Reducer
 */
export default function navBar(currentState = initialState, action) {
  const handler = ActionHandler[action.type]
  return handler ? handler(currentState, action) : currentState
}
