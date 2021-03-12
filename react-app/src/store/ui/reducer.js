export const EDIT_TASK_COMMENT = 'EDIT_TASK_COMMENT';
export const OPEN_SNACK_BAR = 'OPEN_SNACK_BAR';

export default function reducer(state = {}, action) {
  Object.freeze(state)

  switch (action.type) {
    case EDIT_TASK_COMMENT:
      return {
        ...state,
        task: {
          comment: {
            currentId: action.commentId,
            active: action.boolean
          }
        }
      }
    case OPEN_SNACK_BAR:
      return {
        ...state,
        snackBar: {
          open: action.open,
          message: action.message,
          severity: action.severity
        }
      }
    default: return state
  }
};
