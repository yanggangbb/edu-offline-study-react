import { Button, Stack, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import client from 'utils/client';

interface LoginForm {
  username: string;
  password: string;
}

const IndexPage = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (formData: LoginForm) => client.post('/auth/login', formData),
    mutationKey: ['login'],
    onSuccess: () => {
      navigate('/post');
    },
  });
  const { handleSubmit, register } = useForm<LoginForm>();

  const handleLoginSubmit = handleSubmit((formData) => {
    mutate(formData);
  });

  useLayoutEffect(() => {
    if (document.cookie.includes('access_token')) {
      navigate('/post');
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Stack component='form' spacing={1} maxWidth={540} onSubmit={handleLoginSubmit}>
        <TextField type='email' {...register('username')} />
        <TextField type='password' {...register('password')} />
        <Button type='submit'>로그인</Button>
      </Stack>
    </>
  );
};

export default IndexPage;
