import { createReducer, on } from '@ngrx/store';
import { FavoriteActions } from './favorites-actions';

export const favoriteFeatureKey = 'favorites';

export interface FavoriteState {
  favorites: number[];
  loaded: boolean;
}

export const initialFavoriteState: FavoriteState = {
  favorites: [],
  loaded: false,
};

export const favoritesReducer = createReducer(
  initialFavoriteState,
  on(FavoriteActions.loadFavoritesSuccess, (state, action): FavoriteState => {
    return {
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
  on(FavoriteActions.addMovieToFavoriteSuccess, (state, action): FavoriteState => {
    return {
      ...state,
      favorites: [...state.favorites, action.movieId],
    };
  })
);
