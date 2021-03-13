import React from 'react';
import { useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { openTask } from '../ui/actions';

export default function ListTasks({ tasks }) {
  const dispatch = useDispatch()

  if(!tasks) return null
  return (

    <List component="div" disablePadding>
      {
        tasks.map(task => {
          return (
              <ListItem onClick={() => dispatch(openTask(true, task.id))} key={task.id} button>
                <ListItemIcon>
                  {
                    task.status
                      ?
                      <CheckCircleIcon style={{ color: '#188C97' }} />
                      :
                      <CheckCircleOutlineIcon />
                  }
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ noWrap: true }} primary={task.title} />
              </ListItem>
          )
        })
      }
    </List>
  )
}
