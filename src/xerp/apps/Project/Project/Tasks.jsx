import React from 'react'
import { PageWrapper } from '../../../components/layout'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  Row,
  Col,
} from 'reactstrap'
import {
  Button,
  TextField,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import 'date-fns'
import {
  DeleteOutline,
  Edit,
  Save,
  Close,
  AddBox,
  Check,
  ArrowUpward,
  Remove,
  ViewColumn,
  Clear,
  ChevronRight,
  ChevronLeft,
  SaveAlt,
  FilterList,
  FirstPage,
  LastPage,
  Search,
} from '@material-ui/icons'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import MaterialTable from 'material-table'
import Dropzone from 'react-dropzone'

const tableIcons = {
  Add: AddBox,
  Check: Check,
  Clear: Clear,
  Delete: DeleteOutline,
  DetailPanel: ChevronRight,
  Edit: Edit,
  Export: SaveAlt,
  Filter: FilterList,
  FirstPage: FirstPage,
  LastPage: LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search: Search,
  SortArrow: ArrowUpward,
  ThirdStateCheck: Remove,
  ViewColumn: ViewColumn,
}

class Tasks extends React.Component {
  state = {
    collapseOpen: false,
    files: [],
    selectData: {
      age: '',
      name: 'hai',
    },
  }

  onDrop = files => this.setState({ files })

  createImageItem = (file, index) => (
    <Col md={3} key={index}>
      <img className="img-fluid mb-2" src={file.preview} alt="Item" />
    </Col>
  )

  setCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        collapseOpen: false,
      })
    } else {
      this.setState({
        collapseOpen: true,
      })
    }
  }
  render() {
    let allFiles = this.state.files
    return (
      <PageWrapper heading="Tasks" subheading="Project tasks">
        <div className="row">
          <div className="col-lg-5">
            <Card>
              <CardHeader onClick={this.setCollapse}>
                <CardTitle tag="h3">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a className="text-inherit">
                    <small>
                      <em className="fa fa-plus text-primary mr-2" />
                    </small>
                    <span>Add a Task</span>
                  </a>
                </CardTitle>
              </CardHeader>
              <Collapse isOpen={this.state.collapseOpen}>
                <CardBody>
                  <form>
                    <div className="form-group">
                      <TextField
                        id="standard-name"
                        label="Task Name"
                        margin="normal"
                        fullWidth
                      />
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-lg-6">
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              margin="normal"
                              label="Start Date"
                            />
                          </MuiPickersUtilsProvider>
                        </div>
                        <div className="col-lg-6">
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              margin="normal"
                              label="End Date"
                            />
                          </MuiPickersUtilsProvider>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-lg-6">
                          <FormControl fullWidth>
                            <InputLabel htmlFor="priority">Priority</InputLabel>
                            <Select
                              inputProps={{
                                name: 'priority',
                                id: 'priority',
                              }}
                            >
                              <MenuItem value="">
                                <em>Select one...</em>
                              </MenuItem>
                              <MenuItem value={10}>Low</MenuItem>
                              <MenuItem value={20}>Medium</MenuItem>
                              <MenuItem value={30}>High</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col-lg-6">
                          <FormControl fullWidth>
                            <InputLabel htmlFor="assignee">Assignee</InputLabel>
                            <Select
                              inputProps={{
                                name: 'assignee',
                                id: 'assignee',
                              }}
                            >
                              <MenuItem value="">
                                <em>Select one...</em>
                              </MenuItem>
                              <MenuItem value={10}>
                                Mahmud Abdur Rahman
                              </MenuItem>
                              <MenuItem value={20}>Expo_ashiq</MenuItem>
                              <MenuItem value={30}>Misbahuddin Shahan</MenuItem>
                              <MenuItem value={30}>Kowshik Das</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <FormControl fullWidth>
                        <InputLabel htmlFor="goal">Select a Goal</InputLabel>
                        <Select
                          inputProps={{
                            name: 'goal',
                            id: 'goal',
                          }}
                        >
                          <MenuItem value="">
                            <em>Select one...</em>
                          </MenuItem>
                          <MenuItem value={10}>Goal 1</MenuItem>
                          <MenuItem value={20}>Goal 2</MenuItem>
                          <MenuItem value={30}>Goal 3</MenuItem>
                          <MenuItem value={30}>Goal 4</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <br />
                    <div className="form-group">
                      <label>Project Files (Optional)</label>
                      <Dropzone
                        className="card p-3"
                        ref="dropzone"
                        onDrop={this.onDrop}
                      >
                        <div className="text-center box-placeholder m-0">
                          Try dropping some files here, or click to select files
                          to upload.
                        </div>
                        <div className="mt-3">
                          {this.state.files.length > 0 ? (
                            <Row>{allFiles.map(this.createImageItem)}</Row>
                          ) : null}
                        </div>
                      </Dropzone>
                    </div>
                    <div className="form-group">
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        className="pull-right"
                      >
                        <Save />
                        &nbsp; Save
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        className="pull-right mr-2"
                      >
                        <Close />
                        &nbsp; Cancel
                      </Button>
                      <br />
                    </div>
                  </form>
                  <br />
                </CardBody>
              </Collapse>
            </Card>
          </div>
          <div className="col-lg-12" style={{ maxWidth: '100%' }}>
            <MaterialTable
              icons={tableIcons}
              columns={[
                {
                  title: (
                    <FormControl>
                      <InputLabel htmlFor="action" />
                      <Select
                        inputProps={{
                          name: 'action',
                          id: 'action',
                        }}
                      >
                        <MenuItem value="">
                          <em>Select one...</em>
                        </MenuItem>
                        <MenuItem value={10}>Delete</MenuItem>
                        <MenuItem value={20}>Disable</MenuItem>
                        <MenuItem value={30}>Edit</MenuItem>
                      </Select>
                    </FormControl>
                  ),
                  field: 'select',
                },
                { title: 'Task', field: 'name' },
                { title: 'Assignee', field: 'description' },
                { title: 'Priority', field: 'priority' },
                { title: 'Start Date', field: 'startDate', type: 'numeric' },
                {
                  title: 'End Date',
                  field: 'endDate',
                  type: 'numeric',
                },
                { title: 'Status', field: 'status' },
                { title: 'Complete Date', field: 'complete' },
              ]}
              data={[
                {
                  select: <Checkbox color="primary" />,
                  name: (
                    <a href="/app/project/tasks/1">
                      Login, signup & account activation.
                    </a>
                  ),
                  description: 'Mahmud Abdur Rahman',
                  startDate: '2019-05-29',
                  endDate: '2019-07-19',
                  priority: 'Medium',
                  status: 'Active',
                  complete: '-',
                },
                {
                  select: <Checkbox color="primary" />,
                  name: <a href="/app/project/tasks/2">API development</a>,
                  description: 'Expo_ashiq',
                  startDate: '2019-05-29',
                  endDate: '2019-07-19',
                  priority: 'High',
                  status: 'Active',
                  complete: '-',
                },
                {
                  select: <Checkbox color="primary" />,
                  name: <a href="/app/project/tasks/3">Frontend structure</a>,
                  description: 'Misbahuddin Shahan',
                  startDate: '2019-05-29',
                  endDate: '2019-07-19',
                  priority: 'High',
                  status: 'Active',
                  complete: '-',
                },
                {
                  select: <Checkbox color="primary" />,
                  name: <a href="/app/project/tasks/4">Homepage design</a>,
                  description: 'Kowshik dash',
                  startDate: '2019-05-29',
                  endDate: '2019-07-19',
                  priority: 'Medium',
                  status: 'Active',
                  complete: '-',
                },
              ]}
              editable={{}}
              title=""
              options={{
                headerStyle: {
                  backgroundColor: '#01579b',
                  color: '#FFF',
                  fontSize: '15px',
                },
              }}
            />
          </div>
        </div>
      </PageWrapper>
    )
  }
}

export default Tasks
