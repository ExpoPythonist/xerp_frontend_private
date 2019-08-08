import React from 'react'
import { Form, Input, DatePicker } from 'antd'
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { CreateProjectDraft } from '../../../redux';
import moment from 'moment'
const { RangePicker } = DatePicker;
const { TextArea } = Input;

class ProjectForm extends React.Component {
  state = {
    name: '',
    text: '',
    start_date: '',
    end_date: '',
    company: '',
  }

  componentDidMount() {
    if (this.props.company) {
      this.setState({
        company: this.props.company.id,
        ...this.props.draft
      })
    }
  }

  onChangeHandler = async e => {
    await this.setState({ [e.target.name]: e.target.value })
    this.props.CreateProjectDraft(this.state)
    // this.props.onChange && this.props.onChange(this.state)
  }

  onDateChange = async (date, dateString) => {
    if (dateString && dateString.length === 2) {
      await this.setState({
        start_date: dateString[0],
        end_date: dateString[1],
        date
      })

      this.props.CreateProjectDraft(this.state)
      // this.props.onChange && this.props.onChange(this.state)
    }
  }

  render() {
    const { draft } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Row>
          <Col md={6}>
            <Form.Item label="Project title">
              <Input
                size="large"
                placeholder="Project title"
                name="name"
                value={draft.name}
                onChange={this.onChangeHandler}
              />
            </Form.Item>
          </Col>
          <Col md={6}>
            <Form.Item label="Select project deadline">
              <RangePicker
                className="w-100"
                size="large"
                name="deadline"
                onChange={this.onDateChange}
                value={[draft.start_date && moment(draft.start_date), draft.end_date && moment(draft.end_date)]}
              />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item label="Project description">
              <TextArea
                rows={4}
                placeholder="Project description..."
                name="text"
                value={draft.text}
                onChange={this.onChangeHandler}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  company: state.auth.company,
  draft: state.project.draft || {}
})

const mapDispatchToProps = (dispatch) => ({
  CreateProjectDraft: (payload) => dispatch(CreateProjectDraft(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);