import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { CardContent } from '@material-ui/core';
import { addTask } from './actions';
import ListHeader from './List.Header';
import ListTasks from './List.Tasks';
import ListAddTask from './List.AddTask';
import ListAddTaskActions from './List.AddTaskActions';
import { editListUI, openSnackBar } from '../ui/actions';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    marginTop: 10,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  inputFont: {
    fontSize: 20
  },
  title: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

function List(props) {
  const {
    list,
  } = props
  const [newTaskTitle, setNewTaskTitle] = useState(null)
  const classes = useStyles();
  const dispatch = useDispatch();

  const onAddTask = (e) => {
    (async () => {
      await e.preventDefault()
      await dispatch(addTask(newTaskTitle, +list.id))
      await dispatch(editListUI('', null))
      await dispatch(openSnackBar(true, 'Task added successfully', 'success'))
    })()
  }

  return (
    <>
      <Card
        className={classes.root}
        variant="outlined"
      >
        <CardContent>
          <ListHeader
            list={list}
          />
          <ListTasks tasks={list.tasks} />
          <ListAddTask
            newTaskTitle={newTaskTitle}
            setNewTaskTitle={setNewTaskTitle}
            list={list}
            // onAddTask={onAddTask}
            {...props}
            />
        </CardContent>
        <CardActions >
          <ListAddTaskActions
            list={list}
            onAddTask={onAddTask}
            {...props}
          />
        </CardActions>
      </Card>
    </>
  );
}


export default function ListContainer(props) {
  const editListUi = useSelector(state => state.ui.list)
  return (
    <List {...props} editListUi={editListUi} />
  )
}
