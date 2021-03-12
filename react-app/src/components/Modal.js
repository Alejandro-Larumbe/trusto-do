import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // border: 'none'
  },
}));

export default function MyModal(props) {
  const {
    setOpen,
    open
  } = props
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <Modal
      disableBackdropClick
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
       {props.children}
      </Fade>
    </Modal>
  )

}
