import { fromJS } from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

export const ActionHandler = {
  [LOCATION_CHANGE]: (state, action) => {
    return state.set('location', fromJS(action.payload))
  },
}
