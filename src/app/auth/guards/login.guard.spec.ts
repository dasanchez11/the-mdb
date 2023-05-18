import { TestBed } from '@angular/core/testing';
import { LoginGuard } from './login.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/app.store';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { selectCurrentUserLogged } from '../store/auth.selectors';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let store: MockStore<AppState>;
  let mockRouter: Partial<Router>;

  const dummyRoute = {} as ActivatedRouteSnapshot;
  const fakeUrls = ['/', '/admin'];
  const fakeRouterState = (url: string): RouterStateSnapshot => {
    return {
      url,
    } as RouterStateSnapshot;
  };

  describe('not logged in', () => {
    let loggedValue = false;
    beforeEach(() => {
      mockRouter = jasmine.createSpyObj('router', ['createUrlTree']);
      TestBed.configureTestingModule({
        providers: [
          { provide: Router, useValue: mockRouter },
          provideMockStore({
            selectors: [
              { selector: selectCurrentUserLogged, value: loggedValue },
            ],
          }),
        ],
      });
      guard = TestBed.inject(LoginGuard);
      store = TestBed.inject(MockStore);
    });

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    it('should return true if not logged', () => {
      const res$ = guard
        .canActivate(dummyRoute, fakeRouterState('fakeVal'))
        .subscribe(value => {
          expect(value).toBe(true);
        });
    });
  });

  describe('Logged in', () => {
    let loggedValue = true;
    beforeEach(() => {
      mockRouter = jasmine.createSpyObj('router', ['createUrlTree']);
      TestBed.configureTestingModule({
        providers: [
          { provide: Router, useValue: mockRouter },
          provideMockStore({
            selectors: [
              { selector: selectCurrentUserLogged, value: loggedValue },
            ],
          }),
        ],
      });
      guard = TestBed.inject(LoginGuard);
      store = TestBed.inject(MockStore);
    });

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    it('should return true if not logged', () => {
      const res$ = guard
        .canActivate(dummyRoute, fakeRouterState('fakeVal'))
        .subscribe(value => {
          expect(mockRouter.createUrlTree).toHaveBeenCalledTimes(1);
        });
    });
  });
});
