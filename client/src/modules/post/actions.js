import { pipe } from '../../utils'
import * as mutators from './mutators'
/**
 * Constants
 */
// Post Form
const SET_INITIAL_VALUES = 'post/SET_INITIAL_VALUES'

const CREATE_POST_REQUEST = 'post/CREATE_POST_REQUEST'
const CREATE_POST_SUCCESS = 'post/CREATE_POST_SUCCESS'
const CREATE_POST_FAILURE = 'post/CREATE_POST_FAILURE'

// list Post

const GET_POSTS_REQUEST = 'post/GET_POSTS_REQUEST'
const GET_POSTS_SUCCESS = 'post/GET_POSTS_SUCCESS'
const GET_POSTS_FAILURE = 'post/GET_POSTS_FAILURE'

const SET_POSTS_FILTER_PAGE = 'post/SET_POSTS_FILTER_PAGE'
const SET_POSTS_FILTER_LIMIT = 'post/SET_POSTS_FILTER_LIMIT'
const CLEAR_POSTS_FILTER = 'post/CLEAR_POSTS_FILTER'

// LIke Post
const ADD_LIKE_REQUEST = 'post/ADD_LIKE_REQUEST'
const ADD_LIKE_SUCCESS = 'post/ADD_LIKE_SUCCESS'
const ADD_LIKE_FAILURE = 'post/ADD_LIKE_FAILURE'

const REMOVE_LIKE_REQUEST = 'post/REMOVE_LIKE_REQUEST'
const REMOVE_LIKE_SUCCESS = 'post/REMOVE_LIKE_SUCCESS'
const REMOVE_LIKE_FAILURE = 'post/REMOVE_LIKE_FAILURE'

// Post detail
const GET_POST_REQUEST = 'post/GET_POST_REQUEST'
const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS'
const GET_POST_FAILURE = 'post/GET_POST_FAILURE'

const SET_FORM_COMMENT_START = 'post/SET_FORM_COMMENT_START'

const CREATE_COMMENT_REQUEST = 'post/CREATE_COMMENT_REQUEST'
const CREATE_COMMENT_SUCCESS = 'post/CREATE_COMMENT_SUCCESS'
const CREATE_COMMENT_FAILURE = 'post/CREATE_COMMENT_FAILURE'

const DELETE_POST_REQUEST = 'post/DELETE_POST_REQUEST'
const DELETE_POST_SUCCESS = 'post/DELETE_POST_SUCCESS'
const DELETE_POST_FAILURE = 'post/DELETE_POST_FAILURE'

export const CONSTANTS = {
  // POst Form
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  // List posts
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  // Like a post
  ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAILURE,
  REMOVE_LIKE_REQUEST,
  REMOVE_LIKE_SUCCESS,
  REMOVE_LIKE_FAILURE,
  // Post Detail
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,

  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,

  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
}

// Action

// post form actions
export const setInitalForm = () => ({
  type: SET_INITIAL_VALUES,
})

export const resquestCreatePost = values => ({
  type: CREATE_POST_REQUEST,
  values,
})

// List post actions

export const requestGetPosts = filter => ({
  type: GET_POSTS_REQUEST,
  filter,
})

export const setPostsFilterPage = page => ({
  type: SET_POSTS_FILTER_PAGE,
  page,
})

export const setPostsFilterLimit = limit => ({
  type: SET_POSTS_FILTER_LIMIT,
  limit,
})

export const clearPostsFilter = () => ({
  type: CLEAR_POSTS_FILTER,
})
// Like post
export const addLike = id => ({
  type: ADD_LIKE_REQUEST,
  id,
})

export const removeLike = id => ({
  type: REMOVE_LIKE_REQUEST,
  id,
})
// Post Detail

export const requestGetPost = id => ({
  type: GET_POST_REQUEST,
  id,
})

export const setFormComment = postId => ({
  type: SET_FORM_COMMENT_START,
  postId,
})

export const requestCreateComment = values => ({
  type: CREATE_COMMENT_REQUEST,
  values,
})

export const requestDeletePost = id => ({
  type: DELETE_POST_REQUEST,
  id,
})

export const ActionHandler = {
  // Post form action handler
  [SET_INITIAL_VALUES]: state => pipe([mutators.setInitialValues], state),
  [CREATE_POST_REQUEST]: state => pipe([mutators.showLoadingCreatePost], state),
  [CREATE_POST_SUCCESS]: state => pipe([mutators.hideLoadingCreatePost], state),
  [CREATE_POST_FAILURE]: state => pipe([mutators.hideLoadingCreatePost], state),
  // List post action handler
  [GET_POSTS_REQUEST]: state => pipe([mutators.showLoadingPosts], state),
  [GET_POSTS_SUCCESS]: (state, action) =>
    pipe([mutators.hideLoadingPosts, mutators.setPosts(action)], state),
  [GET_POSTS_FAILURE]: state => pipe([mutators.hideLoadingPosts], state),
  [SET_POSTS_FILTER_PAGE]: (state, action) =>
    pipe([mutators.setPostsFilterPage(action)], state),
  [SET_POSTS_FILTER_LIMIT]: (state, action) =>
    pipe([mutators.setPostsFilterLimit(action)], state),
  [CLEAR_POSTS_FILTER]: state => pipe([mutators.clearPostsFilter], state),
  // Post Detail
  [GET_POST_REQUEST]: state => pipe([mutators.showLoadingPost], state),
  [GET_POST_SUCCESS]: (state, action) =>
    pipe([mutators.hideLoadingPost, mutators.setPost(action)], state),
  [GET_POST_FAILURE]: state => pipe([mutators.hideLoadingPost], state),
  [SET_FORM_COMMENT_START]: (state, action) =>
    pipe([mutators.setFormComment(action)], state),
  [CREATE_COMMENT_REQUEST]: state =>
    pipe([mutators.showLoadingCreateComment], state),
  [CREATE_COMMENT_SUCCESS]: (state, action) =>
    pipe(
      [
        mutators.hideLoadingCreateComment,
        mutators.setPost(action),
        mutators.setFormComment(action),
      ],
      state
    ),
  [CREATE_COMMENT_FAILURE]: state =>
    pipe([mutators.hideLoadingCreateComment], state),
  [DELETE_POST_REQUEST]: state => pipe([mutators.showLoadingDeletePost], state),
  [DELETE_POST_SUCCESS]: state => pipe([mutators.hideLoadingDeletePost], state),
  [DELETE_POST_FAILURE]: state => pipe([mutators.hideLoadingDeletePost], state),
}
