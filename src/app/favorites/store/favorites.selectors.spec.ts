import { AppState } from 'src/app/app.store';
import { authInitialState } from 'src/app/auth/store/auth.reducer';
import { homeInitialState } from 'src/app/home/store/home/home.reducer';
import { initialListsState } from 'src/app/lists/store/lists.reducer';
import {
  mockFavoriteState,
  mockMovieState,
} from '../tests/store/mock-favorites-store';
import {
  selectFavoriteMovies,
  selectFavoritesArray,
  selectFavoritesState,
} from './favorites.selectors';
import { FavoriteState } from './favorites.reducer';
import { specificMoviesInitialState } from 'src/app/movie-details/store/specific-movie.reducer';
import { searchInitialState } from 'src/app/search/store/search.reducer';

describe('Favorite Selectors', () => {
  let mockFavorite: FavoriteState;
  let mockAppState: AppState;

  beforeEach(() => {
    mockFavorite = mockFavoriteState;

    mockAppState = {
      auth: authInitialState,
      home: homeInitialState,
      movie: mockMovieState,
      lists: initialListsState,
      favorites: mockFavorite,
      specificMovie: specificMoviesInitialState,
      search: searchInitialState,
    };
  });

  it('should select favorites state', () => {
    const result = selectFavoritesState.projector(mockFavorite);
    expect(result).toEqual(mockFavorite);
  });

  it('should select the array with the favorite movies ids', () => {
    const result = selectFavoritesArray.projector(mockFavorite);
    expect(result).toEqual(mockFavorite.favorites);
  });

  it('should select the movies which ids equals the array of favorites', () => {
    const result = selectFavoriteMovies(mockAppState);
    expect(result).toEqual({
      page: mockAppState.favorites.meta.page,
      results: [
        mockAppState.movie.entities[1]!,
        mockAppState.movie.entities[2]!,
      ],
      total_pages: mockAppState.favorites.meta.total_pages,
      total_results: mockAppState.favorites.meta.total_results,
    });
  });
});
