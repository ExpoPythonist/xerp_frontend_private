import ProjectRoute from './ProjectRoute'
// import AccountingRoute from "./AccountingRoute";
// import HrRoute from "./HrRoute";
// import MrpRoute from "./MrpRoute";

const AppList = [
  {
    icon: '/img/icons/target.png',
    name: 'Project',
    route: '/project',
    component: ProjectRoute,
  },
  {
    icon: '/img/icons/brief-case.png',
    name: 'Accounting',
    route: '/accounting',
    component: ProjectRoute,
  },
  {
    icon: '/img/icons/people.png',
    name: 'HR',
    route: 'hr',
    component: ProjectRoute,
  },
  {
    icon: '/img/icons/contact.png',
    name: 'MRP',
    route: '/mrp',
    component: ProjectRoute,
  },
  {
    icon: '/img/icons/note.png',
    name: 'MRP',
    route: '/mrp',
    component: ProjectRoute,
  },
]

export default AppList
