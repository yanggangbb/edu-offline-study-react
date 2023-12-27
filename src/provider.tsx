import { ThemeProvider, createTheme } from '@mui/material';
import { PropsWithChildren, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, useNavigate } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const TanstackProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          throwOnError: (err) => {
            if (
              err instanceof AxiosError &&
              err.response?.status === 401 &&
              err.response.data.code === 'token_invalid'
            ) {
              navigate('/');
              return false;
            }
            return true;
          },
        },
      },
    }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

const Provider = ({ children }: PropsWithChildren) => {
  const [theme] = useState(createTheme());
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <TanstackProvider>
          <HelmetProvider>{children}</HelmetProvider>
        </TanstackProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Provider;
