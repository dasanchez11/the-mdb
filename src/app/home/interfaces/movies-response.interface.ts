import { IMoviesMeta } from './movies-response-meta.interface';
import { Movies } from './movies.interface';

export interface IMoviesReponse extends IMoviesMeta {
  results: Movies[];
}
