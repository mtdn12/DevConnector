import { takeLatest, call, put, all, select } from 'redux-saga/effects'

import { CONSTANTS } from './actions'
import { push, goBack } from 'react-router-redux'
import {
  getListPost,
  createPost,
  addLike,
  removeLike,
  getPostDetail,
  createComment,
  deletePost,
} from '../../api/postApi'
import { requestGetPosts, setInitalForm } from './actions'

import { showNotification } from '../actions'

const getFilter = state => state.getIn(['post', 'posts', 'filter']).toJS() || {}

function* getListPostWorker({ filter }) {
  try {
    const respose = yield call(getListPost, filter)
    if (respose.data.result === 'fail') {
      throw new Error(respose.data.message)
    }
    yield put({
      type: CONSTANTS.GET_POSTS_SUCCESS,
      posts: respose.data.posts,
      totalCount: respose.data.totalCount,
    })
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_POSTS_FAILURE,
    })
    yield put(showNotification(error.message))
  }
}

function* createPostWorker({ values }) {
  try {
    const response = yield call(createPost, values.text)
    if (response.data.result === 'fail') {
      throw new Error(response.data.message)
    }
    yield put({
      type: CONSTANTS.CREATE_POST_SUCCESS,
    })
    const filter = yield select(getFilter)
    yield put(setInitalForm())
    yield put(requestGetPosts(filter))
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_POST_FAILURE,
    })
    yield put(showNotification(error.message))
  }
}

// Add like to a post

function* addLikeWorker({ id }) {
  try {
    const response = yield call(addLike, id)
    if (response.data.result === 'fail') {
      throw new Error(response.data.message)
    }
    yield put({
      type: CONSTANTS.ADD_LIKE_SUCCESS,
    })
    const filter = select(getFilter)
    yield put(requestGetPosts(filter))
  } catch (error) {
    yield put({
      type: CONSTANTS.ADD_LIKE_FAILURE,
    })
    yield put(showNotification(error.message))
  }
}

function* removeLikeWorker({ id }) {
  try {
    const response = yield call(removeLike, id)
    if (response.data.result === 'fail') {
      throw new Error(response.data.message)
    }
    yield put({
      type: CONSTANTS.REMOVE_LIKE_SUCCESS,
    })
    const filter = select(getFilter)
    yield put(requestGetPosts(filter))
  } catch (error) {
    yield put({
      type: CONSTANTS.REMOVE_LIKE_FAILURE,
    })
    yield put(showNotification(error.message))
  }
}
// Post detail
function* getPostDetailWorker({ id }) {
  try {
    const response = yield call(getPostDetail, id)
    if (response.data.result === 'fail') {
      yield put(goBack())
      throw new Error(response.data.message)
    }
    yield put({
      type: CONSTANTS.GET_POST_SUCCESS,
      item: response.data,
    })
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_POST_FAILURE,
    })
    yield put(showNotification(error.message))
  }
}

function* createCommentWorker({ values }) {
  try {
    const response = yield call(createComment, values.postId, values.text)
    if (response.data.result === 'fail') {
      throw new Error(response.data.message)
    }
    yield put({
      type: CONSTANTS.CREATE_COMMENT_SUCCESS,
      item: response.data,
      postId: values.postId,
    })
    yield put(showNotification('Create comment success'))
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_COMMENT_FAILURE,
    })
    yield put(showNotification(error.message))
  }
}

function* deletePostWorker({ id }) {
  try {
    const response = yield call(deletePost, id)
    if (response.data.result === 'fail') {
      throw new Error(response.data.message)
    }
    yield put({
      type: CONSTANTS.DELETE_POST_SUCCESS,
    })
    yield put(showNotification('Delete post success'))
    yield put(push('/posts/'))
  } catch (error) {
    yield put({
      type: CONSTANTS.DELETE_POST_FAILURE,
    })
    yield put(showNotification(error.message))
  }
}

function* postWatcher() {
  yield all([
    takeLatest(CONSTANTS.GET_POSTS_REQUEST, getListPostWorker),
    takeLatest(CONSTANTS.CREATE_POST_REQUEST, createPostWorker),
    takeLatest(CONSTANTS.ADD_LIKE_REQUEST, addLikeWorker),
    takeLatest(CONSTANTS.REMOVE_LIKE_REQUEST, removeLikeWorker),
    takeLatest(CONSTANTS.GET_POST_REQUEST, getPostDetailWorker),
    takeLatest(CONSTANTS.CREATE_COMMENT_REQUEST, createCommentWorker),
    takeLatest(CONSTANTS.DELETE_POST_REQUEST, deletePostWorker),
  ])
}

export default postWatcher
