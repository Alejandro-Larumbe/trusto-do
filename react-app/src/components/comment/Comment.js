import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import format from 'date-fns/format'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { openSnackBar, editTaskUI } from '../ui/actions';
import { deleteComment, editComment } from '../task/actions';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,

  },
  inputFont: {
    fontSize: 13,
    textAlign: "right",
  },
  input: {
    minWidth: 300
  },
  commentButtons: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

function Comment(props) {
  const {
    comment,
    taskId,
    edit,
    currentId,
  } = props
  const [newComment, setNewComment] = useState(null)
  const classes = useStyles();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setNewComment(e.target.value)
  }

  const onEditComment = (e) => {
    (async () => {
      await e.preventDefault()
      await dispatch(editComment(newComment, comment.id, taskId))
      await dispatch(openSnackBar(true, 'Comment edited succesfully', 'success'))
      await dispatch(editTaskUI(null, ''))
    }
    )()
  }

  const onDeleteComment = (e) => {
    e.preventDefault()
    dispatch(deleteComment(comment.id))
    dispatch(openSnackBar(true, 'Comment deleted succesfully', 'success'))
  }

  return (
    <Box
      className={classes.root}
    >
      <Grid
        container
        direction="column"
        justify="flex-end"
        alignItems="flex-end"
        wrap='nowrap'
        style={{ marginBottom: 20 }}
        // spacing={24}
      >
        <Typography variant="caption" component="p">
          {`${format(new Date(comment.createdAt), 'Pp')}`}
        </Typography>
        {
          (edit && currentId === comment.id)
            ?
            <>
              <Paper
                className={classes.input}
                elevation={2}
              >
                <form >
                  <Grid
                    item
                  >
                    <>
                      <TextField
                        variant='outlined'
                        size='small'
                        required
                        fullWidth
                        multiline
                        defaultValue={comment.comment}
                        InputProps={{
                          classes: {
                            input: classes.inputFont,
                          },
                        }}
                        onChange={handleChange}
                      />
                    </>
                    <>
                    </>
                  </Grid>
                </form>
              </Paper>
              <span>
                <Button variant='contained' color="secondary" onClick={onEditComment}>
                  Update
                </Button >
                <Button onClick={() => dispatch(editTaskUI('', null))}>
                  Cancel
                </Button>
              </span>
            </>
            :
            <>
              <Grid item xs={12}  >
                <Card
                  style={{ height:'30px', marginBottom:'5px' }}
                  elevation={4}

                >
                    <Typography align='right' style={{ wordWrap: 'break-word', margin:'8px' }} variant="caption" component="p">
                      {comment.comment}
                    </Typography>
                </Card>
              </Grid>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-end"
                spacing={1}
              >
                <Grid item >
                  <Typography
                    className={classes.commentButtons}

                    onClick={() => dispatch(editTaskUI('editComment', comment.id))}
                    variant="caption"
                    component="p">
                    Edit
                </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.commentButtons}
                    onClick={onDeleteComment}
                    variant="caption"
                    component="p">
                    Delete
                </Typography>
                </Grid>
              </Grid>
            </>
        }
      </Grid>
    </Box>

  );
}


export default function CommentContainer(props) {
  const edit = useSelector(state => state.ui.task.type) === 'editComment'
  const currentId = useSelector(state => state.ui.task.currentId)
  return (
    <Comment
      {...props}
      edit={edit}
      currentId={currentId}
    />
  )
}
