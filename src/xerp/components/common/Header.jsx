import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { HeaderRun } from '../../container'
import AuthHeader from './AuthHeader';

class Header extends Component {
  componentDidMount() {
    HeaderRun()
  }

  toggleUserblock = e => {
    e.preventDefault()
    this.props.toggleSetting('showUserBlock')
  }

  toggleOffsidebar = e => {
    e.preventDefault()
    this.props.toggleSetting('offsidebarOpen')
  }

  toggleCollapsed = e => {
    e.preventDefault()
    this.props.toggleSetting('isCollapsed')
    this.resize()
  }

  toggleAside = e => {
    e.preventDefault()
    this.props.toggleSetting('asideToggled')
  }

  resize() {
    // all IE friendly dispatchEvent
    var evt = document.createEvent('UIEvents')
    evt.initUIEvent('resize', true, false, window, 0)
    window.dispatchEvent(evt)
    // modern dispatchEvent way
    // window.dispatchEvent(new Event('resize'));
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <header className="topnavbar-wrapper">
        {/* START Top Navbar */}
        <nav className="navbar topnavbar">
          {/* START navbar header */}
          <div className="navbar-header">
            <Link className="navbar-brand" to="/app">
              <div className="brand-logo">
                {/* <img className="img-fluid" src="/img/logo.png" alt="xERP" /> */}
                <span className="text-white">xERP</span>
              </div>
              <div className="brand-logo-collapsed">
                <img
                  className="img-fluid"
                  src="/img/logo-single.png"
                  alt="App Logo"
                />
              </div>
            </Link>
          </div>

          {!isAuthenticated ? <p>Hei</p> :
            <AuthHeader />
          }
        </nav>
        {/* END Top Navbar */}
      </header>
    )
  }
}

Header.propTypes = {
  actions: PropTypes.object,
  settings: PropTypes.object,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token
})

export default connect(mapStateToProps)(Header)
