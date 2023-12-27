import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useLayoutEffect } from 'react';
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
      navigate('/home');
    },
  });
  const { handleSubmit, register } = useForm<LoginForm>();

  const handleLoginSubmit = handleSubmit((formData) => {
    mutate(formData);
  });

  useLayoutEffect(() => {
    if (document.cookie.includes('access_token')) {
      navigate('/home');
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>로그인 페이지</title>
      </Helmet>
      <Stack flex='1' alignItems='center' justifyContent='center' px={2}>
        <Paper sx={{ maxWidth: 380, width: '100%' }} variant='outlined'>
          <Stack component='form' spacing={3} pt={6} pb={3} px={3} onSubmit={handleLoginSubmit}>
            <Typography textAlign='center' variant='h4'>
              로그인
            </Typography>
            <TextField label='계정' type='email' {...register('username')} />
            <TextField label='비밀번호' type='password' {...register('password')} />
            <Button fullWidth variant='contained' type='submit' size='large'>
              로그인
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

export default IndexPage;
