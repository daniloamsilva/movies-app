/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import searchReducer from "./features/search-slice";
import favoriteReducer from "./features/favorite-slice";
import movieReducer from "./features/movie-slice";

export const store = configureStore({
  reducer: {
    searchReducer,
    favoriteReducer,
    movieReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
