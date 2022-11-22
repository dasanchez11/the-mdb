import { mockFavoriteState } from '../tests/store/mock-favorites-store';
import {
  deleteFavoriteSuccess,
  loadFavoritesSuccess,
} from './favorites.actions';
import {
  favoritesReducer,
  FavoriteState,
  initialFavoriteState,
} from './favorites.reducer';

describe('FavoritesReducers', () => {
  it('should return the default state with unknown action', () => {
    const action = { type: 'Unknown' };
    const state = favoritesReducer(initialFavoriteState, action);

    expect(state).toBe(initialFavoriteState);
  });

  it('should add favorites ids array on load favorite success', () => {
    const favoritesIds = [1, 2];
    const meta = { page: 1, total_pages: 1, total_results: 1 };
    const action = loadFavoritesSuccess({
      favoriteMovieIds: favoritesIds,
      meta: meta,
    });
    const state = favoritesReducer(initialFavoriteState, action);

    const expectedNewState: FavoriteState = {
      meta: meta,
      loaded: true,
      favorites: favoritesIds,
    };

    expect(state).not.toBe(expectedNewState);
    expect(state).toEqual(expectedNewState);
  });

  it('should remove favorite from array on delte favorita success', () => {
    const favoriteId = 1;
    const action = deleteFavoriteSuccess({ favoriteMovieId: favoriteId });
    const state = favoritesReducer(mockFavoriteState, action);

    const expectedNewState: FavoriteState = {
      ...state,
      favorites: [2],
    };

    expect(state).not.toBe(expectedNewState);
    expect(state).toEqual(expectedNewState);
  });
});
