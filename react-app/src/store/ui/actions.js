import { EDIT_TASK_COMMENT } from './reducer';
import { OPEN_SNACK_BAR } from './reducer';

export const editingTaskComment = (commentId, boolean) => async dispatch => {
  dispatch({type: EDIT_TASK_COMMENT, commentId, boolean})
}

export const openSnackBar = (open, message, severity) => async dispatch => {
  dispatch({type: OPEN_SNACK_BAR, open, message, severity})
}
