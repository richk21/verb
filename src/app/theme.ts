import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f5f5f5',
      contrastText: '#FF4500',
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    text: {
      primary: '#000',
      secondary: '#555',
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#000',
        },
        input: {
          padding: '6px 8px',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f5f5f5',
      contrastText: '#FF4500',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#fff',
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
        input: {
          padding: '6px 8px',
        },
      },
    },
  },
});
