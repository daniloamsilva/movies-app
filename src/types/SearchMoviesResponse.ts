import { Movie } from "./Movie";

export type SearchMoviesResponse = {
  movies: Movie[];
  totalResults: number;
}