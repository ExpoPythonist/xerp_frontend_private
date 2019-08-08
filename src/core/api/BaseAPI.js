import axios from 'axios'
import { baseURL } from '../../config'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

class BaseAPI {
  constructor() {
    this.requestHeaders = {
      // 'X-Requested-With': "XMLHttpRequest"
    }
  }

  callAPI = (endpoint, method = 'get', payload = {}, headers = {}) => {
    let url = baseURL + endpoint
    let promise

    if (
      method.toLowerCase() === 'post' ||
      method.toLowerCase() === 'put' ||
      method.toLowerCase() === 'patch'
    ) {
      promise = new Promise((resolve, reject) => {
        axios[method.toLowerCase()](url, payload, headers)
          .then(res => resolve(res.data))
          .catch(reject)
      })
    } else {
      promise = new Promise((resolve, reject) => {
        axios[method.toLowerCase()](url, headers)
          .then(res => resolve(res.data))
          .catch(reject)
      })
    }
    return promise
  }
}

export default BaseAPI
