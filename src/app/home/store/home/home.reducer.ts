import { createReducer, on } from '@ngrx/store';
import { IMoviesFetch } from '../../interfaces/movies-info-state.interface';
import { IMoviesMeta } from '../../interfaces/movies-response-meta.interface';
import {
  errorsInitialState,
  loadingInitialState,
  metaInitialState,
} from './initial.state';
import * as HomeActions from './home.actions';

export interface HomeState {
  loading: IMoviesFetch<boolean, null>;
  errors: IMoviesFetch<string, null>;
  meta: IMoviesFetch<IMoviesMeta, null>;
}

export const homeInitialState: HomeState = {
  loading: loadingInitialState,
  errors: errorsInitialState,
  meta: metaInitialState,
};

export const homReduce = createReducer(
  homeInitialState,
  // start
  on(HomeActions.FetchPlayingNowStart, state => ({
    ...state,
    loading: { ...state.loading, playingNow: true },
  })),
  on(HomeActions.FetchUpcomingStart, state => ({
    ...state,
    loading: { ...state.loading, upcoming: true },
  })),
  on(HomeActions.FetchPopularStart, state => ({
    ...state,
    loading: { ...state.loading, popular: true },
  })),
  on(HomeActions.FetchTopRatedStart, state => ({
    ...state,
    loading: { ...state.loading, topRated: true },
  })),
  // success
  on(HomeActions.FetchPlayingNowSuccess, (state, action) => ({
    ...state,
    loading: { ...state.loading, playingNow: false },
    meta: { ...state.meta, playingNow: action.payload },
  })),
  on(HomeActions.FetchUpcomingSuccess, (state, action) => ({
    ...state,
    loading: { ...state.loading, upcoming: false },
    meta: { ...state.meta, upcoming: action.payload },
  })),
  on(HomeActions.FetchPopularSuccess, (state, action) => ({
    ...state,
    loading: { ...state.loading, popular: false },
    meta: { ...state.meta, popular: action.payload },
  })),
  on(HomeActions.FetchTopRatedSuccess, (state, action) => ({
    ...state,
    loading: { ...state.loading, topRated: false },
    meta: { ...state.meta, topRated: action.payload },
  })),
  // failure
  on(HomeActions.FetchPlayingNowFailure, (state, action) => ({
    ...state,
    loading: { ...state.loading, playingNow: false },
    errors: { ...state.errors, playingNow: action.payload },
  })),
  on(HomeActions.FetchUpcomingFailure, (state, action) => ({
    ...state,
    loading: { ...state.loading, upcoming: false },
    errors: { ...state.errors, upcoming: action.payload },
  })),
  on(HomeActions.FetchPopularFailure, (state, action) => ({
    ...state,
    loading: { ...state.loading, popular: false },
    errors: { ...state.errors, popular: action.payload },
  })),
  on(HomeActions.FetchTopRatedFailure, (state, action) => ({
    ...state,
    loading: { ...state.loading, topRated: false },
    errors: { ...state.errors, topRated: action.payload },
  }))
);
