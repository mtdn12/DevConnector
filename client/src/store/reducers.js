import { combineReducers } from 'redux-immutable'

import { authReducer, routerReducer } from '../modules/reducers'

/**
 * Make a root reducer that has all injected and global reducers
 * to be replaced everytime mounting new route
 *
 * @author Hai Nguyen <hai.nguyen@dsquare.com.vn>
 * @param {object} reducers - Reducers to inject to Redux Store
 * @returns Single Reducer Function
 */
function createRootReducer(reducers) {
  return combineReducers({
    ...reducers,
    auth: authReducer,
    router: routerReducer,
  })
}

/**
 * Inject new reducer to root reducer
 * Ignore if the `key` is duplicated
 *
 * @author Hai Nguyen <hai.nguyen@dsquare.com.vn>
 * @export
 * @param {any} store - Redux Store
 * @param {any} { key, reducer }
 */
export function injectReducer(store, { key, reducer }) {
  if (store.injectedReducers[key]) {
    return
  }

  store.injectedReducers[key] = reducer
  store.replaceReducer(createRootReducer(store.injectedReducers))
}

export default createRootReducer
