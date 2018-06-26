import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import { Formik } from 'formik'
import { object, func, bool } from 'prop-types'
import { Template } from '../../'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import {
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'

const validate = (values, props) => {
  let errors = {}
  if (!values.title) errors.title = 'Please input title field'
  if (!values.company) errors.company = 'Please input company field'
  if (!values.from) {
    errors.from = ' please input from Date field'
  } else {
    if (values.to) {
      if (moment(values.from).isAfter(moment(values.to)))
        errors.to = 'To date must be more than or equal to From date'
    }
  }
  return errors
}
const EducationForm = props => {
  const {
    classes,
    item,
    isLoading,
    handleAddExp,
    handleGoBack,
    location,
  } = props
  return (
    <Template>
      {!item.get('id') && (
        <Redirect to={{ pathname: '/', state: { from: location } }} />
      )}
      <div className={classes.contentWrapper}>
        <Button
          variant="raised"
          color="inherit"
          className={classes.btn}
          onClick={handleGoBack}>
          <ArrowBack /> Back
        </Button>
        <Typography variant="headline" align="center" color="inherit">
          Add Your Experice
        </Typography>
        <Typography align="center" variant="body1" gutterBottom color="inherit">
          Add any developer/programming positions that you have had in the past
        </Typography>
        <Formik
          initialValues={item.toJS()}
          validate={validate}
          onSubmit={values => handleAddExp(values)}
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
            <form
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
              className={classes.formContent}>
              <div className={classes.errorWrapper}>
                {values.errors &&
                  Object.keys(values.errors).map(key => (
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
                id="title"
                label="Job title"
                fullWidth
                helperText={touched.title && errors.title}
                InputProps={{
                  placeholder: 'Job title',
                  value: values.title,
                  onChange: e => {
                    setFieldValue('title', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['title']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.title && errors.title !== undefined,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.title && errors.title !== undefined,
                }}
              />
              <TextField
                id="company"
                label="Company"
                fullWidth
                helperText={touched.company && errors.company}
                InputProps={{
                  placeholder: 'Company',
                  value: values.company,
                  onChange: e => {
                    setFieldValue('company', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['company']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.company && errors.company !== undefined,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.company && errors.company !== undefined,
                }}
              />
              <TextField
                id="location"
                label="Location"
                fullWidth
                helperText={touched.location && errors.location}
                InputProps={{
                  placeholder: 'location',
                  value: values.location,
                  onChange: e => {
                    setFieldValue('location', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['location']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.location && errors.location !== undefined,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.location && errors.location !== undefined,
                }}
              />
              <TextField
                id="from"
                label="From Date"
                fullWidth
                helperText={touched.from && errors.from}
                InputProps={{
                  type: 'date',
                  placeholder: 'From Date',
                  value: values.from,
                  onChange: e => {
                    setFieldValue('from', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['from']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.from && errors.from !== undefined,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.from && errors.from !== undefined,
                }}
              />
              <TextField
                id="to"
                label="To Date"
                fullWidth
                helperText={touched.to && errors.to}
                InputProps={{
                  disabled: values.current,
                  placeholder: 'To Date',
                  type: 'date',
                  value: values.to,
                  onChange: e => {
                    setFieldValue('to', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['to']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.to && errors.to !== undefined,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.to && errors.to !== undefined,
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="current"
                    checked={values.current}
                    onChange={handleChange}
                    value="CheckCurrent"
                    indeterminate
                  />
                }
                label="Current Job"
              />
              <TextField
                id="description"
                label="Job description"
                fullWidth
                helperText={touched.description && errors.description}
                multiline
                rows={3}
                InputProps={{
                  placeholder: 'Job description',
                  value: values.description,
                  onChange: e => {
                    setFieldValue('description', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['description']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error:
                    touched.description && errors.description !== undefined,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  error:
                    touched.description && errors.description !== undefined,
                }}
              />
              <Button
                variant="raised"
                color="primary"
                fullWidth
                type="submit"
                disabled={isLoading}>
                Add Experience
              </Button>
            </form>
          )}
        />
      </div>
    </Template>
  )
}

EducationForm.propTypes = {
  classes: object.isRequired,
  item: object.isRequired,
  isLoading: bool.isRequired,
  handleAddExp: func.isRequired,
  handleGoBack: func.isRequired,
  location: object.isRequired,
}

export default withStyles(styles)(EducationForm)
