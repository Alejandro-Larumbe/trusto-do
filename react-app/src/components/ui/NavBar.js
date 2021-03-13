import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    boxShadow: 'none'
  },
}))

function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 0 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  const { toggleDarkMode, theme } = props
  const classes = useStyles();

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar className={classes.root}>
          <Toolbar>
            <div style={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex', flexGrow: '1' }} className={classes.root}>
              <div>
                <Typography edge='start' style={{ fontFamily: 'Courgette', color: '#188C97' }} variant="h2">Trusto-do</Typography>
              </div>
              <div style={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>

                <IconButton onClick={toggleDarkMode}>
                  { theme.palette.type === 'light'
                    ?
                    <Brightness3Icon />
                    :
                    <WbSunnyIcon />
                  }
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}
