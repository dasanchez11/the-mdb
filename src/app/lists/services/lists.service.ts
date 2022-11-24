import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { AppState } from 'src/app/app.store';
import { selectCurrentUser } from 'src/app/auth/store/auth.selectors';
import { Response } from 'src/app/favorites/interfaces/response.interface';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ICreateListResponse } from '../interfaces/create-list-response.interface';
import { IListDetails } from '../interfaces/list-details-response.interface';
import { IListResponse } from '../interfaces/movie-lists-response.interface';

@Injectable()
export class ListsService {
  private readonly url = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient, private snackBar: SnackbarService, private store : Store<AppState>) {}

  getLoggedUserLists(): Observable<IListResponse> { 
    return this.store.select(selectCurrentUser).pipe(
      take(1),
      map(user => user?.id),
      switchMap(val => this.http
        .get<IListResponse>(
          `${this.url}account/${val}/lists?language=en-US&page=1`
        ))
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

  createList(
    name: string,
    description: string
  ): Observable<ICreateListResponse> {
    return this.http.post<ICreateListResponse>(`${this.url}list`, {
      name: name,
      description: description,
    });
  }

  deleteMovieFromList(
    movieId: number,
    listId: number
  ): Observable<{ movieId: number; listId: number }> {
    return this.http
      .post(`${this.url}list/${listId}/remove_item`, {
        media_id: movieId,
      })
      .pipe(
        map(() => {
          return { movieId: movieId, listId: listId };
        }),
        catchError(error => {
          this.snackBar.openSnackBar(error.error.status_message, true);
          return throwError(() => 'new Error');
        })
      );
  }

  clearList(listId: number): Observable<number> {
    return this.http
      .post<Response>(`${this.url}list/${listId}/clear?confirm=true`, null)
      .pipe(
        map(() => {
          return listId;
        })
      );
  }

  addMovieToList(movieId: number, listId: number): Observable<number> {
    return this.http
      .post<Response>(`${this.url}list/${listId}/add_item`, {
        media_id: movieId,
      })
      .pipe(
        map(() => {
          return listId;
        })
      );
  }
}
