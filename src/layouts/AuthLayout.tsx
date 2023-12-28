import {
  AppBar,
  Button,
  Divider,
  Drawer,
  GlobalStyles,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import client from 'utils/client';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';

const AuthLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const queryClinet = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => client.post('/auth/logout'),
    onSuccess: () => {
      navigate('/');
      queryClinet.resetQueries({ queryKey: ['refresh-token'] });
    },
  });
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
    enabled: !isPending,
  });

  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(!matches);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleLogoutClick = () => {
    mutate();
  };

  useEffect(() => {
    setOpen(!matches);
  }, [matches]);

  return (
    <Stack height='100vh'>
      <GlobalStyles
        styles={{
          'html, body': {
            scrollPaddingTop: '4rem',
            scrollPaddingBottom: '1rem',
          },
          ':is(html, body):has(aside)': {
            scrollPaddingBottom: '4rem',
          },
        }}
      />
      <AppBar
        color='inherit'
        component='header'
        elevation={0}
        position='fixed'
        sx={{
          borderBottom: '1px solid',
          borderBottomColor: theme.palette.divider,
          transition: 'all 200ms',
          zIndex: theme.zIndex.drawer + 1,
        }}
        variant='elevation'
      >
        <Toolbar>
          <Stack alignItems='center' direction='row' width='100%'>
            <Stack alignItems='center' direction='row' spacing={1}>
              <Tooltip title={open ? '메뉴 닫기' : '메뉴 열기'}>
                <IconButton onClick={handleOpen}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
              <Stack alignItems='center' component={Link} to='/home'>
                <Typography>홈페이지</Typography>
              </Stack>
            </Stack>
            <Stack flex='1' />
            <Button onClick={handleLogoutClick}>로그아웃</Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        sx={{
          width: '240px',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: '240px', boxSizing: 'border-box' },
        }}
        variant={matches ? 'temporary' : 'persistent'}
      >
        <Toolbar />
        <Stack overflow='auto'>
          <List>
            <NavLink to='/home'>
              {({ isActive }) => (
                <ListItem disablePadding>
                  <ListItemButton selected={isActive}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>홈</ListItemText>
                  </ListItemButton>
                </ListItem>
              )}
            </NavLink>
            <NavLink to='/N10406'>
              {({ isActive }) => (
                <ListItem disablePadding>
                  <ListItemButton selected={isActive}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>박지후</ListItemText>
                  </ListItemButton>
                </ListItem>
              )}
            </NavLink>
            <NavLink to='/N10407'>
              {({ isActive }) => (
                <ListItem disablePadding>
                  <ListItemButton selected={isActive}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>신민석</ListItemText>
                  </ListItemButton>
                </ListItem>
              )}
            </NavLink>
            <NavLink to='/N10404'>
              {({ isActive }) => (
                <ListItem disablePadding>
                  <ListItemButton selected={isActive}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>김지효</ListItemText>
                  </ListItemButton>
                </ListItem>
              )}
            </NavLink>
            <NavLink to='/N10303'>
              {({ isActive }) => (
                <ListItem disablePadding>
                  <ListItemButton selected={isActive}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>김지윤</ListItemText>
                  </ListItemButton>
                </ListItem>
              )}
            </NavLink>
            <NavLink to='/N20000511'>
              {({ isActive }) => (
                <ListItem disablePadding>
                  <ListItemButton selected={isActive}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>김경태</ListItemText>
                  </ListItemButton>
                </ListItem>
              )}
            </NavLink>
          </List>
          <Divider />
          <List subheader={<ListSubheader>게시글</ListSubheader>}>
            <NavLink to='/post'>
              {({ isActive }) => (
                <ListItem disablePadding>
                  <ListItemButton selected={isActive}>
                    <ListItemIcon>
                      <BatchPredictionIcon />
                    </ListItemIcon>
                    <ListItemText>게시글 목록</ListItemText>
                  </ListItemButton>
                </ListItem>
              )}
            </NavLink>
          </List>
        </Stack>
      </Drawer>
      <Stack
        pl={open && !matches ? '240px' : '0px'}
        sx={{
          flex: 1,
          transition: theme.transitions.create('padding', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            transition: theme.transitions.create('padding', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar />
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default AuthLayout;
