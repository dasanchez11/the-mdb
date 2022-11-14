import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SignInFailure, SignInSuccess } from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthHttpService } from '../services/auth-http.service';
import { IGetSessionId } from '../interfaces/responses/get-sessionId-response.interface';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { User } from '../interfaces/responses/get-account-response';
import { AuthLocalStorageService } from '../services/auth-local-storage.service';
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private snackBar: SnackbarService,
    private authHttp: AuthHttpService,
    private router: Router,
    private authStorage: AuthLocalStorageService
  ) {}

  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType('[AuthHttpService] SIGN_IN_SUCCESS'),
        tap((value: { payload: User }) => {
          this.authStorage.setElement('currentUser', value.payload);
          this.snackBar.openSnackBar('Login Success', false);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        })
      ),
    { dispatch: false }
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType('[AuthHttpService] SIGN_IN_START'),
      switchMap((data: { payload: string }) => {
        return this.authHttp.getSessionId(data.payload).pipe(
          switchMap((session: IGetSessionId) => {
            const sessionId = session.session_id;
            return this.authHttp.getuserInfo(sessionId).pipe(
              switchMap(user => {
                return of(SignInSuccess({ payload: user }));
              }),
              catchError((errorResponse: any) => {
                return of(SignInFailure({ payload: errorResponse }));
              })
            );
          }),
          catchError((errorResponse: any) => {
            return of(SignInFailure({ payload: errorResponse }));
          })
        );
      })
    )
  );
}
