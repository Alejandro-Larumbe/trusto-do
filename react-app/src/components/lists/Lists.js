import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists } from './actions';
import List from './List';
import Task from '../task/Task';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AddNewListCard from './AddNewListCard';
import SnackBar from '../SnackBar';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
    margin: 'auto',

  },
  listsContainer: {
    backgroundColor: theme.palette.background.paper,

    width: '100%',
    maxWidth: 500,
    margin: 'auto',
  }


}))


function Lists(props) {
  const { lists } = props
  const [openTask, setOpenTask] = useState(false);
  const [openNewList, setOpenNewList] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null)
  const classes = useStyles();

  // console.log('------', currentTaskId)

  const handleModal = (boolean) => {
    setOpenTask(boolean);
  };

  const handleChange = (cb) => (event) => {
    cb(event.target.value)
  }



  return (
    <>
      <div className={classes.root}>

        <div className={classes.title}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end"
          >

            <Typography variant={'h3'} >
              Lists
            </Typography>
            {/* </Grid> */}
            <Button
              onClick={() => setOpenNewList(true)}
              // edge='end'
              // size="small"
              startIcon={<AddIcon />}
            >
              Add List
            </Button>
          </Grid>
        </div>

        <AddNewListCard open={openNewList} setOpen={setOpenNewList} />

        {/* <Card className={classes.listsContainer}> */}
          {/* </div> */}
          {
            lists.length
              ?
              // <Grid
              //   container
              //   spacing={2}
              // >
                // {
                  lists.map(list => {
                    return (
                      // <Grid item >
                        <List
                          key={list.id}
                          list={list}
                          handleModal={handleModal}
                          setCurrentTaskId={setCurrentTaskId}
                        />
                    )
                  })
                // }
              // </Grid>
              :
              <h1>Add your first list</h1>
          }
        {/* </Card> */}
        <Task
          setOpen={setOpenTask}
          open={openTask}
          currentTaskId={currentTaskId}
        />
        <SnackBar {...props} />
      </div>
    </>
  )

}


function ListsContainer() {
  const lists = Object.values(useSelector(state => state.lists))
  const { open: openSnackBar, message, severity } = useSelector(state => state.ui.snackBar)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLists())
  }, [dispatch])

  return (
    <>
      <Lists
        lists={lists}
        openSnackBar={openSnackBar}
        severity={severity}
        message={message}
      />
    </>
  )
}

export default ListsContainer
