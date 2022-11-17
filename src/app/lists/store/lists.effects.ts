import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ListsService } from '../services/lists.service';
import { deleteList, deleteListSuccess, deleteMovieFromList, deleteMovieFromListSucess, loadListDetails, loadListDetailsSucess, loadLists, loadListSuccess } from './lists.actions';
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
      concatMap((action) => this.listsService.getListDetails(action.listId)),
      map(listDetails => loadListDetailsSucess({ listDetails }))
    )
  })

  deleteMovieFromList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteMovieFromList),
      withLatestFrom(this.store.select(selectSelectedListId)),
      switchMap(([action, selectedListId]) => this.listsService.deleteMovieFromList(action.movieId, selectedListId!)),
      map((response) => deleteMovieFromListSucess({ movieId: response}))
    )
  })

  deleteList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteList),
      concatMap((action) => this.listsService.deleteList(action.listId)),
      map((response) => deleteListSuccess({ listId : response}))
    )
  })

  constructor(private listsService: ListsService, private actions$: Actions, private store : Store) { }
}
