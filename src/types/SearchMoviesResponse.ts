import { Movie } from "./Movie";

export type SearchMoviesResponse = {
  search: string;
  page: string;
  movies: Movie[];
  totalResults: number;
}