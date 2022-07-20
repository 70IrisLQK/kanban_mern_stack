import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/UserSlice.js';
import boardReducer from './features/BoardSlice';
import favoriteReducer from './features/FavoriteSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    favorite: favoriteReducer,
  },
});
