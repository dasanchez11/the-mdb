import { createAction, props } from '@ngrx/store';
import { IMoviesMeta } from '../../interfaces/movies-response-meta.interface';
import { HomeActionTypes } from './home.types';

export const FetchPlayingNowStart = createAction(
  HomeActionTypes.FETCH_PLAYING_NOW_START,
  props<{ payload: number }>()
);

export const FetchUpcomingStart = createAction(
  HomeActionTypes.FETCH_UPCOMING_START,
  props<{ payload: number }>()
);

export const FetchPopularStart = createAction(
  HomeActionTypes.FETCH_POPULAR_START,
  props<{ payload: number }>()
);

export const FetchTopRatedStart = createAction(
  HomeActionTypes.FETCH_TOP_RATED_START,
  props<{ payload: number }>()
);

//Success

export const FetchPlayingNowSuccess = createAction(
  HomeActionTypes.FETCH_PLAYING_NOW_SUCCESS,
  props<{ payload: IMoviesMeta }>()
);

export const FetchUpcomingSuccess = createAction(
  HomeActionTypes.FETCH_UPCOMING_SUCCESS,
  props<{ payload: IMoviesMeta }>()
);

export const FetchPopularSuccess = createAction(
  HomeActionTypes.FETCH_POPULAR_SUCCESS,
  props<{ payload: IMoviesMeta }>()
);

export const FetchTopRatedSuccess = createAction(
  HomeActionTypes.FETCH_TOP_RATED_SUCCESS,
  props<{ payload: IMoviesMeta }>()
);

// Failure

export const FetchPlayingNowFailure = createAction(
  HomeActionTypes.FETCH_PLAYING_NOW_FAILURE,
  props<{ payload: string }>()
);

export const FetchUpcomingFailure = createAction(
  HomeActionTypes.FETCH_UPCOMING_FAILURE,
  props<{ payload: string }>()
);

export const FetchPopularFailure = createAction(
  HomeActionTypes.FETCH_POPULAR_FAILURE,
  props<{ payload: string }>()
);

export const FetchTopRatedFailure = createAction(
  HomeActionTypes.FETCH_TOP_RATED_FAILURE,
  props<{ payload: string }>()
);
