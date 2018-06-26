import axios from 'axios'

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'

/**
|--------------------------------------------------
| Check User Login
|--------------------------------------------------
*/

export const login = (email, password) =>
  axios.post(`/api/users/login`, { email, password })

/**
|--------------------------------------------------
| Sign Up User
|--------------------------------------------------
*/

export const signUp = (name, email, password, password2) =>
  axios.post(`/api/users/register`, { name, email, password, password2 })
