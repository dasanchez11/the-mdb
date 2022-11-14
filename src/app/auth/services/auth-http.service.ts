import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { IGetTokenResponse } from '../interfaces/get-token-reponse.interface';
import { User } from '../interfaces/responses/get-account-response';
import { IGetSessionId } from '../interfaces/responses/get-sessionId-response.interface';
import { API_KEY } from './apiKey';
import { AuthLocalStorageService } from './auth-local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private baseUrl = 'https://api.themoviedb.org/3/';
  private apiKey = API_KEY;
  private redirectLink = 'http://localhost:4200/authenticate';
  private redirectBaseUrl = 'https://www.themoviedb.org/';
  private redirectPath = '?redirect_to=';
  constructor(
    private http: HttpClient,
    private localStorageService: AuthLocalStorageService,
    private snackBar: SnackbarService
  ) {}

  getToken(redirect = this.redirectLink) {
    const restUrl = 'authentication/token/new?api_key=';
    const url = this.baseUrl + restUrl + this.apiKey;
    return this.http.get<IGetTokenResponse>(url).pipe(
      map(response => {
        if (response.request_token) {
          this.localStorageService.setElement('expiresAt', response.expires_at);
          const url =
            this.redirectBaseUrl +
            'authenticate/' +
            response.request_token +
            this.redirectPath +
            redirect;
          window.location.href = url;
        } else {
          throwError(() => 'An Error Occurred');
        }
      })
    );
  }

  getSessionId(requestToken: string): Observable<IGetSessionId> {
    const request_token = requestToken;
    const restUrl = 'authentication/session/new?api_key=';
    const url = this.baseUrl + restUrl + this.apiKey;
    return this.http.post<IGetSessionId>(url, { request_token }).pipe(
      catchError(error => {
        this.snackBar.openSnackBar(error.error.status_message, true);
        return throwError(() => 'new Error');
      })
    );
  }

  getuserInfo(sessionId: string): Observable<User> {
    const restUrl = '/account?api_key=';
    const sessionUrl = '&session_id=';
    const url = this.baseUrl + restUrl + this.apiKey + sessionUrl + sessionId;
    return this.http.get<User>(url);
  }
}
