import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.store';
import { selectCurrentUser } from '../auth/store/auth.selectors';
import { SnackbarService } from '../shared/services/snackbar.service';
import { map } from 'rxjs/operators'

@Injectable()
export class FavoritesGuard implements CanActivate {

  constructor(private snackBar : SnackbarService, private store : Store<AppState>) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.store.select(selectCurrentUser).pipe(
        map(user => {
          this.snackBar.openSnackBar("You need to login to view this page.", true)
          return user !== null})
      )
  }
  
}
