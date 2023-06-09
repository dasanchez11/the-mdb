import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  LogoutFailure,
  LogoutSuccess,
  SignInFailure,
  SignInSuccess,
} from './auth.actions';
import { catchError, map, of, switchMap, take, tap, throwError } from 'rxjs';
import { AuthHttpService } from '../services/auth-http.service';
import { IGetSessionId } from '../interfaces/responses/get-sessionId-response.interface';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { User } from '../interfaces/responses/get-account-response';
import { AuthLocalStorageService } from '../services/auth-local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IErrorResponse } from '../interfaces/responses/error.response';
import { AuthActionTypes } from './auth.types';
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private snackBar: SnackbarService,
    private authHttp: AuthHttpService,
    private router: Router,
    private authStorage: AuthLocalStorageService
  ) {}

  logoutSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LOGOUT_SUCCESS),
        tap(() => {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('sessionId');
          localStorage.removeItem('expiresAt');
          localStorage.removeItem('requestToken');
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  logoutFailure = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LOGOUT_FAILURE),
        tap(() => {
          this.snackBar.openSnackBar('Failed logging you out');
        })
      ),
    { dispatch: false }
  );

  logout = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGOUT_START),
      switchMap(() => {
        return this.authHttp.deleteSession().pipe(
          switchMap(data => {
            if (data.success) {
              return of(LogoutSuccess());
            } else {
              return of(
                LogoutFailure({ payload: 'Unexpected Error Occurred' })
              );
            }
          }),
          catchError(errorResponse => {
            return of(
              LogoutFailure({ payload: errorResponse.error.status_message })
            );
          })
        );
      })
    )
  );

  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType('[AuthEffects authLogin] SIGN_IN_SUCCESS'),
        tap((value: { payload: User }) => {
          this.authStorage.setElement('currentUser', value.payload);
          this.snackBar.openSnackBar('Login Success', false);
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType('[Auth RedirectComponent] SIGN_IN_START'),
      switchMap((data: { payload: string }) => {
        this.authStorage.setElement('requestToken', data.payload);
        return this.authHttp.postSessionId(data.payload).pipe(
          switchMap((session: IGetSessionId) => {
            const sessionId = session.session_id;
            this.authStorage.setElement('sessionId', sessionId);
            return this.authHttp.getuserInfo(sessionId).pipe(
              switchMap(user => {
                return of(SignInSuccess({ payload: user }));
              }),
              catchError((errorResponse: { error: IErrorResponse }) => {
                return of(
                  SignInFailure({ payload: errorResponse.error.status_message })
                );
              })
            );
          }),
          catchError((errorResponse: { error: IErrorResponse }) => {
            return of(
              SignInFailure({ payload: errorResponse.error.status_message })
            );
          })
        );
      })
    )
  );
}
