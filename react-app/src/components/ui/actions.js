import {
  EDIT_TASK_COMMENT,
  OPEN_SNACK_BAR,
  EDIT_LIST,
  EDIT_TASK,
  OPEN_TASK,
} from './reducer';

export const editingTaskComment = (commentId, boolean) => async dispatch => {
  dispatch({type: EDIT_TASK_COMMENT, commentId, boolean})
}

export const openSnackBar = (open, message, severity) => async dispatch => {
  dispatch({type: OPEN_SNACK_BAR, open, message, severity})
}

export const openTask = (open, id) => async dispatch => {
  dispatch({type: OPEN_TASK, open, id})
}

export const editListUI = (componentType, id) => async dispatch => {
  dispatch({type: EDIT_LIST, componentType, id})
}

export const editTaskUI = (componentType, id) => async dispatch => {
  dispatch({type: EDIT_TASK, componentType, id})
}
