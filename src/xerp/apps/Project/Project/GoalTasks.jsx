import React from 'react'
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from 'reactstrap'
import { Button, Icon, List, Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import CreateTask from './CreateTask'

class GoalTasks extends React.Component {
  state = {
    showModal: false,
  }

  showModal = e => {
    e.preventDefault()
    this.setState({
      showModal: true,
    })
  }

  closeModal = e => {
    e.preventDefault()
    this.setState({
      showModal: false,
    })
  }

  render() {
    const data = [
      {
        title: 'Project home page design',
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team',
        progress: 40,
      },
      {
        title: 'Apps home page design',
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team',
        progress: 60,
      },
      {
        title: 'xERP Mobile',
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team',

        progress: 90,
      },
      {
        title: 'xERP Other',
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team',
        progress: 100,
      },
    ]

    return (
      (this.props.task && this.props.task.length === 0)
        ? (
          <Card className="py-5 text-center">
            <CardBody>
              <h4 className="text-muted">There is no task</h4>
            </CardBody>
          </Card>
        )
        :
        <Card>
          <React.Fragment>
            <CardHeader className="border-bottom">
              <Row>
                <Col>
                  <CardTitle className="mt-2 ml-3">
                    <strong>Tasks</strong>
                  </CardTitle>
                </Col>
                <Col>
                  <Button
                    type="info"
                    shape="round"
                    icon="plus"
                    size="large"
                    onClick={this.showModal}
                    className="d-flex align-items-center pull-right"
                  >
                    Create Task
              </Button>
                </Col>
                <CreateTask
                  title="Create a Task"
                  visible={this.state.showModal}
                  onOk={this.handleOk}
                  onCancel={this.closeModal}
                />
              </Row>
            </CardHeader>
            <CardBody>
              <Row className="mb-3">
                <Col>
                  <Button
                    type="dashed"
                    shape="round"
                    size="small"
                    className="d-flex align-items-center pull-left ml-2"
                  >All</Button>
                  <Button
                    type="danger"
                    shape="round"
                    size="small"
                    className="d-flex align-items-center pull-left ml-2"
                  >To Do</Button>
                  <Button
                    type="primary"
                    shape="round"
                    size="small"
                    className="d-flex align-items-center pull-left ml-2"
                  >In Progress</Button>
                  <Button
                    type="default"
                    shape="round"
                    size="small"
                    className="d-flex align-items-center pull-left ml-2"
                  >Done</Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    shape="round"
                    size="small"
                    className="d-flex align-items-center pull-right mr-2"
                  >Classic View</Button>
                  <Button
                    type="default"
                    shape="round"
                    size="small"
                    className="d-flex align-items-center pull-right mr-2"
                  >Kanban View</Button>
                </Col>
              </Row>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item onClick={this.fetchTasks}>
                    <Col lg={8} sm={12}>
                      <List.Item.Meta
                        title={
                          <Checkbox>
                            <Link to={'/app/project/tasks/1'}>
                              {item.title}
                            </Link>
                          </Checkbox>
                        }
                        description={item.description}
                      />
                    </Col>
                    <Col lg={4} className="text-right">
                      <div>Action</div>
                      <span className="p-1 cursor-pointer">
                        <Icon type="edit" />
                      </span>
                      <span className="p-1 pr-0 cursor-pointer">
                        <Icon type="delete" />
                      </span>
                    </Col>
                  </List.Item>
                )}
              />
            </CardBody>
          </React.Fragment>
        </Card>
    )
  }
}

export default GoalTasks