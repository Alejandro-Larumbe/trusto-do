import { createMuiTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
// import green from '@material-ui/core/colors/green';

let dark = true
let darkMode = localStorage.getItem("dark")

console.log(darkMode)

window.addEventListener('storage', function(event) {
  // if (event.key === 'user-value') {
  //   output.textContent = event.newValue;
  // }
  console.log(event)
  console.log(event.key)
});

export const theme = createMuiTheme({
  palette: {
    type: dark ? "dark" : 'light',
    primary: {
      main: '#188C97'
    },
    secondary: {
      main: '#ED751C'
    },

    background: {
      default: dark ? '#303030' : '#D7FAFB',
    }

  },
});
