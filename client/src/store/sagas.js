import { all } from 'redux-saga/effects'

/**
 * Make a root saga
 *
 * @author Hai Nguyen <hai.nguyen@dsquare.com.vn>
 * @param {any} sagas
 * @returns Generator function runned by Saga Middleware
 */
function createRootSaga(sagas = {}) {
  return function* rootSaga() {
    yield all([...Object.keys(sagas).map(key => sagas[key]())])
  }
}

/**
 * Inject saga function to rootSaga
 * Ignore if the `key` is duplicated
 *
 * @author Hai Nguyen <hai.nguyen@dsquare.com.vn>
 * @export
 * @param {any} store Redux Store
 * @param {any} { key, saga }
 */
export function injectSaga(store, { key, saga }) {
  if (store.asyncSagas.includes(key)) {
    return
  }
  store.asyncSagas.push(key)

  store.injectedSagas = [...store.injectedSagas, saga]
  store.runSaga(saga)
}

export default createRootSaga
