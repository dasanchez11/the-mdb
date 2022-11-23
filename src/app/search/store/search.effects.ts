import { SearchHttpService } from '../services/search-http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SearchActionTypes } from './search.types';
import { catchError, EMPTY, of, switchMap } from 'rxjs';
import { SearchFailure, SearchSuccess } from './search.actions';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UpsertManyMovies } from 'src/app/shared/store/movies.actions';
import { IMoviesReponse } from 'src/app/home/interfaces/movies-response.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private searchHttp: SearchHttpService,
    private snackBar: SnackbarService
  ) {}

  searchSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActionTypes.SEARCH_SUCCESS),
      switchMap(
        (result: {
          type: SearchActionTypes.SEARCH_SUCCESS;
          payload: IMoviesReponse;
        }) => of(UpsertManyMovies({ payload: result.payload.results }))
      )
    )
  );

  searchAction = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActionTypes.SEARCH_START),
      switchMap(
        (data: {
          type: SearchActionTypes.SEARCH_START;
          payload: { page: number; query: string };
        }) => {
          return this.searchHttp
            .getSearch(data.payload.query, data.payload.page)
            .pipe(
              switchMap(response => {
                return of(SearchSuccess({ payload: response }));
              }),
              catchError(error => {
                this.snackBar.openSnackBar(error.error.status_message, true);
                return of(SearchFailure());
              })
            );
        }
      )
    )
  );
}
