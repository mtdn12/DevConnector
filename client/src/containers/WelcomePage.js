import React from 'react'
import { object } from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Welcome } from '../components'
import { authReducer } from '../modules/reducers'
import { authSaga } from '../modules/sagas'
import {
  openLoginDialog,
  closeLoginDialog,
  requestLogin,
  openSignUpDialog,
  closeSignUpDailog,
  requestSignUp,
} from '../modules/actions'
import { withReducer, withSaga } from '../utils'

const LoginPageContainer = ({ userData, location, ...props }) => {
  const { from } = location.state || { from: { pathname: '/' } }
  return userData ? (
    <Redirect to={from} />
  ) : (
    <Welcome location={location} {...props} />
  )
}

LoginPageContainer.propTypes = {
  userData: object,
  location: object.isRequired,
}

const mapDispatchToProps = dispatch => ({
  // Login
  handleOpenLoginDialog: () => dispatch(openLoginDialog()),
  handleCloseLoginDialog: () => dispatch(closeLoginDialog()),
  handleRequestLogin: values => dispatch(requestLogin(values)),
  // Sign up
  handleOpenSignUpDialog: () => dispatch(openSignUpDialog()),
  handleCloseSignUpDialog: () => dispatch(closeSignUpDailog()),
  handleRequestSignUp: values => dispatch(requestSignUp(values)),
})

const mapStateToProps = state => ({
  // Login
  isOpenLoginDialog: state.getIn(['auth', 'login', 'isOpenDialog']),
  isLoadingLogin: state.getIn(['auth', 'login', 'isLoading']),
  itemLogin: state.getIn(['auth', 'login', 'item']),
  // Sign up
  isOpenSignUpDialog: state.getIn(['auth', 'signUp', 'isOpenDialog']),
  isLoadingSignUp: state.getIn(['auth', 'signUp', 'isLoading']),
  itemSignUp: state.getIn(['auth', 'signUp', 'item']),
  // User data:
  userData: state.getIn(['auth', 'data']),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const WithAuthReducer = withReducer({
  key: 'auth',
  reducer: authReducer,
})
const withAuthSaga = withSaga({
  key: 'auth',
  saga: authSaga,
})

export default compose(withConnect, WithAuthReducer, withAuthSaga)(
  LoginPageContainer
)
