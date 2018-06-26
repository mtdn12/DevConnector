import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import { Template } from '../../'
import { object, bool } from 'prop-types'
import moment from 'moment'
import { Link, Redirect } from 'react-router-dom'
import {
  CircularProgress,
  Button,
  Paper,
  Avatar,
  Typography,
} from '@material-ui/core'
import * as FA from 'react-icons/lib/fa'

const ProfileDetail = props => {
  const { classes, isLoading, item, location } = props
  return (
    <Template>
      <div className={classes.bg}>
        {!item.get('_id') && (
          <Redirect
            to={{ pathname: '/profile/all', state: { from: location } }}
          />
        )}
        {isLoading && (
          <div className={classes.loadingWrap}>
            <CircularProgress size={50} />
          </div>
        )}

        {!isLoading && (
          <div className={classes.container}>
            <Link to="/profile/all" className={classes.Link}>
              <Button variant="raised">Back To Profiles</Button>
            </Link>
            <Paper className={classes.jumbotron}>
              <Avatar
                alt="avatar"
                src={item.getIn(['user', 'avatar'])}
                className={classes.avatar}
              />
              <Typography variant="display3" color="inherit">
                {item.get('handle')}
              </Typography>
              <Typography variant="headline" color="inherit" gutterBottom>
                {item.get('status')}
              </Typography>
              <Typography variant="subheading" color="inherit">
                {item.get('location')}
              </Typography>
              {item.getIn(['social', 'youtube']) && (
                <a
                  href={item.getIn(['social', 'youtube'])}
                  target="_blank"
                  className={classes.socialLink}>
                  <FA.FaYoutube />
                </a>
              )}
              {item.getIn(['social', 'facebook']) && (
                <a
                  href={item.getIn(['social', 'facebook'])}
                  target="_blank"
                  className={classes.socialLink}>
                  <FA.FaFacebook />
                </a>
              )}
              {item.getIn(['social', 'twitter']) && (
                <a
                  href={item.getIn(['social', 'twitter'])}
                  target="_blank"
                  className={classes.socialLink}>
                  <FA.FaTwitter />
                </a>
              )}
              {item.getIn(['social', 'linkedin']) && (
                <a
                  href={item.getIn(['social', 'linkedin'])}
                  target="_blank"
                  className={classes.socialLink}>
                  <FA.FaLinkedin />
                </a>
              )}
              {item.getIn(['social', 'instagram']) && (
                <a
                  href={item.getIn(['social', 'instagram'])}
                  target="_blank"
                  className={classes.socialLink}>
                  <FA.FaInstagram />
                </a>
              )}
            </Paper>
            <Paper className={classes.section1}>
              <div className={classes.bio}>
                <Typography
                  variant="title"
                  align="center"
                  color="inherit"
                  gutterBottom>{`${item.getIn([
                  'user',
                  'name',
                ])}'S Bio `}</Typography>
                <Typography>
                  {item.get('bio') ? item.get('bio') : 'No infomation'}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="title"
                  align="center"
                  color="inherit"
                  gutterBottom>
                  Skill Set
                </Typography>
                {item.get('skills') &&
                  item.get('skills').map((item, index) => (
                    <span key={index} className={classes.skillItem}>
                      <FA.FaCheck /> {item}
                    </span>
                  ))}
              </div>
            </Paper>
            <div className={classes.section2}>
              <div>
                <Typography variant="title" align="center" color="inherit">
                  Experience
                </Typography>
                {item.get('experience') &&
                  (item.get('experience').size === 0 ? (
                    <Paper className={classes.paperItem}>
                      <Typography>No infomation about Experience</Typography>
                    </Paper>
                  ) : (
                    item.get('experience').map((exp, index) => (
                      <Paper className={classes.paperItem} key={index}>
                        <Typography variant="title" gutterBottom>
                          {exp.get('company')}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {moment(exp.get('from')).format('DD-MM-YYYY')}---{exp.get(
                            'current'
                          )
                            ? 'current'
                            : moment(exp.get('to')).format('DD-MM-YYYY')}
                        </Typography>
                        <Typography variant="body1">
                          <b>Position:</b> {exp.get('title')}
                        </Typography>
                        <Typography variant="body1">
                          <b>Description:</b>
                          {exp.get('description')}
                        </Typography>
                      </Paper>
                    ))
                  ))}
              </div>
              <div>
                <Typography variant="title" align="center" color="inherit">
                  Education
                </Typography>
                {item.get('education') &&
                  (item.get('education').size === 0 ? (
                    <Paper className={classes.paperItem}>
                      <Typography variant="body1">
                        No infomation about Education
                      </Typography>
                    </Paper>
                  ) : (
                    item.get('education').map((edu, index) => (
                      <Paper className={classes.paperItem} key={index}>
                        <Typography variant="title" gutterBottom>
                          {edu.get('school')}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {moment(edu.get('from')).format('DD-MM-YYYY')}---{edu.get(
                            'current'
                          )
                            ? 'current'
                            : moment(edu.get('to')).format('DD-MM-YYYY')}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          <b>Degree:</b> {edu.get('degree')}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          <b>Field Of Study:</b> {edu.get('field_of_study')}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          <b>Description:</b>
                          {edu.get('description')}
                        </Typography>
                      </Paper>
                    ))
                  ))}
              </div>
            </div>
            <div className={classes.section3}>
              <Typography variant="title" align="center">
                Latest Github Repos
              </Typography>
            </div>
          </div>
        )}
      </div>
    </Template>
  )
}

ProfileDetail.propTypes = {
  classes: object.isRequired,
  isLoading: bool.isRequired,
  item: object.isRequired,
  location: object.isRequired,
}

export default withStyles(styles)(ProfileDetail)
