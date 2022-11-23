import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { selectCurrentUserLogged } from '../store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectCurrentUserLogged).pipe(
      map(logged => {
        if (logged) {
          return this.router.createUrlTree(['/home']);
        } else {
          return true;
        }
      })
    );
  }
}
