import { createAction, props } from '@ngrx/store';
import { IErrorResponse } from 'src/app/auth/interfaces/responses/error.response';
import { IMoviesReponse } from 'src/app/home/interfaces/movies-response.interface';
import { IMovieDetailsResponse } from '../interfaces/responses/movie-details/movie-details-response.interface';
import { MovieDetails } from '../interfaces/responses/movie-details/movie-details.interface';
import { IMovieReviewResponse } from '../interfaces/responses/movie-reviews/movie-review-response.interface';
import { SpecificMovieActionTypes } from './specific-movie.types';

export const ClearSpecificMovies = createAction(
  SpecificMovieActionTypes.CLEAR_SPECIFIC_MOVIES
);

//Details
export const FetchDetailsStart = createAction(
  SpecificMovieActionTypes.FETCH_DETAILS_START,
  props<{ payload: number }>()
);

export const FetchDetailsSuccess = createAction(
  SpecificMovieActionTypes.FETCH_DETAILS_SUCCESS,
  props<{ payload: MovieDetails }>()
);

export const FetchDetailsFailure = createAction(
  SpecificMovieActionTypes.FETCH_DETAILS_FAILURE,
  props<{ payload: IErrorResponse }>()
);

//Reviews
export const FetchReviewsStart = createAction(
  SpecificMovieActionTypes.FETCH_REVIEWS_START,
  props<{ payload: number }>()
);

export const FetchReviewsSuccess = createAction(
  SpecificMovieActionTypes.FETCH_REVIEWS_SUCCESS,
  props<{ payload: IMovieReviewResponse }>()
);

export const FetchReviewsFailure = createAction(
  SpecificMovieActionTypes.FETCH_REVIEWS_FAILURE,
  props<{ payload: IErrorResponse }>()
);

//Recommended
export const FetchRecommendedStart = createAction(
  SpecificMovieActionTypes.FETCH_RECOMMENDED_START,
  props<{ payload: { movieId: number; page: number } }>()
);

export const FetchRecommendedSuccess = createAction(
  SpecificMovieActionTypes.FETCH_RECOMMENDED_SUCCESS,
  props<{ payload: IMoviesReponse }>()
);

export const FetchRecommendedFailure = createAction(
  SpecificMovieActionTypes.FETCH_RECOMMENDED_FAILURE,
  props<{ payload: IErrorResponse }>()
);

//Similar
export const FetchSimilarStart = createAction(
  SpecificMovieActionTypes.FETCH_SIMILAR_START,
  props<{ payload: { movieId: number; page: number } }>()
);

export const FetchSimilarSuccess = createAction(
  SpecificMovieActionTypes.FETCH_SIMILAR_SUCCESS,
  props<{ payload: IMoviesReponse }>()
);

export const FetchSimilarFailure = createAction(
  SpecificMovieActionTypes.FETCH_SIMILAR_FAILURE,
  props<{ payload: IErrorResponse }>()
);

export const UpdateSpecificFavorite = createAction(
  SpecificMovieActionTypes.UPDATE_SPECIFIC_MOVIE_FAVORITE,
  props<{ payload: boolean }>()
);

export const UpdateSpecificRate = createAction(
  SpecificMovieActionTypes.UPDATE_SPECIFIC_MOVIE_RATE,
  props<{ payload: number }>()
);

export const UpdateSpecificWatchlist = createAction(
  SpecificMovieActionTypes.UPDATE_SPECIFIC_MOVIE_WATCHLIST,
  props<{ payload: number }>()
);
