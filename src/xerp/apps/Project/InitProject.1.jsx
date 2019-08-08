import React from 'react';
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Steps, Button } from 'antd';
import { ProjectForm } from './Project';
import { GoalForm } from './Goal';
import { TaskForm } from './Task';
import { CircleSpinner } from '../../container';
import { CreateProject, CreateGoal, CreateTask, CreateProjectDraft } from '../../redux';
import { ToastContainer, toast } from 'react-toastify';

const { Step } = Steps;


class InitProject extends React.Component {
  state = {
    current: 0,
    isLoading: false,
    project: {},
    goal: {},
    task: {}
  }

  componentDidMount() {
    /* 
      Clearing draft stored for project
      without any parameter action creator 
      will clear the draft
    */
    this.props.CreateProjectDraft()
  }

  create = async (item) => {
    let current = this.state.current;
    let value = this.state[item.option]
    try {
      if (value.id) {
        //project = await this.props.CreateProject(this.props.draft)
      } else {
        value = await this.props[item.action](item.data)
      }
      toast(item.successMsg, { type: 'success', position: 'bottom-right' })
      this.setState({ current: current + 1, [item.option]: value });
    } catch (e) {
      toast(item.errMsg, { type: 'error', position: 'bottom-right' })
    }
  }

  next = async () => {
    this.setState({ isLoading: true })
    let current = this.state.current;
    let { project, goal, task } = this.state;

    if (current === 0) {
      this.create({
        data: this.props.draft,
        action: 'CreateProject',
        successMsg: "Project created",
        errMsg: "Project cannot be created. Please try again...!",
        option: 'project'
      })
    }

    // if (current === 0) {
    //   this.create({
    //     data: this.props.draft,
    //     action: 'CreateProject',
    //     successMsg: "Project created",
    //     errMsg: "Project cannot be created. Please try again...!"
    //   })
    //   try {
    //     if (project.id) {
    //       alert('Project created')
    //       //project = await this.props.CreateProject(this.props.draft)
    //     } else {
    //       project = await this.props.CreateProject(this.props.draft)
    //     }
    //     toast('Project created', { type: 'success', position: 'bottom-right' })
    //     this.setState({ current: current + 1, project });
    //   } catch (e) {
    //     toast('Project creation error', { type: 'error', position: 'bottom-right' })
    //   }
    // } else if (current === 1) {
    //   try {
    //     if (goal.id) {
    //       //goal = await this.props.CreateGoal(this.state.draft)
    //     } else {
    //       goal = await this.props.CreateGoal(this.props.goal_draft)
    //     }
    //     toast('Goal created', { type: 'success', position: 'bottom-right' })
    //     this.setState({ current: current + 1, goal });
    //   } catch (e) {
    //     toast('Goal creation error', { type: 'error', position: 'bottom-right' })
    //   }
    // } else if (current === 2) {
    //   try {
    //     if (task.id) {
    //       //goal = await this.props.CreateGoal(this.state.draft)
    //     } else {
    //       task = await this.props.CreateTask(this.props.task_draft)
    //     }
    //     toast('Task created', { type: 'success', position: 'bottom-right' })
    //     this.setState({ current: current + 1, task })
    //   } catch (e) {
    //     toast('Task creation error', { type: 'error', position: 'bottom-right' })
    //   }
    // } else {
    //   this.setState({
    //     current: 0
    //   })
    // }
    this.setState({ isLoading: false })
  }




  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }


  onChangeHandler = (el, value) => {
    this.setState({
      [el]: value
    })
  }


  render() {
    const { current } = this.state;

    const steps = [
      {
        title: 'Create project',
        content: <ProjectForm
          onChange={(value) => this.onChangeHandler('project', value)}
        />,
      },
      {
        title: 'Create goal',
        content: <GoalForm
          onChange={(value) => this.onChangeHandler('goal', value)}
        />,
      },
      {
        title: 'Create task',
        content: <TaskForm
          onChange={(value) => this.onChangeHandler('task', value)}
        />,
      }
    ];

    return (
      <React.Fragment>
        {this.state.isLoading && <CircleSpinner fullScreen={true} />}
        <ToastContainer />
        <div className="unwrap" id="init-project">
          <div className="bg-cover my-5">
            <Container className="container-md py-2 ">
              <div className="text-center mb-3 pb-3">
                <div className="h1 text-bold">Initialize your project</div>
                <p className=" text-muted px-5">Good day, please create your first project. This page will only visible for the first time. <br />You can follow this flow every time you create a new project</p>
              </div>
            </Container>

            <Container>
              <Steps current={current}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>

              <div className="steps-content">{steps[current].content}</div>

              <div className="steps-action text-right">
                {current > 0 && (
                  <Button style={{ marginRight: 8 }} onClick={() => this.prev()}>
                    Previous
                  </Button>
                )}
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => this.next()}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type="primary" onClick={() => this.next()}>
                    Done
                  </Button>
                )}
              </div>
            </Container>
          </div>
        </div>
      </React.Fragment >
    )
  }
}

const mapStateToProps = state => ({
  project: state.project.single_project,
  goal: state.project.goal_created,
  task: state.project.task_created,
  draft: state.project.draft,
  goal_draft: state.goal.draft,
  task_draft: state.task.draft,
})

const mapDispatchToProps = dispatch => ({
  CreateProject: (payload) => dispatch(CreateProject(payload)),
  CreateGoal: (payload) => dispatch(CreateGoal(payload)),
  CreateTask: (payload) => dispatch(CreateTask(payload)),
  CreateProjectDraft: (payload) => dispatch(CreateProjectDraft(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(InitProject);