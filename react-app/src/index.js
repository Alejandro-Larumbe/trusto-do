import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import CssBaseline from "@material-ui/core/CssBaseline";


import configureStore from './store/store';
import initialStore from './initialStore';

let store = configureStore(initialStore);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>

        <App />

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
