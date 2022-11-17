import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, tap, first } from 'rxjs';
import { AuthLocalStorageService } from 'src/app/auth/services/auth-local-storage.service';
import { ListsActions } from '../store/list-actions';
import { selectIsListsLoaded } from '../store/lists.selector';

@Injectable()
export class ListsResolver implements Resolve<boolean> {
  constructor(
    private storageService: AuthLocalStorageService,
    private store: Store
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(selectIsListsLoaded).pipe(
      tap((listsLoaded) => {
        if(!listsLoaded){
          this.store.dispatch(ListsActions.loadLists());
        }
      }),
      first()
    )
  }
}
