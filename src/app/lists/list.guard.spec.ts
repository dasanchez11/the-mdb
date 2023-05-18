import { TestBed } from '@angular/core/testing';

import { ListGuard } from './list.guard';
import { SnackbarService } from '../shared/services/snackbar.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AppState } from '../app.store';
import { selectCurrentUser } from '../auth/store/auth.selectors';
import { Observable } from 'rxjs';
import { User } from '../auth/interfaces/responses/get-account-response';

describe('ListGuard', () => {
  let guard: ListGuard;
  let mockSnackbar: Partial<SnackbarService>;
  let store: MockStore<AppState>;
  let mockRouter: Partial<Router>;
  let currentUser: any = null;
  const dummyRoute = {} as ActivatedRouteSnapshot;
  const fakeUrls = ['/', '/admin'];
  const fakeRouterState = (url: string): RouterStateSnapshot => {
    return {
      url,
    } as RouterStateSnapshot;
  };

  beforeEach(() => {
    mockSnackbar = jasmine.createSpyObj('snackBar', ['openSnackBar']);
    mockRouter = jasmine.createSpyObj('router', ['createUrlTree']);
    TestBed.configureTestingModule({
      providers: [
        ListGuard,
        provideMockStore({
          selectors: [
            {
              selector: selectCurrentUser,
              value: { currentUser: currentUser },
            },
          ],
        }),
        { provide: SnackbarService, useValue: mockSnackbar },
        { provide: Router, useValue: mockRouter },
      ],
    });
    guard = TestBed.inject(ListGuard);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if current user exists ', () => {
    store.overrideSelector(selectCurrentUser, {} as User);
    guard
      .canActivate(dummyRoute, fakeRouterState('fakeVal'))
      .subscribe(value => {
        expect(value).toBe(true);
      });
  });

  it('should redirect and open snackbar if current user is null ', () => {
    store.overrideSelector(selectCurrentUser, null);
    guard
      .canActivate(dummyRoute, fakeRouterState('fakeVal'))
      .subscribe(value => {
        expect(mockRouter.createUrlTree).toHaveBeenCalledTimes(1);
        expect(mockSnackbar.openSnackBar).toHaveBeenCalledTimes(1);
      });
  });
});
