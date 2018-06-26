import React from 'react'
import { toJS } from 'immutable'
import * as Yup from 'yup'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
} from '@material-ui/core'
import { bool, func, object } from 'prop-types'
import { Formik } from 'formik'
import { Close } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
const Transition = props => <Slide direction="up" {...props} />

const LoginDialog = props => {
  const {
    isOpen,
    handleClose,
    item,
    isLoading,
    handleRequestLogin,
    classes,
  } = props
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      keepMounted>
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" onClick={handleClose} aria-label="Close">
            <Close />
          </IconButton>
          <Typography variant="title" color="inherit">
            Login
          </Typography>
        </Toolbar>
      </AppBar>
      <Formik
        initialValues={item.toJS()}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Invalid eamil')
            .required('Please input email'),
          password: Yup.string()
            .min(6, 'password atleast have 6 characters')
            .max(30, 'password dont have over 30 characters')
            .required('Please input password'),
        })}
        onSubmit={values => handleRequestLogin(values)}
        enableReinitialize
        render={({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          setFieldValue,
          dirty,
          isValid,
        }) => (
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <DialogContent className={classes.contentWrapper}>
              <div className={classes.errorWrapper}>
                {Object.keys(values.errors).map(key => (
                  <Typography
                    variant="body1"
                    align="center"
                    key={key}
                    color="inherit">
                    {values.errors[key]}
                  </Typography>
                ))}
              </div>
              <TextField
                id="email"
                label="Email"
                fullWidth
                helperText={touched.email && errors.email}
                InputProps={{
                  value: values.email,
                  onChange: e => {
                    setFieldValue('email', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['email']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.email && errors.email !== undefined,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.email && errors.email !== undefined,
                }}
              />
              <TextField
                id="password"
                label="Password"
                fullWidth
                helperText={touched.password && errors.password}
                InputProps={{
                  type: 'password',
                  value: values.password,
                  onChange: e => {
                    setFieldValue('password', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['password']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.password && errors.password !== undefined,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.password && errors.password !== undefined,
                }}
              />
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
              <Button
                variant="raised"
                color="primary"
                type="submit"
                disabled={Object.keys(values.errors).length !== 0 || isLoading}>
                LogIN
              </Button>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
            </DialogActions>
          </form>
        )}
      />
    </Dialog>
  )
}

LoginDialog.propTypes = {
  isOpen: bool.isRequired,
  handleClose: func.isRequired,
  classes: object.isRequired,
  item: object.isRequired,
  isLoading: bool.isRequired,
  handleRequestLogin: func.isRequired,
}

export default withStyles(styles)(LoginDialog)
