import {
  HomePage,
  NotFound,
  Login,
  Register,
  ActivateAccount,
} from '../components'
import { SingleProject, SingleTask, InitProject } from '../apps'
import { Project } from '../sidebar'
import { AppHome, CompanyCreate } from '../apps'

const ProjectSidebar = Project.Sidebar || []
let baseUrl = ''

export let ProjectRouter = []

ProjectSidebar.map(item => {
  if (item.path) baseUrl = item.path
  if (item.path && !item.component && !item.submenu) {
    return ProjectRouter.push({
      path: item.path,
      exact: true,
      component: NotFound,
    })
  }
  if (item.submenu) {
    item.submenu.map(submenu => {
      return submenu.path && submenu.component
        ? ProjectRouter.push({
          path: baseUrl + submenu.path,
          exact: true,
          component: submenu.component,
        })
        : ProjectRouter.push({
          path: baseUrl + submenu.path,
          exact: true,
          component: NotFound,
        })
    })
  } else {
    return (
      item.path &&
      ProjectRouter.push({
        path: item.path,
        exact: true,
        component: item.component,
      })
    )
  }
  return ProjectRouter
})

// Project Routes
ProjectRouter = [
  ...ProjectRouter,
  { path: '/tasks/:id', component: SingleTask, exact: true },
  {
    path: '/:id',
    component: SingleProject,
  },
]

// Login or Sign in Routes
export const Auth = [
  { path: '/login', exact: true, component: Login },
  { path: '/register', exact: true, component: Register },
  { path: '/active-account', exact: true, component: ActivateAccount },
]

// Public Routes
export const Public = [{ path: '/', exact: true, component: HomePage }]

export const Private = [
  { path: '/app', component: AppHome, exact: true },
  {
    path: '/company-create',
    component: CompanyCreate,
    exact: true,
  },
  {
    path: '/initialize-project',
    exact: true,
    component: InitProject,
  },
]
