export const LOAD_LISTS = 'LOAD_LISTS'

export default function lists(state = {}, action) {
  Object.freeze(state);
  console.log('---------getlists', action.lists)

  switch (action.type) {
    case LOAD_LISTS:
      return {
        ...state,
        ...action.lists
      }

    default: return state
  }
}
