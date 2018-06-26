import { pipe } from '../../utils'
import * as mutators from './mutators'
/**
 * Constants
 */
const GET_PROFILE_REQUEST = 'profile/GET_PROFILE_REQUEST'
const GET_PROFILE_SUCCESS = 'profile/GET_PROFILE_SUCCESS'
const GET_PROFILE_FAILURE = 'profile/GET_PROFILE_FAILURE'

const GET_PROFILE_BY_ID_REQUEST = 'profile/GET_PROFILE_BY_ID_REQUEST'
const GET_PROFILE_BY_ID_SUCCESS = 'profile/GET_PROFILE_BY_ID_SUCCESS'
const GET_PROFILE_BY_ID_FAILURE = 'profile/GET_PROFILE_BY_ID_FAILURE'

const SET_CREATE_PROFILE = 'profile/SET_CREATE_PROFILE'
const SET_EDIT_PROFILE = 'profile/SET_EDIT_PROFILE'

const SET_PROFILE_REQUEST = 'profile/SET_PROFILE_REQUEST'
const SET_PROFILE_SUCCESS = 'profile/SET_PROFILE_SUCCESS'
const SET_PROFILE_FAILURE = 'profile/SET_PROFILE_FAILURE'
const SET_PROFILE_ERRORS = 'profile/SET_PROFILE_ERRORS'

const CLEAR_PROFILE_FORM = 'profile/CLEAR_PROFILE_FORM'

const DELETE_PROFILE_REQUEST = 'profile/DELETE_PROFILE_REQUEST'
const DELETE_PROFILE_SUCCESS = 'profile/DELETE_PROFILE_SUCCESS'
const DELETE_PROFILE_FAILURE = 'profile/DELETE_PROFILE_FAILURE'

// Experience

const SET_CREATE_EXP = 'profile/SET_CREATE_EXP'
const CLEAR_EXP_FORM = 'profile/CLEAR_EXP_FORM'

const ADD_EXP_REQUEST = 'profile/ADD_EXP_REQUEST'
const ADD_EXP_SUCCESS = 'profile/ADD_EXP_SUCCESS'
const ADD_EXP_FAILURE = 'profile/ADD_EXP_FAILURE'
const ADD_EXP_ERRORS = 'profile/ADD_EXP_ERRORS'

const DELETE_EXP_REQUEST = 'profile/DELETE_EXP_REQUEST'
const DELETE_EXP_FAILURE = 'profile/DELETE_EXP_FAILURE'
const DELETE_EXP_SUCCESS = 'profile/DELETE_EXP_SUCCESS'

// Education

const SET_CREATE_EDU = 'profile/SET_CREATE_EDU'
const CLEAR_EDU_FORM = 'profile/CLEAR_EDU_FORM'

const ADD_EDU_REQUEST = 'profile/ADD_EDU_REQUEST'
const ADD_EDU_SUCCESS = 'profile/ADD_EDU_SUCCESS'
const ADD_EDU_FAILURE = 'profile/ADD_EDU_FAILURE'
const ADD_EDU_ERRORS = 'profile/ADD_EDU_ERRORS'

const DELETE_EDU_REQUEST = 'profile/DELETE_EDU_REQUEST'
const DELETE_EDU_FAILURE = 'profile/DELETE_EDU_FAILURE'
const DELETE_EDU_SUCCESS = 'profile/DELETE_EDU_SUCCESS'

// List Profile

const GET_PROFILES_REQUEST = 'profile/GET_PROFILES_REQUEST'
const GET_PROFILES_SUCCESS = 'profile/GET_PROFILES_SUCCESS'
const GET_PROFILES_FAILURE = 'profile/GET_PROFILES_FAILURE'

const SET_PROFILES_FILTER_KEYWORLD = 'profile/SET_PROFILES_FILTER_KEYWORLD'
const CLEAR_PROFILES_FILTER = 'profile/CLEAR_PROFILES_FILTER'

const SET_PROFILES_FILTER_PAGE = 'profile/SET_PROFILES_FILTER_PAGE'
const SET_PROFILES_FILTER_LIMIT = 'profile/SET_PROFILES_FILTER_LIMIT'

export const CONSTANTS = {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,

  GET_PROFILE_BY_ID_REQUEST,
  GET_PROFILE_BY_ID_SUCCESS,
  GET_PROFILE_BY_ID_FAILURE,

  // Create or Edit profile
  SET_PROFILE_REQUEST,
  SET_PROFILE_SUCCESS,
  SET_PROFILE_FAILURE,
  SET_PROFILE_ERRORS,
  // Delete profile
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAILURE,
  // Experience
  ADD_EXP_REQUEST,
  ADD_EXP_SUCCESS,
  ADD_EXP_FAILURE,
  ADD_EXP_ERRORS,
  DELETE_EXP_REQUEST,
  DELETE_EXP_FAILURE,
  DELETE_EXP_SUCCESS,
  // Education
  ADD_EDU_REQUEST,
  ADD_EDU_SUCCESS,
  ADD_EDU_FAILURE,
  ADD_EDU_ERRORS,
  DELETE_EDU_REQUEST,
  DELETE_EDU_FAILURE,
  DELETE_EDU_SUCCESS,
  // List profile
  GET_PROFILES_REQUEST,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_FAILURE,
}

/**
 * Actions
 */
export const requestProfile = () => ({
  type: GET_PROFILE_REQUEST,
})

export const requestProfileById = id => ({
  type: GET_PROFILE_BY_ID_REQUEST,
  id,
})

// Create or edit profile
export const setCreateProfile = () => ({
  type: SET_CREATE_PROFILE,
})
export const setEditProfile = item => ({
  type: SET_EDIT_PROFILE,
  item,
})
export const setProfileRequest = values => ({
  type: SET_PROFILE_REQUEST,
  values,
})
export const clearProfileForm = () => ({
  type: CLEAR_PROFILE_FORM,
})
// Delete Profile
export const deleteProfile = () => ({
  type: DELETE_PROFILE_REQUEST,
})
// Experience

export const setCreateExp = () => ({
  type: SET_CREATE_EXP,
})
export const requestAddExp = values => ({
  type: ADD_EXP_REQUEST,
  values,
})
export const clearExprForm = () => ({
  type: CLEAR_EXP_FORM,
})

export const requestDeleteExp = id => ({
  type: DELETE_EXP_REQUEST,
  id,
})
// Education

export const setCreateEdu = () => ({
  type: SET_CREATE_EDU,
})
export const requestAddEdu = values => ({
  type: ADD_EDU_REQUEST,
  values,
})
export const clearEduForm = () => ({
  type: CLEAR_EDU_FORM,
})

export const requestDeleteEdu = id => ({
  type: DELETE_EDU_REQUEST,
  id,
})

// Get List profile
export const requestGetProfiles = filter => ({
  type: GET_PROFILES_REQUEST,
  filter,
})

export const setProfilesFilterKeyword = keyworld => ({
  type: SET_PROFILES_FILTER_KEYWORLD,
  keyworld,
})

export const clearProfilesFilter = () => ({
  type: CLEAR_PROFILES_FILTER,
})

export const setProfilesFilterPage = page => ({
  type: SET_PROFILES_FILTER_PAGE,
  page,
})

export const setProfilesFilterLimit = limit => ({
  type: SET_PROFILES_FILTER_LIMIT,
  limit,
})

/**
 * Handlers
 */
export const ActionHandler = {
  [GET_PROFILE_REQUEST]: state =>
    pipe([mutators.showLoadingProfile, mutators.clearData], state),
  [GET_PROFILE_SUCCESS]: (state, action) =>
    pipe([mutators.hideLoadingProfile, mutators.setData(action)], state),
  [GET_PROFILE_FAILURE]: state => pipe([mutators.hideLoadingProfile], state),
  [SET_CREATE_PROFILE]: state => pipe([mutators.setProfileFormCreate], state),
  [SET_EDIT_PROFILE]: (state, action) =>
    pipe([mutators.setProfileFormEdit(action)], state),

  // Create or Edit profile
  [SET_PROFILE_REQUEST]: state =>
    pipe([mutators.showLoadingProfileForm], state),
  [SET_PROFILE_SUCCESS]: (state, action) =>
    pipe(
      [
        mutators.hideLoadingProfileForm,
        mutators.setData(action),
        mutators.clearProfileForm,
      ],
      state
    ),
  [SET_PROFILE_FAILURE]: state =>
    pipe([mutators.hideLoadingProfileForm], state),
  [SET_PROFILE_ERRORS]: (state, action) =>
    pipe(
      [mutators.hideLoadingProfileForm, mutators.setProfileFormErrors(action)],
      state
    ),
  [CLEAR_PROFILE_FORM]: state => pipe([mutators.clearProfileForm], state),
  // Delete profile
  [DELETE_PROFILE_REQUEST]: state =>
    pipe([mutators.showLoadingDeleteProfile], state),
  [DELETE_PROFILE_SUCCESS]: state =>
    pipe([mutators.clearData, mutators.hideLoadingDeleteProfile], state),
  [DELETE_PROFILE_FAILURE]: state =>
    pipe([mutators.hideLoadingDeleteProfile], state),
  // Experiece action handler
  [SET_CREATE_EXP]: state => pipe([mutators.setExpFormCreate], state),
  [ADD_EXP_REQUEST]: state => pipe([mutators.showLoadingExpForm], state),
  [ADD_EXP_SUCCESS]: (state, action) =>
    pipe(
      [
        mutators.hideLoadingExpForm,
        mutators.setData(action),
        mutators.clearExpForm,
      ],
      state
    ),
  [ADD_EXP_ERRORS]: (state, action) =>
    pipe(
      [mutators.hideLoadingExpForm, mutators.setExpFromErrors(action)],
      state
    ),
  [ADD_EXP_FAILURE]: state => pipe([mutators.hideLoadingExpForm], state),
  [CLEAR_EXP_FORM]: state => pipe([mutators.clearExpForm], state),
  [DELETE_EXP_SUCCESS]: (state, action) =>
    pipe([mutators.setData(action)], state),
  // Experiece action handler
  [SET_CREATE_EDU]: state => pipe([mutators.setEduFormCreate], state),
  [ADD_EDU_REQUEST]: state => pipe([mutators.showLoadingEduForm], state),
  [ADD_EDU_SUCCESS]: (state, action) =>
    pipe(
      [
        mutators.hideLoadingEduForm,
        mutators.setData(action),
        mutators.clearEduForm,
      ],
      state
    ),
  [ADD_EDU_ERRORS]: (state, action) =>
    pipe(
      [mutators.hideLoadingEduForm, mutators.setEduFromErrors(action)],
      state
    ),
  [ADD_EDU_FAILURE]: state => pipe([mutators.hideLoadingEduForm], state),
  [CLEAR_EDU_FORM]: state => pipe([mutators.clearEduForm], state),
  [DELETE_EDU_SUCCESS]: (state, action) =>
    pipe([mutators.setData(action)], state),
  // List Profile
  [GET_PROFILES_REQUEST]: state => pipe([mutators.showLoadingProfiles], state),
  [GET_PROFILES_SUCCESS]: (state, action) =>
    pipe([mutators.hideLoadingProfiles, mutators.setProfiles(action)], state),
  [GET_PROFILES_FAILURE]: state => pipe([mutators.hideLoadingProfiles], state),
  [SET_PROFILES_FILTER_KEYWORLD]: (state, action) =>
    pipe([mutators.setProfilesFilterKeyworld(action)], state),
  [CLEAR_PROFILES_FILTER]: state => pipe([mutators.clearProfilesFilter], state),
  [SET_PROFILES_FILTER_PAGE]: (state, action) =>
    pipe([mutators.setProfilesFilterPage(action)], state),
  [SET_PROFILES_FILTER_LIMIT]: (state, action) =>
    pipe([mutators.setProfilesFilterLimit(action)], state),
  // Profile View
  [GET_PROFILE_BY_ID_REQUEST]: state =>
    pipe([mutators.showLoadingProfileView], state),
  [GET_PROFILE_BY_ID_SUCCESS]: (state, action) =>
    pipe(
      [mutators.hideLoadingProfileView, mutators.setProfileView(action)],
      state
    ),
  [GET_PROFILE_BY_ID_FAILURE]: state =>
    pipe([mutators.hideLoadingProfileView], state),
}
