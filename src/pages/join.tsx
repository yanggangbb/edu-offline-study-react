import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import client from 'utils/client';

interface JoinForm {
  username: string;
  password: string;
}

const JoinPage = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (formData: JoinForm) => client.post('/auth/join', formData),
    mutationKey: ['join'],
    onSuccess: () => {
      navigate('/');
    },
  });

  const { handleSubmit, register } = useForm<JoinForm>();

  const handleLoginSubmit = handleSubmit((formData) => {
    mutate(formData);
  });

  return (
    <>
      <Helmet>
        <title>회원가입 페이지</title>
      </Helmet>
      <Stack flex='1' alignItems='center' justifyContent='center' px={2}>
        <Paper sx={{ maxWidth: 380, width: '100%' }} variant='outlined'>
          <Stack component='form' spacing={3} pt={6} pb={3} px={3} onSubmit={handleLoginSubmit}>
            <Typography textAlign='center' variant='h4'>
              회원가입
            </Typography>
            <TextField label='계정' type='email' {...register('username')} />
            <TextField label='비밀번호' type='password' {...register('password')} />
            <Button fullWidth variant='contained' type='submit' size='large'>
              회원가입
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

export default JoinPage;
