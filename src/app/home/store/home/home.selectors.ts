import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { selectMovieEntities } from 'src/app/shared/store/movies.selectors';
import { Movie } from '../../interfaces/movies.interface';
import { ISectionItems } from '../../interfaces/section-items.interface';
import { HomeState } from './home.reducer';

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

export type IHomeSelector = ISectionItems & { movies: Dictionary<Movie> };

export const selectHomePlayingNow = createSelector(
  selectHomeLoading,
  selectHomeErrors,
  selectHomeMeta,
  selectHomeIds,
  selectMovieEntities,
  (loading, errors, meta, ids, movies) => ({
    loading: loading.playingNow,
    errors: errors.playingNow,
    meta: meta.playingNow,
    movies: ids.playingNow.map(id => movies[id]),
  })
);

export const selectHomeTopRated = createSelector(
  selectHomeLoading,
  selectHomeErrors,
  selectHomeMeta,
  selectHomeIds,
  selectMovieEntities,
  (loading, errors, meta, ids, movies) => ({
    loading: loading.topRated,
    errors: errors.topRated,
    meta: meta.topRated,
    movies: ids.topRated.map(id => movies[id]),
  })
);

export const selectHomePopular = createSelector(
  selectHomeLoading,
  selectHomeErrors,
  selectHomeMeta,
  selectHomeIds,
  selectMovieEntities,
  (loading, errors, meta, ids, movies) => ({
    loading: loading.popular,
    errors: errors.popular,
    meta: meta.popular,
    movies: ids.popular.map(id => movies[id]),
  })
);

export const selectHomeUpcoming = createSelector(
  selectHomeLoading,
  selectHomeErrors,
  selectHomeMeta,
  selectHomeIds,
  selectMovieEntities,
  (loading, errors, meta, ids, movies) => ({
    loading: loading.upcoming,
    errors: errors.upcoming,
    meta: meta.upcoming,
    movies: ids.upcoming.map(id => movies[id]),
  })
);
