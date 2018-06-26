import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'

import { themeMui } from '../utils/themeMui'

import { ErrorBoundary } from '.'
import * as routes from './routes'
import { PrivateRoute } from '../containers'

const App = () => (
  <MuiThemeProvider theme={themeMui}>
    <ErrorBoundary>
      <CssBaseline />
      <Switch>
        <Route path="/welcome" component={routes.AsyncWelcome} />
        <Redirect exact from="/" to="/dashboard" />
        <PrivateRoute path="/dashboard" component={routes.AsyncDashboard} />
        <PrivateRoute
          exact
          path="/profile"
          component={routes.AsyncProfileForm}
        />
        <PrivateRoute
          path="/profile/experience"
          component={routes.AsyncExperienceForm}
        />
        <PrivateRoute
          path="/profile/education"
          component={routes.AsyncEducationForm}
        />
        <PrivateRoute path="/profile/all" component={routes.AsyncListProfile} />
        <PrivateRoute
          path="/profile/user/:user_id"
          component={routes.AsyncProfileDetail}
        />
        <PrivateRoute exact path="/posts" component={routes.AsyncListPost} />
        <PrivateRoute
          path="/posts/:post_id"
          component={routes.AsyncPostDetail}
        />
      </Switch>
    </ErrorBoundary>
  </MuiThemeProvider>
)

export default App
