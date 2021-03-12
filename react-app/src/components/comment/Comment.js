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
import Paper from '@material-ui/core/Paper';
import { Container, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // width:'auto'
    maxWidth:500,

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
    <Box
      className={classes.root}
      // width={1/4}
    >
      <Grid
      // item
        container
        direction="column"
        justify="flex-end"
        alignItems="flex-end"
        wrap='nowrap'
        style={{ marginBottom: 20 }}
        spacing={24}

      // spacing={3}
      >
        <Typography variant="caption" color="textSecondary" component="p">
          {`${format(new Date(comment.createdAt), 'Pp')}`}
        </Typography>
        {
          (activeEditComment && activeEditCommentId === comment.id)
            ?
            <>
              <Paper
                className={classes.input}
                elevation={2}
              >

                {/* <Grid item> */}
                {/* <CardContent> */}
                  <form >
                    <Grid
                    item
                      // container
                      // direction="column"
                      // justify="flex-end"
                      // alignItems="flex-end"
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
                      </>
                      {/* </Grid> */}
                    </Grid>
                  </form>
                {/* </CardContent> */}
                {/* </Grid> */}
                {/* <Grid item> */}
                {/* </Grid> */}
              </Paper>
                        <span>

                          <Button variant='contained'color="primary" onClick={onEditComment}>
                            Update
                           </Button >
                          <Button variant='contained'color="secondary" onClick={() => dispatch(editingTaskComment(null, false))}>
                            Cancel
                          </Button>
                        </span>
            </>
            :
            <>
            <Grid item xs={12}  >

              <Card
                // className={classes.root}
                elevation={2}
                >
                <CardContent>

                <Typography align='right' style={{ wordWrap: 'break-word'}} variant="p" color="textSecondary" component="p">
                  {comment.comment}
                </Typography>

               </CardContent>
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
    </Box>

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
