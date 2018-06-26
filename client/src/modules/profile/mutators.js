import { fromJS } from 'immutable'

export const showLoadingProfile = state => state.set('isLoading', true)
export const hideLoadingProfile = state => state.set('isLoading', false)

export const setData = action => state => state.set('item', fromJS(action.item))
export const clearData = state => state.set('item', fromJS({}))

export const showLoadingDeleteProfile = state =>
  state.set('isLoadingDeleteProfile', true)
export const hideLoadingDeleteProfile = state =>
  state.set('isLoadingDeleteProfile', false)
// Profile form

export const setProfileFormCreate = state =>
  state.setIn(
    ['profileForm', 'item'],
    fromJS({
      id: 1,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      bio: '',
      githubName: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {},
    })
  )

export const setProfileFormEdit = action => state =>
  state.setIn(
    ['profileForm', 'item'],
    fromJS({
      id: action.item._id,
      handle: action.item.handle,
      comapny: action.item.company ? action.item.company : '',
      website: action.item.website ? action.item.website : '',
      location: action.item.location ? action.item.location : '',
      status: action.item.status ? action.item.status : '',
      skills: action.item.skills.join(','),
      bio: action.item.bio ? action.item.bio : '',
      githubName: action.item.github_user_name
        ? action.item.github_user_name
        : '',
      twitter: action.item.social.twitter ? action.item.social.twitter : '',
      facebook: action.item.social.facebook ? action.item.social.facebook : '',
      linkedin: action.item.social.linkedin ? action.item.social.linkedin : '',
      youtube: action.item.social.youtube ? action.item.social.youtube : '',
      instagram: action.item.social.instagram
        ? action.item.social.instagram
        : '',
      errors: {},
    })
  )
export const showLoadingProfileForm = state =>
  state.setIn(['profileForm', 'isLoading'], true)
export const hideLoadingProfileForm = state =>
  state.setIn(['profileForm', 'isLoading'], false)

export const setProfileFormErrors = action => state =>
  state.setIn(['profileForm', 'item'], fromJS(action.item))

export const clearProfileForm = state =>
  state.setIn(['profileForm', 'item'], fromJS({}))

// Experience Mutator
export const setExpFormCreate = state =>
  state.setIn(
    ['expForm', 'item'],
    fromJS({
      id: 1,
      title: '',
      company: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
    })
  )
export const clearExpForm = state =>
  state.setIn(['expForm', 'item'], fromJS({}))

export const showLoadingExpForm = state =>
  state.setIn(['expForm', 'isLoading'], true)
export const hideLoadingExpForm = state =>
  state.setIn(['expForm', 'isLoading'], false)
export const setExpFromErrors = action => state =>
  state.setIn(['expForm', 'item'], fromJS(action.item))

// Education Mutator
export const setEduFormCreate = state =>
  state.setIn(
    ['eduForm', 'item'],
    fromJS({
      id: 1,
      school: '',
      degree: '',
      fieldOfStudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
    })
  )
export const clearEduForm = state =>
  state.setIn(['eduForm', 'item'], fromJS({}))
export const showLoadingEduForm = state =>
  state.setIn(['eduForm', 'isLoading'], true)
export const hideLoadingEduForm = state =>
  state.setIn(['eduForm', 'isLoading'], false)
export const setEduFromErrors = action => state =>
  state.setIn(['eduForm', 'item'], fromJS(action.item))

// List Profile

export const showLoadingProfiles = state =>
  state.setIn(['profiles', 'isLoading'], true)
export const hideLoadingProfiles = state =>
  state.setIn(['profiles', 'isLoading'], false)
export const setProfiles = action => state =>
  state.setIn(['profiles', 'items'], fromJS(action.items))
      .setIn(['profiles', 'totalCount'], fromJS(action.totalCount))

export const setProfilesFilterKeyworld = action => state =>
  state.setIn(['profiles', 'filter', 'keyword'], fromJS(action.keyworld))
export const setProfilesFilterPage = action => state =>
  state.setIn(['profiles', 'filter', 'page'], fromJS(action.page))
export const setProfilesFilterLimit = action => state =>
  state.setIn(['profiles', 'filter', 'limit'], fromJS(action.limit))

export const clearProfilesFilter = state =>
  state.setIn(
    ['profiles', 'filter'],
    fromJS({
      keyword: '',
      page: 0,
      limit: 5,
    })
  )

// Profile to View
export const showLoadingProfileView = state =>
  state.setIn(['profileView', 'isLoading'], true)
export const hideLoadingProfileView = state =>
  state.setIn(['profileView', 'isLoading'], false)
export const setProfileView = action => state =>
  state.setIn(['profileView', 'item'], fromJS(action.item))
