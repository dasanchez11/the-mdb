import { Movie } from 'src/app/home/interfaces/movies.interface';

export interface IFavoriteMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
