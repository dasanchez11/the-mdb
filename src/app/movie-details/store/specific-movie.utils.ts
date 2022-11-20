import { IMoviesReponse } from 'src/app/home/interfaces/movies-response.interface';
import { HomeUtils } from 'src/app/home/store/home/home.utils';

export class SpecificMovieUtils {
  static handleResult(response: IMoviesReponse, initialResults: number[]) {
    const meta = HomeUtils.getMeta(response);
    const ids = HomeUtils.getIds(initialResults, response);

    return { ...meta, ids };
  }
}
