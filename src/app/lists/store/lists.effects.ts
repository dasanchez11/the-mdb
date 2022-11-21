import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ListsService } from '../services/lists.service';
import {
  clearList,
  clearListSuccess,
  deleteMovieFromList,
  deleteMovieFromListSucess,
  loadListDetails,
  loadListDetailsSucess,
  loadLists,
  loadListSuccess,
} from './lists.actions';
import { selectListItems, selectSelectedListId } from './lists.selector';

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
      switchMap(([action, selectedListId]) => this.listsService.clearList(selectedListId!)
      ),
      map(response => {
        this.snackBarService.openSnackBar('List cleared successfully!');
        return clearListSuccess();
      })
    );
  });

  constructor(
    private listsService: ListsService,
    private actions$: Actions,
    private store: Store,
    private snackBarService: SnackbarService
  ) {}
}
