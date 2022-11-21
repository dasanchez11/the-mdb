import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UpsertManyMovies } from 'src/app/shared/store/movies.actions';
import { FavoriteService } from '../services/favorite.service';
import { FavoriteActions } from './favorites-actions';
import {
  deleteFavoriteFailure,
  deleteFavoriteSuccess,
  loadFavoritesSuccess,
} from './favorites.actions';

@Injectable()
export class FavoriteEffects {
  loadFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoriteActions.loadFavorites),
      concatMap(() => this.favoriteService.getLoggedUserFavorites()),
      map(favorites =>
        loadFavoritesSuccess({
          favoriteMovieIds: favorites.results.map(result => result.id),
        })
      )
    );
  });

  upsertFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoriteActions.loadFavorites),
      concatMap(() => this.favoriteService.getLoggedUserFavorites()),
      map(favorites => UpsertManyMovies({payload : favorites.results}))
    )
  })

  deleteFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoriteActions.deleteFavorite),
      switchMap(prop =>
        this.favoriteService.markFavorite(prop.favoriteMovieId, false).pipe(
          map(response => deleteFavoriteSuccess({ favoriteMovieId: response })),
          catchError(error => {
            deleteFavoriteFailure({ error: error });
            return of(error);
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private favoriteService: FavoriteService,
    private snackBarService : SnackbarService
  ) {}
}
