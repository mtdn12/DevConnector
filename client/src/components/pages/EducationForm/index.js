import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import { Formik } from 'formik'
import { object, func, bool } from 'prop-types'
import { Redirect } from 'react-router-dom'
import { Template } from '../../'
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
  if (!values.school) errors.school = 'Please input school field'
  if (!values.degree) errors.degree = 'Please input degree field'
  if (!values.fieldOfStudy)
    errors.fieldOfStudy = ' Please input field of study field'
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
const ExperienceForm = props => {
  const {
    classes,
    item,
    isLoading,
    handleAddEdu,
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
          Add Your Education
        </Typography>
        <Typography align="center" variant="body1" gutterBottom color="inherit">
          Add any developer/programming positions that you have had in the past
        </Typography>
        <Formik
          initialValues={item.toJS()}
          validate={validate}
          onSubmit={values => handleAddEdu(values)}
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
                id="school"
                label="School"
                fullWidth
                helperText={touched.school && errors.school}
                InputProps={{
                  placeholder: 'School or Bootcamp',
                  value: values.school,
                  onChange: e => {
                    setFieldValue('school', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['school']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.school && errors.school !== undefined,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.school && errors.school !== undefined,
                }}
              />
              <TextField
                id="degree"
                label="Degree"
                fullWidth
                helperText={touched.degree && errors.degree}
                InputProps={{
                  placeholder: 'Degree or Certificate',
                  value: values.degree,
                  onChange: e => {
                    setFieldValue('degree', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['degree']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.degree && errors.degree !== undefined,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.degree && errors.degree !== undefined,
                }}
              />
              <TextField
                id="fieldOfStudy"
                label="Field Of Study"
                fullWidth
                helperText={touched.fieldOfStudy && errors.fieldOfStudy}
                InputProps={{
                  placeholder: 'Field Of Study',
                  value: values.fieldOfStudy,
                  onChange: e => {
                    setFieldValue('fieldOfStudy', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['fieldOfStudy']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error:
                    touched.fieldOfStudy && errors.fieldOfStudy !== undefined,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  error:
                    touched.fieldOfStudy && errors.fieldOfStudy !== undefined,
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
                label="Current School"
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

ExperienceForm.propTypes = {
  classes: object.isRequired,
  item: object.isRequired,
  isLoading: bool.isRequired,
  handleAddEdu: func.isRequired,
  handleGoBack: func.isRequired,
  location: object.isRequired,
}

export default withStyles(styles)(ExperienceForm)
