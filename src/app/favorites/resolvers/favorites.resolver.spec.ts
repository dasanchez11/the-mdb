import { TestBed } from '@angular/core/testing';

import { FavoritesResolver } from './favorites.resolver';

describe('FavoritesResolver', () => {
  let resolver: FavoritesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FavoritesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
