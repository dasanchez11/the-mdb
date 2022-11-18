import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ICreateListResponse } from '../interfaces/create-list-response.interface';
import { IListDetails } from '../interfaces/list-details-response.interface';
import { IListResponse } from '../interfaces/movie-lists-response.interface';

@Injectable()
export class ListsService {
  private readonly url = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient, private snackBar: SnackbarService) {}

  getLoggedUserLists(): Observable<IListResponse> {
    return this.http
      .get<IListResponse>(
        `${this.url}account/15719412/lists?language=en-US&page=1`
      )
      .pipe(
        catchError(error => {
          this.snackBar.openSnackBar(error.error.status_message, true);
          return throwError(() => 'new Error');
        })
      );
  }

  getListDetails(listId: number): Observable<IListDetails> {
    return this.http.get<IListDetails>(`${this.url}list/${listId}`).pipe(
      catchError(error => {
        this.snackBar.openSnackBar(error.error.status_message, true);
        return throwError(() => 'new Error');
      })
    );
  }

  createList(name: string, description: string): Observable<boolean> {
    return this.http
      .post<ICreateListResponse>(`${this.url}list`, {
        name: name,
        description: description,
      })
      .pipe(map(response => response.success));
  }

  deleteMovieFromList(movieId: number, listId: number): Observable<number> {
    return this.http
      .post(`${this.url}list/${listId}/remove_item`, {
        media_id: movieId,
      })
      .pipe(
        map(() => {
          return movieId;
        }),
        catchError(error => {
          this.snackBar.openSnackBar(error.error.status_message, true);
          return throwError(() => 'new Error');
        })
      );
  }

  deleteList(listId: number): Observable<number> {
    return this.http.delete(`${this.url}list/${listId}`).pipe(
      map(response => {
        return listId;
      })
    );
  }
}
