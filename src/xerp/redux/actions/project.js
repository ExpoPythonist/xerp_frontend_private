import {
  PROJECT_LIST,
  CREATE_PROJECT,
  CREATE_PROJECT_DRAFT,
  UPDATE_PROJECT,
  SINGLE_PROJECT
} from '../constants'
import { endpoint } from '../../../config'
import api from '../../../core/api'
import { setErrMsg } from './apps'

const baseUrl = endpoint.project;
const compUrl = endpoint.company;

export const ActionCreator = (type, payload) => ({
  type,
  payload,
})

export const CreateProjectDraft = payload => {
  return dispatch => {
    dispatch(ActionCreator(CREATE_PROJECT_DRAFT, payload))
  }
}

export const CreateProject = payload => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api.post(baseUrl, payload).then(
        res => {
          dispatch(ActionCreator(CREATE_PROJECT, res))
          dispatch(getProjectList(''))
          dispatch(CreateProjectDraft())
          resolve(res)
        },
        err => {
          reject(setErrMsg(err))
        }
      )
    })
  }
}

export const UpdateProject = (payload) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api.patch(baseUrl + '/' + payload.id, payload).then(
        res => {
          dispatch(getProjectList(''))
          dispatch(CreateProjectDraft())
          dispatch(ActionCreator(UPDATE_PROJECT, res))
          resolve(res)
        },
        err => {
          reject(setErrMsg(err))
        }
      )
    })
  }
}

export const getProjectList = (params) => {
  return (dispatch, getState) => {
    const company = getState().auth.company
    return new Promise((resolve, reject) => {
      if (company) {
        const url = compUrl + '/' + company.id + '/project' + params;
        api.get(url).then(
          res => {
            dispatch(ActionCreator(PROJECT_LIST, res))
            resolve()
          },
          err => {
            console.log(err)
            reject(setErrMsg(err))
          }
        )
      }

    })
  }
}

export const deleteProject = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api.delete(baseUrl + '/' + id).then(
        async res => {
          dispatch(getProjectList(''))
          resolve(res)
        },
        err => {
          reject(setErrMsg(err))
        }
      )
    })
  }
}

export const getProject = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api.get(baseUrl + '/' + id).then(
        res => {
          dispatch(ActionCreator(SINGLE_PROJECT, res))
          resolve()
        },
        err => {
          console.log(err)
          reject(setErrMsg(err))
        }
      )
    })
  }
}
