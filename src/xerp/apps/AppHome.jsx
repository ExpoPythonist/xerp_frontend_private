import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, Badge } from 'react-bootstrap'
import { AppList } from '../routes'
import { LogoutUser } from '../redux'
import { Button, Icon } from 'antd';

class AppHome extends React.Component {
  render() {
    const { match, company, history } = this.props
    if (Array.isArray(company) && company.length === 0) {
      history.push('/company-create');
    }
    return (
      <React.Fragment>
        <section id="app-home">
          <div className="overlay">
            <Button
              type="danger"
              ghost
              shape="round"
              size="large"
              className="d-flex align-items-center float-right m-3"
              onClick={() => this.props.LogoutUser()}
            >
              Logout <Icon type="logout" />
            </Button>
            <Col lg={8} className="mx-auto">
              <Row
                className="d-flex align-items-center justify-content-center"
                style={{ height: '70vh' }}
              >
                <Col md={12} className="text-center text-white">
                  <Badge variant="danger" className="px-3 py-2">
                    <h1 className="m-0 text-white">MY APPS</h1>
                  </Badge>
                </Col>
                {AppList.map(({ icon, name, route }, key) => {
                  return (
                    <Col
                      lg={2}
                      md={2}
                      sm={3}
                      xs={4}
                      className="float-none"
                      key={key}
                    >
                      <Link className="" to={`${match.path}${route}`}>
                        <div className="card-body text-center">
                          <img src={icon} alt="icon" />
                          <p className="mt-3 mb-0">
                            <small className="text-white">{name}</small>
                          </p>
                        </div>
                      </Link>
                    </Col>
                  )
                })}
              </Row>
            </Col>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  company: state.auth.company
})

const mapDispatchToProps = dispatch => ({
  LogoutUser: () => dispatch(LogoutUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppHome))
