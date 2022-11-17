import { TestBed } from '@angular/core/testing';

import { ListDetailsResolver } from './list-details.resolver';

describe('ListDetailsResolver', () => {
  let resolver: ListDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
