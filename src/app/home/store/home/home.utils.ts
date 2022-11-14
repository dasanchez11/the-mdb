import { IMoviesMeta } from '../../interfaces/movies-response-meta.interface';
import { IMoviesReponse } from '../../interfaces/movies-response.interface';
import { Movies } from '../../interfaces/movies.interface';
import { HomeState } from './home.reducer';

export class HomeUtils {
  static getIds(state: number[], response: IMoviesReponse): number[] {
    const newIds = response.results.map(result => result.id);
    return [...state, ...newIds];
  }

  static getMeta(response: IMoviesReponse): IMoviesMeta {
    return {
      page: response.page,
      total_pages: response.total_pages,
      total_results: response.total_results,
    };
  }
}
