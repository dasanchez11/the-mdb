import { IBaseMovieResponse } from 'src/app/shared/interfaces/response/base-movie.response';
import { MovieReview } from './movie-review.interface';

export type IMovieReviewResponse = IBaseMovieResponse<MovieReview[]>;
