import axios from 'axios'

import { getToken } from '../utils/token'

export function configureApiSettings() {
  axios.defaults.headers.common['Authorization'] = getToken()
}

export default {
  development: {
    url: 'http://localhost:3000',
  },
  production: { url: 'http://localhost:8080' },
}
