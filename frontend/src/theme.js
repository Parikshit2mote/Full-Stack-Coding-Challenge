import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // vibrant blue
      contrastText: '#fff',
    },
    secondary: {
      main: '#a21caf', // purple
      contrastText: '#fff',
    },
    success: {
      main: '#22c55e', // green
      contrastText: '#fff',
    },
    error: {
      main: '#ef4444', // red
      contrastText: '#fff',
    },
    background: {
      default: '#f4f6f8',
      paper: '#fff',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          fontWeight: 600,
        },
        contained: {
          color: '#fff',
          boxShadow: '0 2px 8px 0 rgba(37,99,235,0.08)',
          '&:hover': {
            backgroundColor: '#1d4ed8', // darker blue
            boxShadow: '0 4px 16px 0 rgba(37,99,235,0.12)',
          },
        },
        outlined: {
          '&:hover': {
            backgroundColor: '#e0e7ff', // light blue
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});

export default theme; 