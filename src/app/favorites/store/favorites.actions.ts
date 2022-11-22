import { createAction, props } from '@ngrx/store';
import { Meta } from '../interfaces/meta.interface';
import { FavoriteActionTypes } from './favorites.types';

export const loadFavorites = createAction(FavoriteActionTypes.LOAD_FAVORITES);

export const loadFavoritesSuccess = createAction(
  FavoriteActionTypes.LOAD_FAVORITES_SUCESS,
  props<{ favoriteMovieIds: number[]; meta: Meta }>()
);

export const loadFavoriteFailure = createAction(
  FavoriteActionTypes.LOAD_FAVORITES_FAILURE
);

export const deleteFavorite = createAction(
  FavoriteActionTypes.DELETE_FAVORITE,
  props<{ favoriteMovieId: number }>()
);

export const deleteFavoriteSuccess = createAction(
  FavoriteActionTypes.DELETE_FAVORITE_SUCCESS,
  props<{ favoriteMovieId: number }>()
);

export const deleteFavoriteFailure = createAction(
  FavoriteActionTypes.DELETE_FAVORITE_FAILURE,
  props<{ error: Error }>()
);

export const addMovieToFavorites = createAction(
  FavoriteActionTypes.ADD_FAVORITE,
  props<{ movieId: number }>()
);

export const addMovieToFavoriteSuccess = createAction(
  FavoriteActionTypes.ADD_FAVORITE_SUCCESS,
  props<{ movieId: number }>()
);
