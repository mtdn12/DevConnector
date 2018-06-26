import React from 'react'
import { connect } from 'react-redux'
import { any, object, string } from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, userData, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      userData ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/welcome',
            state: { from: props.location },
          }}
        />
      )
    }
  />
)

PrivateRoute.propTypes = {
  component: any.isRequired,
  userdata: any,
  location: object,
}

const mapStateToProps = state => ({
  userData: state.getIn(['auth', 'data']),
})

export default connect(mapStateToProps)(PrivateRoute)