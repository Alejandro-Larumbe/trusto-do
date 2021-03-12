import { LOAD_LISTS } from './reducer';

export const getLists = () => async(dispatch) => {
  const data = await fetch('/lists')
  if (data.ok) {
    const lists = await data.json();
    dispatch({
      type: LOAD_LISTS,
      lists
    })
    return lists;
  }
}

export const updateTitle = (id, title) => async(dispatch) => {
  const data = await fetch(`/lists/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title
    })
  })
  if (data.ok) {
    const list = await data.json();
    await dispatch(getLists())
    return list
  }
}

export const addTask = (title, listId) => async(dispatch) => {
  const data = await fetch(`/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      listId,
      title
    })
  })
  if (data.ok) {
    const task = await data.json();
    await dispatch(getLists())
    return task
  }
}

export const addList = (title) => async(dispatch) => {
  const data = await fetch('/lists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title
    })
  })
  if (data.ok) {
    const list = await data.json();
    await dispatch(getLists())
    return list
  }
}

export const deleteList = (id) => async(dispatch) => {
  const data = await fetch(`/lists/${id}`, {
    method: 'DELETE',
  })
  if (data.ok) {
    // await dispatch(getLists())
    const list = await data.json();
    return list
  }
}
