import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockMoviesResponse } from '../test/mock-response';
import { API_KEY } from './apiKey';

import { HomeHttpService } from './home-http.service';

describe('HomeHttpService', () => {
  let service: HomeHttpService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HomeHttpService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get now playing movies', () => {
    const baseUrl = 'https://api.themoviedb.org/3/movie/';
    const apiKey = API_KEY;
    const queryParams = `&page=${1}`;
    const restUrl = 'now_playing?';
    const url = baseUrl + restUrl + queryParams + `&api_key=${apiKey}`;

    service.getNowPlaying().subscribe(response => {
      expect(response).toBe(mockMoviesResponse);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(url);
    request.flush(mockMoviesResponse);
  });

  it('should get popular movies', () => {
    const baseUrl = 'https://api.themoviedb.org/3/movie/';
    const apiKey = API_KEY;
    const queryParams = `&page=${1}`;
    const restUrl = 'popular?';
    const url = baseUrl + restUrl + queryParams + `&api_key=${apiKey}`;

    service.getPopular().subscribe(response => {
      expect(response).toBe(mockMoviesResponse);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(url);
    request.flush(mockMoviesResponse);
  });

  it('should get top rated movies', () => {
    const baseUrl = 'https://api.themoviedb.org/3/movie/';
    const apiKey = API_KEY;
    const queryParams = `&page=${1}`;
    const restUrl = 'top_rated?';
    const url = baseUrl + restUrl + queryParams + `&api_key=${apiKey}`;

    service.getTopRated().subscribe(response => {
      expect(response).toBe(mockMoviesResponse);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(url);
    request.flush(mockMoviesResponse);
  });

  it('should get upcoming movies', () => {
    const baseUrl = 'https://api.themoviedb.org/3/movie/';
    const apiKey = API_KEY;
    const queryParams = `&page=${1}`;
    const restUrl = 'upcoming?';
    const url = baseUrl + restUrl + queryParams + `&api_key=${apiKey}`;

    service.getUpcoming().subscribe(response => {
      expect(response).toBe(mockMoviesResponse);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(url);
    request.flush(mockMoviesResponse);
  });
});
