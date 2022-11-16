import { TestBed } from '@angular/core/testing';

import { ListsResolver } from './lists.resolver';

describe('ListsResolver', () => {
  let resolver: ListsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
