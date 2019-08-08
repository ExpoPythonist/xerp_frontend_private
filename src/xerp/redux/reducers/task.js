import { CREATE_TASK,
  TASK_LIST,
  CREATE_TASK_DRAFT,
  UPDATE_TASK,
  ALL_TASKS
} from '../constants'

let initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK: {
      return (state = {
        ...state,
        task_created: action.payload,
      })
    }
    case TASK_LIST: {
      return (state = {
        ...state,
        tasks: action.payload,
      })
    }
    case UPDATE_TASK: {
      return (state = {
        ...state,
        updated: action.payload,
      })
    }
    case CREATE_TASK_DRAFT: {
      return (state = {
        ...state,
        draft: action.payload,
      })
    }
    case ALL_TASKS: {
      return (state = {
        ...state,
        tasks: action.payload,
      })
    }
    default:
      return state
  }
}
