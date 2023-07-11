import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Movie } from '../../types/Movie';

export type SearchState = {
  currentSearch: string;
  movies: Movie[];
  totalResults: number;
  page: number;
}

const initialState: SearchState = {
  currentSearch: "",
  movies: [],
  totalResults: 0,
  page: 0,
};


export const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCurrentSearch: (state, action: PayloadAction<string>) => {
      state.currentSearch = action.payload;
    },
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotalResults: (state, action: PayloadAction<number>) => {
      state.totalResults = action.payload;
    }
  }
});

export const { setCurrentSearch, setMovies, setPage, setTotalResults } = search.actions;
export const searchSelector = (state: RootState) => state.searchReducer;
export default search.reducer;
