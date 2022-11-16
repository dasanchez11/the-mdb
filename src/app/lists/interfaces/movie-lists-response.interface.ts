import { IMovieList } from './movie-list-response.interface';

export interface IListResponse {
  page: number;
  results: IMovieList[];
  total_pages: number;
  total_results: number;
}
