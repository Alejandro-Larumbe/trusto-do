import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarBorder from '@material-ui/icons/StarBorder';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import { openSnackBar } from '../../store/ui/actions';
import Box from '@material-ui/core/Box';

import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { CardContent } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteDialog from '../DeleteDialog';
import { updateTitle, addTask, deleteList, getLists } from './actions';
import { minWidth, maxWidth } from '@material-ui/system';
import Container from '@material-ui/core/Container';
import { green, grey, amber, lime } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 100,
    // maxWidth: 360,
    // backgroundColor: grey[100],
    // backgroundColor: theme.palette.background.paper,
    margin: 'auto',
    marginTop: 10,
    // borderBottom: 15
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

export default function NestedList(props) {
  const {
    list,
    handleModal,
    setCurrentTaskId
  } = props
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  // const [openNewList, setOpenNewList] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [addNewTask, setAddNewTask] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title)
  const [newTaskTitle, setNewTaskTitle] = useState(null)
  const dispatch = useDispatch();

  const handleOpenTask = (id) => {
    setCurrentTaskId(id)
    handleModal(true)
  }


  const handleChange = (cb) => (event) => {
    cb(event.target.value)
  }

  const onAddTask = (e) => {

    (async () => {
      await e.preventDefault()
      await dispatch(addTask(newTaskTitle, +list.id))
      setAddNewTask(false)
    })()
  }

  const onEditTitle = (e) => {
    (async () => {
      if (newTitle !== '') {
        await e.preventDefault()
        await dispatch(updateTitle(list.id, newTitle))
      }
      setEditTitle(false)
    })()
  }

  const onDeleteList = (e) => {
    // (async () => {
      e.preventDefault()
      dispatch(deleteList(list.id))

      setOpenDeleteDialog(false)
      dispatch(getLists())
      // await dispatch(getLists())
    // })()
  }

  return (
    <>
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        title={`Are you sure you wish to delete list "${list.title}"`}
        message={"All tasks will be deleted as well and you won't be able to access this list again. There is no undo."}
        callBack={onDeleteList}
      />
      <Card
        className={classes.root}
        variant="outlined"
        >
        <CardContent>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid xs={4} item>
            {
              editTitle ?
                <form onSubmit={onEditTitle} >
                  <ClickAwayListener onClickAway={onEditTitle}>
                    <TextField
                      // style={{ wordWrap: 'break-word' }}
                      defaultValue={list.title}
                      size="small"
                      variant="outlined"
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
                <Typography noWrap	onClick={() => setEditTitle(true)} className={classes.title} variant="h6" component="h2">
                  {list.title}
                </Typography>
            }
            </Grid>
            <Grid item>
            {/* </Grid> */}
            <IconButton
              onClick={() => setOpenDeleteDialog(true)}
              // edge='end'
              // size="small"
              >
              <DeleteIcon />
            </IconButton>
              </Grid>
          </Grid>


          {/* <Typography variant="h6" className={classes.title}> */}
          {/* {list.title} */}
          {/* </Typography> */}
          {/* </ListItem>
      </List> */}
          <List  component="div" disablePadding>
            {
              list.tasks.map(task => {
                return (
                  <>
                    {/* <Divider variant="middle" component="li" /> */}
                    <ListItem onClick={() => handleOpenTask(task.id)} key={task.id} button className={classes.nested}>
                      {/* <ListItemIcon onClick={dispatch(openSnackBar(true, task.status ? 'Wait, you did not complete the task!' : 'Task Completed, Yay!', task.status ? 'warning' : 'success'))}> */}
                      <ListItemIcon>
                      {
                      task.status
                        ?
                        <CheckCircleIcon style={{ color: 'green' }} />
                        :
                        <CheckCircleOutlineIcon />
                    }
                      </ListItemIcon>
                      <ListItemText primaryTypographyProps={{noWrap:true}}  primary={task.title} />
                    </ListItem>
                  </>
                )
              })
            }
          </List>
          {
            addNewTask &&

            <form >
              <TextField
                // defaultValue={list.title}
                placeholder="Enter a Task Title"

                variant="outlined"
                fullWidth
                required
                style={{ paddingTop: '100' }}
                // InputProps={{
                //   classes: {
                //     input: classes.inputFont,
                //   },
                // }}
                onChange={handleChange(setNewTaskTitle)}
              />
            </form>
          }
        </CardContent>
        <CardActions >
          {
            addNewTask ?
              <>
                <Button onClick={onAddTask} variant="contained">Save Task</Button>
                <Button onClick={() => setAddNewTask(false)}>Cancel</Button>
              </>
              :
              <Button
                // fullWidth
                onClick={() => setAddNewTask(true)}
                size="small"
                startIcon={<AddIcon />}
              >
                Add Task
            </Button>
          }
        </CardActions>
      </Card>
    </>
  );
}
