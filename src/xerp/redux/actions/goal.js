import { GOAL_LIST, CREATE_GOAL, CREATE_GOAL_DRAFT, UPDATE_GOAL, SINGLE_GOAL, ALL_GOALS } from '../constants'
import { endpoint } from '../../../config'
import api from '../../../core/api'
import { setErrMsg } from './apps'

const goalUrl = endpoint.goal

export const ActionCreator = (type, payload) => ({
  type,
  payload,
})

export const CreateGoalDraft = payload => {
  return dispatch => {
    dispatch(ActionCreator(CREATE_GOAL_DRAFT, payload))
  }
}

export const CreateGoal = payload => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api.post(goalUrl, payload).then(
        res => {
          dispatch(getGoalList(payload.project))
          dispatch(CreateGoalDraft())
          dispatch(ActionCreator(CREATE_GOAL, res))
          resolve(res)
        },
        err => {
          dispatch(CreateGoalDraft())
          reject(setErrMsg(err))
        }
      )
    })
  }
}

export const UpdateGoal = (payload, id) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api.patch(goalUrl + '/' + id, payload).then(
        res => {
          dispatch(getGoalList(payload.project))
          dispatch(CreateGoalDraft())
          dispatch(ActionCreator(UPDATE_GOAL, res))
          resolve(res)
        },
        err => {
          dispatch(CreateGoalDraft())
          reject(setErrMsg(err))
        }
      )
    })
  }
}

export const getGoalList = (id = null) => {
  return dispatch => {
    let url;
    if (id) {
      url = goalUrl + '/project/' + id
    } else {
      url = goalUrl;
    }
    return new Promise((resolve, reject) => {
      api.get(url).then(
        res => {
          dispatch(ActionCreator(GOAL_LIST, res))
          resolve(res)
        },
        err => {
          dispatch(ActionCreator(GOAL_LIST))
          reject(setErrMsg(err))
        }
      )
    })
  }
}

export const deleteGoal = (id, project_id) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api.delete(goalUrl + '/' + id).then(
        async res => {
          dispatch(getGoalList(project_id))
          resolve(res)
        },
        err => {
          reject(setErrMsg(err))
        }
      )
    })
  }
}

export const getGoal = id => {
  return dispatch => {
    const url = goalUrl + '/' + id
    return new Promise((resolve, reject) => {
      api.get(url).then(
        res => {
          dispatch(ActionCreator(SINGLE_GOAL, res))
          resolve(res)
        },
        err => {
          reject(setErrMsg(err))
        }
      )
    })
  }
}

export const allGoalList = (params) => {
  return dispatch => {
    let url = goalUrl
    console.log(url+params)
    return new Promise((resolve, reject) => {
      api.get(url + params).then(
        res => {
          dispatch(ActionCreator(ALL_GOALS, res))
          resolve(res)
        },
        err => {
          dispatch(ActionCreator(ALL_GOALS))
          reject(setErrMsg(err))
        }
      )
    })
  }
}
