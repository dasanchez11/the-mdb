import { IMoviesReponse } from 'src/app/home/interfaces/movies-response.interface';
import { IMovieReviewResponse } from '../movie-reviews/movie-review-response.interface';
import { MovieDetails } from './movie-details.interface';

export type IMovieDetailsResponse = MovieDetails & {
  similar: IMoviesReponse;
} & { recommendations: IMoviesReponse } & { reviews: IMovieReviewResponse };
