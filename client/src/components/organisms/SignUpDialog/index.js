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

const SignUpDialog = props => {
  const {
    isOpen,
    handleClose,
    item,
    isLoading,
    handleRequestSignUp,
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
            Sign Up
          </Typography>
        </Toolbar>
      </AppBar>
      <Formik
        initialValues={item.toJS()}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Please input user name'),
          email: Yup.string()
            .email('Invalid eamil')
            .required('Please input email'),
          password: Yup.string()
            .min(6, 'password atleast have 6 characters')
            .max(30, 'password dont have over 30 characters')
            .required('Please input password'),
          password2: Yup.string()
            .oneOf([Yup.ref('password')], 'Password not match')
            .required('Please input Confirm password'),
        })}
        onSubmit={values => handleRequestSignUp(values)}
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
                id="name"
                label="Name"
                fullWidth
                helperText={touched.name && errors.name}
                InputProps={{
                  value: values.name,
                  onChange: e => {
                    setFieldValue('name', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['name']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.name && errors.name !== undefined,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.name && errors.name !== undefined,
                }}
              />
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
                  type: 'password',
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.password && errors.password !== undefined,
                }}
              />
              <TextField
                id="password2"
                label="Confirm Password"
                fullWidth
                helperText={touched.password2 && errors.password2}
                InputProps={{
                  value: values.password2,
                  onChange: e => {
                    setFieldValue('password2', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['password2']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.password2 && errors.password2 !== undefined,
                  disableUnderline: true,
                  type: 'password',
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.password2 && errors.password2 !== undefined,
                }}
              />
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
              <Button
                variant="raised"
                color="primary"
                type="submit"
                disabled={Object.keys(values.errors).length !== 0 || isLoading}>
                Sign Up
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

SignUpDialog.propTypes = {
  isOpen: bool.isRequired,
  handleClose: func.isRequired,
  classes: object.isRequired,
  item: object.isRequired,
  isLoading: bool.isRequired,
  handleRequestSignUp: func.isRequired,
}

export default withStyles(styles)(SignUpDialog)
