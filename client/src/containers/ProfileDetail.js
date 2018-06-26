import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withReducer, withSaga } from '../utils'
import { profileReducer } from '../modules/reducers'
import { profileSaga } from '../modules/sagas'
import { ProfileDetail } from '../components'
import { requestProfileById } from '../modules/actions'
import {func, object} from 'prop-types'

class ProfileDetailContainer extends Component {
  static propTypes = {
    handleGetProfile: func.isRequired,
  }
  componentDidMount() {
    const id = this.props.match.params.user_id
    this.props.handleGetProfile(id)
  }
  render() {
    return <ProfileDetail {...this.props} />
  }
}

const mapStateToProps = state => ({
  item: state.getIn(['profile', 'profileView', 'item']),
  isLoading: state.getIn(['profile', 'profileView', 'isLoading']),
})

const mapDispatchToProps = dispatch => ({
  handleGetProfile: id => dispatch(requestProfileById(id)),
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
  ProfileDetailContainer
)
