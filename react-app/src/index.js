import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';


import configureStore from './store/store';
import initialStore from './initialStore';

let store = configureStore(initialStore);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>

        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
