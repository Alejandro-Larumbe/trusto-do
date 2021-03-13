import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Modal from '../ui/Modal';
import { addList } from './actions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { editListUI, openSnackBar } from '../ui/actions';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles((theme) => ({
  card: {

    width: 500,
    outline: 'none'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function AddNewListCard(props) {
  const [newListTitle, setNewListTitle] = useState('')
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (event) => {
    setNewListTitle(event.target.value)
  }


  const onAddList = () => {
    (async () => {
      await dispatch(addList(newListTitle))
      await dispatch(editListUI(null, ''))
      await dispatch(openSnackBar(true, 'List added successfully', 'success'))
    })()
  }


  return (
    <Modal {...props}>
      <Card className={classes.card}>
      <CardHeader
        title='Add New List'
        action={
          <>
            <IconButton onClick={() =>  dispatch(editListUI(null, ''))} aria-label="add to favorites">
              <CloseIcon />
            </IconButton>
          </>
        }
      />
        <CardContent>
          <form >
            <TextField
              placeholder="Enter New List Title"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange}
            />
          </form>
        </CardContent>
        <CardActions>
          <>
            <Button color='secondary' fullWidth onClick={onAddList} variant="contained">Save List</Button>
          </>
        </CardActions>

      </Card>
    </Modal >
  )
}

export default function AddNewListCardContainer() {
  const open = useSelector(state => state.ui.list.type) === 'newList'
  return (
    <AddNewListCard open={open} />
  )
}
