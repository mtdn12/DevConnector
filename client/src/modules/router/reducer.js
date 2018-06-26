import { fromJS } from 'immutable'

import { ActionHandler } from './actions'

const initialState = fromJS({
  location: null,
})

export default function routerReducer (currentState = initialState, action) {
  const handler = ActionHandler[action.type]
  return handler ? handler(currentState, action) : currentState
}
