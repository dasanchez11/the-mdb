import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { selectCurrentUser } from 'src/app/auth/store/auth.selectors';
import { loadFavorites } from '../store/favorites.actions';

@Injectable()
export class FavoritesResolver implements Resolve<boolean> {
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(selectCurrentUser).pipe(
      map(user => {
        if (user) {
          console.log('hola que tal');
          this.store.dispatch(loadFavorites({ page: 1 }));
        }
        return true;
      })
    );
  }
}
