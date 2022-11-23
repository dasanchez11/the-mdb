import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { merge, Observable, throwError } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { IListDetails } from '../interfaces/list-details-response.interface';
import { ListsService } from '../services/lists.service';
import {
  addMovieToList,
  addMovieToListSuccess,
  clearList,
  clearListSuccess,
  createList,
  createListSuccess,
  createListWithMovie,
  deleteMovieFromList,
  deleteMovieFromListSucess,
  loadListDetails,
  loadListDetailsSucess,
  loadLists,
  loadListSuccess,
  upsertList,
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

  loadListSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadListSuccess),
      exhaustMap(action => {
        const lists = action.lists;
        const requestsArray: Observable<IListDetails>[] = [];
        lists.forEach(list => {
          const request = this.listsService.getListDetails(parseInt(list.id!));
          requestsArray.push(request);
        });
        return merge(requestsArray);
      }),
      mergeMap(obs => obs),
      map(listDetails => upsertList({ list: listDetails }))
    );
  });

  loadListDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadListDetails),
      concatMap(action => this.listsService.getListDetails(action.listId)),
      map(listDetails => loadListDetailsSucess({ listDetails }))
    );
  });

  createList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createList),
      switchMap(action =>
        this.listsService.createList(action.name, action.description)
      ),
      map(response => {
        if (response.success) {
          this.snackBarService.openSnackBar('List created successfully!');
        }
        return createListSuccess({ listId: response.list_id });
      }),
      tap(action => this.router.navigate(['/lists', action.listId])),
      catchError(error => {
        this.snackBarService.openSnackBar(
          'An unexpected error ocurred when creating the list.',
          true
        );
        return throwError(() => new Error(error));
      })
    );
  });

  createListWithMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createListWithMovie),
      switchMap(action =>
        this.listsService.createList(action.name, action.description).pipe(
          map(response =>
            addMovieToList({
              movieId: action.movieId,
              listId: response.list_id,
            })
          ),
          tap(response => {
            this.snackBarService.openSnackBar('List created successfully!');
            this.router.navigate(['/lists', response.listId]);
          })
        )
      )
    );
  });

  deleteMovieFromList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteMovieFromList),
      switchMap(action =>
        this.listsService.deleteMovieFromList(action.movieId, action.listId)
      ),
      map(response => {
        this.snackBarService.openSnackBar(
          'Item removed from list succesfully!'
        );
        return deleteMovieFromListSucess({
          movieId: response.movieId,
          listId: response.listId,
        });
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
      switchMap(action =>
        this.listsService.addMovieToList(action.movieId, action.listId).pipe(
          catchError(error => {
            this.snackBarService.openSnackBar(
              'An error ocurred when adding movie to list. Try again later.',
              true
            );
            return throwError(() => new Error(error));
          })
        )
      ),
      map(response => {
        return addMovieToListSuccess({ listId: response! });
      })
    );
  });

  upsertList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addMovieToListSuccess, createListSuccess),
      switchMap(action => this.listsService.getListDetails(action.listId)),
      map(response => {
        this.snackBarService.openSnackBar('List updated succesfully!');
        return upsertList({ list: response });
      })
    );
  });

  constructor(
    private listsService: ListsService,
    private actions$: Actions,
    private store: Store,
    private snackBarService: SnackbarService,
    private router: Router
  ) {}
}
