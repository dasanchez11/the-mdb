import { createAction, props } from '@ngrx/store';
import { FavoriteActionTypes } from './favorite.types';

export const loadFavorites = createAction(FavoriteActionTypes.LOAD_FAVORITES);

export const loadFavoritesSuccess = createAction(
  FavoriteActionTypes.LOAD_FAVORITES_SUCESS,
  props<{ favoriteMovieIds: number[] }>()
);

export const loadFavoriteFailure = createAction(
  FavoriteActionTypes.LOAD_FAVORITES_FAILURE
);
