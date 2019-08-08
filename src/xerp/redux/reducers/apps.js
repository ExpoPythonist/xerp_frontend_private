import { COUNTRY_LIST } from '../constants'

let initialState = {
}

export default (state = initialState, action) => {
  switch (action.type) {
    case COUNTRY_LIST: {
      return (state = {
        ...state,
        ...action.payload,
      })
    }
    default:
      return state
  }
}
