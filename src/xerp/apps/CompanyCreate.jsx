import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LogoutUser, CreateCompany, GetUser } from '../redux';
import { CircleSpinner } from '../container';

class CompanyCreate extends React.Component {
  state = {
    company: '',
    errMsg: false,
    loading: false,
    msgClassName: '',
    inputClass: ''
  }

  onCompanyCreate = async (e) => {
    e.preventDefault();

    if (this.state.company) {
      this.setState({
        loading: true,
        errMsg: false,
      })

      try {
        const company = await this.props.CreateCompany({ name: this.state.company })
        if (company) {
          this.props.GetUser(this.props.userId)
          this.setState({
            loading: false,
            errMsg: false,
          })
        }
      } catch (e) {
        this.setState({
          loading: false,
          errMsg: "Something error occured while creating company name",
        })
      }

    } else {
      this.setState({
        errMsg: "Comapany name is requred",
        loading: false
      })
    }

  }

  render() {
    const { company, history } = this.props
    if (Array.isArray(company) && company.length > 0) {
      history.push('/app');
    }
    return (
      <React.Fragment>
        <div className="unwrap">
          <div className="bg-cover">
            <Container className="container-md py-2  mt-5">
              <div className="text-center mb-3 pb-3">
                <div className="h1 text-bold">Create a company</div>
                <p className=" text-muted ">Please create a company to start your apps</p>
              </div>
            </Container>

            <Container className="container-md">
              <form action="">
                <div className="input-group input-group-lg">
                  <input
                    className={`form-control form-control-lg rounded-0 ${this.state.errMsg && 'border-danger'}`}
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={this.state.company}
                    onChange={(e) => {
                      this.setState({ errMsg: false, [e.target.name]: e.target.value })
                    }}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-info btn-lg b0 rounded-0"
                      type="button"
                      onClick={this.onCompanyCreate}
                    >
                      <strong>Create Company</strong>
                    </button>
                  </div>
                </div>
              </form>

              <div className="text-center">
                {this.state.loading && <CircleSpinner />}
                {this.state.errMsg && <p className={`my-1 py-2 text-danger text-center`}>{this.state.errMsg}</p>}

                <p className="my-3 py-4 text-muted text-center">
                  <small>After creating a compnay you will be redirected to app home</small>
                  <br />
                  <Link to="#"
                    onClick={() => this.props.logoutUser}
                  >Logout</Link>
                </p>
              </div>

            </Container>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  company: state.auth.company,
  userId: state.auth.id
})


const mapDispatchToProps = dispatch => ({
  LogoutUser: () => dispatch(LogoutUser()),
  CreateCompany: (payload) => dispatch(CreateCompany(payload)),
  GetUser: (id) => dispatch(GetUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CompanyCreate);