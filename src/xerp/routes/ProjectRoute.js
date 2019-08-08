import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ProjectRouter } from './Router'

class ProjectRoute extends React.Component {
  render() {
    const { location, match } = this.props
    return (
      <React.Fragment>
        <Switch location={location}>
          {ProjectRouter.map((item, key) => {
            return (
              <Route
                {...item}
                key={key}
                path={match.path + item.path}
              />
            )
          })}
        </Switch>
      </React.Fragment>
    )
  }
}

export default ProjectRoute
