import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withReducer, withSaga } from '../utils'
import { ListProfile } from '../components'
import { profileReducer } from '../modules/reducers'
import { profileSaga } from '../modules/sagas'
import {
  requestGetProfiles,
  setProfilesFilterKeyword,
  clearProfilesFilter,
  setProfilesFilterPage,
  setProfilesFilterLimit,
} from '../modules/actions'
import { func, object } from 'prop-types'
import { push } from 'react-router-redux'

class ListProfileContainer extends Component {
  static propTypes = {
    handleGetProfiles: func,
    filter: object,
    handleSetKeyworld: func,
    handleClearFilter: func,
    handleSetPage: func,
    handleSetLimit: func,
  }
  componentDidMount() {
    this.props.handleClearFilter()
    const filter = this.props.filter.toJS()
    this.props.handleGetProfiles(filter)
  }
  handleSearch = e => {
    e.persist()
    if (e.charCode === 13) {
      this.props.handleGetProfiles(this.props.filter.toJS())
    }
  }
  handleGoNextPage = async () => {
    await this.props.handleSetPage(this.props.page + 1)
    this.props.handleGetProfiles(this.props.filter.toJS())
  }
  handleGoPrevPage = async () => {
    await this.props.handleSetPage(this.props.page - 1)
    this.props.handleGetProfiles(this.props.filter.toJS())
  }
  handeChangeLimit = async e => {
    await this.props.handleSetLimit(e.target.value)
    this.props.handleGetProfiles(this.props.filter.toJS())
  }
  render() {
    return (
      <ListProfile
        handleSearch={this.handleSearch}
        handleGoNextPage={this.handleGoNextPage}
        handleGoPrevPage={this.handleGoPrevPage}
        handeChangeLimit={this.handeChangeLimit}
        {...this.props}
      />
    )
  }
}
const mapStateToProps = state => ({
  isLoading: state.getIn(['profile', 'profiles', 'isLoading']),
  items: state.getIn(['profile', 'profiles', 'items']),
  filter: state.getIn(['profile', 'profiles', 'filter']),
  keyword: state.getIn(['profile', 'profiles', 'filter', 'keyword']),
  page: state.getIn(['profile', 'profiles', 'filter', 'page']),
  limit: state.getIn(['profile', 'profiles', 'filter', 'limit']),
  totalCount: state.getIn(['profile', 'profiles', 'totalCount']),
})

const mapDispatchToProps = dispatch => ({
  handleGetProfiles: filter => dispatch(requestGetProfiles(filter)),
  handleViewProfile: id => dispatch(push(`/profile/user/${id}`)),
  handleSetKeyword: keyword => dispatch(setProfilesFilterKeyword(keyword)),
  handleClearFilter: () => dispatch(clearProfilesFilter()),
  handleSetPage: page => dispatch(setProfilesFilterPage(page)),
  handleSetLimit: limit => dispatch(setProfilesFilterLimit(limit)),
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
  ListProfileContainer
)
