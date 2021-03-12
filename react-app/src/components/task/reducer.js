export const LOAD_TASK = 'LOAD_TASK';

export default function task(state = {}, action) {
  Object.freeze(state);

  switch (action.type) {
    case LOAD_TASK:
      return {
        ...state,
        ...action.task
      }

    default: return state
  }

}
