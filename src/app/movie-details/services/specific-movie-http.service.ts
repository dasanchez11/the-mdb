import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_KEY } from 'src/app/auth/services/apiKey';
import { IMoviesReponse } from 'src/app/home/interfaces/movies-response.interface';
import { IMovieDetailsResponse } from '../interfaces/responses/movie-details/movie-details-response.interface';

@Injectable({
  providedIn: 'root',
})
export class SpecificMovieHttpService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'https://api.themoviedb.org/3/movie/';
  private apiKey = API_KEY;

  getMovieDetails(movieId: number): Observable<IMovieDetailsResponse> {
    const queryParams = `append_to_response=similar,recommendations,reviews`;
    const restUrl = `${movieId}?${queryParams}&${this.apiKey}`;
    const url = this.baseUrl + restUrl;
    return this.http.get<IMovieDetailsResponse>(url);
  }

  getRecommended(
    page: number = 1,
    movieId: number
  ): Observable<IMoviesReponse> {
    const queryParams = `&page=${page}`;
    const restUrl = `${movieId}/recommendations?`;
    const url =
      this.baseUrl + restUrl + queryParams + `&api_key=${this.apiKey}`;
    return this.http.get<IMoviesReponse>(url);
  }

  getPopular(page: number = 1, movieId: number): Observable<IMoviesReponse> {
    const queryParams = `&page=${page}`;
    const restUrl = `${movieId}/recommendations?`;
    const url =
      this.baseUrl + restUrl + queryParams + `&api_key=${this.apiKey}`;
    return this.http.get<IMoviesReponse>(url);
  }
}
