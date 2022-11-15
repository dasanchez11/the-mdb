import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { mockSessionId } from 'src/app/auth/test/mock-session-id';
import { mockTokenResponse } from 'src/app/auth/test/mock-token-response';
import { mockUser } from 'src/app/auth/test/mock-user';
import { API_KEY } from './apiKey';
import { AuthHttpService } from './auth-http.service';
import { AuthLocalStorageService } from './auth-local-storage.service';
import { RedirectService } from './redirect.service';
import {
  mockErrorResponse,
  mockExpectederror,
} from '../test/mock-error-response';

describe('AuthHttpService', () => {
  let service: AuthHttpService;
  let httpController: HttpTestingController;
  let baseUrl = 'https://api.themoviedb.org/3/';
  let snackBar: SnackbarService;
  let storage: AuthLocalStorageService;
  let apiKey = API_KEY;
  let redirect: RedirectService;
  let mockStorage: any;

  beforeEach(() => {
    const mockSnackBar = jasmine.createSpyObj('snackBar', ['openSnackBar']);
    const mockRedirect = jasmine.createSpyObj('redirect', ['redirectToLogin']);

    mockStorage = jasmine.createSpyObj('localStorageService', [
      'setElement',
      'getElement',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        {
          provide: SnackbarService,
          useValue: mockSnackBar,
        },
        {
          provide: AuthLocalStorageService,
          useValue: mockStorage,
        },
        {
          provide: RedirectService,
          useValue: mockRedirect,
        },
      ],
    });
    service = TestBed.inject(AuthHttpService);
    httpController = TestBed.inject(HttpTestingController);
    snackBar = TestBed.inject(SnackbarService);
    storage = TestBed.inject(AuthLocalStorageService);
    redirect = TestBed.inject(RedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get token', () => {
    const restUrl = 'authentication/token/new?api_key=';
    const url = baseUrl + restUrl + apiKey;

    service.getToken().subscribe(response => {
      expect(response).toBe(true);
      expect(redirect.redirectToLogin).toHaveBeenCalledTimes(1);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(url);
    request.flush(mockTokenResponse);
  });

  it('should get sessionId', () => {
    const restUrl = 'authentication/session/new?api_key=';
    const url = baseUrl + restUrl + apiKey;

    service.postSessionId('testToken').subscribe(response => {
      expect(response).toBe(mockSessionId);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('POST');
    expect(request.request.url).toEqual(url);
    request.flush(mockSessionId);
  });

  it('should get user Info', () => {
    const restUrl = '/account?api_key=';
    const sessionUrl = '&session_id=';
    const url = baseUrl + restUrl + apiKey + sessionUrl + 'session';

    service.getuserInfo('session').subscribe(response => {
      expect(response).toBe(mockUser);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(url);
    request.flush(mockUser);
  });

  it('should delete session', () => {
    mockStorage.getElement.withArgs('sessionId').and.returnValue('session');
    const restUrl = '/authentication/session?api_key=';
    const sessionUrl = '&session_id=';
    const url = baseUrl + restUrl + apiKey + sessionUrl + 'session';

    service.deleteSession().subscribe(response => {
      expect(response).toEqual({ success: true });
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('DELETE');
    expect(request.request.url).toEqual(url);
    request.flush({ success: true });
  });

  describe('Catch Errors', () => {
    it('should catch errors get token', () => {
      const restUrl = 'authentication/token/new?api_key=';
      const url = baseUrl + restUrl + apiKey;

      service.getToken().subscribe({
        error: error => {
          expect(snackBar.openSnackBar).toHaveBeenCalledTimes(1);
          expect(error).toBe(mockExpectederror.status_message);
        },
      });

      const request = httpController.expectOne(url);
      expect(request.request.method).toEqual('GET');
      expect(request.request.url).toEqual(url);
      request.flush(mockExpectederror, mockErrorResponse);
    });

    it('should catch error getUserInfo', () => {
      const restUrl = '/account?api_key=';
      const sessionUrl = '&session_id=';
      const url = baseUrl + restUrl + apiKey + sessionUrl + 'session';

      service.getuserInfo('session').subscribe({
        next: response => {
          expect(response).toBeUndefined();
        },
        error: error => {
          expect(snackBar.openSnackBar).toHaveBeenCalledTimes(1);
          expect(error).toBe(mockExpectederror.status_message);
        },
      });
      const request = httpController.expectOne(url);
      expect(request.request.method).toEqual('GET');
      expect(request.request.url).toEqual(url);
      request.flush(mockExpectederror, mockErrorResponse);
    });

    it('should catch errors sessionId', () => {
      const restUrl = 'authentication/session/new?api_key=';
      const url = baseUrl + restUrl + apiKey;

      service.postSessionId('testToken').subscribe({
        error: error => {
          expect(snackBar.openSnackBar).toHaveBeenCalledTimes(1);
          expect(error).toBe(mockExpectederror.status_message);
        },
      });

      const request = httpController.expectOne(url);
      expect(request.request.method).toEqual('POST');
      expect(request.request.url).toEqual(url);
      request.flush(mockExpectederror, mockErrorResponse);
    });

    it('should catch errors delete session', () => {
      mockStorage.getElement.withArgs('sessionId').and.returnValue('session');
      const restUrl = '/authentication/session?api_key=';
      const sessionUrl = '&session_id=';
      const url = baseUrl + restUrl + apiKey + sessionUrl + 'session';

      service.deleteSession().subscribe({
        error: error => {
          expect(snackBar.openSnackBar).toHaveBeenCalledTimes(1);
          expect(error).toBe(mockExpectederror.status_message);
        },
      });

      const request = httpController.expectOne(url);
      expect(request.request.method).toEqual('DELETE');
      expect(request.request.url).toEqual(url);
      request.flush(mockExpectederror, mockErrorResponse);
    });
  });
});
