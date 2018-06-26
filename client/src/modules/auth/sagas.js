import { takeLatest, call, put, all } from 'redux-saga/effects'
import jwtDecode from 'jwt-decode'
import { CONSTANTS } from './actions'
import { push } from 'react-router-redux'
import { login, signUp } from '../../api/authApi'
import { showNotification } from '../actions'

import { setToken } from '../../utils/token'
import { configureApiSettings } from '../../config/api'

function* requestLoginWorker({ values }) {
  try {
    const response = yield call(login, values.email, values.password)
    if (response.data.result === 'fail') {
      const item = {
        ...values,
        errors: response.data.errors,
      }
      yield put({ type: CONSTANTS.SEND_LOGIN_ERRORS, item })
      return
    }
    yield setToken(response.data.token)
    yield configureApiSettings()
    yield put({
      type: CONSTANTS.SEND_LOGIN_SUCCESS,
      data: jwtDecode(response.data.token),
    })
    yield put(showNotification('Login Success'))
    yield put(push('/'))
  } catch (error) {
    yield put({ type: CONSTANTS.SEND_LOGIN_FAILURE })
  }
}

function* requestSignUpWorker({ values }) {
  try {
    console.log(values)
    const response = yield call(
      signUp,
      values.name,
      values.email,
      values.password,
      values.password2
    )
    console.log(response)
    if (response.data.result === 'fail') {
      const item = {
        ...values,
        errors: response.data.errors,
      }
      yield put({ type: CONSTANTS.SEND_SIGN_UP_ERRORS, item })
      return
    }
    yield put(showNotification('Sign up Success'))
    yield put({ type: CONSTANTS.SEND_SIGN_UP_SUCCESS })
  } catch (error) {
    yield put({ type: CONSTANTS.SEND_SIGN_UP_FAILURE })
  }
}

function* authWatcher() {
  yield all([
    takeLatest(CONSTANTS.SEND_LOGIN_REQUEST, requestLoginWorker),
    takeLatest(CONSTANTS.SEND_SIGN_UP_REQUEST, requestSignUpWorker),
  ])
}

export default authWatcher
