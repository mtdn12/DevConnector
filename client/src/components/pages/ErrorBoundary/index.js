import React, { PureComponent } from 'react'
import { node } from 'prop-types'
import { AnnouncementTemplate } from '../../'

class ErrorBoundary extends PureComponent {
  static propTypes = {
    children: node,
  }

  state = {
    hasError: false,
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
  }
  render() {
    if (this.state.hasError) {
      return (
        <AnnouncementTemplate>
          Something is wrong here| Please try refresh
        </AnnouncementTemplate>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
