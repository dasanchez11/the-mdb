import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthLocalStorageService } from 'src/app/auth/services/auth-local-storage.service';
import { ListsActions } from '../store/list-actions';

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
    this.store.dispatch(ListsActions.loadLists());
    if (this.storageService.getElement('requestToken')) {
      this.store.dispatch(ListsActions.loadLists());
    }
    return of(true);
  }
}
