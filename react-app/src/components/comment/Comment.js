import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import format from 'date-fns/format'
import { deleteComment, editComment } from '../task/actions';
import TextField from '@material-ui/core/TextField';
import { editingTaskComment } from '../../store/ui/actions';
import Button from '@material-ui/core/Button';
import { openSnackBar } from '../../store/ui/actions';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '100%',
  },
  inputFont: {
    fontSize: 13
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
    activeEditComment,
    activeEditCommentId,
  } = props
  const [newComment, setNewComment] = useState(null)
  const classes = useStyles();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setNewComment(e.target.value)
    // console.log(newComment)
  }

  const onEditComment = (e) => {
    e.preventDefault()
    // console.log('---------here')
    // (async () => {
    dispatch(editComment(newComment, comment.id, taskId))
    dispatch(openSnackBar(true, 'Comment edited succesfully', 'success'))
    dispatch(editingTaskComment(null, false))
    // })
  }

  const onDeleteComment = (e) => {
    e.preventDefault()
    dispatch(deleteComment(comment.id))
    dispatch(openSnackBar(true, 'Comment deleted succesfully', 'success'))
  }

  return (
    <Grid
      container
      direction="column"
      justify="flex-end"
      alignItems="flex-end"
      style={{ marginBottom: 20 }}
    // spacing={3}
    >
      <Typography variant="caption" color="textSecondary" component="p">
        {`${format(new Date(comment.createdAt), 'Pp')}`}
      </Typography>
      {
        (activeEditComment && activeEditCommentId === comment.id)
          ?
          <>
            <Card
              className={classes.input}
              elevation={2}
            >

              {/* <Grid item> */}
              <CardContent>
                <form >
                  <Grid
                    container
                    direction="column"
                    justify="flex-end"
                    alignItems="flex-end"
                    spacing={2}
                  >
                    {/* <Grid item> */}
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
                      // onBlur={() => dispatch(editingTaskComment(null, false))}
                      />
                      {/* </Grid> */}
                    </>
                    {/* <Grid item> */}
                    <>
                      <span>

                        <Button onClick={onEditComment}>
                          Update
                      </Button >
                        <Button onClick={() => dispatch(editingTaskComment(null, false))}>
                          Cancel
                      </Button>
                      </span>
                    </>
                    {/* </Grid> */}
                  </Grid>
                </form>
              </CardContent>
              {/* </Grid> */}
              {/* <Grid item> */}
              {/* </Grid> */}
            </Card>
          </>
          :
          <>
            <Card
              className={classes.card}
              elevation={2}
            >
              <CardContent>
                {
                  <Typography variant="body2" color="textSecondary" component="p">
                    {comment.comment}
                  </Typography>
                }
              </CardContent>
            </Card>
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
                  onClick={() => dispatch(editingTaskComment(comment.id, true))}
                  variant="caption"
                  color="textSecondary"
                  component="p">
                  Edit
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  className={classes.commentButtons}
                  onClick={onDeleteComment}
                  variant="caption"
                  color="textSecondary"
                  component="p">
                  Delete
                </Typography>
              </Grid>
            </Grid>
          </>
      }
    </Grid>
  );
}


export default function CommentContainer(props) {
  const { active: activeEditComment, currentId: activeEditCommentId } = useSelector(state => state.ui.task.comment)
  return (
    <Comment
      {...props}
      activeEditComment={activeEditComment}
      activeEditCommentId={activeEditCommentId}

    />
  )
}
