import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { updateTitle, deleteList } from './actions';
import { editListUI, openSnackBar  } from '../ui/actions';
import DeleteDialog from '../ui/DeleteDialog';


const useStyles = makeStyles((theme) => ({
  inputFont: {
    fontSize: 20
  },
  title: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

function ListTitle(props) {
  const classes = useStyles();
  const { type, currentId } = props.editListUi
  const {
    list
  } = props
  const [newTitle, setNewTitle] = useState(list.title)


  const dispatch = useDispatch()

  const onEditTitle = (e) => {
    (async () => {
      if (newTitle !== '') {
        await e.preventDefault()
        await dispatch(updateTitle(list.id, newTitle))
        await dispatch(editListUI('', null))
      }
    })()
  }

  const handleChange = (cb) => (event) => {
    cb(event.target.value)
  }



  const onDeleteList = (e) => {
    e.preventDefault()
    dispatch(deleteList(list.id))
    dispatch(editListUI('', null))
    dispatch(openSnackBar(true, 'List deleted successfully', 'success'))
  }


  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid xs={10} item>
          {
            (type === 'title' && currentId === list.id) ?
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
              <Typography noWrap onClick={() => dispatch(editListUI('title', list.id))} className={classes.title} variant="h6" component="h2">
                {list.title}
              </Typography>
          }
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => dispatch(editListUI('deleteDialogue', null))}
            edge='end'
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      <DeleteDialog
        title={`Are you sure you wish to delete list?`}
        message={"All tasks will be deleted as well and you won't be able to access this list again. There is no undo."}
        callBack={onDeleteList}
      />
    </>
  )
}


export default function ListTitleContainer(props) {
  const editListUi = useSelector(state => state.ui.list )
  return (
    <ListTitle {...props} editListUi={editListUi} />
  )
}
