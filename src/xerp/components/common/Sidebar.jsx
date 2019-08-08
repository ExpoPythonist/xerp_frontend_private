import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import { Collapse, Badge } from 'reactstrap'
import { connect } from 'react-redux'
// import MenuItem from './MenuItem'
import SidebarUserBlock from './SidebarUserBlock'
import { SidebarRun } from '../../container';
import { toggleSetting } from '../../redux';
import { Project } from '../../sidebar'
const baseUrl = Project.baseUrl;
const ProjectSidebar = Project.Sidebar;

/** Component to display headings on sidebar */
const SidebarItemHeader = ({ item }) => (
  <li className="nav-heading">
    <span>{item.heading}</span>
  </li>
)

/** Normal items for the sidebar */
const SidebarItem = ({ item, path, handler }) => (
  <li onClick={(e) => {
    e.preventDefault();
    handler && handler()
  }}>
    <NavLink to={baseUrl + path} title={item.name} exact>
      {item.label && (
        <Badge tag="div" className="float-right" color={item.label.color}>
          {item.label.value}
        </Badge>
      )}
      {item.icon && <em className={item.icon} />}
      <span>{item.name}</span>
    </NavLink>
  </li>
)

/** Build a sub menu with items inside and attach collapse behavior */
const SidebarSubItem = ({ item, isActive, handler, children, isOpen }) => (
  <li className={isActive ? 'active' : ''}>
    <div className="nav-item" onClick={handler}>
      {item.label && <Badge tag="div" className="float-right" color={item.label.color}>{item.label.value}</Badge>}
      {item.icon && <em className={item.icon}></em>}
      <span>{item.name}</span>
    </div>
    <Collapse isOpen={isOpen}>
      <ul id={item.path} className="sidebar-nav sidebar-subnav">
        {children}
      </ul>
    </Collapse>
  </li>
)

/** Component used to display a header on menu when using collapsed/hover mode */
const SidebarSubHeader = ({ item }) => (
  <li className="sidebar-subnav-header">{item.name}</li>
)


class Sidebar extends React.Component {
  state = {
    collapse: {},
  }

  componentDidMount() {
    // pass navigator to access router api
    SidebarRun(this.navigator, this.closeSidebar)
    // prepare the flags to handle menu collapsed states
    this.buildCollapseList()

    // Listen for routes changes in order to hide the sidebar on mobile
    this.props.history.listen(this.closeSidebar)
  }

  closeSidebar = () => {
    this.props.toggleSetting('asideToggled')
  }

  /** prepare initial state of collapse menus. Doesnt allow same route names */
  buildCollapseList = () => {
    let collapse = {}
    ProjectSidebar.filter(({ heading }) => !heading).forEach(
      ({ name, path, submenu }) => {
        collapse[name] = this.routeActive(
          submenu ? submenu.map(({ path }) => path) : path
        )
      }
    )
    this.setState({ collapse })
  }

  navigator = route => {
    this.props.history.push(route)
  }

  routeActive(paths) {
    paths = Array.isArray(paths) ? paths : [paths]
    return paths.some(p => this.props.location.pathname.indexOf(p) > -1)
  }

  toggleItemCollapse(stateName) {
    for (let c in this.state.collapse) {
      if (this.state.collapse[c] === true && c !== stateName)
        this.setState({
          collapse: {
            [c]: false,
          },
        })
    }
    this.setState({
      collapse: {
        [stateName]: !this.state.collapse[stateName],
      },
    })
  }

  getSubRoutes = item => item.submenu.map(({ path }) => path)

  render() {
    // const { path } = this.props.match;
    return (
      <aside className="aside-container">
        {/* <!-- START Sidebar (left)--> */}
        <div className="aside-inner">
          <nav className="sidebar" data-sidebar-anyclick-close="">
            {/* <!-- START sidebar nav--> */}
            <ul className="sidebar-nav">
              {/* <!-- START user info--> */}
              <li className="has-user-block">
                <SidebarUserBlock />
              </li>


              {ProjectSidebar.map((item, i) => {
                if (item.heading)
                  return <SidebarItemHeader item={item} key={i} />
                else {
                  if (!item.submenu)
                    return (
                      <SidebarItem
                        isActive={this.routeActive(
                          item.path
                        )}
                        item={item}
                        key={i}
                        path={item.path}
                        handler={() => this.toggleItemCollapse(item.name)}
                      />
                    )
                  if (item.submenu)
                    return [
                      <SidebarSubItem
                        item={item}
                        isOpen={
                          this.state.collapse[item.name]
                        }
                        handler={() =>
                          this.toggleItemCollapse(item.name)
                        }
                        isActive={this.routeActive(
                          this.getSubRoutes(item)
                        )}
                        key={i}
                      >
                        <SidebarSubHeader
                          item={item}
                          key={i}
                        />
                        {item.submenu.map((subitem, i) => (
                          <SidebarItem
                            key={i}
                            item={subitem}
                            isActive={this.routeActive(
                              subitem.path
                            )}
                            path={
                              item.path && subitem.path
                                ? (item.path === '/'
                                  ? ''
                                  : item.path) +
                                subitem.path
                                : '#'
                            }
                          />
                        ))}
                      </SidebarSubItem>,
                    ]
                }
                return null
              })}
            </ul>
          </nav>
        </div>
      </aside>
    )
  }
}

Sidebar.propTypes = {
  actions: PropTypes.object,
  settings: PropTypes.object,
}

const mapStateToProps = state => ({ settings: state.settings })
const mapDispatchToProps = dispatch => ({
  toggleSetting: payload => dispatch(toggleSetting(payload)),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar))