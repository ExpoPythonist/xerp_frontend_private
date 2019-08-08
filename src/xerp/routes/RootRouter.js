import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { createBrowserHistory } from 'history'
import { Router, Switch, Route } from 'react-router-dom'

// Routes
import AuthRoute from './AuthRoute'
import PrivateRoute from './PrivateRoute'

// Index Routes

import { Auth, Public, Private } from './Router'
import { NotFound } from '../components'
import { PageLoader } from '../components/common/PageLoader'
import { Base } from '../components/layout/Base'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PublicRoute from './PublicRoute'
import AppList from './AppList'
import AppRoute from './AppRoute';

// Components

export const history = createBrowserHistory()

class RootRouter extends Component {
  render() {
    const { pathname } = history.location
    const currentKey = pathname.split('/')[1] || '/'
    const timeout = { enter: 500, exit: 500 }
    const animationName = 'rag-fadeIn'
    /* global PUBLIC_URL */
    const basename =
      process.env.NODE_ENV === 'development' ? '/' : PUBLIC_URL || '/'
    return (
      <Router history={history} basename={basename}>
        <Switch>
          {Public.map((R, k) => {
            return (
              <PublicRoute
                key={k}
                path={R.path}
                component={R.component}
                exact={R.exact}
              />
            )
          })}

          {Auth.map((R, k) => {
            return (
              <AuthRoute
                key={k}
                path={R.path}
                component={R.component}
                exact={R.exact}
              />
            )
          })}

          {Private.map((R, k) => {
            return (
              <PrivateRoute
                key={k}
                path={R.path}
                component={R.component}
                exact={R.exact}
              />
            )
          })}

          <Switch location={history.location}>
            <Route
              path="/app"
              component={props => (
                <Base>
                  <TransitionGroup>
                    <CSSTransition
                      key={currentKey}
                      timeout={timeout}
                      classNames={animationName}
                      exit={false}
                    >
                      <div>
                        <Suspense fallback={<PageLoader />}>
                          {AppList.map((R, k) => {
                            const path = props.match.path + R.route
                            return (
                              <AppRoute
                                key={k}
                                path={path}
                                component={R.component}
                                exact={R.exact}
                              />
                            )
                          })}
                        </Suspense>
                      </div>
                    </CSSTransition>
                  </TransitionGroup>
                </Base>
              )}
            />
            <Route component={NotFound} />
          </Switch>
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token,
})

export default connect(mapStateToProps)(RootRouter)
