import axios from 'axios'

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'

/**
|--------------------------------------------------
| Request get uesr profile
|--------------------------------------------------
*/

export const getProfile = () => axios.get('/api/profile/')

/**
|--------------------------------------------------
| Request get User profile by user_id
|--------------------------------------------------
*/

export const getProfileById = id => axios.get(`/api/profile/user/${id}`)

/**
|--------------------------------------------------
| Create or Edit Profile
|--------------------------------------------------
*/

export const setProfile = (
  handle,
  company,
  website,
  location,
  bio,
  status,
  githubName,
  skills,
  youtube,
  twitter,
  facebook,
  linkedin,
  instagram
) =>
  axios.post('/api/profile/', {
    handle,
    company,
    website,
    location,
    bio,
    status,
    github_user_name: githubName,
    skills,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  })
/**
|--------------------------------------------------
| Delete a Profile
|--------------------------------------------------
*/

export const deleteProfile = () => axios.delete('/api/profile/')

/**
|--------------------------------------------------
| Add job experience to Profile
|--------------------------------------------------
*/
export const addExperience = (
  title,
  company,
  location,
  from,
  to,
  current,
  description
) =>
  axios.post('/api/profile/experience', {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  })

/**
|--------------------------------------------------
| Add job education to Profile
|--------------------------------------------------
*/
export const addEducation = (
  school,
  degree,
  fieldOfStudy,
  from,
  to,
  current,
  description
) =>
  axios.post('/api/profile/education', {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
  })
/**
|--------------------------------------------------
| Delete job experience from Profile
|--------------------------------------------------
*/
export const deleteExperience = id =>
  axios.post(`/api/profile/experience/${id}`)

/**
|--------------------------------------------------
| Delete job Education from Profile
|--------------------------------------------------
*/
export const deleteEducation = id => axios.post(`/api/profile/education/${id}`)

/**
|--------------------------------------------------
| Get list Profile
|--------------------------------------------------
*/

export const getListProfile = filter =>
  axios.get('/api/profile/all', {
    params: { ...filter },
  })
