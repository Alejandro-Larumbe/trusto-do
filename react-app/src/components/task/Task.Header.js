import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteDialog from '../ui/DeleteDialog';
import Box from '@material-ui/core/Box';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { updateTitle, deleteTask, statusToggle } from './actions';
import { editTaskUI, editListUI, openTask, openSnackBar } from '../ui/actions';
import { getLists } from '../lists/actions';


const useStyles = makeStyles((theme) => ({
  inputFont: {
    fontSize: 22
  },
  item: {
    padding: theme.spacing(2),
  },
  title: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

function TaskHeader(props) {
  const {
    editTitle,
    task
  } = props
  const [newTitle, setNewTitle] = useState('')

  const classes = useStyles();
  const dispatch = useDispatch();

  const onEditTitle = (e) => {
    e.preventDefault();
    (async () => {
      if (newTitle !== '') {
        await dispatch(updateTitle(task.id, newTitle))
      }
      dispatch(editTaskUI(null, ''))
    })()
  }

  const onDeleteTask = (e) => {
    e.preventDefault();
    dispatch(deleteTask(task.id))
    dispatch(editListUI(null, ''))
    dispatch(openSnackBar(true, 'Task deleted succesfully', 'success'))
    dispatch(openTask(false, ''))
  }

  const handleChange = (cb) => (event) => {
    cb(event.target.value)
  }

  return (
    <>
      <Box
        height={80}
        className={classes.item}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          align-items="center"
        >
          <Grid item xs={10}>

            {
              editTitle ?
                <form onSubmit={onEditTitle} >
                  <ClickAwayListener onClickAway={onEditTitle}>
                    <TextField
                      defaultValue={task.title}
                      size="small"
                      variant="outlined"
                      margin='dense'
                      fullWidth
                      required
                      InputProps={{
                        classes: {
                          input: classes.inputFont,
                        },
                      }}
                      onChange={handleChange(setNewTitle)}
                    />
                  </ClickAwayListener>
                </form>
                :
                <>
                  <Typography noWrap onClick={() => dispatch(editTaskUI('editTitle', null))} className={classes.title} variant="h5" component="h1">
                    {task.title}
                  </Typography>
                  <Typography noWrap variant="body2" component="h2">
                    {`from list ${task.list.title}`}
                  </Typography>
                </>
            }
          </Grid>
          <Grid item>
            <IconButton
              edge='end'
              size='small'
              onClick={() => {
                (async () => {
                  await dispatch(statusToggle(task.status ? false : true, task.id))
                  await dispatch(openSnackBar(true, task.status ? 'Wait, you did not complete the task!' : 'Task Completed, Yay!', task.status ? 'warning' : 'success'))
                  await dispatch(getLists())
                }
                )()
              }}
            >
              {
                task.status
                  ?
                  <CheckCircleIcon style={{ color: '#188C97' }} />
                  :
                  <CheckCircleOutlineIcon />
              }
            </IconButton>
            <IconButton
              edge='end'
              size='small'
              onClick={() => dispatch(editListUI('deleteDialogue', null))}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              size='small'
              edge='end'
              onClick={() => { dispatch(openTask(false, '')) }}
            >
              <CloseIcon />
            </IconButton>
          </Grid >

        </Grid>
      </Box>
      <DeleteDialog
        title={'Are you sure you wish to delete task?'}
        message={"All comments will be deleted as well and you won't be able to open this task again. There is no undo."}
        callBack={onDeleteTask}

      />
    </>
  )
}

export default function TaskHeaderContainer(props) {
  const editTitle = useSelector(state => state.ui.task.type) === 'editTitle'

  return (
    <TaskHeader
      editTitle={editTitle}
      {...props}
    />
  )
}
