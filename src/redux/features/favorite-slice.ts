import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type FavoriteState = {
  moviesImdbIds: string[];
}

const initialState: FavoriteState = {
  moviesImdbIds: []
};

const initialStateLocalStorage = localStorage.getItem("favoriteState");

if (initialStateLocalStorage) {
  const parsedInitialStateLocalStorage: FavoriteState = JSON.parse(initialStateLocalStorage) as FavoriteState;
  initialState.moviesImdbIds = parsedInitialStateLocalStorage.moviesImdbIds;
}

export const favorite = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      state.moviesImdbIds.push(action.payload);
      localStorage.setItem("favoriteState", JSON.stringify(state));
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.moviesImdbIds = state.moviesImdbIds.filter((imdbId) => imdbId !== action.payload);
      localStorage.setItem("favoriteState", JSON.stringify(state));
    },
    reset: (state) => {
      localStorage.removeItem("favoriteState");
      state.moviesImdbIds = [];
    },
  }
});

export const { addFavorite, removeFavorite, reset } = favorite.actions;
export const searchSelector = (state: RootState) => state.favoriteReducer;
export default favorite.reducer;
