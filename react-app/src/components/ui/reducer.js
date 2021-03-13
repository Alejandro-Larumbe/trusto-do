export const EDIT_TASK_COMMENT = 'EDIT_TASK_COMMENT';
export const OPEN_SNACK_BAR = 'OPEN_SNACK_BAR';
export const OPEN_TASK = 'OPEN_TASK';
export const EDIT_LIST =  "EDIT_LIST";
export const EDIT_TASK =  "EDIT_TASK";
export const DARK =  "DARK";

export default function reducer(state = {}, action) {
  Object.freeze(state)

  switch (action.type) {
    case EDIT_TASK_COMMENT:
      return {
        ...state,
        comment: {
          currentId: action.commentId,
          active: action.boolean
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
    case EDIT_LIST:
      return {
        ...state,
        list: {
          type: action.componentType,
          currentId: action.id
        }
      }
    case EDIT_TASK:
      return {
        ...state,
        task: {
          type: action.componentType,
          currentId: action.id
        }
      }
    case OPEN_TASK:
      return {
        ...state,
        openTask: {
          open: action.open,
          taskId: action.id
        }
      }
    case DARK:
      return {
        ...state,
        dark: action.boolean
      }
    default: return state
  }
};
