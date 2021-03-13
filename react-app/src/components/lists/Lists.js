import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists } from './actions';
import List from './List';
import { makeStyles } from '@material-ui/core/styles';
import AddNewListCard from './AddNewList';
import Container from '@material-ui/core/Container';
import ListsHeader from './Lists.Header';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '12vh'
  },
}))


function Lists(props) {
  const { lists } = props
  const classes = useStyles();

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
              />
            )
          })

        }
      </Container>
    </>
  )

}


function ListsContainer() {
  const lists = useSelector(state => state.lists)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLists())
  }, [dispatch])


  return (
    <>
      <Lists
        lists={Object.values(lists)}
      />
    </>
  )
}

export default ListsContainer
