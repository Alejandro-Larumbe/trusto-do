import { createMuiTheme } from '@material-ui/core/styles';
import { green, amber, lime  } from '@material-ui/core/colors';
// import green from '@material-ui/core/colors/green';

export const theme = createMuiTheme({
  palette: {
    // type: "dark",
    primary: {
      main: amber[500]

    },
    secondary: {
      main: green[500],
    },
    // text : {  primary:"#fffde7"
    // },

  },

  typography: {

    // default: lime[500],

    fontFamily: [
      'Lato',
      'Montserrat',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});
