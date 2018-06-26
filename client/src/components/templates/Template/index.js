import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { node, object } from 'prop-types'
import { Notification, Navbar } from '../../../containers'

const NonAuthTemplate = ({ classes, children, ...props }) => (
  <div {...props}>
    <Navbar />
    <div className={classes.content}>{children}</div>
    <Notification />
  </div>
)

NonAuthTemplate.propTypes = {
  classes: object.isRequired,
  children: node.isRequired,
}

const styles = theme => ({

})

export default withStyles(styles)(NonAuthTemplate)
