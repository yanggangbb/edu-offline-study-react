import { AppBar, Button, ButtonBase, Stack, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <Stack minHeight='100vh'>
      <AppBar color='transparent' elevation={0} variant='outlined' position='sticky'>
        <Toolbar>
          <Stack width='100%' direction='row' alignItems='center'>
            <Stack flex='1'>
              <ButtonBase href='/'>
                <Typography>홈페이지</Typography>
              </ButtonBase>
            </Stack>
            <Stack direction='row' spacing={2}>
              <Button href='/' variant='text'>
                로그인
              </Button>
              <Button href='/join' variant='text'>
                회원가입
              </Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Stack flex='1'>{<Outlet />}</Stack>
    </Stack>
  );
};

export default MainLayout;
