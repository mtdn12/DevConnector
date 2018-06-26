import { fromJS } from 'immutable'
import { ActionHandler } from './actions'

/**
 * Initial State
 */
const initialState = fromJS({
  item: {},
  isLoading: false,
  isLoadingDeleteProfile: false,
  isLoadingAction: false,
  profileForm: {
    item: {},
    isLoading: false,
  },
  eduForm: {
    item: {},
    isLoading: false,
  },
  expForm: {
    item: {},
    isLoading: false,
  },
  profiles: {
    items: [],
    isLoading: false,
    filter: {
      keyword: '',
      limit: 5,
      page: 0,
    },
    totalCount: 0,
  },
  profileView: {
    item: {},
    isLoading: false,
  },
})

/**
 * Reducer
 */
export default function profile(currentState = initialState, action) {
  const handler = ActionHandler[action.type]
  return handler ? handler(currentState, action) : currentState
}
