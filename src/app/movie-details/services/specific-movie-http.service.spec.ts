import { TestBed } from '@angular/core/testing';

import { SpecificMovieHttpService } from './specific-movie-http.service';

describe('SpecificMovieHttpService', () => {
  let service: SpecificMovieHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificMovieHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
