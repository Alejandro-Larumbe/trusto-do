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
import AddNewListCard from './AddNewListCard';
import SnackBar from '../SnackBar';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '12vh'
  },
}))


function Lists(props) {
  const { lists } = props
  const [openTask, setOpenTask] = useState(false);
  const [openNewList, setOpenNewList] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null)
  const classes = useStyles();

  const handleModal = (boolean) => {
    setOpenTask(boolean);
  };


  return (
    <>
       <Container
       className={classes.root}
        maxWidth={'sm'}
        // minWidth={'100'}
        // minWidth= {100}

      >
        <div className={classes.title}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end"
          >

            <Typography variant={'h4'} >
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
        {
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

          }
        <Task
          setOpen={setOpenTask}
          open={openTask}
          currentTaskId={currentTaskId}
        />
        <SnackBar {...props} />
      </Container>
    </>
  )

}


function ListsContainer() {
  const lists = useSelector(state => state.lists)
  const { open: openSnackBar, message, severity } = useSelector(state => state.ui.snackBar)
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(getLists())
    })()
  }, [dispatch])

  // if(!lists) return null

  return (
    <>
      <Lists
        lists={Object.values(lists)}
        openSnackBar={openSnackBar}
        severity={severity}
        message={message}
      />
    </>
  )
}

export default ListsContainer
