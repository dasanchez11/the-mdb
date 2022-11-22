import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteState } from './favorites.reducer';
import * as fromLists from './favorites.reducer';
import { selectMovieEntities } from 'src/app/shared/store/movies.selectors';
import { IFavoriteMoviesResponse } from '../interfaces/favorite-list-response.interface';

export const selectFavoritesState = createFeatureSelector<FavoriteState>(
  fromLists.favoriteFeatureKey
);

export const selectFavoritesArray = createSelector(
  selectFavoritesState,
  state => state.favorites
);

export const selectFavoriteMovies = createSelector(
  selectFavoritesState,
  selectFavoritesArray,
  selectMovieEntities,
  (state, favoritesIds, movies) => {
    return {
      page: state.meta.page,
      results: favoritesIds.map(id => movies[id]),
      total_pages: state.meta.total_pages,
      total_results: state.meta.total_results,
    } as IFavoriteMoviesResponse;
  }
);

export const selectFavoritesPaginationMeta = createSelector(
  selectFavoritesState,
  state => state.meta
);
