import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { addComment } from './actions';
import { openSnackBar, editTaskUI } from '../ui/actions';
import Comment from '../comment/Comment';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    minWidth: 300,
    outline: 'none',
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

export default function TaskComment(props) {
  const {
    task
  } = props
  const [newComment, setNewComment] = useState('')
  const classes = useStyles();
  const dispatch = useDispatch()

  const handleChange = (cb) => (event) => {
    cb(event.target.value)
  }

  const onAddComment = (e) => {
    e.preventDefault();
    dispatch(addComment(newComment, task.id))
    setNewComment(null)
    dispatch(openSnackBar(true, 'Comment added succesfully', 'success'))
  }

  return (
    <>
      <Grid className={classes.item} item>
        <Typography variant="h6" component="h3">
          Comments
        </Typography>
        <form>
          <TextField
            placeholder="Write a New Comment"
            variant="outlined"
            fullWidth
            required
            style={{ paddingTop: '100' }}
            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            onClick={() => dispatch(editTaskUI('', null))}
            onChange={handleChange(setNewComment)}
          />
          <Button variant="contained" color='secondary' onClick={onAddComment}>
            Add Comment
          </Button>
        </form>
      </Grid>
      {
        (task.comments && task.comments.length > 0) && (
          <Grid container direction="column" alignItems="flex-end" className={classes.item}>
            {
              task.comments.map(comment => {
                return (
                  <Comment
                    comment={comment}
                    taskId={task.id}
                  />
                )
              })
            }
          </Grid>
        )
      }
    </>
  );
}
