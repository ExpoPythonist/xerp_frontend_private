import React from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  Card,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { SignInUser } from '../../redux'
import { CircleSpinner } from '../../container'
import { Icon, Input as AntdInput, Tooltip, Button as AntdButton } from 'antd'
import { Input } from 'reactstrap'

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    btnDisable: false,
    failed: false,
    success: false,
    loading: false
  }

  onSubmit = async e => {
    e.preventDefault()
    this.setState({
      loading: true,
      btnDisable: true
    })
    const data = {
      email: this.state.email,
      password: this.state.password,
    }

    console.log(data)

    try {
      await this.props.SignIn(data)
      this.setState({
        success: true,
        loading: false,
        btnDisable: false,
      })
    } catch (e) {
      this.setState({
        failed: true,
        loading: false,
        btnDisable: false,
      })
    }
  }

  onChangeHandler = async (value) => {
    this.setState({
      ...this.state,
      ...value
    })
  }

  onChange = async (e) => {
    await this.setState({ [e.target.name]: e.target.value })
  }


  setFailed = async (e) => {
    this.setState({
      failed: false
    })
  }

  render() {
    return (
      <div id="formContent" className="m">
        {this.state.success ? <Redirect to="/dashboard" /> : null}
        <Container>
          <Row
            className="d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}
          >
            <Col md={8}>
              <Card bg="light">
                <Card.Body>
                  <Row>
                    <Col md={3}>
                    </Col>
                    <Col md={6}>
                      <Card bg="light" className="shadow-none">
                        <div className="text-center text-info">
                          <img src="img/slider/reg.png" alt="xERP" width="100px" />
                          <h5 className="text-black-50">Provide login credentials below</h5>
                        </div>
                        {this.state.failed ? <div
                          className="alert alert-danger alert-dismissible fade show"
                          role="alert"
                        >
                          <strong>Login failed!</strong> Email/password is incorrect. Please try
                          again.
                          <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                            onClick={this.setFailed}
                          >
                            <span aria-hidden={true}>&times;</span>
                          </button>
                        </div> : null}
                        <Card.Body>
                          <Form>
                            <Form.Group>
                              <AntdInput
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                size="large"
                                onChange={this.onChange}
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={this.state.email}
                                suffix={
                                  <Tooltip title="Provide email address">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                  </Tooltip>
                                }
                                autoFocus={true}
                                allowClear={true}
                              />
                            </Form.Group>
                            <Form.Group>
                              <AntdInput.Password
                                onChange={this.onChange}
                                name="password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                size="large"
                                suffix={
                                  <Tooltip title="Provide password">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                  </Tooltip>
                                }
                                allowClear={true}
                              />
                            </Form.Group>

                            <Form.Group>
                              <div className="checkbox c-checkbox mb-3">
                                <label className="text-black-50">
                                  <Input type="checkbox" name="remember"/>
                                  <span className="fa fa-times"></span> Remember me</label>
                              </div>
                            </Form.Group>

                            <AntdButton ghost type="primary" size="large" block={true} onClick={this.onSubmit}>Login</AntdButton>
                          </Form>
                        </Card.Body>
                      </Card>
                      <div className="text-center mt-n3">
                        <Form.Label>
                          <span className="text-black-50">Or login with</span>
                          <div className="icons-list mt-3">
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
                        </Form.Label>
                        <br/><br/>
                        <Form.Label>
                          <span className="text-black-50">Can't sign-in?{'  '}</span>
                          <AntdButton ghost type="danger" href="/forget-password">Forget Password</AntdButton>
                        </Form.Label>
                        <br />
                        <Form.Label>
                          <span className="text-black-50">Don't have an account?{'  '}</span>
                          <AntdButton type="dashed" href="/register">Register Now</AntdButton>
                        </Form.Label>
                        {this.state.loading && <CircleSpinner />}
                      </div>
                    </Col>
                    <Col md={3}></Col>
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
})

const mapDispatchToProps = dispatch => ({
  SignIn: payload => dispatch(SignInUser(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
