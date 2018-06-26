import React from 'react'
import { node, object } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  wrapper: {
    fontFamily: theme.typography.fontFamily,
  },
})

const AnnouncementTemplate = ({ classes, children, ...props }) => {
  return (
    <div className={classes.wrapper} {...props}>
      {children}
    </div>
  )
}

AnnouncementTemplate.propTypes = {
  children: node,
  classes: object,
}

export default withStyles(styles)(AnnouncementTemplate)
