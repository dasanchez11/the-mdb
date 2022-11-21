import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteState } from './favorites.reducer';
import * as fromLists from './favorites.reducer';
import { selectMovieEntities } from 'src/app/shared/store/movies.selectors';

export const selectFavoritesState = createFeatureSelector<FavoriteState>(
  fromLists.favoriteFeatureKey
);

export const selectFavoritesArray = createSelector(
  selectFavoritesState,
  state => state.favorites
);

export const selectFavoriteMovies = createSelector(
  selectFavoritesArray,
  selectMovieEntities,
  (favoritesIds, movies) => favoritesIds.map(id => movies[id])
);
