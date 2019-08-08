import { SIGNIN_USER, LOGOUT_USER } from "../constants";

let initialState = {}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER: {
      return (state = {
        ...state,
        ...action.payload,
      })
    }
    case LOGOUT_USER: {
      return (state = initialState)
    }
    default:
      return state
  }
}


export default AuthReducer;