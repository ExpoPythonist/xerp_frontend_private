import React from 'react'
import { connect } from 'react-redux'
import { PageWrapper, DBCard } from '../../../components'
import { Button } from 'antd'
import { Row, Col } from 'react-bootstrap'
import { CreateProject, CreateProjectDraft } from '../../../redux';
import { toast } from 'react-toastify';
import ProjectList from './ProjectList';
import ProjectCreate from './ProjectCreate';

class MyProject extends React.Component {
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
    this.props.CreateProjectDraft();
  }

  onCreateProjectHandler = async () => {
    const { CreateProject, draft } = this.props;
    try {
      await CreateProject(draft)
      toast(`A new project created`, { type: 'success', position: 'bottom-right' })
    } catch (e) {
      toast(`Error ${e.status} - ${e.statusText}`, { type: 'error', position: 'bottom-right' })
    } finally {
      this.setState({
        showModal: false,
      })
    }
  }


  render() {
    const { projects, history } = this.props;
    if (Array.isArray(projects) && projects.length === 0) {
      history.push('/initialize-project');
    }
    return (
      <React.Fragment>
        <ProjectCreate
          title="Create a Project"
          visible={this.state.showModal}
          onOk={this.onCreateProjectHandler}
          onCancel={this.closeModal}
          okText="Create project"
        />

        <PageWrapper>
          <div className="content-heading">
            <div>Project</div>
            <div className="ml-auto">
              <Button
                type="info"
                shape="round"
                icon="plus"
                size="large"
                onClick={this.showModal}
                className="d-flex align-items-center"
              >
                Create a Project
            </Button>
            </div>
          </div>
          <Row>
            <Col className="" lg={12}>
              <Row>
                <DBCard
                  icon="fa-comments"
                  heading="124"
                  subheading="Number of task"
                  linkTo="/app/project/details/1"
                  variant="info"
                />
                <DBCard
                  icon="fa-tasks"
                  heading="124"
                  subheading="Number of task"
                  linkTo="/app/project/details/1"
                  variant="primary"
                />
                <DBCard
                  icon="fa-shopping-cart"
                  heading="124"
                  subheading="Number of task"
                  linkTo="/app/project/details/1"
                  variant="green"
                />
                <DBCard
                  icon="fa-life-ring"
                  heading="124"
                  subheading="Number of task"
                  linkTo="/app/project/details/1"
                  variant="danger"
                />
              </Row>
            </Col>
            <ProjectList />
          </Row>
        </PageWrapper>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  projects: state.project.projects && state.project.projects.results,
  draft: state.project.draft
})

const mapDispatchToProps = dispatch => ({
  CreateProject: (payload) => dispatch(CreateProject(payload)),
  CreateProjectDraft: (payload) => dispatch(CreateProjectDraft(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyProject)
