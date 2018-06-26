import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { bool, string, func, number } from 'prop-types'
import { removeToken } from '../utils/token'
import { configureApiSettings } from '../config/api'
import { withReducer } from '../utils'
import { Navbar } from '../components'
import { navbarReducer } from '../modules/reducers'
import { push } from 'react-router-redux'
import {
  openLoginDialog,
  openSignUpDialog,
  requestLogout,
} from '../modules/actions'

class NavbarContainer extends React.Component {
  /* static propTypes = {
    handleLogout: func.isRequired(),
  } */
  handleClickLogout = () => {
    removeToken()
    configureApiSettings()
    this.props.handleLogout()
  }
  render() {
    return <Navbar handleClickLogout={this.handleClickLogout} {...this.props} />
  }
}

const mapStateToProps = state => ({
  userData: state.getIn(['auth', 'data']),
})

const mapDispatchToProps = dispatch => ({
  handleOpenLoginDialog: () => dispatch(openLoginDialog()),
  handleOpenSignUpDialog: () => dispatch(openSignUpDialog()),
  handleLogout: () => dispatch(requestLogout()),
  handleViewProfile: id => dispatch(push(`/profile/user/${id}`)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withNavbarReducer = withReducer({
  key: 'navbar',
  reducer: navbarReducer,
})

export default compose(withNavbarReducer, withConnect)(NavbarContainer)
