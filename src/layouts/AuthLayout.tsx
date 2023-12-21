import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { Outlet } from 'react-router-dom';
import client from 'utils/client';

const AuthLayout = () => {
  useQuery({
    queryKey: ['refresh-token'],
    queryFn: () => client.post('/auth/refresh'),
    refetchInterval: 60 * 1000,
    retryDelay: 5000,
    retry: (count, err) => {
      if (err instanceof AxiosError && err.status === 401) {
        return false;
      }
      return count > 3;
    },
  });
  return <Outlet />;
};

export default AuthLayout;
