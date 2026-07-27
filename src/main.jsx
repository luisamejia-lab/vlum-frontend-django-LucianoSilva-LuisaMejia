import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import App from './App.jsx';
import { LoadingProvider } from './components/LoadingContext';
import { SnackbarProvider } from './components/SnackbarContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>,
);
