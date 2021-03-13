import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import { Grid } from '@material-ui/core';
import Modal from '../ui/Modal';
import { getTask } from './actions';
import Container from '@material-ui/core/Container';
import TaskHeader from './Task.Header';
import TaskDescription from './Task.Description';
import TaskComments from './Task.Comments';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    minWidth: 300,
    outline: 'none',
    overflow: 'scroll',

    maxHeight: "80%",
    // position: "absolute",
    // top: "50%",
    // transform: "translateY(-50%)"

    // display: "block",
    // justifyContent: "center"

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
  const classes = useStyles();


  return (
    <Modal
      {...props}
    >
      <Container
        className={classes.root}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
      {/* <Container */}

          <Card>
            <Grid
              container
              direction="column"
            >
              <TaskHeader {...props} />
              <TaskDescription {...props} />
              <TaskComments {...props} />
            </Grid>
          </Card>
      </Container>
        {/* </Box> */}
    </Modal>
  );
}


function TaskContainer(props) {
  const task = useSelector(state => state.task)
  const open = useSelector(state => state.ui.openTask.open)
  const taskId = useSelector(state => state.ui.openTask.taskId)
  const dispatch = useDispatch()

  useEffect(() => {
    if (taskId && open) dispatch(getTask(taskId))
  }, [taskId, dispatch, open])

  if (!task) return null

  return (
    <>
      <Task {...props} open={open} task={task} />
    </>
  )
}

export default TaskContainer
