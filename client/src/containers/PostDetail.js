import React, { Component } from 'react'
import { PostDetail } from '../components'
import { withReducer, withSaga } from '../utils'
import { postReducer } from '../modules/reducers'
import { postSaga } from '../modules/sagas'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  requestGetPost,
  setFormComment,
  requestCreateComment,
  requestDeletePost,
} from '../modules/actions'
import { object, func } from 'prop-types'

class PostDetailContainer extends Component {
  static propTypes = {
    handleGetPost: func.isRequired,
    match: object.isRequired,
    handleSetInitalForm: func.isRequired,
  }
  componentDidMount() {
    this.props.handleGetPost(this.props.match.params.post_id)
    this.props.handleSetInitalForm(this.props.match.params.post_id)
  }
  render() {
    return <PostDetail {...this.props} />
  }
}

const mapStateToProps = state => ({
  isLoading: state.getIn(['post', 'postView', 'isLoading']),
  item: state.getIn(['post', 'postView', 'item']),
  formItem: state.getIn(['post', 'postView', 'formItem']),
  userData: state.getIn(['auth', 'data']),
  isLoadingCreate: state.getIn(['post', 'postView', 'isLoadingCreate']),
  isLoadingDelete: state.getIn(['post', 'postView', 'isLoadingDelete']),
})

const mapDispatchToProps = dispatch => ({
  handleGetPost: id => dispatch(requestGetPost(id)),
  handleSetInitalForm: postId => dispatch(setFormComment(postId)),
  handleCreateComment: values => dispatch(requestCreateComment(values)),
  handleDeletePost: id => dispatch(requestDeletePost(id)),
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
  PostDetailContainer
)
