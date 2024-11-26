import { createTheme } from '@mui/material/styles';

// Создание стандартной темы Material UI
const theme = createTheme({
  palette: {
    mode: 'light', 
    primary: {
      main: '#1976d2', 
    },
    secondary: {
      main: '#dc004e', 
    },
    error: {
      main: '#f44336', 
    },
    background: {
      default: '#f5f5f5', 
      paper: '#ffffff', 
    },
    text: {
      primary: '#333333', 
      secondary: '#757575', 
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`, 
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none', 
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', 
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '1rem', 
        },
      },
    },
  },
});

export default theme;
