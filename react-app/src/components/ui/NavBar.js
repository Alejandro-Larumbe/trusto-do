import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    boxShadow: 'none'
  },
}))

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
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
  const classes = useStyles();
  // const dark = useSelector(state => state.ui.dark)
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    localStorage.setItem("dark", event.target.checked)

  };


  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar className={classes.root}>
          <Toolbar>
            <div style={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex', flexGrow: '1' }} className={classes.root}>
              <div>
                <Typography edge='start' style={{ fontFamily: 'Courgette', color: '#188C97' }} variant="h2">Trusto-do</Typography>
              </div>
              <div style={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex'}}>

                  <Brightness3Icon />
                  <Switch
                    checked={state.checkedB}
                    onChange={handleChange}
                    color="default"
                    edge="end"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <WbSunnyIcon />
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}
