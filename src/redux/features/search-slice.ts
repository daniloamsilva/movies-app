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

const initialStateLocalStorage = localStorage.getItem("searchState");

if (initialStateLocalStorage) {
  const parsedInitialStateLocalStorage: SearchState = JSON.parse(initialStateLocalStorage) as SearchState;
  initialState.currentSearch = parsedInitialStateLocalStorage.currentSearch;
  initialState.movies = parsedInitialStateLocalStorage.movies;
  initialState.totalResults = parsedInitialStateLocalStorage.totalResults;
  initialState.page = parsedInitialStateLocalStorage.page;
}

export const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCurrentSearch: (state, action: PayloadAction<string>) => {
      state.currentSearch = action.payload;
      localStorage.setItem("searchState", JSON.stringify(state));
    },
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
      localStorage.setItem("searchState", JSON.stringify(state));
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      localStorage.setItem("searchState", JSON.stringify(state));
    },
    setTotalResults: (state, action: PayloadAction<number>) => {
      state.totalResults = action.payload;
      localStorage.setItem("searchState", JSON.stringify(state));
    },
    reset: (state) => {
      localStorage.removeItem("searchState");
      state.currentSearch = "";
      state.movies = [];
      state.totalResults = 0;
      state.page = 0;
    },
  }
});

export const { setCurrentSearch, setMovies, setPage, setTotalResults, reset } = search.actions;
export const searchSelector = (state: RootState) => state.searchReducer;
export default search.reducer;
