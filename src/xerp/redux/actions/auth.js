import api from '../../../core/api'
import { endpoint } from '../../../config';
import { SIGNUP_USER, SIGNIN_USER, ACTIVATE_ACCOUNT, LOGOUT_USER } from '../constants';

const SuccessRegisterUser = payload => ({
  type: SIGNUP_USER,
  payload,
})

const SuccessLoginUser = payload => ({
  type: SIGNIN_USER,
  payload,
})

const SuccessActivation = payload => ({
  type: ACTIVATE_ACCOUNT,
  payload,
})

const ClearUserData = () => ({
  type: LOGOUT_USER,
})


export const SignUpUser = payload => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      let url = endpoint.signup
      api.post(url, payload).then(
        res => {
          dispatch(SuccessRegisterUser(res))
          resolve(res)
        },
        error => {
          reject(error)
        }
      )
    })
  }
}

export const AccAccount = payload => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      let url = endpoint.active
      console.log(payload)
      api.post(url, payload).then(
        res => {
          dispatch(SuccessActivation(res))
          resolve(res)
        },
        error => {
          reject(error)
        }
      )
    })
  }
}

export const SignInUser = payload => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      let url = endpoint.signin
      api.post(url, payload).then(
        res => {
          localStorage.setItem('token', res.token)
          dispatch(SuccessLoginUser(res))
          resolve(res)
        },
        error => {
          reject(error)
        }
      )
    })
  }
}


export const LogoutUser = () => {
  return dispatch => {
    dispatch(ClearUserData())
    localStorage.clear();
  }
}
