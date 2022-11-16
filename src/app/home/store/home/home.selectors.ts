import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import {
  selectEntities,
  selectIds,
} from 'src/app/shared/store/movies.selectors';
import { IMoviesMeta } from '../../interfaces/movies-response-meta.interface';
import { HomeState } from './home.reducer';
import { HomeSections } from './initial.state';

export const selectHomeState = (state: AppState) => state.home;

export const selectHomeErrors = createSelector(
  selectHomeState,
  (state: HomeState) => state.errors
);

export const selectHomeLoading = createSelector(
  selectHomeState,
  (state: HomeState) => state.loading
);

export const selectHomeIds = createSelector(
  selectHomeState,
  (state: HomeState) => state.ids
);

export const selectHomeMeta = createSelector(
  selectHomeState,
  (state: HomeState) => state.meta
);

export const selectHomeSection = (name: HomeSections) =>
  createSelector(
    [selectHomeLoading, selectHomeErrors, selectHomeMeta, selectHomeIds],
    (loading, errors, meta, ids) => {
      const value = {
        loading: loading[name] as boolean,
        errors: errors[name] as string,
        meta: meta[name] as IMoviesMeta,
        ids: ids[name] as number[],
      };
      return value;
    }
  );
