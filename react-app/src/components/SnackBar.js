import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { openSnackBar } from '../store/ui/actions';

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

export default function CustomizedSnackbars(props) {
  const {
    openSnackBar: open,
    // setOpen,
    message,
    severity
  } = props
  const classes = useStyles();
  const dispatch = useDispatch();


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(openSnackBar(false, '', ''));
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
}
