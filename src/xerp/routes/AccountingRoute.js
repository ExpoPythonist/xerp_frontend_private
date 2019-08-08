import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { TaskCreate, TaskList } from '../apps'

class AccountingRoute extends React.Component {
  render() {
    const { location, match } = this.props
    return (
      <React.Fragment>
        <Switch location={location}>
          <Route
            path={`${match.path}/create-task`}
            exact={true}
            component={TaskCreate}
          />
          <Route
            path={`${match.path}/view-task`}
            exact={true}
            component={TaskList}
          />
        </Switch>
      </React.Fragment>
    )
  }
}

export default AccountingRoute
