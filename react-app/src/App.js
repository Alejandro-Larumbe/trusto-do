import React from 'react';
import Lists from './components/lists/Lists';
import NavBar from './components/ui/NavBar';
import Task from './components/task/Task';
import SnackBar from './components/ui/SnackBar';



function App() {
  return (
    <>
      <NavBar/>
      <Lists/>
      <Task/>
      <SnackBar/>
    </>
  );
}

export default App;
