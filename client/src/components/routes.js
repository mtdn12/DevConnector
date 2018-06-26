import Loadable from 'react-loadable'

import { LoadingPage } from '.'

export const AsyncWelcome = Loadable({
  loader: () => import('../containers/WelcomePage'),
  loading: LoadingPage,
})

export const AsyncDashboard = Loadable({
  loader: () => import('../containers/Dashboard'),
  loading: LoadingPage,
})

export const AsyncProfileForm = Loadable({
  loader: () => import('../containers/ProfileForm'),
  loading: LoadingPage,
})

export const AsyncExperienceForm = Loadable({
  loader: () => import('../containers/ExperirenceForm'),
  loading: LoadingPage,
})

export const AsyncEducationForm = Loadable({
  loader: () => import('../containers/EducationForm'),
  loading: LoadingPage,
})

export const AsyncListProfile = Loadable({
  loader: () => import('../containers/ListProfile'),
  loading: LoadingPage,
})

export const AsyncProfileDetail = Loadable({
  loader: () => import('../containers/ProfileDetail'),
  loading: LoadingPage,
})

export const AsyncListPost = Loadable({
  loader: () => import('../containers/ListPost'),
  loading: LoadingPage,
})

export const AsyncPostDetail = Loadable({
  loader: () => import('../containers/PostDetail'),
  loading: LoadingPage,
})
