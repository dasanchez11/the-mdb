import { IMoviesMeta } from './movies-response-meta.interface';
import { Movie } from './movies.interface';

export interface IMoviesReponse extends IMoviesMeta {
  results: Movie[];
}
