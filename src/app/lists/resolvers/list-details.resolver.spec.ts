import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { ListDetailsResolver } from './list-details.resolver';

describe('ListDetailsResolver', () => {
  let resolver: ListDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ListDetailsResolver,
        provideMockStore()
      ]
    });
    resolver = TestBed.inject(ListDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
