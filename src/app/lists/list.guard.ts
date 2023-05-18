import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../app.store';
import { selectCurrentUser } from '../auth/store/auth.selectors';
import { SnackbarService } from '../shared/services/snackbar.service';

@Injectable()
export class ListGuard implements CanActivate {
  constructor(
    private snackBar: SnackbarService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.store.select(selectCurrentUser).pipe(
      map(user => {
        if (user === null) {
          this.snackBar.openSnackBar(
            'You need to login to view this page.',
            true
          );
          return this.router.createUrlTree(['/home']);
        }
        return user !== null;
      })
    );
  }
}
