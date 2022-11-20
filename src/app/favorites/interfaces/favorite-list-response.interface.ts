import { IMovie } from 'src/app/lists/interfaces/movie.interface';

export interface IFavoriteMoviesResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
