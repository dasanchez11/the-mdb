import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of, take } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UpsertManyMovies } from 'src/app/shared/store/movies.actions';
import { IFavoriteMoviesResponse } from '../interfaces/favorite-list-response.interface';
import { FavoriteService } from '../services/favorite.service';
import {
  deleteFavorite,
  deleteFavoriteSuccess,
  loadFavorites,
  loadFavoritesSuccess,
} from './favorites.actions';
import { FavoriteEffects } from './favorites.effects';

const mockFavoriteMovies: IFavoriteMoviesResponse = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg',
      genre_ids: [28, 14, 878],
      id: 1,
      original_language: 'en',
      original_title: 'Black Adam',
      overview:
        'Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.',
      popularity: 4430.63,
      poster_path: '/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg',
      release_date: '2022-10-19',
      title: 'Black Adam',
      video: false,
      vote_average: 6.9,
      vote_count: 1114,
    },
    {
      adult: false,
      backdrop_path: '/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg',
      genre_ids: [28, 12, 878],
      id: 2,
      original_language: 'en',
      original_title: 'Black Panther: Wakanda Forever',
      overview:
        'Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death. As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.',
      popularity: 3728.879,
      poster_path: '/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
      release_date: '2022-11-09',
      title: 'Black Panther: Wakanda Forever',
      video: false,
      vote_average: 7.5,
      vote_count: 667,
    },
  ],
  total_pages: 1,
  total_results: 1,
};

describe('FavoriteEffects', () => {
  let actions$: Actions;
  let effects: FavoriteEffects;
  let favoriteService: FavoriteService;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        NoopAnimationsModule,
      ],
      providers: [
        FavoriteEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        FavoriteService,
        SnackbarService,
      ],
    });
    effects = TestBed.inject(FavoriteEffects);
    store = TestBed.inject(MockStore);
    favoriteService = TestBed.inject(FavoriteService);
  }));

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch upsert movies action on load favorites', () => {
    actions$ = of(loadFavorites({ page: 1}));

    spyOn(favoriteService, 'getLoggedUserFavorites').and.returnValue(
      of(mockFavoriteMovies)
    );

    effects.upsertFavorites$.pipe(take(1)).subscribe(action => {
      expect(favoriteService.getLoggedUserFavorites).toHaveBeenCalledTimes(1);
      expect(action).toEqual(
        UpsertManyMovies({ payload: mockFavoriteMovies.results })
      );
    });
  });

  it('should dispatch load favorite success action', () => {
    actions$ = of(loadFavorites({page: 1}));

    spyOn(favoriteService, 'getLoggedUserFavorites').and.returnValue(
      of(mockFavoriteMovies)
    );

    effects.loadFavorites$.pipe(take(1)).subscribe(action => {
      expect(favoriteService.getLoggedUserFavorites).toHaveBeenCalledTimes(1);
      expect(action).toEqual(
        loadFavoritesSuccess({
          meta: {page: mockFavoriteMovies.page, total_pages: mockFavoriteMovies.total_pages, total_results: mockFavoriteMovies.total_results},
          favoriteMovieIds: mockFavoriteMovies.results.map(result => result.id),
        })
      );
    });
  });

  it('should dispatch delete favorite success action', () => {
    const favoriteMovieId = 1;
    actions$ = of(deleteFavorite({ favoriteMovieId: favoriteMovieId }));

    spyOn(favoriteService, 'markFavorite').and.returnValue(of(favoriteMovieId));

    effects.deleteFavorite$.pipe(take(1)).subscribe(action => {
      expect(favoriteService.markFavorite).toHaveBeenCalledTimes(1);
      expect(action).toEqual(
        deleteFavoriteSuccess({ favoriteMovieId: favoriteMovieId })
      );
    });
  });

  it('should dispatch delete favorite failure action', () => {
    const favoriteMovieId = 1;
    actions$ = of(deleteFavorite({ favoriteMovieId: favoriteMovieId }));

    const errorMessage = 'error';

    spyOn(favoriteService, 'markFavorite').and.throwError(errorMessage);

    effects.deleteFavorite$.pipe(take(1)).subscribe({
      next: action => {
        expect(favoriteService.markFavorite).toHaveBeenCalledTimes(1);
      },
      error: error => {
        expect(error.message).toBe(errorMessage);
      },
    });
  });
});
