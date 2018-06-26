import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Template, LoginDialog, SignUpDialog } from '../../'
import { Typography, Button } from '@material-ui/core'
import { object, bool, func, any } from 'prop-types'
import styles from './styles'
import { Redirect } from 'react-router-dom'
const Welcome = props => {
  const {
    classes,
    // Login Dialog Props
    isOpenLoginDialog,
    isLoadingLogin,
    itemLogin,
    handleOpenLoginDialog,
    handleCloseLoginDialog,
    handleRequestLogin,
    // Sign Up Dialog Props
    isOpenSignUpDialog,
    isLoadingSignUp,
    itemSignUp,
    handleOpenSignUpDialog,
    handleCloseSignUpDialog,
    handleRequestSignUp,
    //
    userData,
  } = props
  return (
    <Template>
      {userData && (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )}
      <div className={classes.container}>
        <div className={classes.darkOverlay} />
        <div className={classes.contentWrapper}>
          <Typography align="center" variant="headline" color="inherit">
            Developer Connector
          </Typography>
          <Typography align="center" variant="body1" color="inherit">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </Typography>
          <div className={classes.btnWrapper}>
            <Button
              variant="raised"
              color="primary"
              onClick={handleOpenLoginDialog}>
              Login
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleOpenSignUpDialog}>
              Sign Up
            </Button>
          </div>
        </div>
        {isOpenLoginDialog && (
          <LoginDialog
            isOpen={isOpenLoginDialog}
            handleClose={handleCloseLoginDialog}
            isLoading={isLoadingLogin}
            item={itemLogin}
            handleRequestLogin={handleRequestLogin}
          />
        )}
        {isOpenSignUpDialog && (
          <SignUpDialog
            isOpen={isOpenSignUpDialog}
            handleClose={handleCloseSignUpDialog}
            isLoading={isLoadingSignUp}
            item={itemSignUp}
            handleRequestSignUp={handleRequestSignUp}
          />
        )}
      </div>
    </Template>
  )
}

Welcome.propTypes = {
  classes: object.isRequired,
  // Login props
  isOpenLoginDialog: bool.isRequired,
  isLoadingLogin: bool.isRequired,
  handleOpenLoginDialog: func.isRequired,
  handleCloseLoginDialog: func.isRequired,
  itemLogin: object.isRequired,
  handleRequestLogin: func.isRequired,
  // Sign Up props
  isOpenSignUpDialog: bool.isRequired,
  isLoadingSignUp: bool.isRequired,
  itemSignUp: object.isRequired,
  handleOpenSignUpDialog: func.isRequired,
  handleCloseSignUpDialog: func.isRequired,
  handleRequestSignUp: func.isRequired,
  userData: any,
}

export default withStyles(styles)(Welcome)
