import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { BasePage, PageLoader } from '../components';

// Dummy Token

const AuthRoute = ({ isAuthenticated, component: Component, ...rest }) =>
  isAuthenticated ? (
    <Redirect to={'/app'} />
  ) : (
    <Route
      {...rest}
      component={props => {
        return (
          <BasePage>
            <Suspense fallback={<PageLoader />}>
              <Component {...props} />
            </Suspense>
          </BasePage>
        )
      }}
    />
  )

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token,
})

export default connect(mapStateToProps)(AuthRoute)
