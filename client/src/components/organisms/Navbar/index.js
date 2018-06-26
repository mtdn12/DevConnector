import React from 'react'
import { object, func, any } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
} from '@material-ui/core'
import styles from './styles'
import classNames from 'classnames'

const Navbar = props => {
  const {
    classes,
    handleOpenLoginDialog,
    handleOpenSignUpDialog,
    userData,
    handleClickLogout,
    handleViewProfile,
  } = props
  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.flex}>
          <div className={classNames(classes.flex, classes.navLeft)}>
            <Link to="/" className={classes.link}>
              <Typography variant="title" color="inherit">
                devConnector
              </Typography>
            </Link>
            {userData && (
              <Link to="/profile/all" className={classes.link}>
                <Button
                  className={classes.marLeft}
                  variant="flat"
                  color="inherit">
                  Developers
                </Button>
              </Link>
            )}
          </div>
          <div className={classes.navRight}>
            {!userData ? (
              <React.Fragment>
                <Button
                  variant="flat"
                  color="inherit"
                  onClick={handleOpenLoginDialog}>
                  Login
                </Button>
                <Button
                  variant="flat"
                  color="inherit"
                  onClick={handleOpenSignUpDialog}>
                  Sign Up
                </Button>
              </React.Fragment>
            ) : (
              <div className={classes.flex}>
                <Link to="/posts/" className={classes.link}>
                  <Button variant="flat" color="inherit">
                    POst feed
                  </Button>
                </Link>
                <Avatar
                  alt="Avatar"
                  src={userData.get('avatar')}
                  className={classes.avatar}
                  onClick={() => handleViewProfile(userData.get('id'))}
                />
                <Button
                  variant="flat"
                  color="inherit"
                  onClick={handleClickLogout}>
                  LogOut
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Navbar.propTypes = {
  classes: object.isRequired,
  handleOpenLoginDialog: func.isRequired,
  handleOpenSignUpDialog: func.isRequired,
  userData: any,
  handleClickLogout: func.isRequired,
  handleViewProfile: func.isRequired,
}

export default withStyles(styles)(Navbar)
