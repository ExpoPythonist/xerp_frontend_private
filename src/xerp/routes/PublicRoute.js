import React, { Suspense } from 'react'
import { PageLoader } from '../components/common/PageLoader';
import { BasePage } from '../components/layout/BasePage';
import { Route, Switch } from 'react-router-dom';

const PublicRoute = ({
  isAuthenticated,
  component: Component,
  location,
  ...rest
}) => {
  return (
    <BasePage>
      <Suspense fallback={<PageLoader />}>
        <Switch location={location}>
          <Route
            {...rest}
            component={props => (
              <React.Fragment>
                <Component {...props} />
              </React.Fragment>
            )}
          />
        </Switch>
      </Suspense>
    </BasePage>
  )
}

export default PublicRoute;