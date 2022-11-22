import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ListsService } from '../services/lists.service';
import {
  addMovieToList,
  addMovieToListSuccess,
  clearList,
  clearListSuccess,
  deleteMovieFromList,
  deleteMovieFromListSucess,
  loadListDetails,
  loadListDetailsSucess,
  loadLists,
  loadListSuccess,
  upsertList
} from './lists.actions';
import { selectSelectedListId } from './lists.selector';

@Injectable()
export class ListsEffects {
  loadList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadLists),
      concatMap(() => this.listsService.getLoggedUserLists()),
      map(response => loadListSuccess({ lists: response.results }))
    );
  });

  loadListDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadListDetails),
      concatMap(action => this.listsService.getListDetails(action.listId)),
      map(listDetails => loadListDetailsSucess({ listDetails }))
    );
  });

  deleteMovieFromList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteMovieFromList),
      concatLatestFrom(() => this.store.select(selectSelectedListId)),
      switchMap(([action, selectedListId]) =>
        this.listsService.deleteMovieFromList(action.movieId, selectedListId!)
      ),
      map(response => {
        this.snackBarService.openSnackBar('Item deleted succesfully');
        return deleteMovieFromListSucess({ movieId: response });
      })
    );
  });

  clearList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clearList),
      concatLatestFrom(() => this.store.select(selectSelectedListId)),
      switchMap(([action, selectedListId]) =>
        this.listsService.clearList(selectedListId!)
      ),
      map(response => {
        this.snackBarService.openSnackBar('List cleared successfully!');
        return clearListSuccess();
      })
    );
  });

  addMovieToList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addMovieToList),
      switchMap((action) => this.listsService.addMovieToList(action.movieId, action.listId).pipe(
        catchError((error)=> {
          this.snackBarService.openSnackBar("An error ocurred when adding movie to list. Try again later.",true)
          return throwError(() => new Error(error))
        })
      )),
      map(response => {
        return addMovieToListSuccess({listId : response!})
      })
    )
  }
  )

  upsertList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addMovieToListSuccess),
      switchMap((action) => this.listsService.getListDetails(action.listId)),
      map(response => {
        this.snackBarService.openSnackBar("Movie added succesfully!")
        return upsertList({list: response})
      })
    )
  })

  constructor(
    private listsService: ListsService,
    private actions$: Actions,
    private store: Store,
    private snackBarService: SnackbarService
  ) {}
}
