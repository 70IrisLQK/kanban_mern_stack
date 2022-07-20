import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: [] };

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
