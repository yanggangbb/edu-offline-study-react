import { ThemeProvider, createTheme } from '@mui/material';
import React, { PropsWithChildren, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const Provider = ({ children }: PropsWithChildren) => {
  const [theme] = useState(createTheme());
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <HelmetProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </HelmetProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Provider;
