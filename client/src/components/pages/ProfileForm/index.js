import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import { Formik } from 'formik'
import { object, func, bool } from 'prop-types'
import * as Yup from 'yup'
import { Template } from '../../'
import { Redirect } from 'react-router-dom'
import {
  Typography,
  TextField,
  FormControl,
  Select,
  InputLabel,
  InputAdornment,
  Button,
  FormHelperText,
} from '@material-ui/core'
import { Pages, ArrowBack } from '@material-ui/icons'

const JobList = [
  'Developer',
  'Junior Developer',
  'Senior Developer',
  'Manager',
  'Student or Learning',
  'Instructor or Teacher',
  'Intern',
  'Other',
]

const ProfileForm = props => {
  const {
    classes,
    handleSetProfileRequest,
    isLoading,
    handleBack,
    location,
  } = props
  const item = props.item.toJS()
  return (
    <Template>
      <div className={classes.contentWrapper}>
        {!item.id && (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        )}
        <Button
          variant="raised"
          color="inherit"
          className={classes.btn}
          onClick={handleBack}>
          <ArrowBack /> Back
        </Button>
        <Typography variant="headline" align="center" color="inherit">
          {item.id === 1 ? 'Create' : 'Edit'} Your profile
        </Typography>
        <Typography align="center" variant="body1" gutterBottom color="inherit">
          Let's get some infomation to make your profile stand out
        </Typography>
        <Formik
          initialValues={item}
          validationSchema={Yup.object().shape({
            handle: Yup.string()
              .min(2, 'Hanle must have atleast 2 characters')
              .max(40, 'Maximum characters of handle is 40')
              .required('Please input Handle field'),
            status: Yup.string().required('Please select Job status'),
            skills: Yup.string().required('Please input Skills field'),
            website: Yup.string().url('Not a valid Url'),
            twitter: Yup.string().url('Not a valid Url'),
            youtube: Yup.string().url('Not a valid Url'),
            facebook: Yup.string().url('Not a valid Url'),
            instagram: Yup.string().url('Not a valid Url'),
            linkedin: Yup.string().url('Not a valid Url'),
          })}
          onSubmit={values => handleSetProfileRequest(values)}
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
                id="handle"
                label="A unique handle for your profile (this CAN'T be changed later)"
                fullWidth
                helperText={touched.handle && errors.handle}
                InputProps={{
                  placeholder: 'Profile handle',
                  value: values.handle,
                  onChange: e => {
                    setFieldValue('handle', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['handle']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.handle && errors.handle !== undefined,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.handle && errors.handle !== undefined,
                }}
              />
              <FormControl style={{ width: '100%' }}>
                <InputLabel htmlFor="status" shrink>
                  Give us an idea of Where you are at in your career
                </InputLabel>
                <Select
                  native
                  error={touched.status && errors.status !== undefined}
                  value={values.status}
                  onChange={handleChange}
                  inputProps={{
                    name: 'status',
                    id: 'status',
                    placeholder: 'Job Status',
                  }}>
                  <option disabled>*Select profestional status</option>
                  <option value="">None</option>
                  {JobList.map(job => (
                    <option value={job} key={job}>
                      {job}
                    </option>
                  ))}
                </Select>
                {touched.status &&
                  errors.status && (
                    <FormHelperText
                      error={touched.status && errors.status !== undefined}>
                      {touched.status && errors.status}
                    </FormHelperText>
                  )}
              </FormControl>
              <TextField
                id="company"
                label="Could be your own company or one you work for"
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
                id="website"
                label="Could be your own or a company website"
                fullWidth
                helperText={touched.website && errors.website}
                InputProps={{
                  placeholder: 'Website',
                  value: values.website,
                  onChange: e => {
                    setFieldValue('website', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['website']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.website && errors.website !== undefined,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.website && errors.website !== undefined,
                }}
              />
              <TextField
                id="location"
                label="City & state suggested (eg, Boston, MA)"
                fullWidth
                helperText={touched.location && errors.location}
                InputProps={{
                  placeholder: 'Location',
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
                id="skills"
                label="Please use comma  seperated values (eg , HTML, CSS, Javascript, NodeJs)"
                fullWidth
                helperText={touched.skills && errors.skills}
                InputProps={{
                  placeholder: 'skills',
                  value: values.skills,
                  onChange: e => {
                    setFieldValue('skills', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['skills']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.skills && errors.skills !== undefined,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.skills && errors.skills !== undefined,
                }}
              />
              <TextField
                id="githubName"
                label="if you want your latest repos and a Github link , include your username"
                fullWidth
                helperText={touched.githubName && errors.githubName}
                InputProps={{
                  placeholder: 'githubName',
                  value: values.githubName,
                  onChange: e => {
                    setFieldValue('githubName', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['githubName']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.githubName && errors.githubName !== undefined,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.githubName && errors.githubName !== undefined,
                }}
              />
              <TextField
                id="bio"
                label="Tell us a litte about yourSelf"
                fullWidth
                helperText={touched.bio && errors.bio}
                multiline
                rows={3}
                InputProps={{
                  placeholder: 'bio',
                  value: values.bio,
                  onChange: e => {
                    setFieldValue('bio', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['bio']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.bio && errors.bio !== undefined,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.githubName && errors.githubName !== undefined,
                }}
              />
              <Typography>Add Social Netword Links (Optional)</Typography>
              <TextField
                id="twitter"
                fullWidth
                helperText={touched.twitter && errors.twitter}
                InputProps={{
                  placeholder: 'twitter',
                  value: values.twitter,
                  onChange: e => {
                    setFieldValue('twitter', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['twitter']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.twitter && errors.twitter !== undefined,
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Pages />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.twitter && errors.twitter !== undefined,
                }}
              />
              <TextField
                id="facebook"
                fullWidth
                helperText={touched.facebook && errors.facebook}
                InputProps={{
                  placeholder: 'facebook',
                  value: values.facebook,
                  onChange: e => {
                    setFieldValue('facebook', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['facebook']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.facebook && errors.facebook !== undefined,
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Pages />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.facebook && errors.facebook !== undefined,
                }}
              />
              <TextField
                id="linkedin"
                fullWidth
                helperText={touched.linkedin && errors.linkedin}
                InputProps={{
                  placeholder: 'linkedin',
                  value: values.linkedin,
                  onChange: e => {
                    setFieldValue('linkedin', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['linkedin']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.linkedin && errors.linkedin !== undefined,
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Pages />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.linkedin && errors.linkedin !== undefined,
                }}
              />
              <TextField
                id="youtube"
                fullWidth
                helperText={touched.youtube && errors.youtube}
                InputProps={{
                  placeholder: 'youtube',
                  value: values.youtube,
                  onChange: e => {
                    setFieldValue('youtube', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['youtube']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.youtube && errors.youtube !== undefined,
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Pages />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.youtube && errors.youtube !== undefined,
                }}
              />
              <TextField
                id="instagram"
                fullWidth
                helperText={touched.instagram && errors.instagram}
                InputProps={{
                  placeholder: 'instagram',
                  value: values.instagram,
                  onChange: e => {
                    setFieldValue('instagram', e.target.value)
                    let errors = Object.assign({}, values.errors)
                    delete errors['instagram']
                    setFieldValue('errors', errors)
                  },
                  onBlur: handleBlur,
                  error: touched.instagram && errors.instagram !== undefined,
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Pages />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                  error: touched.instagram && errors.instagram !== undefined,
                }}
              />
              <Button
                variant="raised"
                color="primary"
                fullWidth
                type="submit"
                disabled={isLoading}>
                {values.id === 1 ? 'Create' : 'Save'}
              </Button>
            </form>
          )}
        />
      </div>
    </Template>
  )
}

ProfileForm.propTypes = {
  classes: object.isRequired,
  item: object.isRequired,
  handleSetProfileRequest: func.isRequired,
  isLoading: bool.isRequired,
  handleBack: func.isRequired,
  location: object.isRequired,
}

export default withStyles(styles)(ProfileForm)
