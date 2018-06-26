import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Button,
  Paper,
  Grid,
  Avatar,
  CircularProgress,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import styles from './styles'
import { object, func, bool, string, any } from 'prop-types'
import { Template } from '../../'
import { Check } from '@material-ui/icons'

const ListProfile = props => {
  const {
    classes,
    isLoading,
    items,
    handleViewProfile,
    handleSearch,
    keyword,
    handleSetKeyword,
    page,
    limit,
    handleGoNextPage,
    handleGoPrevPage,
    handeChangeLimit,
    totalCount,
  } = props
  return (
    <Template>
      <div className={classes.bg}>
        <div className={classes.container}>
          <Typography variant="display1" align="center">
            Developer Profiles
          </Typography>
          <Typography variant="subheading" align="center">
            Browse and connect with developers
          </Typography>
          <TextField
            fullWidth
            InputProps={{
              placeholder: 'Search profile',
              value: keyword,
              onKeyPress: e => handleSearch(e),
              onChange: e => handleSetKeyword(e.target.value),
              disableUnderline: true,
            }}
          />
          {isLoading && (
            <div className={classes.loadingWrap}>
              <CircularProgress size={50} />
            </div>
          )}
          {!isLoading &&
            items.map(item => (
              <Paper key={item.get('_id')} className={classes.paper}>
                <Grid container spacing={40}>
                  <Grid item xs={8}>
                    <Grid container spacing={8} alignItems="center">
                      <Grid item xs={3}>
                        <Avatar
                          alt="avatar"
                          src={item.getIn(['user', 'avatar'])}
                          className={classes.avatar}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="title" gutterBottom>
                          {item.get('handle')}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {item.get('status')}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {item.get('location')}
                        </Typography>
                        <Button
                          variant="raised"
                          color="primary"
                          onClick={() =>
                            handleViewProfile(item.getIn(['user', '_id']))
                          }>
                          View Profile
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Skill Set</Typography>
                    {item.get('skills').map((skill, index) => (
                      <Typography key={index} className={classes.skill}>
                        <Check /> {skill}
                      </Typography>
                    ))}
                  </Grid>
                </Grid>
              </Paper>
            ))}
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

ListProfile.propTypes = {
  classes: object.isRequired,
  isLoading: bool.isRequired,
  items: object.isRequired,
  handleViewProfile: func.isRequired,
  handleSearch: func.isRequired,
  keyword: string.isRequired,
  handleSetKeyword: func.isRequired,
  page: any,
  limit: any,
  handleGoNextPage: func.isRequired,
  handleGoPrevPage: func.isRequired,
  handeChangeLimit: func.isRequired,
  totalCount: any,
}

export default withStyles(styles)(ListProfile)
