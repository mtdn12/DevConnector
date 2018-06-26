import axios from 'axios'

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'
/**
|--------------------------------------------------
| Get list Post
|--------------------------------------------------
*/

export const getListPost = filter =>
  axios.get('/api/posts/', {
    params: { ...filter },
  })

/**
|--------------------------------------------------
| Get Post Detail
|--------------------------------------------------
*/

export const getPostDetail = id => axios.get(`/api/posts/${id}`)

/**
|--------------------------------------------------
| Create a post
|--------------------------------------------------
*/
export const createPost = text => axios.post('/api/posts/', { text })

/**
|--------------------------------------------------
| Add like to a post
  @param: post_id
|--------------------------------------------------
*/
export const addLike = id => axios.post(`/api/posts/like/${id}`)

/**
|--------------------------------------------------
| Remove like to a post
  just can remove if you already like this post
  @param: post_id
|--------------------------------------------------
*/
export const removeLike = id => axios.post(`/api/posts/unlike/${id}`)

/**
|--------------------------------------------------
| Create a comment
|--------------------------------------------------
*/
export const createComment = (postId, text) =>
  axios.post(`/api/posts/comment/${postId}`, { text })

/**
|--------------------------------------------------
| Delete a post
  @params: post_id
  @route: /api/posts/:post_id
|--------------------------------------------------
*/

export const deletePost = id => axios.delete(`/api/posts/${id}`)
