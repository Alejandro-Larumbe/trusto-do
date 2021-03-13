import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists } from './actions';
import List from './List';
import Task from '../task/Task';
import { makeStyles } from '@material-ui/core/styles';
import AddNewListCard from './AddNewList';
import SnackBar from '../ui/SnackBar';
import Container from '@material-ui/core/Container';
import ListsHeader from './Lists.Header';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '12vh'
  },
}))


function Lists(props) {
  const { lists } = props
  // const [openTask, setOpenTask] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null)
  const classes = useStyles();

  // const handleModal = (boolean) => {
  //   setOpenTask(boolean);
  // };


  return (
    <>
      <Container
        className={classes.root}
        maxWidth={'sm'}
      >
        <ListsHeader />
        <AddNewListCard />
        {
          lists.map(list => {
            return (
              <List
                key={list.id}
                list={list}
                setCurrentTaskId={setCurrentTaskId}
              />
            )
          })

        }

        {/* <SnackBar {...props} /> */}
      </Container>
    </>
  )

}


function ListsContainer() {
  const lists = useSelector(state => state.lists)
  const dispatch = useDispatch();

  useEffect(() => {
    // (async () => {
      dispatch(getLists())
    // })()
  }, [])


  return (
    <>
      <Lists
        lists={Object.values(lists)}
      />
    </>
  )
}

export default ListsContainer
