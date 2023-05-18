import { Injectable } from '@angular/core';
import { IGetTokenResponse } from '../interfaces/get-token-reponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  private redirectBaseUrl = 'https://www.themoviedb.org/';
  private redirectPath = '?redirect_to=';
  private redirectLink = environment.redirectLink;

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
