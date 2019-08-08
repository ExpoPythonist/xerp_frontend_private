import { GOAL_LIST,
  CREATE_GOAL,
  CREATE_GOAL_DRAFT,
  SINGLE_GOAL,
  ALL_GOALS
} from '../constants'

let initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GOAL: {
      return (state = {
        ...state,
        goal_created: action.payload,
      })
    }
    case GOAL_LIST: {
      return (state = {
        ...state,
        goals: action.payload
      })
    }
    case SINGLE_GOAL: {
      return (state = {
        ...state,
        goal_created: action.payload
      })
    }
    case CREATE_GOAL_DRAFT: {
      return (state = {
        ...state,
        draft: action.payload,
      })
    }
    case ALL_GOALS: {
      return (state = {
        ...state,
        goals: action.payload
      })
    }
    default:
      return state
  }
}
