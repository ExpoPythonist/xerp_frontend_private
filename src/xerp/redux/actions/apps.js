import api from '../../../core/api'
import { endpoint } from '../../../config'
import { COUNTRY_LIST } from '../constants'

export const ActionCreator = (type, payload) => ({
  type,
  payload,
})

export const GetCountryList = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      let url = endpoint.countries
      api.get(url).then(
        res => {
          dispatch(ActionCreator(COUNTRY_LIST, res))
          resolve(res)
        },
        error => {
          reject(error)
        }
      )
    })
  }
}

export const setErrMsg = err => {
  if (!err.response) {
    return {
      status: 500,
      message: 'Network error! Please check your internet connection',
    }
  } else {
    return {
      status: err.response.status,
      message: err.response.statusText,
      data: err.response.data
    }
  }
}

export const CreateCompany = payload => {
  return () => {
    return new Promise((resolve, reject) => {
      const url = endpoint.company_create
      api.post(url, payload).then(res => resolve(res), err => reject(err))
    })
  }
}
