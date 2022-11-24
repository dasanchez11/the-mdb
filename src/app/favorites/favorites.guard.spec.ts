import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SnackbarService } from '../shared/services/snackbar.service';

import { FavoritesGuard } from './favorites.guard';

describe('FavoritesGuard', () => {
  let guard: FavoritesGuard;
  let store : MockStore;

  const snackBarService = jasmine.createSpyObj('SnackbarService',['openSnackBar'])
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoritesGuard,provideMockStore(), {provide: SnackbarService, useValue: snackBarService}]
    });
    guard = TestBed.inject(FavoritesGuard);
    store = TestBed.inject(MockStore)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
