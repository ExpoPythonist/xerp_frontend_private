import api from '../../../core/api'
import { endpoint } from '../../../config'
import { SIGNIN_USER } from '../constants'

const SuccessLoginUser = payload => ({
  type: SIGNIN_USER,
  payload,
})

export const GetUser = id => {
  return dispatch => {
    const url = endpoint.user + '/' + id
    return new Promise((resolve, reject) => {
      api.get(url).then(
        res => {
          dispatch(SuccessLoginUser(res))
        },
        err => reject(err)
      )
    })
  }
}
