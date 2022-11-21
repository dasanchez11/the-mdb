import { createReducer, on } from '@ngrx/store';
import { MovieDetails } from '../interfaces/responses/movie-details/movie-details.interface';
import { MovieReview } from '../interfaces/responses/movie-reviews/movie-review.interface';
import { ISpecificMovieState } from '../interfaces/responses/specific-movie-state.response';
import * as SpecificMovieActions from './specific-movie.actions';

import {
  detailsInitialState,
  recommendedInitialState,
  reviewsInitialState,
  similarInitialState,
} from './specific-movie-initial.state';
import { IMoviesMeta } from 'src/app/home/interfaces/movies-response-meta.interface';
import { SpecificMovieUtils } from './specific-movie.utils';

type IReccommended = IMoviesMeta & { ids: number[] };

export interface SpecificMoviesState {
  details: ISpecificMovieState<MovieDetails>;
  reviews: ISpecificMovieState<MovieReview[]>;
  recommended: ISpecificMovieState<IReccommended>;
  similar: ISpecificMovieState<IReccommended>;
}

export const specificMoviesInitialState: SpecificMoviesState = {
  details: detailsInitialState,
  reviews: reviewsInitialState,
  recommended: recommendedInitialState,
  similar: similarInitialState,
};

export const specificMoviesReducer = createReducer(
  specificMoviesInitialState,

  on(SpecificMovieActions.UpdateSpecificFavorite, (state, action) => {
    if (state.details.result && state.details.result.account_states) {
      return {
        ...state,
        details: {
          ...state.details,
          result: {
            ...state.details.result,
            account_states: {
              ...state.details.result?.account_states,
              favorite: action.payload,
            },
          },
        },
      };
    } else {
      return { ...state };
    }
  }),
  //Details
  on(SpecificMovieActions.FetchDetailsStart, state => ({
    ...state,
    details: { result: null, loading: true, errors: null },
  })),
  on(SpecificMovieActions.FetchDetailsSuccess, (state, action) => ({
    ...state,
    details: {
      ...state.details,
      loading: false,
      result: action.payload,
    },
  })),
  on(SpecificMovieActions.FetchDetailsFailure, (state, action) => ({
    ...state,
    details: {
      ...state.details,
      loading: false,
      errors: action.payload.status_message,
    },
  })),

  // Reviews
  on(SpecificMovieActions.FetchReviewsStart, state => ({
    ...state,
    reviews: { result: null, loading: true, errors: null },
  })),
  on(SpecificMovieActions.FetchReviewsSuccess, (state, action) => ({
    ...state,
    reviews: {
      ...state.reviews,
      loading: false,
      result: action.payload.results,
    },
  })),
  on(SpecificMovieActions.FetchReviewsFailure, (state, action) => ({
    ...state,
    reviews: {
      ...state.reviews,
      loading: false,
      errors: action.payload.status_message,
    },
  })),

  // Recommended

  on(SpecificMovieActions.FetchRecommendedStart, state => ({
    ...state,
    recommended: { ...state.recommended, loading: true, errors: null },
  })),
  on(SpecificMovieActions.FetchRecommendedSuccess, (state, action) => ({
    ...state,
    recommended: {
      ...state.recommended,
      loading: false,
      result: SpecificMovieUtils.handleResult(
        action.payload,
        state.recommended.result?.ids || []
      ),
    },
  })),
  on(SpecificMovieActions.FetchRecommendedFailure, (state, action) => ({
    ...state,
    recommended: {
      ...state.recommended,
      loading: false,
      errors: action.payload.status_message,
    },
  })),

  // similar
  on(SpecificMovieActions.FetchSimilarStart, state => ({
    ...state,
    similar: { ...state.similar, loading: true, errors: null },
  })),
  on(SpecificMovieActions.FetchSimilarSuccess, (state, action) => ({
    ...state,
    similar: {
      ...state.similar,
      loading: false,
      result: SpecificMovieUtils.handleResult(
        action.payload,
        state.similar.result?.ids || []
      ),
    },
  })),
  on(SpecificMovieActions.FetchSimilarFailure, (state, action) => ({
    ...state,
    similar: {
      ...state.similar,
      loading: false,
      errors: action.payload.status_message,
    },
  })),

  on(SpecificMovieActions.ClearSpecificMovies, state => ({
    ...state,
    similar: similarInitialState,
    recommended: recommendedInitialState,
    details: detailsInitialState,
    reviews: reviewsInitialState,
  }))
);
