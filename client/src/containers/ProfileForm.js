import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func } from 'prop-types'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import { withReducer, withSaga } from '../utils'
import { ProfileForm } from '../components'
import { profileReducer } from '../modules/reducers'
import { profileSaga } from '../modules/sagas'
import { setProfileRequest, clearProfileForm } from '../modules/actions'

class ProfileFormContainer extends Component {
  static propTypes = {
    handleClearProfileForm: func.isRequired,
    handleGoBack: func.isRequired,
  }
  handleBack = () => {
    this.props.handleClearProfileForm()
    this.props.handleGoBack()
  }
  render() {
    return <ProfileForm handleBack={this.handleBack} {...this.props} />
  }
}

const mapStateToProps = state => ({
  item: state.getIn(['profile', 'profileForm', 'item']),
  isLoading: state.getIn(['profile', 'profileForm', 'isLoading']),
})

const mapDispatchToProps = dispatch => ({
  handleSetProfileRequest: values => dispatch(setProfileRequest(values)),
  handleClearProfileForm: () => dispatch(clearProfileForm()),
  handleGoBack: () => dispatch(push('/dashboard')),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withProfileReducer = withReducer({
  key: 'profile',
  reducer: profileReducer,
})
const withProfileSaga = withSaga({
  key: 'profile',
  saga: profileSaga,
})

export default compose(withProfileReducer, withProfileSaga, withConnect)(
  ProfileFormContainer
)
