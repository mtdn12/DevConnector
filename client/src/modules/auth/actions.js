import { pipe } from '../../utils'
import * as mutators from './mutators'

/**
 * Constants
 */
const OPEN_LOGIN_DIALOG = 'auth/OPEN_LOGIN_DIALOG'
const CLOSE_LOGIN_DIALOG = 'auth/CLOSE_LOGIN_DIALOG'

const SEND_LOGIN_REQUEST = 'auth/SEND_LOGIN_REQUEST'
const SEND_LOGIN_SUCCESS = 'auth/SEND_LOGIN_SUCCESS'
const SEND_LOGIN_FAILURE = 'auth/SEND_LOGIN_FAILURE'
const SEND_LOGIN_ERRORS = 'auth/SEND_LOGIN_ERRORS'

// SignUp

const OPEN_SIGNUP_DIALOG = 'auth/OPEN_SIGNUP_DIALOG'
const CLOSE_SIGNUP_DIALOG = 'auth/CLOSE_SIGNUP_DIALOG'

const SEND_SIGN_UP_REQUEST = 'auth/SEND_SIGN_UP_REQUEST'
const SEND_SIGN_UP_SUCCESS = 'auth/SEND_SIGN_UP_SUCCESS'
const SEND_SIGN_UP_FAILURE = 'auth/SEND_SIGN_UP_FAILURE'
const SEND_SIGN_UP_ERRORS = 'auth/SEND_SIGN_UP_ERRORS'

// Logout
const LOG_OUT_REQUEST = 'auth/LOG_OUT_REQUEST'


export const CONSTANTS = {
  // Login
  SEND_LOGIN_REQUEST,
  SEND_LOGIN_SUCCESS,
  SEND_LOGIN_FAILURE,
  SEND_LOGIN_ERRORS,

  // Signup
  SEND_SIGN_UP_REQUEST,
  SEND_SIGN_UP_SUCCESS,
  SEND_SIGN_UP_FAILURE,
  SEND_SIGN_UP_ERRORS,

  // Logout


}

/**
 * Actions
 */
// Login action
export const openLoginDialog = () => ({
  type: OPEN_LOGIN_DIALOG,
})
export const closeLoginDialog = () => ({
  type: CLOSE_LOGIN_DIALOG,
})
export const requestLogin = values => ({
  type: SEND_LOGIN_REQUEST,
  values,
})

// Signup actions
export const openSignUpDialog = () => ({
  type: OPEN_SIGNUP_DIALOG,
})
export const closeSignUpDailog = () => ({
  type: CLOSE_SIGNUP_DIALOG,
})
export const requestSignUp = values => ({
  type: SEND_SIGN_UP_REQUEST,
  values,
})
// Log out action
export const requestLogout = () =>({
  type: LOG_OUT_REQUEST,
})
/**
 * Handler
 */

export const ActionHandler = {
  // Login Handler
  [OPEN_LOGIN_DIALOG]: state =>
    pipe([mutators.setItemLogin, mutators.showLoginDialog], state),
  [CLOSE_LOGIN_DIALOG]: state =>
    pipe([mutators.hideLoginDialog, mutators.clearItemLogin], state),
  [SEND_LOGIN_REQUEST]: state => pipe([mutators.showLoginLoading], state),
  [SEND_LOGIN_ERRORS]: (state, action) =>
    pipe(
      [mutators.setItemLoginErrors(action), mutators.hideLoginLoading],
      state
    ),
  [SEND_LOGIN_SUCCESS]: (state, action) =>
    pipe(
      [
        mutators.hideLoginLoading,
        mutators.clearItemLogin,
        mutators.hideLoginDialog,
        mutators.setData(action),
      ],
      state
    ),
  [SEND_LOGIN_FAILURE]: state => pipe([mutators.hideLoginLoading], state),
  // signUp Handler
  [OPEN_SIGNUP_DIALOG]: state =>
    pipe([mutators.setItemSignUp, mutators.showSignUpDialog], state),
  [CLOSE_SIGNUP_DIALOG]: state =>
    pipe([mutators.hideSignUpDialog, mutators.clearItemSignUp], state),
  [SEND_SIGN_UP_REQUEST]: state => pipe([mutators.showSignUpLoading], state),
  [SEND_SIGN_UP_ERRORS]: (state, action) =>
    pipe(
      [mutators.setItemSignUpErrors(action), mutators.hideSignUpLoading],
      state
    ),
  [SEND_SIGN_UP_SUCCESS]: state =>
    pipe(
      [
        mutators.hideSignUpDialog,
        mutators.showLoginDialog,
        mutators.setItemLogin,
        mutators.hideSignUpLoading,
      ],
      state
    ),
  [SEND_SIGN_UP_FAILURE]: state => pipe([mutators.hideSignUpLoading], state),

  // Logout
  [LOG_OUT_REQUEST]: state => pipe([mutators.clearData], state),
}
