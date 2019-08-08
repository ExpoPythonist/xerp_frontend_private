import { CHANGE_THEME } from '../constants'

const initialState = {
  path: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        path: action.path,
      }
    default:
      return state
  }
}
