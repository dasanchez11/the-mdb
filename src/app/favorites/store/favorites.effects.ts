import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UpsertManyMovies } from 'src/app/shared/store/movies.actions';
import { FavoriteService } from '../services/favorite.service';
import { FavoriteActions } from './favorites-actions';
import {
  addMovieToFavoriteSuccess,
  deleteFavoriteFailure,
  deleteFavoriteSuccess,
  loadFavoritesSuccess,
} from './favorites.actions';

@Injectable()
export class FavoriteEffects {
  upsertFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoriteActions.loadFavorites),
      switchMap(action =>
        this.favoriteService.getLoggedUserFavorites(action.page)
      ),
      map(favorites => UpsertManyMovies({ payload: favorites.results }))
    );
  });

  loadFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoriteActions.loadFavorites),
      switchMap(action =>
        this.favoriteService.getLoggedUserFavorites(action.page)
      ),
      map(favorites =>
        loadFavoritesSuccess({
          favoriteMovieIds: favorites.results.map(result => result.id),
          meta: {
            page: favorites.page,
            total_pages: favorites.total_pages,
            total_results: favorites.total_results,
          },
        })
      )
    );
  });

  addFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoriteActions.addMovieToFavorites),
      switchMap(prop =>
        this.favoriteService.markFavorite(prop.movieId, true).pipe(
          map(response => {
            this.snackBarService.openSnackBar('Favorite added succesfully!');
            return addMovieToFavoriteSuccess({ movieId: response });
          }),
          catchError(error => {
            this.snackBarService.openSnackBar(
              'An error ocurred when adding movie to favorites.'
            );
            return of(error);
          })
        )
      )
    );
  });

  deleteFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoriteActions.deleteFavorite),
      switchMap(prop =>
        this.favoriteService.markFavorite(prop.favoriteMovieId, false).pipe(
          map(response => {
            this.snackBarService.openSnackBar('Favorite deleted successfully!');
            return deleteFavoriteSuccess({ favoriteMovieId: response });
          }),
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
    private snackBarService: SnackbarService
  ) {}
}
