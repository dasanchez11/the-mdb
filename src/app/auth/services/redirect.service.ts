import { Injectable } from '@angular/core';
import { IGetTokenResponse } from '../interfaces/get-token-reponse.interface';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  private redirectBaseUrl = 'https://www.themoviedb.org/';
  private redirectPath = '?redirect_to=';
  private redirectLink = 'http://localhost:4200/authenticate';

  redirectToLogin(response: IGetTokenResponse): void {
    const url =
      this.redirectBaseUrl +
      'authenticate/' +
      response.request_token +
      this.redirectPath +
      this.redirectLink;
    window.location.href = url;
  }
}
