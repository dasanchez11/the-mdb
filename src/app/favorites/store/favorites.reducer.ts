import { createReducer, on } from '@ngrx/store';
import { FavoriteActions } from './favorites-actions';

export const favoriteFeatureKey = 'favorite';

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
  })
);
