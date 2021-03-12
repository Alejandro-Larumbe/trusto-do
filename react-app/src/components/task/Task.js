import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '../Modal';
import DeleteDialog from '../DeleteDialog';
import { getTask, updateTitle, deleteTask, updateDescription, statusToggle, addComment } from './actions';
import { getLists } from '../lists/actions';
import { openSnackBar } from '../../store/ui/actions';
import Comment from '../comment/Comment';
import Box from '@material-ui/core/Box';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    minWidth: 300,
    // margin: 'auto',
    outline: 'none',
    // flexGrow:1

  },
  inputFont: {
    fontSize: 24
  },
  item: {
    padding: theme.spacing(2),
  },
  description: {
    '&:hover': {
      cursor: 'pointer'
    }
  }

}));



function Task(props) {
  const {
    open,
    setOpen,
    task
  } = props
  const classes = useStyles();
  const [newComment, setNewComment] = useState('')
  // const [currentComment, setCurrentComment] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const dispatch = useDispatch()

  const handleChange = (cb) => (event) => {
    cb(event.target.value)
  }

  const onEditTitle = (e) => {
    e.preventDefault();

    (async () => {
      if (newTitle !== '') {
        await dispatch(updateTitle(task.id, newTitle))
      }
      setEditTitle(false)
      dispatch(openSnackBar(true, 'Task title edited succesfully', 'success'))
    })()
  }

  const onDeleteTask = (e) => {
    e.preventDefault();

    (async () => {
      await dispatch(deleteTask(task.id))
      // await dispatch(getTasks())
      dispatch(getLists())
      setOpenDeleteDialog(false)
      setOpen(false)
      dispatch(openSnackBar(true, 'Task deleted succesfully', 'success'))
    })()
  }

  const onAddComment = (e) => {
    e.preventDefault();
    dispatch(addComment(newComment, task.id))
    // setnewComment('')
    setNewComment('')
    // this.forceUpdate()
    dispatch(openSnackBar(true, 'Comment added succesfully', 'success'))
  }

  const onDescriptionUpdate = (e) => {
    (async () => {
      await e.preventDefault()
      await dispatch(updateDescription(task.id, newDescription))
      await setEditDescription(false)
      await dispatch(openSnackBar(true, 'Description updated succesfully', 'success'))
    }
    )()
  }


  return (
    <>
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        title={`Are you sure you wish to delete task "${task.title}"`}
        message={"All comments will be deleted as well and you won't be able to open this task again. There is no undo."}
        callBack={onDeleteTask}

      />
      <Modal
        {...props}
      >
        <Container
          className={classes.root}
          // maxWidth={800}
          // minWidth={300}
        // minWidth={'100'}
        // minWidth= {100}

        >
          <Card className={classes.root}>

            <Grid
              container
              direction="column"

            >
              <Box
                height={80}
                className={classes.item}

              >
                <Grid
                  // className={classes.item}
                  container
                  direction="row"
                  justify="space-between"
                  align-items="center"
                  // spacing={2}
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
                              // multiline
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
                          <Typography noWrap onClick={() => setEditTitle(true)} className={classes.title} variant="h5" component="h1">
                            {task.title}
                          </Typography>
                          <Typography noWrap variant="body2" component="h2">
                            {`from list ${task.list.title}`}
                          </Typography>
                        </>
                    }
                    {/* </Grid> */}
                  </Grid>
                  <Grid item>
                    <IconButton
                      edge='end'
                      size='small'
                      onClick={() => {
                        dispatch(statusToggle(task.status ? false : true, task.id))
                        dispatch(openSnackBar(true, task.status ? 'Wait, you did not complete the task!' : 'Task Completed, Yay!', task.status ? 'warning' : 'success'))
                      }}
                    >
                      {
                        task.status
                          ?
                          <CheckCircleIcon style={{ color: 'green' }} />
                          :
                          <CheckCircleOutlineIcon />
                      }
                    </IconButton>
                    <IconButton
                      edge='end'
                      size='small'
                      onClick={() => setOpenDeleteDialog(true)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      size='small'
                      edge='end'
                      onClick={() => {
                        dispatch(getLists())
                        setOpen(false)
                        setNewDescription('')
                        setEditDescription(false)
                      }}
                    // edge='end'
                    // size="small"
                    >
                      <CloseIcon />
                    </IconButton>
                  </Grid >

                </Grid>

                {/*
                <Grid className={classes.item} item>

              </Grid > */}
              </Box>
              <Grid className={classes.item} item>

                <Typography variant="h6" color="textSecondary" component="h3">
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
                        // wrap
                        multiline
                        defaultValue={task.description}

                        onChange={(e) => setNewDescription(e.target.value)}
                      // onBlur={() => dispatch(editingTaskComment(null, false))}
                      />
                      <span>
                        <Button onClick={onDescriptionUpdate}>
                          Save
                      </Button >
                        {
                          task.description &&
                          <Button onClick={() => setEditDescription(false)}>
                            Cancel
                      </Button>
                        }
                      </span>
                    </>

                    :
                    <Typography wrap onClick={() => setEditDescription(true)} className={classes.description} variant="body1" color="textSecondary" component="p">
                      {task.description}
                    </Typography>
                }
              </Grid>

              <Grid className={classes.item} item>
                <Typography variant="h6" color="textSecondary" component="h3">
                  Comments
            </Typography>
                <form>
                  <TextField
                    defaultValue={newComment}
                    placeholder="Write a New Comment"

                    variant="outlined"
                    fullWidth
                    required
                    style={{ paddingTop: '100' }}
                    // InputProps={{
                    //   classes: {
                    //     input: classes.inputFont,
                    //   },
                    // }}
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}

                    onChange={handleChange(setNewComment)}
                  // onFocus={() => setShowSaveComment(true)}
                  // onBlur={() => setShowSaveComment(false)}

                  />
                  <Button onClick={onAddComment}>
                    Add Comment
                </Button>
                </form>
              </Grid>

              {
                (task.comments && task.comments.length > 0) && (
                  <Grid container direction="column" alignItems="flex-end" className={classes.item}>
                    {
                      task.comments.map(comment => {
                        return (
                          <Comment
                            comment={comment}
                            taskId={task.id}
                          // onEditComment={onEditComment}
                          // onDeleteComment={onDeleteComment}
                          />
                        )
                      })
                    }
                  </Grid>
                )

              }


            </Grid>


          </Card>
        </Container>
      </Modal>
    </>
  );
}


function TaskContainer(props) {
  const { currentTaskId } = props
  const task = useSelector(state => state.task)
  const dispatch = useDispatch()

  useEffect(() => {
    currentTaskId && dispatch(getTask(currentTaskId))
  }, [currentTaskId, dispatch])

  if (!task) return null

  return (
    <>
      <Task {...props} task={task} />
    </>
  )
}

export default TaskContainer
