import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0a0a',
      paper: 'rgba(20, 10, 40, 0.65)',
    },
    primary: {
      main: '#7E30E1',
    },
    secondary: {
      main: '#C2185B',
    },
    info: {
      main: '#4DB6AC',
    },
    text: {
      primary: '#f0f0f0',
      secondary: '#4DB6AC',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'radial-gradient(circle at 10% 20%, #0a0a0a, #000000)',
          minHeight: '100vh',
        },
      },
    },
  },
});

export default theme;
