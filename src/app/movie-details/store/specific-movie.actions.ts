import { createAction, props } from '@ngrx/store';
import { IMoviesReponse } from 'src/app/home/interfaces/movies-response.interface';
import { IMovieDetailsResponse } from '../interfaces/responses/movie-details/movie-details-response.interface';
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
  props<{ payload: IMovieDetailsResponse }>()
);

export const FetchDetailsFailure = createAction(
  SpecificMovieActionTypes.FETCH_DETAILS_FAILURE,
  props<{ payload: string }>()
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
  props<{ payload: string }>()
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
  props<{ payload: string }>()
);

// WatchList

export const AddToWatchlist = createAction(
  SpecificMovieActionTypes.ADD_TO_WATCHLIST_START,
  props<{ payload: number }>()
);

export const RemoveFromWatchList = createAction(
  SpecificMovieActionTypes.REMOVE_FROM_WATCHLIST_START,
  props<{ payload: number }>()
);

//Updates
export const UpdateSpecificFavorite = createAction(
  SpecificMovieActionTypes.UPDATE_SPECIFIC_MOVIE_FAVORITE,
  props<{ payload: boolean }>()
);

export const UpdateSpecificRate = createAction(
  SpecificMovieActionTypes.UPDATE_SPECIFIC_MOVIE_RATE,
  props<{ payload: number }>()
);

export const UpdateSpecificWatchlistSuccess = createAction(
  SpecificMovieActionTypes.UPDATE_SPECIFIC_MOVIE_WATCHLIST_SUCCESS,
  props<{ payload: boolean }>()
);
