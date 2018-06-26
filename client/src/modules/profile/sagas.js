import { takeLatest, call, put, all } from 'redux-saga/effects'
import { CONSTANTS } from './actions'
import { push } from 'react-router-redux'
import { showNotification } from '../actions'
import {
  getProfile,
  setProfile,
  deleteProfile,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  getListProfile,
  getProfileById,
} from '../../api/profileApi'

function* requestProfileWorker() {
  try {
    const response = yield call(getProfile)
    if (response.data.result === 'fail') {
      throw new Error(response.data.message)
    }
    yield put({
      type: CONSTANTS.GET_PROFILE_SUCCESS,
      item: response.data,
    })
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_PROFILE_FAILURE,
    })
    yield put(showNotification(error.message))
  }
}

function* deleteProfileWorker() {
  try {
    const response = yield call(deleteProfile)
    if (response.data.result === 'fail') {
      throw new Error(response.data.message)
    }
    yield put({
      type: CONSTANTS.DELETE_PROFILE_SUCCESS,
    })
    yield put(showNotification('Delete Profile success'))
  } catch (error) {
    yield put(showNotification(error.message))
    yield put({
      type: CONSTANTS.DELETE_PROFILE_FAILURE,
    })
  }
}

function* requestSetProfileWorker({ values }) {
  try {
    const response = yield call(
      setProfile,
      values.handle,
      values.company,
      values.website,
      values.location,
      values.bio,
      values.status,
      values.githubName,
      values.skills,
      values.youtube,
      values.twitter,
      values.facebook,
      values.linkedin,
      values.instagram
    )
    if (response.data.result === 'fail') {
      const item = {
        ...values,
        errors: response.data.errors,
      }
      yield put({ type: CONSTANTS.SET_PROFILE_ERRORS, item })
      return
    }
    yield put({
      type: CONSTANTS.SET_PROFILE_SUCCESS,
      item: response.data,
    })
    yield put(showNotification('Set Profile success'))
    yield put(push('/'))
  } catch (error) {
    yield put({
      type: CONSTANTS.SET_PROFILE_FAILURE,
    })
    yield put(showNotification(error.message))
  }
}

function* addExperienceWorker({ values }) {
  try {
    const response = yield call(
      addExperience,
      values.title,
      values.company,
      values.location,
      values.from,
      values.to,
      values.current,
      values.description
    )

    if (response.data.result === 'fail') {
      const item = {
        ...values,
        errors: response.data.errors,
      }
      yield put({ type: CONSTANTS.ADD_EXP_ERRORS, item })
      return
    }
    yield put({
      type: CONSTANTS.ADD_EXP_SUCCESS,
      item: response.data,
    })
    yield put(showNotification('Add experience success'))
    yield put(push('/'))
  } catch (error) {
    yield put({
      type: CONSTANTS.ADD_EXP_FAILURE,
    })
    yield put(showNotification(error.message))
  }
}
function* addEducationWorker({ values }) {
  try {
    const response = yield call(
      addEducation,
      values.school,
      values.degree,
      values.fieldOfStudy,
      values.from,
      values.to,
      values.current,
      values.description
    )
    if (response.data.result === 'fail') {
      const item = {
        ...values,
        errors: response.data.errors,
      }
      yield put({ type: CONSTANTS.ADD_EDU_ERRORS, item })
      return
    }
    yield put({
      type: CONSTANTS.ADD_EDU_SUCCESS,
      item: response.data,
    })
    yield put(showNotification('Add experience success'))
    yield put(push('/'))
  } catch (error) {
    yield put({
      type: CONSTANTS.ADD_EDU_FAILURE,
    })
    yield put(showNotification(error.message))
  }
}

function* deleteEducationWorker({ id }) {
  try {
    const response = yield call(deleteEducation, id)
    if (response.data.result === 'fail') {
      throw new Error(response.data.message)
    }
    yield put({
      type: CONSTANTS.DELETE_EDU_SUCCESS,
      item: response.data,
    })
    yield put(showNotification('Delete education success'))
  } catch (error) {
    yield put({
      type: CONSTANTS.DELETE_EDU_FAILURE,
    })
    yield put(showNotification(error.message))
  }
}

function* deleteExperienceWorker({ id }) {
  try {
    const response = yield call(deleteExperience, id)
    if (response.data.result === 'fail') {
      throw new Error(response.data.message)
    }
    yield put({
      type: CONSTANTS.DELETE_EXP_SUCCESS,
      item: response.data,
    })
    yield put(showNotification('Delete education success'))
  } catch (error) {
    yield put({
      type: CONSTANTS.DELETE_EXP_FAILURE,
    })
    yield put(showNotification(error.message))
  }
}

// Get List Profile

function* getListProfileWorker({ filter }) {
  try {
    const response = yield call(getListProfile, filter)
    if (response.data.result === 'fail') {
      throw new Error(response.data.message)
    }
    yield put({
      type: CONSTANTS.GET_PROFILES_SUCCESS,
      items: response.data.profiles,
      totalCount: response.data.totalCount,
    })
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_PROFILES_REQUEST,
    })
    yield put(showNotification(error.message))
  }
}

function* getProfileByIdWorker({ id }) {
  try {
    const response = yield call(getProfileById, id)
    if (response.data.result === 'fail') {
      throw new Error(response.data.message)
    }
    yield put({
      type: CONSTANTS.GET_PROFILE_BY_ID_SUCCESS,
      item: response.data,
    })
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_PROFILE_BY_ID_FAILURE,
    })
    yield put(push('/profile/all'))
    yield put(showNotification(error.message))
  }
}

function* profileWatcher() {
  yield all([
    takeLatest(CONSTANTS.GET_PROFILE_REQUEST, requestProfileWorker),
    takeLatest(CONSTANTS.SET_PROFILE_REQUEST, requestSetProfileWorker),
    takeLatest(CONSTANTS.DELETE_PROFILE_REQUEST, deleteProfileWorker),
    takeLatest(CONSTANTS.ADD_EXP_REQUEST, addExperienceWorker),
    takeLatest(CONSTANTS.ADD_EDU_REQUEST, addEducationWorker),
    takeLatest(CONSTANTS.DELETE_EDU_REQUEST, deleteEducationWorker),
    takeLatest(CONSTANTS.DELETE_EXP_REQUEST, deleteExperienceWorker),
    takeLatest(CONSTANTS.GET_PROFILES_REQUEST, getListProfileWorker),
    takeLatest(CONSTANTS.GET_PROFILE_BY_ID_REQUEST, getProfileByIdWorker),
  ])
}

export default profileWatcher
