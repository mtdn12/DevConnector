import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func, object } from 'prop-types'
import { compose } from 'redux'
import { withReducer, withSaga } from '../utils'
import { Dashboard } from '../components'
import { profileReducer } from '../modules/reducers'
import { profileSaga } from '../modules/sagas'
import { push } from 'react-router-redux'
import {
  requestProfile,
  setCreateProfile,
  setEditProfile,
  deleteProfile,
  // Experience
  setCreateExp,
  requestDeleteExp,
  // Education
  setCreateEdu,
  requestDeleteEdu,
} from '../modules/actions'

class DashboardContainer extends Component {
  static propTypes = {
    handleGetProfile: func.isRequired,
    handleSetCreateProfile: func.isRequired,
    handleSetEditProfile: func.isRequired,
    handlePushToProfile: func.isRequired,
    item: object.isRequired,
    handleSetCreateExp: func.isRequired,
    handlePushToExp: func.isRequired,
    handleSetCreateEdu: func.isRequired,
    handlePushToEdu: func.isRequired,
  }
  handleClickProfile = () => {
    this.props.item.toJS()._id
      ? this.props.handleSetEditProfile(this.props.item.toJS())
      : this.props.handleSetCreateProfile()
    this.props.handlePushToProfile()
  }
  handleClickExp = () => {
    this.props.handleSetCreateExp()
    this.props.handlePushToExp()
  }
  handleClickEdu = () => {
    this.props.handleSetCreateEdu()
    this.props.handlePushToEdu()
  }
  componentDidMount() {
    this.props.handleGetProfile()
  }
  render() {
    return (
      <Dashboard
        handleClickProfile={this.handleClickProfile}
        handleClickExp={this.handleClickExp}
        handleClickEdu={this.handleClickEdu}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => ({
  item: state.getIn(['profile', 'item']),
  data: state.getIn(['auth', 'data']),
  isLoading: state.getIn(['profile', 'isLoading']),
  isLoadingDeleteProfile: state.getIn(['profile', 'isLoadingDeleteProfile']),
})

const mapDispatchToProps = dispatch => ({
  handleGetProfile: () => dispatch(requestProfile()),
  handleSetCreateProfile: () => dispatch(setCreateProfile()),
  handleSetEditProfile: item => dispatch(setEditProfile(item)),
  handlePushToProfile: () => dispatch(push('/profile')),
  handleDeleteProfile: () => dispatch(deleteProfile()),
  // Experience
  handlePushToExp: () => dispatch(push('/profile/experience')),
  handleSetCreateExp: () => dispatch(setCreateExp()),
  handleDeleteExp: id => dispatch(requestDeleteExp(id)),
  // Education
  handlePushToEdu: () => dispatch(push('/profile/education')),
  handleSetCreateEdu: () => dispatch(setCreateEdu()),
  handleDeleteEdu: id => dispatch(requestDeleteEdu(id)),
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
  DashboardContainer
)
