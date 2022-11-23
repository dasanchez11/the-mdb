import { HttpClient } from '@angular/common/http';
import { IMoviesReponse } from '../interfaces/movies-response.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeHttpService {
  private baseUrl = 'https://api.themoviedb.org/3/movie/';
  constructor(private http: HttpClient) {}

  getPopular(page = 1): Observable<IMoviesReponse> {
    const queryParams = `&page=${page}`;
    const restUrl = 'popular?';
    const url = this.baseUrl + restUrl + queryParams;
    return this.http.get<IMoviesReponse>(url);
  }

  getTopRated(page = 1): Observable<IMoviesReponse> {
    const queryParams = `&page=${page}`;
    const restUrl = 'top_rated?';
    const url = this.baseUrl + restUrl + queryParams;
    return this.http.get<IMoviesReponse>(url);
  }

  getNowPlaying(page = 1): Observable<IMoviesReponse> {
    const queryParams = `&page=${page}`;
    const restUrl = 'now_playing?';
    const url = this.baseUrl + restUrl + queryParams;
    return this.http.get<IMoviesReponse>(url);
  }

  getUpcoming(page = 1): Observable<IMoviesReponse> {
    const queryParams = `&page=${page}`;
    const restUrl = 'upcoming?';
    const url = this.baseUrl + restUrl + queryParams;
    return this.http.get<IMoviesReponse>(url);
  }
}
