import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AccAccount } from '../../redux';

class ActivateAccount extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      render: '',
      msg: ''
    }
  }

  async componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    try {
      const response = await this.props.ActivateAccount({security_code: query.get('security_code')})
      console.log(response)
      this.setState({
        msg: <p className="text-success">Successfully Activated</p>
      })

    } catch (e) {
      this.setState({
        msg: <p className="text-danger">Activation Failed. Your security code is expired</p>,
      })
    }
    // if(query.get('security_code')){
    //   try{
    //     fetch('http://127.0.0.1:8000/api/v1/active-account/', {
    //       method: 'POST',
    //       headers: {
    //         'content-type': 'application/json'
    //       },
    //       body: JSON.stringify({security_code: query.get('security_code')})
    //     })
    //       .then((res) => {
    //         if(res.status === 400 || res.status === 200){
    //           console.log(res.status)
    //           return res.json();
    //         }else{
    //           throw new Error(res.status);
    //         }
    //       })
    //       .then((data) => {
    //         if(data.success){
    //           this.setState({
    //             render: true
    //           });
    //         }else{
    //           this.setState({
    //             render: false
    //           });
    //         }
    //       });
    //   }catch (e) {
    //     this.setState({
    //       render: false
    //     });
    //     console.log("error: ", e.toString());
    //   }
    // }else{
    //   this.setState({
    //     render: false
    //   });
    // }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card mt-5">
              <div className="card-body">
                {this.state.msg} <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
        {/* { this.state.render ? <Redirect to="/login" /> : <NotFound/> } */}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  ActivateAccount: (payload) => dispatch(AccAccount(payload)),
})

export default connect(
  null,
  mapDispatchToProps
)(ActivateAccount)