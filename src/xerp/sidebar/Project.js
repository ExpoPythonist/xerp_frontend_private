import { MyProject, MyGoal, AllTasks } from '../apps'

export const PrivateRoot = {
  dashboard: '/dashboard',
}

export const baseUrl = '/app/project'

export const Sidebar = [
  {
    heading: 'My Project',
    translate: 'sidebar.heading.HEADER',
  },
  {
    name: 'Project',
    icon: 'icon-speedometer',
    translate: 'sidebar.nav.DASHBOARD',
    path: '/',
    exact: true,
    component: MyProject,
    noSidebar: true,
  },
  {
    name: 'Goal',
    icon: 'icon-note',
    translate: 'sidebar.nav.form.FORM',
    path: '/goal',
    component: MyGoal,
  },
  {
    name: 'Task',
    icon: 'icon-grid',
    path: '/tasks',
    translate: 'sidebar.nav.WIDGETS',
    component: AllTasks,
  },
  {
    heading: 'My Issues',
    translate: 'sidebar.heading.COMPONENTS',
  },
  {
    name: 'Issues',
    icon: 'icon-chemistry',
    path: '/issues',
    translate: 'sidebar.nav.element.ELEMENTS',
    submenu: [
      {
        name: 'My open issues',
        path: '/my-open-issues',
        translate: 'sidebar.nav.element.BUTTON',
      },
      {
        name: 'All issues',
        path: '/all-issues',
        translate: 'sidebar.nav.element.NOTIFICATION',
      },
      {
        name: 'Done issues',
        path: '/done-issues',
      },
    ],
  },
]
