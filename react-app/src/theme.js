import { useState } from "react";


export const themeObject ={
  palette: {
    type: 'light',
    primary: {
      main: '#188C97'
    },
    secondary: {
      main: '#7819b6'
    },

    background: {
      default: '#D7FAFB',
    }

  },
};


export const useDarkMode = () => {
  const [theme, setTheme] = useState(themeObject);

  const {
    palette: { type }
  } = theme;
  const toggleDarkMode = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === "light" ? "dark" : "light",
        background: {
          default: type === "light" ? '#303030' : '#D7FAFB' ,
        }
      }
    };
    setTheme(updatedTheme);
  };
  return [theme, toggleDarkMode];
};
