import { LOAD_TASK } from './reducer';
import { getLists } from '../lists/actions';

export const getTask = (id) => async(dispatch) => {
  const data = await fetch(`/tasks/${id}`)
  if(data.ok) {
    const task = await data.json();

    // console.log('---------', task)
    dispatch({
      type: LOAD_TASK,
      task
    })
    return task;
  }
}

export const updateTitle = (id, title) => async(dispatch) => {
  const data = await fetch(`/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title
    })
  })
  if (data.ok) {
    const task = await data.json();
    await dispatch(getTask(id))
    return task
  }
}

export const updateDescription = (id, description) => async(dispatch) => {
  const data = await fetch(`/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description
    })
  })
  if (data.ok) {
    const task = await data.json();
    await dispatch(getTask(id))
    return task
  }
}

export const statusToggle = (status, id) => async(dispatch) => {
  const data = await fetch(`/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status
    })
  })
  if (data.ok) {
    const task = await data.json();
    await dispatch(getTask(id))
    return task
  }
}

export const deleteTask = (id) => async(dispatch) => {
  const data = await fetch(`/tasks/${id}`, {
    method: 'DELETE',
  })
  if (data.ok) {
    const task = await data.json();
    // console.log(task)
    await dispatch(getLists())
    return task
  }
}

export const addComment = (comment, taskId) => async(dispatch) => {
  const data = await fetch('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment,
      taskId
    })
  })
  if (data.ok) {
    const comment = await data.json();
    await dispatch(getTask(taskId))
    return comment
  }
}

export const editComment = (comment, commentId, taskId) => async(dispatch) => {
  console.log('here')
  const data = await fetch(`/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment,
      taskId
    })
  })
  if (data.ok) {
    const comment = await data.json();
    await dispatch(getTask(taskId))
    return comment
  }
}

export const deleteComment = (id) => async(dispatch) => {
  const data = await fetch(`/comments/${id}`, {
    method: 'DELETE',
  })
  if (data.ok) {
    const comment = await data.json();
    // console.log(comment)
    await dispatch(getTask(comment.taskId))
    return comment
  }
}
