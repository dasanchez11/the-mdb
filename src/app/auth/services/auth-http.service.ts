import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { IGetTokenResponse } from '../interfaces/get-token-reponse.interface';
import { User } from '../interfaces/responses/get-account-response';
import { IGetSessionId } from '../interfaces/responses/get-sessionId-response.interface';
import { API_KEY } from './apiKey';
import { AuthLocalStorageService } from './auth-local-storage.service';
import { RedirectService } from './redirect.service';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private baseUrl = 'https://api.themoviedb.org/3/';
  private apiKey = API_KEY;

  constructor(
    private http: HttpClient,
    private localStorageService: AuthLocalStorageService,
    private snackBar: SnackbarService,
    private redirect: RedirectService
  ) {}

  getToken() {
    const restUrl = 'authentication/token/new?api_key=';
    const url = this.baseUrl + restUrl + this.apiKey;
    return this.http.get<IGetTokenResponse>(url).pipe(
      catchError(error => {
        this.snackBar.openSnackBar(error.error.status_message, true);
        return throwError(() => error.error.status_message);
      }),
      switchMap(response => {
        if (response.request_token) {
          this.localStorageService.setElement('expiresAt', response.expires_at);
          this.redirect.redirectToLogin(response);
          return of(true);
        } else {
          return of(false);
        }
      })
    );
  }

  postSessionId(requestToken: string): Observable<IGetSessionId> {
    const request_token = requestToken;
    const restUrl = 'authentication/session/new?api_key=';
    const url = this.baseUrl + restUrl + this.apiKey;
    return this.http.post<IGetSessionId>(url, { request_token }).pipe(
      catchError(error => {
        this.snackBar.openSnackBar(error.error.status_message, true);
        return throwError(() => error.error.status_message);
      })
    );
  }

  getuserInfo(sessionId: string): Observable<User> {
    const restUrl = '/account?api_key=';
    const sessionUrl = '&session_id=';
    const url = this.baseUrl + restUrl + this.apiKey + sessionUrl + sessionId;
    return this.http.get<User>(url).pipe(
      catchError(error => {
        this.snackBar.openSnackBar(error.error.status_message, true);
        return throwError(() => error.error.status_message);
      })
    );
  }

  deleteSession(): Observable<{ success: boolean }> {
    const sessionId = this.localStorageService.getElement('sessionId');
    console.log(sessionId);
    if (sessionId) {
      const restUrl = '/authentication/session?api_key=';
      const sessionUrl = '&session_id=';
      const url = this.baseUrl + restUrl + this.apiKey + sessionUrl + sessionId;
      return this.http
        .delete<{ success: boolean }>(url, { body: { session_id: sessionId } })
        .pipe(
          catchError(error => {
            this.snackBar.openSnackBar(error.error.status_message, true);
            return throwError(() => error.error.status_message);
          })
        );
    } else {
      return of({ success: false });
    }
  }
}
