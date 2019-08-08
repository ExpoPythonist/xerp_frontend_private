import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { List, Avatar, Select, Progress, Icon, Input, DatePicker, Button } from 'antd'
import { Row, Col, Card } from 'react-bootstrap'
import { getProjectList, deleteProject, CreateProjectDraft, UpdateProject } from '../../../redux';
import { Swal } from '../../../container';
import ProjectEdit from './ProjectEdit';
import { toast } from 'react-toastify';

const { RangePicker } = DatePicker
const { Option } = Select


class ProjectList extends React.Component {
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
    this.getProjects('');
  }

  getProjects = async (params) => {
    try {
      await this.props.getProjectList(params);
    } catch (e) {
      console.log(e)
    }
  }

  EditProject = (item) => {
    this.setState({ showModal: true })
    this.props.CreateProjectDraft(item)
  }


  closeModal = e => {
    e.preventDefault()
    this.setState({
      showModal: false,
    })
    this.props.CreateProjectDraft();
  }

  handleUpdate = async () => {
    const { UpdateProject, draft } = this.props;
    try {
      await UpdateProject(draft)
      toast(`Project updated successfully!`, { type: 'success', position: 'bottom-right' })
    } catch (e) {
      toast(`Error ${e.status} - ${e.statusText}`, { type: 'error', position: 'bottom-right' })
    } finally {
      this.setState({
        showModal: false,
      })
      this.props.CreateProjectDraft();
    }
  }

  handleDelete = async (isConfirm, swal, id) => {
    if (isConfirm) {
      try {
        await this.props.deleteProject(id)
        swal("Deleted!", "Your imaginary file has been deleted.", "success");
      } catch (e) {
        console.log(e)
        swal("Error", `${e.status} - ${e.message}`, "error");
      }
    } else {
      swal("Cancelled", "Your imaginary file is safe :)", "error");
    }
  }

  onDateChange = async (date, dateString) => {
    if (dateString && dateString.length === 2) {
      await this.setState({
        start_date: dateString[0],
        end_date: dateString[1]
      })
      console.log(this.state)
      //this.getProjects('?start='+ this.state.start_date + '&end=' + this.state.end_date)
    }
  }

  searchProjects = async (e) => {
    await this.setState({ [e.target.name]: e.target.value })
    await this.getProjects('?search=' + this.state.search)
  }

  getEnabled = async () => {
    await this.setState({
      enabled: 1
    })
    //await this.getProjects('?enabled=' + this.state.enabled)
  }

  getDisabled = async () => {
    await this.setState({
      enabled: 0
    })
    //await this.getProjects('?enabled=' + this.state.enabled)
  }

  render() {
    const data = this.props.projects
    return (
      <React.Fragment>
        <ProjectEdit
          title="Edit Project"
          visible={this.state.showModal}
          onOk={this.handleUpdate}
          onCancel={this.closeModal}
          okText="Update"
        />
        <Col lg={12}>
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
                          <Avatar size="large" icon="project" className="d-flex align-items-center justify-content-center bg-white" />
                        }
                        title={
                          <Link to={'/app/project/' + item.id}>
                            {item.name}
                          </Link>
                        }
                        description={item.text || 'No Description'}
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
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  projects: state.project.projects ? state.project.projects.results : [],
  draft: state.project.draft
})

const mapDispatchToProps = dispatch => ({
  getProjectList: (params) => dispatch(getProjectList(params)),
  deleteProject: (id) => dispatch(deleteProject(id)),
  CreateProjectDraft: (payload) => dispatch(CreateProjectDraft(payload)),
  UpdateProject: (payload) => dispatch(UpdateProject(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)
