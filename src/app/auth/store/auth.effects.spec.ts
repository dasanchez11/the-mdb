import { TestBed } from '@angular/core/testing';
import { AuthEffects } from './auth.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { AuthHttpService } from '../services/auth-http.service';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  Logout,
  SignInFailure,
  SignInStart,
  SignInSuccess,
} from './auth.actions';
import { of, take, throwError } from 'rxjs';
import { mockUser } from 'src/app/auth/test/mock-user';
import { mockSessionId } from 'src/app/auth/test/mock-session-id';
import { mockErrorResponse } from 'src/app/auth/test/mock-error-response';
import { AuthLocalStorageService } from '../services/auth-local-storage.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

describe('Current User Effects', () => {
  let actions$: Actions;
  let effects: AuthEffects;
  let mockHttp: any;
  let router: Router;
  let mockStorage: AuthLocalStorageService;
  let snachBar: SnackbarService;

  beforeEach(async () => {
    mockHttp = jasmine.createSpyObj('authHttp', [
      'postSessionId',
      'getuserInfo',
      'deleteSession',
    ]);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [MatSnackBarModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: Router,
          useValue: jasmine.createSpyObj('router', ['navigate']),
        },
        {
          provide: AuthHttpService,
          useValue: mockHttp,
        },
        {
          provide: AuthLocalStorageService,
          useValue: jasmine.createSpyObj('authStorage', ['setElement']),
        },
        {
          provide: SnackbarService,
          useValue: jasmine.createSpyObj('snackBar', ['openSnackBar']),
        },
      ],
    }).compileComponents();

    effects = TestBed.inject(AuthEffects);
    router = TestBed.get(Router);
    mockStorage = TestBed.get(AuthLocalStorageService);
    snachBar = TestBed.get(SnackbarService);
  });

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  it('should trigger dispatch sign in success action when request success', () => {
    const mockRequestToken = 'requestToken';
    const _mockUser = mockUser;
    const _mockSession = mockSessionId;
    actions$ = of(SignInStart({ payload: mockRequestToken }));
    mockHttp.postSessionId.and.returnValue(of(_mockSession));
    mockHttp.getuserInfo.and.returnValue(of(_mockUser));

    effects.authLogin.pipe(take(1)).subscribe((action: any) => {
      expect(mockHttp.postSessionId).toHaveBeenCalledTimes(1);
      expect(mockHttp.getuserInfo).toHaveBeenCalledTimes(1);
      expect(action).toEqual(SignInSuccess({ payload: _mockUser }));
    });
  });

  it('should redirect when login success', () => {
    const _mockUser = mockUser;
    actions$ = of(SignInSuccess({ payload: _mockUser }));
    effects.authSuccess.pipe(take(1)).subscribe((action: any) => {
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
      expect(mockStorage.setElement).toHaveBeenCalledTimes(1);
      expect(snachBar.openSnackBar).toHaveBeenCalledTimes(1);
    });
  });

  it('should logout with httpRequest', () => {
    pending();
    // spyOn(localStorage, 'removeItem');
    // actions$ = of(Logout());
    // effects.logout.pipe(take(1)).subscribe((action: any) => {
    //   expect(router.navigate).toHaveBeenCalledTimes(1);
    //   expect(router.navigate).toHaveBeenCalledWith(['/home']);
    //   expect(mockHttp.deleteSession).toHaveBeenCalledTimes(1);
    //   expect(localStorage.removeItem).toHaveBeenCalledTimes(4);
    // });
  });

  describe('Dispatch sign in Failure', () => {
    it('should dispatch sign in failure when GET Session id fails ', () => {
      const mockRequestToken = 'requestToken';
      actions$ = of(SignInStart({ payload: mockRequestToken }));
      mockHttp.postSessionId.and.returnValue(
        throwError(() => mockErrorResponse)
      );
      effects.authLogin.pipe(take(1)).subscribe((action: any) => {
        expect(mockHttp.postSessionId).toHaveBeenCalledTimes(1);
        expect(mockHttp.getuserInfo).toHaveBeenCalledTimes(0);
        expect(action).toEqual(SignInFailure({ payload: 'Error Message' }));
      });
    });

    it('should dispatch sign in failure when GET User info fails ', () => {
      const mockRequestToken = 'requestToken';
      const _mockSession = mockSessionId;
      actions$ = of(SignInStart({ payload: mockRequestToken }));
      mockHttp.postSessionId.and.returnValue(of(_mockSession));
      mockHttp.getuserInfo.and.returnValue(throwError(() => mockErrorResponse));
      effects.authLogin.pipe(take(1)).subscribe((action: any) => {
        expect(mockHttp.postSessionId).toHaveBeenCalledTimes(1);
        expect(mockHttp.getuserInfo).toHaveBeenCalledTimes(1);
        expect(action).toEqual(SignInFailure({ payload: 'Error Message' }));
      });
    });
  });
});
