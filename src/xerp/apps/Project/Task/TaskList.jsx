import React from 'react'
import { connect } from 'react-redux'
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { Row, Col } from 'react-bootstrap'
import { Button, Icon, List, Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import TaskCreate from './TaskCreate'
import { getTaskList, getGoal, CreateTask, CreateTaskDraft, deleteTask, UpdateTask } from '../../../redux';
import { toast } from 'react-toastify'
import { Swal, CircleSpinner } from '../../../container'
import TaskEdit from './TaskEdit'

class TaskList extends React.Component {
  state = {
    showModal: false,
    editModal: false,
    state: '',
    selectedTask: '',
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
    },
    loading: true,
    viewMode: 'classic'
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
      editModal: false
    })
    this.props.CreateTaskDraft()
  }

  async componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    console.log(query.get('view'))
    const goal_id = this.props.match.params.goal_id
    await this.props.getGoal(goal_id)
    try {
      await this.props.getTaskList(goal_id)
      this.setState({ loading: false })
    } catch (e) {
      toast(`Error ${e.status} - ${e.statusText}`, { type: 'error', position: 'bottom-right' })
      this.setState({ loading: false })
    }
  }

  handleOk = async () => {
    const { CreateTask, draft } = this.props;
    try {
      await CreateTask(draft)
      toast(`A new Task created`, { type: 'success', position: 'bottom-right' })
    } catch (e) {
      toast(`Error ${e.status} - ${e.statusText}`, { type: 'error', position: 'bottom-right' })
    } finally {
      this.setState({
        showModal: false,
      })
      this.props.CreateTaskDraft()
    }
  }

  handleDelete = async (isConfirm, swal, id) => {
    if (isConfirm) {
      try {
        await this.props.deleteTask(id, this.props.match.params.goal_id)
        swal("Deleted!", "The task has been deleted.", "success");
      } catch (e) {
        console.log(e)
        swal("Error", `${e.status} - ${e.message}`, "error");
      }
    } else {
      swal("Cancelled", "Task delete canceled :)", "error");
    }
  }

  editTask = (item) => {
    this.setState({
      editModal: true,
      selectedTask: item.id
    })
    this.props.CreateTaskDraft(item)
  }

  handleTaskUpdate = async () => {
    const { UpdateTask, draft } = this.props
    try {
      await UpdateTask(draft, this.state.selectedTask)
      toast(`Task updated successfully!`, { type: 'success', position: 'bottom-right' })
    } catch (e) {
      toast(`Error ${e.status} - ${e.statusText}`, { type: 'error', position: 'bottom-right' })
    } finally {
      this.setState({
        showModal: false,
        editModal: false
      })
      this.props.CreateTaskDraft();
    }
  }

  render() {
    const data = this.props.tasks
    const goal = this.props.goal

    return (
      <Card>
        <React.Fragment>
          <CardHeader className="border-bottom">
            <Row>
              <Col>
                <CardTitle className="mt-2 ml-3">
                  <strong>Tasks - <Link to="/app/project/">Goal</Link> / <span className="text-purple">{goal && goal.name}</span></strong>
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
              <TaskCreate
                title="Create a Task"
                visible={this.state.showModal}
                onOk={this.handleOk}
                onCancel={this.closeModal}
              />
              <TaskEdit
                title="Edit Task"
                visible={this.state.editModal}
                onOk={this.handleTaskUpdate}
                onCancel={this.closeModal}
                okText="Update"
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

            {this.state.loading ? <CircleSpinner /> :
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <Row className="w-100">
                      <Col lg={8} md={8} sm={12}>
                        <List.Item.Meta
                          title={
                            <Checkbox>
                              <Link to={'#'}>
                                {item.name}
                              </Link>
                            </Checkbox>
                          }
                          description={item.details}
                        />
                      </Col>
                      <Col lg={4} md={4} className="text-right">
                        <div>Action</div>
                        <span className="p-1 cursor-pointer text-primary" onClick={() => this.editTask(item)}>
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

                      <Col lg={12} md={12} className="mt-2">
                        <div>Start Date: {item.start_date} | End Date: {item.end_date}</div>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />}
          </CardBody>
        </React.Fragment>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  goal: state.goal.goal_created,
  tasks: state.task.tasks ? state.task.tasks.results : [],
  draft: state.task.draft
})

const mapDispatchToProps = (dispatch) => ({
  getTaskList: (goal_id) => dispatch(getTaskList(goal_id)),
  getGoal: (id) => dispatch(getGoal(id)),
  CreateTask: (payload) => dispatch(CreateTask(payload)),
  CreateTaskDraft: (payload) => dispatch(CreateTaskDraft(payload)),
  deleteTask: (id, goal_id) => dispatch(deleteTask(id, goal_id)),
  UpdateTask: (payload, id) => dispatch(UpdateTask(payload, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
