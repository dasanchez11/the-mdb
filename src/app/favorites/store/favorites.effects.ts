import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, of } from 'rxjs';
import { FavoriteService } from '../services/favorite.service';
import { FavoriteActions } from './favorites-actions';
import { catchError, map } from 'rxjs/operators';
import {
  deleteFavoriteSuccess,
  loadFavoriteFailure,
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

  deleteFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoriteActions.deleteFavorite),
      concatMap(prop =>
        this.favoriteService.markFavorite(prop.favoriteMovieId, false)
      ),
      map(response => deleteFavoriteSuccess({ favoriteMovieId: response }))
    );
  });

  constructor(
    private actions$: Actions,
    private favoriteService: FavoriteService
  ) {}
}
