import React, { Component } from "react";
import { Link } from 'react-router-dom'

class HomePage extends Component {
  render() {
    return (
      <div>
        <Link to="/login">Login</Link> <br />
        <Link to="/login">Register</Link><br/>
        <Link to="/app">App Home</Link>
      </div>
    )
  }
}

export default HomePage