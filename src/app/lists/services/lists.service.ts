import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IListResponse } from '../interfaces/movie-lists-response.interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { IListDetails } from '../interfaces/list-details-response.interface';

@Injectable()
export class ListsService {
  private readonly url = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient, private snackBar: SnackbarService) {}

  getLists(): Observable<IListResponse> {
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
}
