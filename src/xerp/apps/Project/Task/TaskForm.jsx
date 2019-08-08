import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd'
import { Row, Col } from 'react-bootstrap'
import { CreateTaskDraft } from '../../../redux'
import { connect } from 'react-redux'
import moment from 'moment'

const { RangePicker } = DatePicker;
const { TextArea } = Input;


class TaskForm extends React.Component {
  state = {
    name: '',
    details: '',
    start_date: '',
    end_date: '',
    goal: '',
    owner: ''
  }

  componentDidMount() {
    if (this.props.goal) {
      this.setState({
        goal: this.props.goal.id,
        owner: this.props.userId,
        ...this.props.draft
      })
    }
  }

  onChangeHandler = async e => {
    await this.setState({ [e.target.name]: e.target.value })
    this.props.CreateTaskDraft(this.state)
    // this.props.onChange && this.props.onChange(this.state)
  }

  onDateChange = async (date, dateString) => {
    if (dateString && dateString.length === 2) {
      await this.setState({
        start_date: dateString[0],
        end_date: dateString[1],
        date
      })

      this.props.CreateTaskDraft(this.state)
      // this.props.onChange && this.props.onChange(this.state)
    }
  }

  render() {
    const { draft } = this.props
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Row>
          <Col md={6}>
            <Form.Item label="Task title">
              <Input
                size="large"
                placeholder="Task title"
                name="name"
                value={draft.name}
                onChange={this.onChangeHandler}
              />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item label="Possible Deadline">
              <RangePicker
                className="w-100"
                size="large"
                name="deadline"
                onChange={this.onDateChange}
                value={[draft.start_date && moment(draft.start_date), draft.end_date && moment(draft.end_date)]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Form.Item label="Description">
              <TextArea
                rows={6}
                placeholder="Task details (Optional)"
                name="details"
                value={draft.details}
                onChange={this.onChangeHandler}
              />
            </Form.Item>
          </Col>
        </Row>
        {this.props.onSubmit && <Row>
          <Col lg={12} className="text-right">
            <Button type="submit">Create Task</Button>
          </Col>
        </Row>}
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  goal: state.goal.goal_created,
  draft: state.task.draft || {},
  userId: state.auth.id
})

const mapDispatchToProps = (dispatch) => ({
  CreateTaskDraft: (payload) => dispatch(CreateTaskDraft(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);