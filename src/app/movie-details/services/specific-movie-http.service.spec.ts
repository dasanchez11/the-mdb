import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_KEY } from 'src/app/auth/services/apiKey';
import { mockMoviesResponse } from 'src/app/home/test/mock-response';
import { mockMovieDetailsResponse } from '../test/mock-movie-details.response';

import { SpecificMovieHttpService } from './specific-movie-http.service';

describe('SpecificMovieHttpService', () => {
  let service: SpecificMovieHttpService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SpecificMovieHttpService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getMovieDetails', () => {
    const movieId = 1234;
    const baseUrl = 'https://api.themoviedb.org/3/movie/';
    const queryParams = `append_to_response=similar,recommendations,account_states,reviews`;
    let restUrl = `${movieId}?${queryParams}`;
    const url = baseUrl + restUrl;

    service.getMovieDetails(1234).subscribe(response => {
      expect(response).toBe(mockMovieDetailsResponse);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(url);
    request.flush(mockMovieDetailsResponse);
  });

  it('should getRecommended', () => {
    const movieId = 1234;
    const apiKey = API_KEY;
    const baseUrl = 'https://api.themoviedb.org/3/movie/';
    const queryParams = `&page=${1}`;
    const restUrl = `${movieId}/recommendations?`;
    const url = baseUrl + restUrl + queryParams + `&api_key=${apiKey}`;

    service.getRecommended(1, 1234).subscribe(response => {
      expect(response).toBe(mockMoviesResponse);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(url);
    request.flush(mockMoviesResponse);
  });

  it('should get Similar', () => {
    const movieId = 1234;
    const apiKey = API_KEY;
    const baseUrl = 'https://api.themoviedb.org/3/movie/';
    const queryParams = `&page=${1}`;
    const restUrl = `${movieId}/similar?`;
    const url = baseUrl + restUrl + queryParams + `&api_key=${apiKey}`;

    service.getSimilar(1, 1234).subscribe(response => {
      expect(response).toBe(mockMoviesResponse);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(url);
    request.flush(mockMoviesResponse);
  });
});
