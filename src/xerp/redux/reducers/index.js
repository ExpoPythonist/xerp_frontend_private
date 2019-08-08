import { combineReducers } from 'redux'
import AppsReducer from './apps'
import settingsReducer from './settings'
import themeReducer from './themes'
import AuthReducer from './auth'
import ProjectReducer from './project'
import GoalReducer from './goal'
import TaskReducer from './task'

const reducers = combineReducers({
  app: AppsReducer,
  auth: AuthReducer,
  settings: settingsReducer,
  theme: themeReducer,
  project: ProjectReducer,
  goal: GoalReducer,
  task: TaskReducer,
})

export default reducers
