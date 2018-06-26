import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { bool, string, func, number } from 'prop-types'

import { toJS, withReducer } from '../utils'
import { Notification } from '../components'
import { hideNotification } from '../modules/actions'
import { notificationReducer } from '../modules/reducers'

const NotificationContainer = props => <Notification {...props} />

NotificationContainer.propTypes = {
  isOpen: bool,
  message: string.isRequired,
  duration: number.isRequired,
  onClose: func.isRequired,
}

const mapStateToProps = state => {
  return {
    isOpen: state.getIn(['notification', 'isOpen']),
    message: state.getIn(['notification', 'message']),
    duration: state.getIn(['notification', 'duration']),
  }
}

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(hideNotification()),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withNoticationReducer = withReducer({
  key: 'notification',
  reducer: notificationReducer,
})

export default compose(withNoticationReducer, withConnect, toJS)(
  NotificationContainer
)
