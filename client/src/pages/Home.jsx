import { Box } from '@mui/material';
import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch } from 'react-redux';
import { setBoards } from '../redux/features/BoardSlice';
import { useNavigate } from 'react-router-dom';
import boardApi from '../api/BoardApi';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const createBoard = async () => {
    try {
      const res = await boardApi.create();
      dispatch(setBoards(res));
      navigate(`/board/${res._id}`);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingButton
        variant='outlined'
        color='success'
        onClick={createBoard}
        loading={loading}
      >
        Click hear to create your first board
      </LoadingButton>
    </Box>
  );
};

export default Home;
