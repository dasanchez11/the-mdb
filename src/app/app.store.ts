import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/store/auth.reducer';
import { favoritesReducer, FavoriteState } from './favorites/store/favorites.reducer';
import { homeReducer, HomeState } from './home/store/home/home.reducer';
import { listsReducer, ListsState } from './lists/store/lists.reducer';
import { MovieState } from './shared/store/movies.entity';
import { movieReducer } from './shared/store/movies.reducer';

export interface AppState {
  auth: AuthState;
  home: HomeState;
  movie: MovieState;
  lists: ListsState;
  favorites: FavoriteState;
}

export const storeReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  home: homeReducer,
  movie: movieReducer,
  lists: listsReducer,
  favorites: favoritesReducer
};
