import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeHttpService {
  private baseUrl = 'https://api.themoviedb.org/3/movie?';
  constructor(private http: HttpClient) {}

  getPopular(page = 1) {
    const queryParams = `&page=${page}`;
    const restUrl = 'popular';
    const url = this.baseUrl + restUrl + queryParams;
    return this.http.get(url);
  }

  getTopRated(page = 1) {
    const queryParams = `&page=${page}`;
    const restUrl = 'top_rated';
    const url = this.baseUrl + restUrl + queryParams;
    return this.http.get(url);
  }

  getNowPlaying(page = 1) {
    const queryParams = `&page=${page}`;
    const restUrl = 'now_playing';
    const url = this.baseUrl + restUrl + queryParams;
    return this.http.get(url);
  }

  getUpcoming(page = 1) {
    const queryParams = `&page=${page}`;
    const restUrl = 'upcoming';
    const url = this.baseUrl + restUrl + queryParams;
    return this.http.get(url);
  }
}
