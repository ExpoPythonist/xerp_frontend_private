import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const AppRoute = ({
  isAuthenticated,
  component: Component,
  location,
  ...rest
}) => {
  return isAuthenticated ? (
    <React.Fragment>
      <Route
        {...rest}
        component={props => (
          <React.Fragment>
            <Component {...props} />
          </React.Fragment>
        )}
      />
    </React.Fragment>
  ) : (
      <Redirect to="/login" />
    )
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.token,
})

export default connect(mapStateToProps)(AppRoute)
