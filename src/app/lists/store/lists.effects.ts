import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ListsService } from '../services/lists.service';
import { loadLists, loadListSuccess } from './lists.actions';
import { map, concatMap } from 'rxjs/operators';

@Injectable()
export class ListsEffects {
  loadList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadLists),
      concatMap(() => this.listsService.getLoggedUserLists()),
      map(response => loadListSuccess({ lists: response.results }))
    );
  });

  constructor(private listsService: ListsService, private actions$: Actions) {}
}
