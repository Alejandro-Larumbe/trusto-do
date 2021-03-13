import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { openSnackBar } from '../ui/actions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function SnackBar(props) {
  const {
    open,
    message,
    severity
  } = props
  const classes = useStyles();
  const dispatch = useDispatch();


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(openSnackBar(false, '', 'success'));
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default function SnackBarsContainer(props) {
  const { open, message, severity } = useSelector(state => state.ui.snackBar)

  return (
    <SnackBar
      open={open}
      severity={severity}
      message={message}
    />
  )
}
