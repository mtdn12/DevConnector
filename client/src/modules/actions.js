// Auth actions

export {
  // Login
  openLoginDialog,
  closeLoginDialog,
  requestLogin,
  // Sign up
  openSignUpDialog,
  closeSignUpDailog,
  requestSignUp,
  // logout
  requestLogout,
} from './auth/actions'

// Notification

export { showNotification, hideNotification } from './notification/actions'

// Profile

export {
  requestProfile,
  setCreateProfile,
  setEditProfile,
  setProfileRequest,
  clearProfileForm,
  deleteProfile,
  // Experience
  setCreateExp,
  requestAddExp,
  clearExprForm,
  requestDeleteExp,
  // Education
  setCreateEdu,
  requestAddEdu,
  clearEduForm,
  requestDeleteEdu,
  // List profile
  requestGetProfiles,
  setProfilesFilterKeyword,
  clearProfilesFilter,
  setProfilesFilterPage,
  setProfilesFilterLimit,
  // Profile View
  requestProfileById,
} from './profile/actions'

export {
  requestGetPosts,
  setInitalForm,
  setPostsFilterPage,
  setPostsFilterLimit,
  clearPostsFilter,
  resquestCreatePost,
  // Like Post
  addLike,
  removeLike,
  // Post detail
  requestGetPost,
  setFormComment,
  requestCreateComment,
  requestDeletePost,
} from './post/actions'
