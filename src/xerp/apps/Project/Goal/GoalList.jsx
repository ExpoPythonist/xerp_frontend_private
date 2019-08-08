import React from 'react'
import { Col, Row, Card } from 'react-bootstrap'
import { Icon, List, Button } from 'antd'
import GoalEdit from './GoalEdit'
import { Link } from 'react-router-dom'
import { getGoalList, CreateGoalDraft, UpdateGoal, deleteGoal, CreateGoal, getProject } from '../../../redux'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { Swal } from '../../../container';
import GoalCreate from './GoalCreate';
import { setErrToast } from '../../../../core/lib';

class GoalList extends React.Component {
  state = {
    showTasks: this.props.task,
    showModal: false,
    createModal: false,
    selectedGoal: '',
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
    project_id: null
  }

  closeModal = e => {
    e.preventDefault()
    this.setState({
      showModal: false,
      createModal: false
    })
    this.props.CreateGoalDraft()
  }

  fetchTasks = () => {
    this.setState({
      showTasks: true
    })
  }

  async componentDidMount() {
    // await this.props.getProject(this.props.match.params.id)
    this.getGoals();

  }

  getGoals = async () => {
    const project_id = this.props.match.params.id;
    this.setState({ project_id })
    try {
      await this.props.getGoalList(project_id);
    } catch (e) {
      console.log(e)
    } finally {
      this.setState({ loading: false })
    }
  }

  EditGoal = (item) => {
    this.setState({
      showModal: true,
      selectedGoal: item.id
    })
    this.props.CreateGoalDraft(item)
  }



  showModal = e => {
    e.preventDefault()
    this.setState({
      createModal: true
    })
  }

  onClickCreateGoal = async () => {
    const { CreateGoal, draft } = this.props
    try {
      await CreateGoal(draft)
      toast(`Goal created successfully!`, { type: 'success', position: 'bottom-right' })
    } catch (e) {
      console.log(e)
      toast(setErrToast(e), { type: 'error', position: 'bottom-right' })
    } finally {
      this.setState({
        createModal: false
      })
    }
  }

  handleEdit = async () => {
    const { UpdateGoal, draft } = this.props
    try {
      await UpdateGoal(draft, this.state.selectedGoal)
      toast(`Goal updated successfully!`, { type: 'success', position: 'bottom-right' })
    } catch (e) {
      toast(`Error ${e.status} - ${e.statusText}`, { type: 'error', position: 'bottom-right' })
    } finally {
      this.setState({
        showModal: false,
      })
      this.props.CreateGoalDraft();
    }
  }

  handleDelete = async (isConfirm, swal, id) => {
    if (isConfirm) {
      try {
        await this.props.deleteGoal(id, this.props.match.params.id)
        swal("Deleted!", "The goal has been deleted.", "success");
      } catch (e) {
        swal("Error", `${e.status} - ${e.message}`, "error");
      } finally {
        if (Number(this.props.match.params.goal_id) === Number(id)) {
          this.props.history.push('/app/project/' + this.props.match.params.id)
        }
      }
    } else {
      swal("Cancelled", "Goal delete canceled :)", "error");
    }
  }

  render() {
    const data = this.props.goals;
    const { match } = this.props;
    const { params } = match;
    const { goal_id } = params
    return (
      <React.Fragment>

        <GoalEdit
          title="Edit Goal"
          visible={this.state.showModal}
          onOk={this.handleEdit}
          onCancel={this.closeModal}
          okText="Update"
        />

        <Card id="goal-list">
          <Card.Header className="border-bottom">
            <Row>
              <Col>
                <Card.Title className="mt-2 ml-3">
                  <strong>Project Goals</strong>
                </Card.Title>
              </Col>
              {params.id &&
                <Col>
                  <Button
                    type="info"
                    shape="round"
                    icon="plus"
                    size="large"
                    onClick={this.showModal}
                    className="d-flex align-items-center pull-right"
                  >
                    Create Goal
              </Button>
                </Col>
              }
              <GoalCreate
                title="Create a Goal"
                visible={this.state.createModal}
                onOk={this.onClickCreateGoal}
                onCancel={this.closeModal}
                params={params}
              />
            </Row>
          </Card.Header>
          <Card.Body className="w-100 py-0">
            <List
              itemLayout="vertical"
              dataSource={data}
              renderItem={item => (
                <List.Item onClick={this.fetchTasks} className={`row ${Number(goal_id) === Number(item.id) ? 'active' : ''}`}>
                  <Row className={`w-100 m-0 `}>
                    <Col lg={8} sm={12}>
                      <List.Item.Meta
                        title={
                          <div>
                            <Link className="card-title" to={`/app/project/${match.params.id}/goal/${item.id}/task`}>
                              {item.name}
                            </Link><br />
                          </div>
                        }
                        description={
                          <div className="card-text">
                            {item.details.substring(0, item.details.substring(0, 60).lastIndexOf(' '))}
                          </div>
                        }
                      />
                    </Col>
                    <Col lg={4} className="text-right">
                      <div>Actions</div>
                      <span className="p-1 cursor-pointer" onClick={() => this.EditGoal(item)}>
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
                    <Col lg={12} md={12} sm={12}>
                      <small className="text-dark">
                        <strong>Start Date : </strong><span className="">{item.start_date}</span>
                        &nbsp;&nbsp;
                    <strong>End Date : </strong><span className="">{item.end_date}</span>
                      </small>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Card.Body>
        </Card>

      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  goals: state.goal.goals ? state.goal.goals.results : [],
  draft: state.goal.draft
})

const mapDispatchToProps = dispatch => ({
  getGoalList: (id) => dispatch(getGoalList(id)),
  CreateGoalDraft: (payload) => dispatch(CreateGoalDraft(payload)),
  UpdateGoal: (payload, id) => dispatch(UpdateGoal(payload, id)),
  deleteGoal: (id, project_id) => dispatch(deleteGoal(id, project_id)),
  CreateGoal: (payload) => dispatch(CreateGoal(payload)),
  getProject: (id) => dispatch(getProject(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(GoalList)