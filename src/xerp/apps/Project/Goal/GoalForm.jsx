import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { CreateGoalDraft } from '../../../redux'
import moment from 'moment'

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dataFormat = 'YYYY-MM-DD'

class GoalForm extends React.Component {
  state = {
    name: '',
    details: '',
    start_date: '',
    end_date: '',
    project: '',
  }

  componentDidMount() {
    const { draft, project, params } = this.props;

    if (Object.entries(draft).length > 0) {
      this.setState({
        ...this.state,
        ...draft
      })
    } else if (project) {
      this.setState({
        project: project.id,
        ...draft
      })
    } else if (params) {
      this.setState({
        project: params.id,
      })
    }
  }


  onChangeHandler = async e => {
    await this.setState({ [e.target.name]: e.target.value })
    this.props.CreateGoalDraft(this.state)
    // this.props.onChange && this.props.onChange(this.state)
  }

  onDateChange = async (date, dateString) => {
    if (dateString && dateString.length === 2) {
      await this.setState({
        start_date: dateString[0],
        end_date: dateString[1],
        date
      })

      this.props.CreateGoalDraft(this.state)
      // this.props.onChange && this.props.onChange(this.state)
    }
  }

  render() {
    const { draft } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Row>
          <Col md={6}>
            <Form.Item label="Goal title">
              <Input
                size="large"
                placeholder="Goal title"
                name="name"
                defaultValue={draft.name}
                onChange={this.onChangeHandler}
              />
            </Form.Item>
          </Col>
          <Col md={6}>
            <Form.Item label="Select goal deadline">
              <RangePicker
                className="w-100"
                size="large"
                name="deadline"
                onChange={this.onDateChange}
                defaultValue={[
                  draft.start_date ? moment(draft.start_date, dataFormat) : null,
                  draft.end_date ? moment(draft.end_date, dataFormat) : null
                ]}
              // defaultValue={[draft.start_date && moment(draft.start_date, dataFormat), draft.end_date && moment(draft.end_date, dataFormat)]}
              />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item label="Description">
              <TextArea
                rows={6}
                placeholder="Goal Description (Optional)"
                name="details"
                defaultValue={draft.details}
                onChange={this.onChangeHandler}
              />
            </Form.Item>
          </Col>
        </Row>
        {this.props.onSubmit && <Row>
          <Col lg={12} className="text-right">
            <Button type="submit">Create goal</Button>
          </Col>
        </Row>}
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  project: state.project.single_project,
  draft: state.goal.draft || {}
})

const mapDispatchToProps = (dispatch) => ({
  CreateGoalDraft: (payload) => dispatch(CreateGoalDraft(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GoalForm);