import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { updateDescription } from './actions';
import { openSnackBar, editTaskUI } from '../ui/actions';


const useStyles = makeStyles((theme) => ({
  item: {
    padding: theme.spacing(2),
  },
  description: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

export function TaskDescription(props) {
  const {
    task,
    editDescription
  } = props
  const [newDescription, setNewDescription] = useState('')
  const classes = useStyles();
  const dispatch = useDispatch()

  const onDescriptionUpdate = (e) => {
    (async () => {
      await e.preventDefault()
      await dispatch(updateDescription(task.id, newDescription))
      await dispatch(editTaskUI('', null))
      await dispatch(openSnackBar(true, 'Description updated succesfully', 'success'))
    }
    )()
  }

  return (
    <>
      <Grid className={classes.item} item>
        <Typography variant="h6" component="h3">
          Description
      </Typography>

        {
          editDescription || !task.description
            ?
            <>
              <TextField
                variant='outlined'
                size='small'
                required
                fullWidth
                multiline
                defaultValue={task.description}
                onClick={() => dispatch(editTaskUI('editDescription', null))}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <span >
                <Button variant="contained" color='secondary' onClick={onDescriptionUpdate}>
                  Save
              </Button >
                {
                  task.description &&
                  <Button onClick={() => dispatch(editTaskUI('', null))}>
                    Cancel
                </Button>
                }
              </span>
            </>

            :
            <Typography wrap onClick={() => dispatch(editTaskUI('editDescription', null))} className={classes.description} variant="body1" component="p">
              {task.description}
            </Typography>
        }
      </Grid >
    </>
  )
}

export default function TaskDescriptionContainer(props) {
  const editDescription = useSelector(store => store.ui.task.type) === 'editDescription'

  return (
    <TaskDescription
      editDescription={editDescription}
      {...props}
    />
  )
}
