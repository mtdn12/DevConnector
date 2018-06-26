import { compose, applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { offline } from '@redux-offline/redux-offline'
import defaultOfflineConfig from '@redux-offline/redux-offline/lib/defaults'
import {
  persist,
  persistAutoRehydrate,
  offlineStateLens,
} from 'redux-offline-immutable-config'

import createRootReducer from './reducers'
// import { createRootSaga } from './sagas'
// import { withSaga } from '../utils'

import { authSaga } from '../modules/sagas'

function configureStore(initialState, history) {
  return new Promise((resolve, reject) => {
    try {
      let store

      /**
       * Middleware Configuration
       */
      const sagaMiddleware = createSagaMiddleware()
      const middlwares = [sagaMiddleware, routerMiddleware(history)]
      if (process.env.NODE_ENV !== 'production') {
        middlwares.push(require('redux-immutable-state-invariant').default())
      }

      /**
       * Enhancer Configuration
       */
      const offlineConfig = {
        ...defaultOfflineConfig,
        offlineStateLens,
        persist,
        persistAutoRehydrate,
        persistOptions: {
          blacklist: ['router', 'drawer', 'notification'],
        },
        persistCallback: () => resolve(store),
      }

      const enhancers = [offline(offlineConfig)]

      let composeEnhancers = compose

      if (
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ) {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      }
      /**
       * Initialize State
       */


      /**
       * Create Store
       */
      store = createStore(
        createRootReducer(),
        initialState,
        composeEnhancers(applyMiddleware(...middlwares), ...enhancers)
      )

      /**
       * Extension Configuration
       */
      store.runSaga = sagaMiddleware.run
      store.injectedReducers = {}
      store.injectedSagas = {}
      store.asyncSagas = []

      // Global Saga
      store.asyncSagas.push('auth')
      store.runSaga(authSaga)

      // let sagaTask = store.runSaga(createRootSaga(store))
      // let sagaTask = store.runSaga(createRootSaga(store.injectedSagas))
      // withSaga({ key: 'filter', saga: filterSaga })
      /**
       * Hot Reload Configuration
       */
      if (module.hot) {
        module.hot.accept('./reducers', () => {
          store.replaceReducer(createRootReducer(store.injectedReducers))
        })

        /* module.hot.accept('./sagas', () => {
          sagaTask.cancel()
          sagaTask.done.then(() => {
            sagaTask = store.runSaga(createRootSaga(store.injectedSagas))
          })
        }) */
      }
    } catch (error) {
      reject(error)
    }
  })
}

export default configureStore
