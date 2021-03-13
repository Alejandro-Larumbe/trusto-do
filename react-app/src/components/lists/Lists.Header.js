import React from 'react';
import { useDispatch } from 'react-redux'
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { editListUI } from '../ui/actions';


export default function ListsTitle() {
  const dispatch = useDispatch()
  return (
    <div >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
      >

        <Typography variant={'h4'} >
          Lists
    </Typography>
        <Button
          onClick={() => dispatch(editListUI('newList', null))}
          startIcon={<AddIcon />}
        >
          Add List
    </Button>
      </Grid>
    </div>
  )
}
