import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Movie } from '../../types/Movie';
import { SearchMoviesResponse } from '../../types/SearchMoviesResponse';

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

export const setCurrentSearch = createAsyncThunk(
  'search/setCurrentSearch',
  async (search: string) => {
    const response = await fetch(`http://localhost:3333/movies?query=${search}`);
    const data = response.json();
    return data;
  }
);

export const setCurrentSearchPage = createAsyncThunk(
  'search/setCurrentSearchPage',
  async ({ search, page }: { search: string, page: number }) => {
    const response = await fetch(`http://localhost:3333/movies?query=${search}&page=${page}`);
    const data = response.json();
    return data;
  }
);

export const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
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
  },
  extraReducers: (builder) => {
    builder.addCase(setCurrentSearch.fulfilled, (state, action: PayloadAction<SearchMoviesResponse>) => {
      state.movies = action.payload.movies;
      state.totalResults = action.payload.totalResults;
      state.page = 1;
      state.currentSearch = action.payload.search;

      localStorage.setItem("searchState", JSON.stringify(state));
    });

    builder.addCase(setCurrentSearchPage.fulfilled, (state, action: PayloadAction<SearchMoviesResponse>) => {
      state.movies = action.payload.movies;
      state.page = parseInt(action.payload.page);
      state.totalResults = action.payload.totalResults;

      localStorage.setItem("searchState", JSON.stringify(state));
    });
  },
});

export const { setMovies, setTotalResults, reset } = search.actions;
export const searchSelector = (state: RootState) => state.searchReducer;
export default search.reducer;
