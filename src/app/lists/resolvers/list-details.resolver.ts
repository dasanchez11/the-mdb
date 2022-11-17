import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { loadListDetails } from '../store/lists.actions';

@Injectable()
export class ListDetailsResolver implements Resolve<boolean> {

  constructor(private store : Store) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    let idList = route.params['listId']
    this.store.dispatch(loadListDetails({listId : parseInt(idList)}))
    return of(true);
  }
}
