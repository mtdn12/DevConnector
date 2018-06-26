import { fromJS } from 'immutable'
import { ActionHandler } from './actions'

/**
 * Initial State
 */
const initialState = fromJS({
  posts: {
    items: [],
    isLoading: false,
    filter: {
      limit: 10,
      page: 0,
    },
    totalCount: 0,
  },
  postView: {
    item: {},
    isLoading: false,
    formItem: {},
    isLoadingCreate: false,
    isLoadingDelete: false,
  },
  item: {},
  isLoadingCreate: false,
})

/**
 * Reducer
 */
export default function post(currentState = initialState, action) {
  const handler = ActionHandler[action.type]
  return handler ? handler(currentState, action) : currentState
}
