import { on, createReducer } from '@ngrx/store';
import { Movie } from 'src/app/home/interfaces/movies.interface';
import { SearchActionTypes } from './search.types';
import * as SearchActions from './search.actions';
import { IMoviesMeta } from 'src/app/home/interfaces/movies-response-meta.interface';

export interface SearchState {
  loading: boolean;
  results: Movie[];
  meta: IMoviesMeta;
}

export const searchInitialState: SearchState = {
  loading: false,
  results: [],
  meta: { page: 0, total_pages: 0, total_results: 0 },
};

export const searchReducer = createReducer(
  searchInitialState,
  on(SearchActions.SearchStart, state => ({
    ...state,
    loading: true,
  })),
  on(SearchActions.SearchSuccess, (state, action) => ({
    ...state,
    loading: false,
    results: [...state.results, ...action.payload.results],
    meta: {
      page: action.payload.page,
      total_pages: action.payload.total_pages,
      total_results: action.payload.total_results,
    },
  })),

  on(SearchActions.ClearSearch, state => ({
    ...state,
    results: [],
    meta: { page: 0, total_pages: 0, total_results: 0 },
  }))
);
