import React from 'react'
import { bool } from 'prop-types'
import { LinearProgress } from '@material-ui/core'

import { AnnouncementTemplate } from '../../'

const LoadingPage = props => {
  if (props.error) {
    console.log(props.error)
    throw new Error(`Couldn't load LoadingPage`)
  }
  return (
    <AnnouncementTemplate>
      <LinearProgress />
    </AnnouncementTemplate>
  )
}

LoadingPage.propTypes = {
  error: bool,
}

export default LoadingPage
