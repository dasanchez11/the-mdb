import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AppState } from 'src/app/app.store';
import { User } from 'src/app/auth/interfaces/responses/get-account-response';
import { selectCurrentUser } from 'src/app/auth/store/auth.selectors';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { IFavoriteMoviesResponse } from '../interfaces/favorite-list-response.interface';
import { map } from 'rxjs';

@Injectable()
export class FavoriteService {
  private readonly url = 'https://api.themoviedb.org/3/';

  constructor(
    private http: HttpClient,
    private snackBar: SnackbarService,
    private store: Store<AppState>
  ) {}

  getLoggedUserFavorites(): Observable<IFavoriteMoviesResponse> {
    return this.store.select(selectCurrentUser).pipe(
      map(user => user?.id),
      switchMap(val =>
        this.http.get<IFavoriteMoviesResponse>(
          `${this.url}account/${val}/favorite/movies`
        )
      )
    );
  }

  markFavorite(movieId : number, favorite : boolean) : Observable<number> {
    return this.store.select(selectCurrentUser).pipe(
      map(user => user?.id),
      switchMap(val =>
        this.http.post<Response>(
          `${this.url}account/${val}/favorite`,{
            media_type: 'movie',
            media_id: movieId,
            favorite: favorite
          } ).pipe(map(() => {
            return movieId
          }))
      )
    );
  }
}
