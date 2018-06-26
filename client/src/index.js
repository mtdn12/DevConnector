import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createHashHistory'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import Immutable from 'immutable'

import 'core-js/es6/promise'
import 'core-js/es6/set'
import 'core-js/es6/map'

import 'typeface-roboto'

import configureStore from './store/configureStore'
import { configureApiSettings } from './config/api'
import registerServiceWorker from './registerServiceWorker'
import App from './components/App'

const initialState = Immutable.Map()
const history = createHistory()
configureApiSettings()

async function init() {
  const store = await configureStore(initialState, history)

  const MOUNT_NODE = document.getElementById('root')
  const render = () =>
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>,
      MOUNT_NODE
    )

  if (module.hot) {
    module.hot.accept('./components/App', () => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render()
    })
  }
  render()
}

init()

registerServiceWorker()
