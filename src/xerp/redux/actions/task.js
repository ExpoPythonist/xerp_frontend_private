import {
  TASK_LIST,
  CREATE_TASK,
  CREATE_TASK_DRAFT,
  UPDATE_TASK,
  ALL_TASKS
} from '../constants'
import { endpoint } from '../../../config'
import api from '../../../core/api'
import { setErrMsg } from './apps'

const baseUrl = endpoint.task

export const ActionCreator = (type, payload) => ({
  type,
  payload,
})

export const CreateTaskDraft = payload => {
  return dispatch => {
    dispatch(ActionCreator(CREATE_TASK_DRAFT, payload))
  }
}

export const CreateTask = payload => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api.post(baseUrl, payload).then(
        res => {
          dispatch(ActionCreator(CREATE_TASK, res))
          dispatch(getTaskList(payload.goal))
          dispatch(CreateTaskDraft())
          resolve(res)
        },
        err => {
          reject(setErrMsg(err))
        }
      )
    })
  }
}

export const UpdateTask = (payload, id) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api.patch(baseUrl + '/' + id, payload).then(
        res => {
          dispatch(ActionCreator(UPDATE_TASK, res))
          dispatch(getTaskList(payload.goal))
          dispatch(CreateTaskDraft())
          resolve(res)
        },
        err => {
          reject(setErrMsg(err))
        }
      )
    })
  }
}

export const getTaskList = (goal_id = null) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const url = baseUrl + '/goal/' + goal_id;
      api.get(url).then(
        res => {
          dispatch(ActionCreator(TASK_LIST, res))
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

export const deleteTask = (id, goal_id) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api.delete(baseUrl + '/' + id).then(
        async res => {
          dispatch(getTaskList(goal_id))
          resolve(res)
        },
        err => {
          reject(setErrMsg(err))
        }
      )
    })
  }
}

export const allTaskList = (params) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const url = baseUrl + params
      api.get(url).then(
        res => {
          dispatch(ActionCreator(ALL_TASKS, res))
          resolve()
        },
        err => {
          reject(setErrMsg(err))
        }
      )
    })
  }
}
