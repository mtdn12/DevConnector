import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import { Typography, Button, CircularProgress } from '@material-ui/core'
import { Create, Add } from '@material-ui/icons'
import { object, func, bool } from 'prop-types'

import { Template, ExperirenceTable, EducationTable } from '../../'

const Dashboard = props => {
  const {
    classes,
    item,
    handleClickProfile,
    data,
    handleDeleteProfile,
    isLoading,
    handleClickExp,
    handleClickEdu,
    handleDeleteExp,
    handleDeleteEdu,
    isLoadingDeleteProfile,
  } = props
  return (
    <Template>
      <div className={classes.background}>
        <div className={classes.content}>
          <Typography variant="headline" align="center">
            Dashboard
          </Typography>
          <Typography>Welcome {data.get('name')}</Typography>
          {isLoading && (
            <div className={classes.loadingWrap}>
              <CircularProgress size={50} />
            </div>
          )}
          {!isLoading && (
            <React.Fragment>
              <div className={classes.btnWrapper}>
                <Button
                  variant="raised"
                  color="primary"
                  onClick={handleClickProfile}>
                  <Create /> {item.get('_id') ? 'Edit' : 'Create'} profile
                </Button>
                {item.get('_id') && (
                  <Button
                    variant="raised"
                    color="primary"
                    onClick={handleClickExp}
                    className={classes.btnCenter}>
                    <Add /> Add Experirence
                  </Button>
                )}
                {item.get('_id') && (
                  <Button
                    variant="raised"
                    color="primary"
                    onClick={handleClickEdu}>
                    <Add /> Add Education
                  </Button>
                )}
              </div>
              <ExperirenceTable
                handleDeleteExp={handleDeleteExp}
                items={item.get('experience') || []}
              />
              <EducationTable
                handleDeleteEdu={handleDeleteEdu}
                items={item.get('education') || []}
              />
              {item.get('_id') && (
                <Button
                  variant="raised"
                  color="secondary"
                  onClick={handleDeleteProfile}
                  disabled={isLoadingDeleteProfile}
                  className={classes.btnDelete}>
                  Delete Profile
                </Button>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </Template>
  )
}

Dashboard.propTypes = {
  classes: object.isRequired,
  item: object.isRequired,
  handleClickProfile: func.isRequired,
  data: object.isRequired,
  handleDeleteProfile: func.isRequired,
  isLoading: bool.isRequired,
  handleClickExp: func.isRequired,
  handleClickEdu: func.isRequired,
  handleDeleteExp: func.isRequired,
  handleDeleteEdu: func.isRequired,
  isLoadingDeleteProfile: bool.isRequired,
}

export default withStyles(styles)(Dashboard)
