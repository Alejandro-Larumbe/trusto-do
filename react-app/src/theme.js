import { createMuiTheme } from '@material-ui/core/styles';
import { green, grey, amber, lime } from '@material-ui/core/colors';
import { NotExtended } from 'http-errors';
// import green from '@material-ui/core/colors/green';

let dark = false

export const theme = createMuiTheme({
  palette: {
    type: dark ? "dark" : 'light',
    primary: {
      main: '#188C97'
    },
    secondary: {
      main: '#ED751C'
    },
    // text : {  primary:"#fffde7"
    // },

    background: {
      default: dark ? '#303030' : '#D7FAFB',
      // paper: dark ? '#424242' : grey[100],
    }


    // {
    // grey
    // paper: {
    //   main: grey
    // }


    // }

  },


  // typography: {

  //   // default: lime[500],

  //   fontFamily: [
  //     'Lato',
  //     'Montserrat',
  //     '"Helvetica Neue"',
  //     'Arial',
  //     'sans-serif',
  //     // 'Courgette',
  //   ].join(','),
  // },
});
