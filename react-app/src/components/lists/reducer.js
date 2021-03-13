export const LOAD_LISTS = 'LOAD_LISTS'
export const DELETE_LIST = 'DELETE_LIST'

export default function lists(state = {}, action) {
  Object.freeze(state);

  switch (action.type) {
    case LOAD_LISTS:
    console.log(action.lists)
    return {
      ...state,
      ...action.lists
    }

    case DELETE_LIST:
      return {
        ...action.lists
      }

    default: return state
  }
}
