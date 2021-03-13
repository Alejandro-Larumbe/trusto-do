import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function ListAddTask(props) {
  const { list, setNewTaskTitle } = props
  const { currentId, type } = props.editListUi

  const handleChange = (cb) => (event) => {
    cb(event.target.value)
  }

  return (
    <>
      {
        (type === 'addTask' && (currentId === list.id)) &&
        <form >
          <TextField
            placeholder="Enter a Task Title"
            variant="outlined"
            fullWidth
            required
            style={{ paddingTop: '100' }}
            onChange={handleChange(setNewTaskTitle)}
          />
        </form>
      }
    </>
  )
}
