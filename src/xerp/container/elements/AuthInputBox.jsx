import React from 'react'
import { FormGroup, Form } from 'react-bootstrap'
import validator from 'validator'

class AuthInputBox extends React.Component {
  state = {
    value: '',
    errMsg: '',
  }

  onBlur = e => {
    const { value } = e.target;
    const { required } = this.props
    if (required && validator.isEmpty(value)) {
      return this.setState({
        errMsg: 'Field is required',
      })
    }
  }


  onChange = async e => {
    e.preventDefault()
    const { ignoreValidation, name } = this.props
    const { value } = e.target;

    if (ignoreValidation) {
      return this.props.onChange({ [name]: value })
    }

    switch (name) {
      case 'email': {
        if (!validator.isEmail(value)) {
          this.setState({ errMsg: 'Email is not valid' })
        } else {
          this.setState({ errMsg: '' })
          this.props.onChange({ [name]: value })
        }
        break
      }
      default:
        return null
    }
  }

  render() {
    const { required, type, name, placeholder, label, value } = this.props
    return (
      <FormGroup>
        <Form.Label className="d-flex justify-content-between align-items-center">
          <span>
            {label} {required && <span className="text-danger">*</span>}
          </span>
          <small className="text-danger">{this.state.errMsg}</small>
        </Form.Label>
        <Form.Control
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          ref={name}
          value={value}
          defaultValue={value}
        />
      </FormGroup>
    )
  }
}

export default AuthInputBox
