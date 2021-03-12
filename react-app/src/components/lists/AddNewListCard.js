import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Modal from '../Modal';
import { addList } from './actions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles((theme) => ({
  card: {
    // width: '100%',
    backgroundColor: theme.palette.background.paper,
    width: 500,
    outline: 'none'
    // backgroundColor: theme.palette.background.paper,
    // margin: 'auto',
    // borderBottom: 15
    // border: 'none'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // border: 'none'
  },
}));

export default function AddNewListCard(props) {
  const { setOpen } = props
  const [newListTitle, setNewListTitle] = useState('')

  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (event) => {
    setNewListTitle(event.target.value)
  }


  const onAddList = () => {
    (async () => {
      await dispatch(addList(newListTitle))
      setOpen(false)
    })()
  }


  return (
    <Modal {...props}>
      <Card className={classes.card}>
      <CardHeader
        title='Add New List'
        action={
          <>
            <IconButton onClick={() => setOpen(false)} aria-label="add to favorites">
              <CloseIcon />
            </IconButton>
          </>
        }
      />


        <CardContent>

          <form >
            <TextField
              // defaultValue={list.title}
              placeholder="Enter New List Title"
              variant="outlined"
              fullWidth
              required
              // style={{ paddingTop: '100' }}
              onChange={handleChange}
            />
          </form>
        </CardContent>
        <CardActions>
          <>
            <Button fullWidth onClick={onAddList} variant="contained">Save List</Button>
            {/* <Button onClick={() => setAddNewTask(false)}>Cancel</Button> */}
          </>
        </CardActions>

      </Card>
    </Modal >
  )

}
