import { TestBed } from '@angular/core/testing';
import { AuthEffects } from './auth.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { AuthHttpService } from '../services/auth-http.service';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  LogoutFailure,
  LogoutStart,
  LogoutSuccess,
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
import { RouterTestingModule } from '@angular/router/testing';

describe('Current User Effects', () => {
  let actions$: Actions;
  let effects: AuthEffects;
  let mockHttp: any;
  let router: Router;
  let mockStorage: any;
  let mockSnackBar: any;

  beforeEach(async () => {
    mockHttp = jasmine.createSpyObj('authHttp', [
      'postSessionId',
      'getuserInfo',
      'deleteSession',
    ]);
    mockStorage = jasmine.createSpyObj('authStorage', ['setElement']);
    mockSnackBar = jasmine.createSpyObj('snackBar', ['openSnackBar']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [MatSnackBarModule, RouterTestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: AuthHttpService,
          useValue: mockHttp,
        },
        {
          provide: AuthLocalStorageService,
          useValue: mockStorage,
        },
        {
          provide: SnackbarService,
          useValue: mockSnackBar,
        },
      ],
    }).compileComponents();

    effects = TestBed.inject(AuthEffects);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  describe('sign in', () => {
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

    it('should redirect when login success', () => {
      spyOn(router, 'navigate');
      const _mockUser = mockUser;
      actions$ = of(SignInSuccess({ payload: _mockUser }));
      effects.authSuccess.pipe(take(1)).subscribe((action: any) => {
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith(['/home']);
        expect(mockStorage.setElement).toHaveBeenCalledTimes(1);
        expect(mockSnackBar.openSnackBar).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Logout', () => {
    it('should Dispatch logout success:true', () => {
      actions$ = of(LogoutStart());
      mockHttp.deleteSession.and.returnValue(of({ success: true }));
      effects.logout.pipe(take(1)).subscribe((action: any) => {
        expect(mockHttp.deleteSession).toHaveBeenCalledTimes(1);
        expect(action).toEqual(LogoutSuccess());
      });
    });

    it('should Dispatch logout success:false', () => {
      actions$ = of(LogoutStart());
      mockHttp.deleteSession.and.returnValue(of({ success: false }));
      effects.logout.pipe(take(1)).subscribe((action: any) => {
        expect(mockHttp.deleteSession).toHaveBeenCalledTimes(1);
        expect(action).toEqual(
          LogoutFailure({ payload: 'Unexpected Error Occurred' })
        );
      });
    });

    it('should Dispatch logout logout failure', () => {
      actions$ = of(LogoutStart());
      mockHttp.deleteSession.and.returnValue(
        throwError(() => mockErrorResponse)
      );
      effects.logout.pipe(take(1)).subscribe((action: any) => {
        expect(mockHttp.deleteSession).toHaveBeenCalledTimes(1);
        expect(action).toEqual(LogoutFailure({ payload: 'Error Message' }));
      });
    });

    it('should handle logout success logic', () => {
      spyOn(localStorage, 'removeItem');
      spyOn(router, 'navigate');
      actions$ = of(LogoutSuccess());
      effects.logoutSuccess.pipe(take(1)).subscribe((action: any) => {
        expect(localStorage.removeItem).toHaveBeenCalledTimes(4);
        expect(router.navigate).toHaveBeenCalledTimes(1);
      });
    });

    it('should handle logout failure logic', () => {
      actions$ = of(LogoutFailure({ payload: 'error' }));
      effects.logoutFailure.pipe(take(1)).subscribe((action: any) => {
        expect(mockSnackBar.openSnackBar).toHaveBeenCalledTimes(1);
      });
    });
  });
});
