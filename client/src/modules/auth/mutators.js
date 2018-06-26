import { fromJS } from 'immutable'

// LOgin Mutator

export const showLoginDialog = state =>
  state.setIn(['login', 'isOpenDialog'], true)
export const hideLoginDialog = state =>
  state.setIn(['login', 'isOpenDialog'], false)

export const setItemLogin = state =>
  state.setIn(
    ['login', 'item'],
    fromJS({
      email: '',
      password: '',
      errors: {},
    })
  )
export const setItemLoginErrors = action => state =>
  state.setIn(['login', 'item'], fromJS(action.item))
export const clearItemLogin = state =>
  state.setIn(['login', 'item'], fromJS({}))
export const showLoginLoading = state =>
  state.setIn(['login', 'isLoading'], true)
export const hideLoginLoading = state =>
  state.setIn(['login', 'isLoading'], false)

export const setData = action => state => state.set('data', fromJS(action.data))
export const clearData = state => state.set('data', null)

// Sign up Mutator
export const showSignUpDialog = state =>
  state.setIn(['signUp', 'isOpenDialog'], true)
export const hideSignUpDialog = state =>
  state.setIn(['signUp', 'isOpenDialog'], false)

export const setItemSignUp = state =>
  state.setIn(
    ['signUp', 'item'],
    fromJS({
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    })
  )
export const setItemSignUpErrors = action => state =>
  state.setIn(['signUp', 'item'], fromJS(action.item))
export const clearItemSignUp = state =>
  state.setIn(['signUp', 'item'], fromJS({}))
export const showSignUpLoading = state =>
  state.setIn(['signUp', 'isLoading'], true)
export const hideSignUpLoading = state =>
  state.setIn(['signUp', 'isLoading'], false)