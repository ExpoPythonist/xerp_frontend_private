import BaseAPI from './BaseAPI'
import store from '../store'

export class RestAPI extends BaseAPI {
  get = (url, token = store.getState().auth.token) => {
    let accessToken = 'token ' + token
    if (token)
      return this.callAPI(
        url,
        'get',
        {},
        { headers: { Authorization: accessToken } }
      )
    else return this.callAPI(url, 'get')
  }

  put = (url, payload, token = store.getState().auth.token) => {
    let accessToken = 'token ' + token
    if (token)
      return this.callAPI(url, 'put', payload, {
        headers: { Authorization: accessToken },
      })
    else return this.callAPI(url, 'put', payload)
  }

  patch = (url, payload, token = store.getState().auth.token) => {
    let accessToken = 'token ' + token
    if (token)
      return this.callAPI(url, 'patch', payload, {
        headers: { Authorization: accessToken },
      })
    else return this.callAPI(url, 'put', payload)
  }

  post = (url, payload, token = store.getState().auth.token) => {
    let accessToken = 'token ' + token
    if (token)
      return this.callAPI(url, 'post', payload, {
        headers: { Authorization: accessToken },
      })
    else return this.callAPI(url, 'post', payload)
  }

  delete = (url, token = store.getState().auth.token) => {
    let accessToken = 'token ' + token
    if (token)
      return this.callAPI(
        url,
        'delete',
        {},
        { headers: { Authorization: accessToken } }
      )
    else return this.callAPI(url, 'delete')
  }
}

export default new RestAPI()
