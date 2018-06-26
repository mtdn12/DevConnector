import { fromJS } from 'immutable'

// Post form
export const setInitialValues = state =>
  state.set(
    'post',
    fromJS({
      text: '',
    })
  )
export const showLoadingCreatePost = state => state.set('isLoadingCreate', true)
export const hideLoadingCreatePost = state =>
  state.set('isLoadingCreate', false)

// List post
export const showLoadingPosts = state =>
  state.setIn(['posts', 'isLoading'], true)
export const hideLoadingPosts = state =>
  state.setIn(['posts', 'isLoading'], false)
export const setPosts = action => state =>
  state
    .setIn(['posts', 'items'], fromJS(action.posts))
    .setIn(['posts', 'totalCount'], fromJS(action.totalCount))
export const setPostsFilterPage = action => state =>
  state.setIn(['posts', 'filter', 'page'], fromJS(action.page))
export const setPostsFilterLimit = action => state =>
  state.setIn(['posts', 'filter', 'limit'], fromJS(action.limit))
export const clearPostsFilter = state =>
  state.setIn(
    ['posts', 'filter'],
    fromJS({
      page: 0,
      limit: 10,
    })
  )
// Post detail

export const showLoadingPost = state =>
  state.setIn(['postView', 'isLoading'], true)
export const hideLoadingPost = state =>
  state.setIn(['postView', 'isLoading'], false)
export const setPost = action => state =>
  state.setIn(['postView', 'item'], fromJS(action.item))

export const setFormComment = action => state =>
  state.setIn(
    ['postView', 'formItem'],
    fromJS({
      text: '',
      postId: action.postId,
    })
  )
export const showLoadingCreateComment = state =>
  state.setIn(['postView', 'isLoadingCreate'], true)
export const hideLoadingCreateComment = state =>
  state.setIn(['postView', 'isLoadingCreate'], false)

export const showLoadingDeletePost = state =>
  state.setIn(['postView', 'isLoadingDelete'], true)
export const hideLoadingDeletePost = state =>
  state.setIn(['postView', 'isLoadingDelete'], false)
