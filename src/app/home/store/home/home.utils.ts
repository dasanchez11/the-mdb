import { IMoviesMeta } from '../../interfaces/movies-response-meta.interface';
import { IMoviesReponse } from '../../interfaces/movies-response.interface';

export class HomeUtils {
  static getIds(state: number[], response: IMoviesReponse): number[] {
    const newIds = response.results
      .filter(result => {
        if (state.indexOf(result.id) === -1) {
          return true;
        }
        return false;
      })
      .map(movie => movie.id);

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
