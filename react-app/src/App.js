import React, { useEffect } from 'react';
import Lists from './components/lists/Lists';
import NavBar from './components/ui/NavBar';
import Task from './components/task/Task';
import SnackBar from './components/ui/SnackBar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { useDarkMode } from './theme';
import CssBaseline from "@material-ui/core/CssBaseline";
import { useSelector } from 'react-redux';



function App( props ) {
  return (
    <>
      <NavBar {...props} />
      <Lists />
      <Task />
      <SnackBar />
    </>
  );
}


function AppContainer() {
  // const dark = useSelector(state => state.ui.dark)
  const [theme, toggleDarkMode] = useDarkMode();
  const themeConfig = createMuiTheme(theme);


  return (
    <MuiThemeProvider theme={themeConfig}>
      <CssBaseline>

        <App theme={theme} toggleDarkMode={toggleDarkMode}/>
      </CssBaseline>
    </MuiThemeProvider>

  )
}

export default AppContainer;
