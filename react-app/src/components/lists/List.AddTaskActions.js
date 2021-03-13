import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { editListUI } from '../ui/actions';

export default function ListAddTaskActions(props) {
  const { list, onAddTask } = props
  const { currentId, type = 'task' } = props.editListUi
  const dispatch = useDispatch()
  return (
    <>
      {
        (type === 'addTask' && currentId === list.id) ?
        <>
            <Button fullWidth onClick={onAddTask} color='secondary' variant="contained">Save Task</Button>
            <Button fullWidth onClick={() => dispatch(editListUI('', null))} >Cancel</Button>
          </>
          :
          <Button
            variant='contained'
            color='secondary'
            fullWidth
            onClick={() => dispatch(editListUI('addTask', list.id))}
            // size="small"
            startIcon={<AddIcon />}
          >
            Add Task
          </Button>
      }
    </>
  )
}
