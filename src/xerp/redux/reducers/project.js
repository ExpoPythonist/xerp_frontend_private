import {
  CREATE_PROJECT,
  PROJECT_LIST,
  CREATE_PROJECT_DRAFT,
  UPDATE_PROJECT,
  SINGLE_PROJECT
} from '../constants'

let initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROJECT: {
      return (state = {
        ...state,
        single_project: action.payload,
      })
    }
    case PROJECT_LIST: {
      return (state = {
        ...state,
        projects: action.payload,
      })
    }
    case SINGLE_PROJECT: {
      return (state = {
        ...state,
        single_project: action.payload,
      })
    }
    case CREATE_PROJECT_DRAFT: {
      return (state = {
        ...state,
        draft: action.payload,
      })
    }
    case UPDATE_PROJECT: {
      return (state = {
        ...state,
        updated: action.payload,
      })
    }
    default:
      return state
  }
}
