import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthLocalStorageService } from 'src/app/auth/services/auth-local-storage.service';
import { API_KEY } from 'src/app/auth/services/apiKey';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorage : AuthLocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      params : request.params.append('session_id', this.localStorage.getElement('sessionId')).append('api_key', API_KEY)
    })
    return next.handle(request);
  }
}
