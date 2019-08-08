import React from 'react'
import { PageWrapper } from '../../../components';
import { Row, Col, Card } from 'react-bootstrap'
import { Avatar, Button, Icon, Input, List, Progress, Select, DatePicker } from 'antd'
import { Link } from 'react-router-dom'
import { Swal } from '../../../container/jsconfig'
import { allTaskList } from '../../../redux/actions'
import { connect } from 'react-redux'

const { Option } = Select
const { RangePicker } = DatePicker

class AllTasks extends React.Component {
  state = {
    showModal: false,
    search: '',
    start_date: '',
    end_date: '',
    enabled: '',
    swalOption5: {
      title: 'Are you sure?',
      text: 'Your will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: {
        cancel: {
          text: 'No, cancel!',
          value: null,
          visible: true,
          className: "",
          closeModal: false
        },
        confirm: {
          text: 'Yes, delete it!',
          value: true,
          visible: true,
          className: "bg-danger",
          closeModal: false
        }
      }
    }
  }

  componentDidMount() {
    this.allTasks('')
  }

  allTasks = async (params) => {
    try {
      await this.props.allTaskList(params);
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const data = this.props.tasks
    return (
      <React.Fragment>

        <PageWrapper>
          <div className="content-heading">
            <div>Goal</div>
          </div>

          <Row>
            <Col lg={12} md={12}>
              <Card>
                <Card.Header>
                  <Row className="mt-3">
                    <Col md={4} sm={12}>
                      <Button
                        type="primary"
                        htmlType="button"
                        shape="round"
                        size="small"
                        className="d-flex align-items-center pull-left ml-2"
                        onClick={ this.getEnabled }
                      >Open</Button>
                      <Button
                        type="default"
                        htmlType="button"
                        shape="round"
                        size="small"
                        className="d-flex align-items-center pull-left ml-2"
                        onClick={ this.getDisabled }
                      >Closed</Button>
                    </Col>
                    <Col md={4} sm={12}>
                      <RangePicker
                        className="w-100"
                        name="date-search"
                        onChange={this.onDateChange}
                      />
                    </Col>
                    <Col md={4} sm={12}>
                      <Input.Search placeholder="Search" name="search" className="pull-right" onChange={this.searchProjects}/>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                      <List.Item>
                        <Col lg={4} md={6} sm={12}>
                          <List.Item.Meta
                            avatar={
                              <Avatar size="large" icon="carry-out" className="d-flex align-items-center justify-content-center bg-white" />
                            }
                            title={
                              <Link to={`/app/project/${item.project}/goal/${item.id}/task`}>
                                {item.name}
                              </Link>
                            }
                            description={item.details || 'No Description'}
                          />
                        </Col>
                        <Col lg={8} md={6} sm={12}>
                          <Row>
                            <Col lg={2}>
                              <div>Owner</div>
                              <div>Me</div>
                            </Col>
                            <Col lg={2}>
                              <div>Start date</div>
                              <div>{item.start_date || ''}</div>
                            </Col>
                            <Col lg={2}>
                              <div>End date</div>
                              <div>{item.end_date || ''}</div>
                            </Col>
                            <Col lg={2}>
                              <div>Progress</div>
                              <div>
                                <Progress
                                  percent={item.progress}
                                  size="small"
                                />
                              </div>
                            </Col>
                            <Col lg={2} className="text-right">
                              <Select defaultValue="Open">
                                <Option value="Open">Open</Option>
                                <Option value="Closed">Closed</Option>
                              </Select>
                              <span>{/* <Icon type="delete" /> */}</span>
                            </Col>
                            <Col lg={2} className="text-right">
                              <div>Action</div>
                              <span className="p-1 cursor-pointer text-primary" onClick={() => this.EditProject(item)}>
                            <Icon type="edit" />
                          </span>
                              <span className="p-1 pr-0 cursor-pointer text-danger">
                            <Swal
                              options={this.state.swalOption5}
                              callback={(isConfirm, swal) => this.handleDelete(isConfirm, swal, item.id)}
                              className="btn btn-primary"
                            >
                              <Icon type="delete" />
                            </Swal>

                          </span>
                            </Col>
                          </Row>
                        </Col>
                      </List.Item>
                    )}
                  />
                </Card.Body>

                <Card.Footer>
                  <Card.Title>
                    <p>Showing 5 of 10 results</p>
                  </Card.Title>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </PageWrapper>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  tasks: state.task.tasks ? state.task.tasks.results : [],
  draft: state.task.draft
})

const mapDispatchToProps = dispatch => ({
  allTaskList: (params) => dispatch(allTaskList(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllTasks)