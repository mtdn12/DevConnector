import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import { object, bool, func, number } from 'prop-types'
import { Template } from '../../'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  Avatar,
  CircularProgress,
  IconButton,
  FormControl,
  Select,
} from '@material-ui/core'
import {
  ThumbUp,
  ThumbDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@material-ui/icons'
const ListPost = props => {
  const {
    classes,
    items,
    item,
    isLoading,
    handleGoNextPage,
    handleGoPrevPage,
    handeChangeLimit,
    page,
    limit,
    totalCount,
    handleCreatePost,
    handleAddLike,
    handleRemoveLike,
    userData,
    handleViewPostDetail,
  } = props
  return (
    <Template>
      <div className={classes.bg}>
        <div className={classes.container}>
          <Formik
            initialValues={item.toJS()}
            onSubmit={values => handleCreatePost(values)}
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
                      placeholder: 'Create a post',
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
                  <Button variant="raised" color="primary" type="submit">
                    Create
                  </Button>
                </Paper>
              </form>
            )}
          />
          {isLoading && (
            <div className={classes.loadingWrap}>
              <CircularProgress size={50} />
            </div>
          )}
          {!isLoading &&
            (items.size !== 0 &&
              items.map(post => (
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
                      <IconButton
                        disabled={
                          post
                            .get('likes')
                            .find(
                              like => like.get('user') === userData.get('id')
                            ) !== undefined
                        }
                        onClick={() => handleAddLike(post.get('_id'))}>
                        <ThumbUp />
                        <Typography variant="body1" className={classes.likes}>
                          {post.get('likes').size}
                        </Typography>
                      </IconButton>
                      <IconButton
                        disabled={
                          post
                            .get('likes')
                            .find(
                              like => like.get('user') === userData.get('id')
                            ) === undefined
                        }
                        onClick={() => handleRemoveLike(post.get('_id'))}>
                        <ThumbDown />
                      </IconButton>
                      <div>
                        <Button
                          variant="raised"
                          color="primary"
                          onClick={() => handleViewPostDetail(post.get('_id'))}>
                          Detail
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              )))}
          {!isLoading && (
            <div className={classes.pagination}>
              <FormControl>
                <Select
                  onChange={e => handeChangeLimit(e)}
                  value={limit}
                  inputProps={{
                    name: 'limit',
                  }}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </Select>
              </FormControl>
              <IconButton onClick={handleGoPrevPage} disabled={page === 0}>
                <KeyboardArrowLeft />
              </IconButton>
              <Typography variant="body1">{page + 1}</Typography>
              <IconButton
                onClick={handleGoNextPage}
                disabled={page === Math.floor(totalCount / limit)}>
                <KeyboardArrowRight />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </Template>
  )
}
ListPost.propTypes = {
  classes: object.isRequired,
  items: object.isRequired,
  item: object.isRequired,
  isLoading: bool.isRequired,
  handleGoNextPage: func.isRequired,
  handleGoPrevPage: func.isRequired,
  handeChangeLimit: func.isRequired,
  page: number.isRequired,
  limit: number.isRequired,
  totalCount: number.isRequired,
  handleCreatePost: func.isRequired,
  handleAddLike: func.isRequired,
  handleRemoveLike: func.isRequired,
  userData: object.isRequired,
  handleViewPostDetail: func.isRequired,
}

export default withStyles(styles)(ListPost)
