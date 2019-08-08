import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { PageWrapper } from '../../../components'
import GoalList from '../Goal/GoalList'
import { TaskList } from '../Task';
import { Card } from 'react-bootstrap';

class SingleProject extends React.Component {

  render() {
    const { path } = this.props.match;
    return (
      <PageWrapper>
        <div className="content-heading">
          <div>Project</div>
        </div>

        <div className="container-fluid">
          <Switch>
            <Route path={path} component={() => (
              <Row>
                <Route path={path} exact={true} component={(props) => (
                  <React.Fragment>
                    <Col lg={4}>
                      <GoalList {...props} />
                    </Col>
                    <Col lg={8}>
                      <Card>
                        <Card.Header className="border-bottom pb-4">
                          <Card.Title className="mt-2 ml-3">
                            <strong>Tasks  </strong>
                          </Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <div className="d-flex align-items-center justify-content-center p-5 m-5 text-center flex-column">
                            <img alt="Task" src="https://img.icons8.com/cotton/64/000000/successfully-completed-task.png"></img>
                            <h2 className="w-50 mt-5 text-muted">Choose one goal from left to see your task </h2>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </React.Fragment>
                )} />
                <Route path={`${path}/goal/:goal_id/task`} exact={true} component={(props) => (
                  <React.Fragment>
                    <Col lg={4}>
                      <GoalList {...props} />
                    </Col>
                    <Col lg={8}>
                      <TaskList {...props} />
                    </Col>
                  </React.Fragment>
                )} />
              </Row>
            )} />
          </Switch>
        </div>
      </PageWrapper>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProject)
