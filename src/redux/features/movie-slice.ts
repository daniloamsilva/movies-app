import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SearchMovieResponse } from '../../types/SearchMovieResponse';

export type MovieState = {
  movie: SearchMovieResponse | null;
};

const initialState: MovieState = {
  movie: null
};

const initialStateLocalStorage = localStorage.getItem("MovieState");

if (initialStateLocalStorage) {
  const parsedInitialStateLocalStorage: MovieState = JSON.parse(initialStateLocalStorage) as MovieState;
  initialState.movie = parsedInitialStateLocalStorage.movie ?? null;
}

export const getMovie = createAsyncThunk(
  'movie/getMovie',
  async (imdbId: string) => {
    const response = await fetch(`http://localhost:3333/movies/${imdbId}`);
    const data = response.json();
    return data;
  }
);

export const movie = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovie.fulfilled, (state, action: PayloadAction<SearchMovieResponse>) => {
      state.movie = action.payload;
      localStorage.setItem("movieState", JSON.stringify(state));
    });
  }
});

export const movieSelector = (state: RootState) => state.movieReducer;
export default movie.reducer;
