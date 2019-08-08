import React from 'react'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem,
} from 'reactstrap'

import { connect } from 'react-redux'

import { ToggleFullscreen } from '../../container'
import { toggleSetting } from '../../redux'

class AuthHeader extends React.Component {

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
    return (
      <React.Fragment>

        {/* START Left navbar */}
        <ul className="navbar-nav mr-auto flex-row">
          <li className="nav-item">
            {/* Button used to collapse the left sidebar. Only visible on tablet and desktops */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              className="nav-link d-none d-md-block d-lg-block d-xl-block"
              onClick={this.toggleCollapsed}
            >
              <em className="fas fa-bars" />
            </a>
            {/* Button to show/hide the sidebar on mobile. Visible on mobile only. */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              className="nav-link sidebar-toggle d-md-none"
              onClick={this.toggleAside}
            >
              <em className="fas fa-bars" />
            </a>
          </li>
          {/* START User avatar toggle */}
          <li className="nav-item d-none d-md-block">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="nav-link" onClick={this.toggleUserblock}>
              <em className="icon-user" />
            </a>
          </li>
          {/* END User avatar toggle */}
          {/* START lock screen */}
          {/* <li className="nav-item d-none d-md-block">
              <Link to="lock" title="Lock screen" className="nav-link">
                <em className="icon-lock" />
              </Link>
            </li> */}
          {/* END lock screen */}
        </ul>
        {/* END Left navbar */}
        {/* START Right Navbar */}
        <ul className="navbar-nav flex-row">
          {/* Search icon */}
          <li className="nav-item">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="nav-link" href="" data-search-open="">
              <em className="icon-magnifier" />
            </a>
          </li>
          {/* Fullscreen (only desktops) */}
          <li className="nav-item d-none d-md-block">
            <ToggleFullscreen className="nav-link" />
          </li>
          {/* START Alert menu */}
          <UncontrolledDropdown nav inNavbar className="dropdown-list">
            <DropdownToggle nav className="dropdown-toggle-nocaret">
              <em className="icon-bell" />
              <span className="badge badge-danger">11</span>
            </DropdownToggle>
            {/* START Dropdown menu */}
            <DropdownMenu
              right
              className="dropdown-menu-right animated flipInX"
            >
              <DropdownItem>
                {/* START list group */}
                <ListGroup>
                  <ListGroupItem
                    action
                    tag="a"
                    href=""
                    onClick={e => e.preventDefault()}
                  >
                    <div className="media">
                      <div className="align-self-start mr-2">
                        <em className="fab fa-twitter fa-2x text-info" />
                      </div>
                      <div className="media-body">
                        <p className="m-0">New followers</p>
                        <p className="m-0 text-muted text-sm">
                          1 new follower
                          </p>
                      </div>
                    </div>
                  </ListGroupItem>
                  <ListGroupItem
                    action
                    tag="a"
                    href=""
                    onClick={e => e.preventDefault()}
                  >
                    <div className="media">
                      <div className="align-self-start mr-2">
                        <em className="fa fa-envelope fa-2x text-warning" />
                      </div>
                      <div className="media-body">
                        <p className="m-0">New e-mails</p>
                        <p className="m-0 text-muted text-sm">
                          You have 10 new emails
                          </p>
                      </div>
                    </div>
                  </ListGroupItem>
                  <ListGroupItem
                    action
                    tag="a"
                    href=""
                    onClick={e => e.preventDefault()}
                  >
                    <div className="media">
                      <div className="align-self-start mr-2">
                        <em className="fa fa-tasks fa-2x text-success" />
                      </div>
                      <div className="media-body">
                        <p className="m-0">Pending Tasks</p>
                        <p className="m-0 text-muted text-sm">
                          11 pending task
                          </p>
                      </div>
                    </div>
                  </ListGroupItem>
                  <ListGroupItem
                    action
                    tag="a"
                    href=""
                    onClick={e => e.preventDefault()}
                  >
                    <span className="d-flex align-items-center">
                      <span className="text-sm">More notifications</span>
                      <span className="badge badge-danger ml-auto">14</span>
                    </span>
                  </ListGroupItem>
                </ListGroup>
                {/* END list group */}
              </DropdownItem>
            </DropdownMenu>
            {/* END Dropdown menu */}
          </UncontrolledDropdown>

          {/* END Alert menu */}
          {/* START Offsidebar button */}
          <li className="nav-item">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="nav-link" href="" onClick={this.toggleOffsidebar}>
              <em className="icon-notebook" />
            </a>
          </li>
          {/* END Offsidebar menu */}
        </ul>
        {/* END Right Navbar */}

        {/* START Search form */}
        <form className="navbar-form" role="search" action="search.html">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Type and hit enter ..."
            />
            <div
              className="fa fa-times navbar-form-close"
              data-search-dismiss=""
            />
          </div>
          <button className="d-none" type="submit">
            Submit
            </button>
        </form>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
  isAuthenticated: state.auth.token
})
const mapDispatchToProps = dispatch => ({
  toggleSetting: payload => dispatch(toggleSetting(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthHeader)
