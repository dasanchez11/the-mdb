import { createReducer, on } from '@ngrx/store';
import { Meta } from '../interfaces/meta.interface';
import { FavoriteActions } from './favorites-actions';

export const favoriteFeatureKey = 'favorites';

export interface FavoriteState {
  meta: Meta;
  favorites: number[];
  loaded: boolean;
}

export const initialFavoriteState: FavoriteState = {
  meta: { page: 0, total_pages: 0, total_results: 0 },
  favorites: [],
  loaded: false,
};

export const favoritesReducer = createReducer(
  initialFavoriteState,
  on(FavoriteActions.loadFavoritesSuccess, (state, action): FavoriteState => {
    return {
      meta: action.meta,
      loaded: true,
      favorites: action.favoriteMovieIds,
    };
  }),
  on(FavoriteActions.deleteFavoriteSuccess, (state, action) => {
    return {
      ...state,
      favorites: state.favorites.filter(id => id !== action.favoriteMovieId),
    };
  }),
  on(
    FavoriteActions.addMovieToFavoriteSuccess,
    (state, action): FavoriteState => {
      return {
        ...state,
        favorites: [...state.favorites, action.movieId],
      };
    }
  )
);
