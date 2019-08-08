import React from 'react'
import {
  Button,
  FormGroup,
  Container,
  Row,
  Col,
  Form,
  Card,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import validator from 'validator'
import { GetCountryList, SignUpUser } from '../../redux'
import {Input} from 'reactstrap'
import { Icon, Input as AntdInput, Tooltip, Select, Button as AntdButton } from 'antd'
import { CircleSpinner } from '../../container/elements'

const { TextArea } = AntdInput

class Register extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    repassword: '',
    country: '',
    full_address: '',
    company_name: '',
    postal_code: '',
    success: false,
    btnDisable: true,
    first_name_error: '',
    last_name_error: '',
    email_error: '',
    password_error: '',
    repassword_error: '',
    company_error: '',
    cellphone_error: '',
    address_error: '',
    country_error: '',
    cellphone: '',
    loading: false,
    phone_code: '---',
    terms_error: '',
    response_errors: false,
    general_error: ''
  }

  componentDidMount() {
    this.getCountries()
  }

  getCountries = async () => {
    try {
      await this.props.GetCountryList()
    } catch (e) {
      console.log(e)
    }
  }

  btnEnable = () => {
    if (
      this.state.first_name_error === null &&
      this.state.last_name_error === null &&
      this.state.email_error === null &&
      this.state.password_error === null &&
      this.state.company_error === null &&
      this.state.cellphone_error === null &&
      this.state.country_error === null &&
      this.state.repassword_error === null &&
      this.state.address_error === null &&
      this.state.terms_error === null
    ) {
      this.setState({
        btnDisable: false,
      })
    }
  }

  validateFirstName = async () => {
    const { first_name } = this.state
    await this.setState({
      first_name_error: !validator.isEmpty(first_name)
        ? null
        : 'First name is required!',
    })
    this.btnEnable()
  }

  validateLastName = async () => {
    const { last_name } = this.state
    await this.setState({
      last_name_error: !validator.isEmpty(last_name)
        ? null
        : 'Last name is required!',
    })
    this.btnEnable()
  }

  validateCompany = async () => {
    const { company_name } = this.state
    await this.setState({
      company_error: !validator.isEmpty(company_name)
        ? null
        : 'Company name is required!',
    })
    this.btnEnable()
  }

  validatePhone = async () => {
    const { cellphone } = this.state
    await this.setState({
      cellphone_error: !validator.isEmpty(cellphone)
        ? null
        : 'Cellphone is required!',
    })
    this.btnEnable()
  }

  validateCountry = async () => {
    const { country } = this.state
    await this.setState({
      country_error: !validator.isEmpty(country)
        ? null
        : 'Please select a country!',
    })
    this.btnEnable()
  }

  validateAddress = async () => {
    const { full_address } = this.state
    await this.setState({
      address_error: !validator.isEmpty(full_address)
        ? null
        : 'Please provide address!',
    })
    this.btnEnable()
  }

  validateEmail = async () => {
    const { email } = this.state
    if (validator.isEmpty(email)) {
      await this.setState({
        email_error: 'Email is required!',
      })
    } else {
      await this.setState({
        email_error: validator.isEmail(email)
          ? null
          : 'Please provide valid email!',
      })
    }
    this.btnEnable()
  }

  validatePassword = async () => {
    const { password } = this.state
    await this.setState({
      password_error:
        password.length > 5
          ? null
          : 'Password field has to be at least 6 character long!',
    })
    this.btnEnable()
  }

  validateRePassword = async () => {
    const { repassword } = this.state
    await this.setState({
      repassword_error:
        repassword === this.state.password
          ? null
          : "Password didn't match!"
    })
    this.btnEnable()
  }

  validateTerms = async (e) => {
    await this.setState({
      terms_error:
        e.target.checked
          ? null
          : "Please agree with terms & conditions!"
    })
    this.btnEnable()
  }

  onChange = async (e) => {
    const field = e.target.name
    await this.setState({ [e.target.name]: e.target.value }, () => {
      switch (field) {
        case 'first_name':
          this.validateFirstName()
          break
        case 'last_name':
          this.validateLastName()
          break
        case 'email':
          this.validateEmail()
          break
        case 'password':
          this.validatePassword()
          break
        case 'company_name':
          this.validateCompany()
          break
        case 'country':
          this.validateCountry()
          break
        case 'full_address':
          this.validateAddress()
          break
        case 'cellphone':
          this.validatePhone()
          break
        case 'repassword':
          this.validateRePassword()
          break
        default:
          break
      }
    })
  }

  onSelect = async (e) => {
    await this.setState({
      country: e
    })
    this.validateCountry()
  }

  onSubmit = async e => {
    e.preventDefault()
    this.setState({
      loading: true
    })
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      cellphone: this.state.cellphone,
      company_name: this.state.company_name,
      country: this.state.country,
      address: this.state.full_address,
      postal_code: this.state.postal_code
    }

    try {
      await this.props.SignUp(data)
      this.setState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        success: true,
        loading: false
      })
    } catch (e) {
      console.log(e.response.data)
      this.setState({
        loading: false
      })
      if (e.response.data.hasOwnProperty("email")) {
        this.setState({
          response_errors: true,
          email_error: e.response.data.email,
          general_error: e.response.data.email
        })
      }
      if (e.response.data.hasOwnProperty("error")) {
        this.setState({
          response_errors: true,
          general_error: e.response.data.error
        })
      }
    }
  }

  setSuccess = async (e) => {
    this.setState({
      success: false
    })
  }

  setErrors = async () => {
    this.setState({
      response_errors: false
    })
  }

  render() {
    let options = (
      Object.values(this.props.countries).map(e => {
        return <Select.Option key={e.id}>{e.name}</Select.Option>
      })
    )
    return (
      <div id="formContent" className="m">
        <Container>
          <Row
            className="d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}
          >
            <Col md={12}>
              <Card bg="light">
                <Card.Body>
                  <Row>
                    <Col md={2}></Col>
                    <Col md={8}>
                      <Card bg="light" className="shadow-none">
                        <div className="text-center text-info">
                          <img src="img/slider/reg.png" alt="xERP" width="100px" />
                          <h4 className="text-black-50">Welcome to xERP</h4>
                        </div>
                        {this.state.success ? <div
                          className="alert alert-success alert-dismissible fade show"
                          role="alert"
                        >
                          <strong>Registration successful!</strong> Account activation link has
                          been sent to your email. Please activate your account to login. Thank
                          you.
                          <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                            onClick={this.setSuccess}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div> : null}
                        {this.state.response_errors ? <div
                          className="alert alert-danger alert-dismissible fade show"
                          role="alert"
                        >
                          <strong>{this.state.general_error}</strong>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                            onClick={this.setErrors}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div> : null}
                        <Card.Body>
                          <Form onSubmit={this.onSubmit}>
                            <Row>
                              <Col md={8}>
                                <FormGroup>
                                  <AntdInput
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    size="large"
                                    placeholder="First Name*"
                                    name="first_name"
                                    onChange={this.onChange}
                                    onBlur={this.validateFirstName}
                                    value={this.state.first_name}
                                    suffix={
                                      <Tooltip title="Enter your first name">
                                        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                      </Tooltip>
                                    }
                                    autoFocus={true}
                                    allowClear={true}
                                  />
                                  <small className="text-danger">
                                    {this.state.first_name_error}
                                  </small>
                                </FormGroup>
                              </Col>
                              <Col md={4}>
                                <FormGroup>
                                  <AntdInput
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    size="large"
                                    placeholder="Last Name*"
                                    name="last_name"
                                    onChange={this.onChange}
                                    onBlur={this.validateLastName}
                                    value={this.state.last_name}
                                    suffix={
                                      <Tooltip title="Enter your last name">
                                        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                      </Tooltip>
                                    }
                                    allowClear={true}
                                  />
                                  <small className="text-danger">
                                    {this.state.last_name_error}
                                  </small>
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row>
                              <Col md={8}>
                                <FormGroup>
                                  <AntdInput
                                    size="large"
                                    prefix={<Icon type="trademark" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Company Name*"
                                    name="company_name"
                                    suffix={
                                      <Tooltip title="Enter company title">
                                        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                      </Tooltip>
                                    }
                                    allowClear={true}
                                    onChange={this.onChange}
                                    onBlur={this.validateCompany}
                                    value={this.state.company_name}
                                  />
                                  <small className="text-danger">
                                    {this.state.company_error}
                                  </small>
                                </FormGroup>
                              </Col>
                              <Col md={4}>
                                <FormGroup>
                                  <Select
                                    optionFilterProp="children"
                                    size="large"
                                    name="country"
                                    placeholder="Country*"
                                    showSearch={true}
                                    filterOption={(input, option) =>
                                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onSelect={this.onSelect}
                                    value={this.state.country}
                                    onBlur={this.validateCountry}
                                  >
                                    {options}
                                  </Select>
                                  <small className="text-danger">
                                    {this.state.country_error}
                                  </small>
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row>
                              <Col>
                                <FormGroup>
                                  <AntdInput
                                    type="email"
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    size="large"
                                    placeholder="info@example.com"
                                    name="email"
                                    onChange={this.onChange}
                                    onBlur={this.validateEmail}
                                    value={this.state.email}
                                    suffix={
                                      <Tooltip title="Enter your email address">
                                        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                      </Tooltip>
                                    }
                                    allowClear={true}
                                  />
                                  <small className="text-danger">
                                    {this.state.email_error}
                                  </small>
                                </FormGroup>
                              </Col>
                              <Col>
                                <FormGroup>
                                  <AntdInput.Group compact size="large">
                                    <AntdInput
                                      style={{ width: '30%' }}
                                      defaultValue="880"
                                      readOnly={true}
                                      value={this.state.phone_code}
                                    />
                                    <AntdInput
                                      type="text"
                                      style={{ width: '70%' }}
                                      prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                      placeholder="Cellphone"
                                      name="cellphone"
                                      onChange={this.onChange}
                                      value={this.state.cellphone}
                                      onBlur={this.validatePhone}
                                      suffix={
                                        <Tooltip title="Enter your phone number">
                                          <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                        </Tooltip>
                                      }
                                      allowClear={true}
                                    />
                                    <small className="text-danger">
                                      {this.state.cellphone_error}
                                    </small>
                                  </AntdInput.Group>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <FormGroup>
                                  <AntdInput.Password
                                    size="large"
                                    placeholder="Password"
                                    name="password"
                                    onChange={this.onChange}
                                    onBlur={this.validatePassword}
                                    value={this.state.password}
                                    allowClear={true}
                                  />
                                  <small className="text-danger">
                                    {this.state.password_error}
                                  </small>
                                </FormGroup>
                              </Col>
                              <Col>
                                <FormGroup>
                                  <AntdInput.Password
                                    size="large"
                                    placeholder="Retype Password"
                                    name="repassword"
                                    allowClear={true}
                                    onChange={this.onChange}
                                    onBlur={this.validateRePassword}
                                    value={this.state.repassword}
                                  />
                                  <small className="text-danger">
                                    {this.state.repassword_error}
                                  </small>
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row>
                              <Col md={8}>
                                <FormGroup>
                                  <TextArea
                                    placeholder="Company Address*"
                                    autosize={{ minRows:2, maxRows:6 }}
                                    name="full_address"
                                    onChange={this.onChange}
                                    onBlur={this.validateAddress}
                                    value={this.state.full_address}
                                  />
                                  <small className="text-danger">
                                    {this.state.address_error}
                                  </small>
                                </FormGroup>
                              </Col>
                              <Col md={4}>
                                <FormGroup>
                                  <AntdInput
                                    size="large"
                                    prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Postal Code"
                                    name="postal_code"
                                    allowClear={true}
                                    onChange={this.onChange}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <div className="checkbox c-checkbox mb-3">
                              <label className="text-black-50">
                                <Input type="checkbox" name="terms" onChange={this.validateTerms}/>
                                <span className="fa fa-times"></span> I agree with <Link to="/terms">Terms & Conditions</Link></label>
                              <br/>
                              <small className="text-danger">
                                {this.state.terms_error}
                              </small>
                            </div>

                            <Row>
                              <Col>
                                <Button
                                  variant="info"
                                  block
                                  type="submit"
                                  disabled={this.state.btnDisable}
                                >
                                  <span className="text-light" style={{ fontSize: '16px' }}>Sign Up Now</span>
                                </Button>
                              </Col>
                              <Col>
                                <p className="text-black-50 pull-right">Or you can join with</p>
                              </Col>
                              <Col>
                                <div className="icons-list">
                                  <Link to="/signup-google">
                                    <Icon type="google" style={{ fontSize: '30px', color: '#4285F4' }} className="mr-3"/>
                                  </Link>
                                  <Link to="/signup-google">
                                    <Icon type="facebook" style={{ fontSize: '30px', color: '#3b5998' }} className="mr-3"/>
                                  </Link>
                                  <Link to="/signup-google">
                                    <Icon type="twitter" style={{ fontSize: '30px', color: '#1da1f2' }}/>
                                  </Link>
                                </div>
                              </Col>
                            </Row>

                          </Form>
                        </Card.Body>
                      </Card>
                      <div className="mt-4 text-center">
                        <Form.Label className="text-black-50">
                          Already have an account?&nbsp;&nbsp;<AntdButton ghost type="primary" size="large" href="/login">Get Login</AntdButton>
                        </Form.Label>
                        {this.state.loading && <CircleSpinner />}
                      </div>
                    </Col>
                    <Col md={2}></Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  countries: state.app
})

const mapDispatchToProps = dispatch => ({
  SignUp: payload => dispatch(SignUpUser(payload)),
  GetCountryList: () => dispatch(GetCountryList())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
