import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import App from 'app';
import { ThemeProvider, createTheme } from '@mui/material';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

const theme = createTheme();

root.render(
  <BrowserRouter>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </BrowserRouter>,
);
