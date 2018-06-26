import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withReducer, withSaga } from '../utils'
import { postReducer } from '../modules/reducers'
import { postSaga } from '../modules/sagas'
import { ListPost } from '../components'
import { push } from 'react-router-redux'
import {
  requestGetPosts,
  setInitalForm,
  setPostsFilterLimit,
  setPostsFilterPage,
  clearPostsFilter,
  resquestCreatePost,
  // LIke post
  addLike,
  removeLike,
} from '../modules/actions'
import { func, object } from 'prop-types'

class ListPostContainer extends Component {
  static propTypes = {
    handleGetPosts: func.isRequired,
    filter: object.isRequired,
    handleSetIntialForm: func.isRequired,
    handleSetPage: func.isRequired,
    handleSetLimit: func.isRequired,
    handleClearFilter: func.isRequired,
  }
  componentDidMount() {
    this.props.handleGetPosts(this.props.filter.toJS())
    this.props.handleSetIntialForm()
    this.props.handleClearFilter()
  }
  handleGoNextPage = async () => {
    await this.props.handleSetPage(this.props.page + 1)
    this.props.handleGetPosts(this.props.filter.toJS())
  }
  handleGoPrevPage = async () => {
    await this.props.handleSetPage(this.props.page - 1)
    this.props.handleGetPosts(this.props.filter.toJS())
  }
  handeChangeLimit = async e => {
    await this.props.handleSetLimit(e.target.value)
    this.props.handleGetPosts(this.props.filter.toJS())
  }
  render() {
    return (
      <ListPost
        handleGoNextPage={this.handleGoNextPage}
        handleGoPrevPage={this.handleGoPrevPage}
        handeChangeLimit={this.handeChangeLimit}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => ({
  filter: state.getIn(['post', 'posts', 'filter']),
  items: state.getIn(['post', 'posts', 'items']),
  isLoading: state.getIn(['post', 'posts', 'isLoading']),
  item: state.getIn(['post', 'item']),
  page: state.getIn(['post', 'posts', 'filter', 'page']),
  limit: state.getIn(['post', 'posts', 'filter', 'limit']),
  totalCount: state.getIn(['post', 'posts', 'totalCount']),
  userData: state.getIn(['auth', 'data']),
})

const mapDispatchToProps = dispatch => ({
  handleGetPosts: filter => dispatch(requestGetPosts(filter)),
  handleSetIntialForm: () => dispatch(setInitalForm()),
  handleSetPage: page => dispatch(setPostsFilterPage(page)),
  handleSetLimit: limit => dispatch(setPostsFilterLimit(limit)),
  handleClearFilter: () => dispatch(clearPostsFilter()),
  handleCreatePost: values => dispatch(resquestCreatePost(values)),
  // Like Post
  handleAddLike: id => dispatch(addLike(id)),
  handleRemoveLike: id => dispatch(removeLike(id)),
  // post detail
  handleViewPostDetail: id => dispatch(push(`/posts/${id}`)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withPostReducer = withReducer({
  key: 'post',
  reducer: postReducer,
})
const withPostSaga = withSaga({
  key: 'post',
  saga: postSaga,
})

export default compose(withPostReducer, withPostSaga, withConnect)(
  ListPostContainer
)
