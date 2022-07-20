import { Box, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from '../../utils/AuthUtils';
import Loading from '../common/Loading';
import assets from '../../assets/index';

const AuthLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticate = await authUtils.isAuthenticated();
      console.log(isAuthenticate);
      if (!isAuthenticate) {
        setLoading(false);
      } else {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img
          src={assets.images.logoDark}
          alt='logo'
          style={{ width: '100px' }}
        />
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthLayout;
