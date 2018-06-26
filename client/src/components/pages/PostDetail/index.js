import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import { object, func, bool } from 'prop-types'
import { Template } from '../../'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
  CircularProgress,
  Paper,
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'

const PostDetail = props => {
  const {
    classes,
    isLoading,
    item,
    formItem,
    handleCreateComment,
    handleDeletePost,
    userData,
    isLoadingCreate,
    isLoadingDelete,
  } = props
  return (
    <Template>
      <div className={classes.bg}>
        <div className={classes.container}>
          {isLoading && (
            <div className={classes.loadingWrap}>
              <CircularProgress size={50} />
            </div>
          )}
          {!isLoading && (
            <Paper className={classes.postWrapper}>
              <Grid container spacing={40} alignItems="center">
                <Grid item xs={2}>
                  <Avatar
                    alt="avatar for post"
                    src={item.get('avatar')}
                    className={classes.avatar}
                  />
                  <Typography variant="body1" align="center">
                    {item.get('name')}
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="body1" gutterBottom>
                    {item.get('text')}
                  </Typography>
                  {item.get('user') === userData.get('id') && (
                    <Button
                      variant="raised"
                      color="secondary"
                      disabled={isLoadingDelete}
                      onClick={() => handleDeletePost(item.get('_id'))}>
                      Delete
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Paper>
          )}
          {!isLoading && (
            <Formik
              initialValues={formItem.toJS()}
              onSubmit={values => handleCreateComment(values)}
              validationSchema={Yup.object().shape({
                text: Yup.string()
                  .min(6, 'Text need atlest 3 character')
                  .max(300, 'Maximum characters of Text field are 300')
                  .required(),
              })}
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
                  <Typography variant="body1" className={classes.subtitle}>
                    Say something...
                  </Typography>
                  <Paper className={classes.form}>
                    <TextField
                      id="text"
                      fullWidth
                      multiline
                      rows={5}
                      helperText={touched.text && errors.text}
                      InputProps={{
                        placeholder: 'Create a comment',
                        value: values.text,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        error: touched.text && errors.text !== undefined,
                        disableUnderline: true,
                      }}
                      InputLabelProps={{
                        shrink: true,
                        error: touched.text && errors.text !== undefined,
                      }}
                    />
                    <Button
                      variant="raised"
                      color="primary"
                      type="submit"
                      disabled={isLoadingCreate}>
                      Create
                    </Button>
                  </Paper>
                </form>
              )}
            />
          )}
          {!isLoading &&
            (item.get('comments').size !== 0 &&
              item.get('comments').map(post => (
                <Paper key={post.get('_id')} className={classes.postWrapper}>
                  <Grid container spacing={40} alignItems="center">
                    <Grid item xs={2}>
                      <Avatar
                        alt="avatar for post"
                        src={post.get('avatar')}
                        className={classes.avatar}
                      />
                      <Typography variant="body1" align="center">
                        {post.get('name')}
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant="body1">
                        {post.get('text')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              )))}
        </div>
      </div>
    </Template>
  )
}

PostDetail.propTypes = {
  classes: object.isRequired,
  isLoading: bool.isRequired,
  item: object.isRequired,
  formItem: object.isRequired,
  handleCreateComment: func.isRequired,
  handleDeletePost: func.isRequired,
  userData: object.isRequired,
  isLoadingCreate: bool.isRequired,
  isLoadingDelete: bool.isRequired,
}

export default withStyles(styles)(PostDetail)
