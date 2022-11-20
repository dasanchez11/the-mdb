import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/auth/store/auth.selectors';
import { User } from 'src/app/auth/interfaces/responses/get-account-response';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { IMovie } from 'src/app/lists/interfaces/movie.interface';
import { selectFavoriteMovies } from '../../store/favorite.selectors';
import { Movie } from 'src/app/home/interfaces/movies.interface';

@Component({
  selector: 'app-favorites-main',
  templateUrl: './favorites-main.component.html',
})
export class FavoritesMainComponent implements OnInit {
  userLoggedIn$!: Observable<User | null>;
  favorites$!: Observable<(Movie | undefined)[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userLoggedIn$ = this.store.select(selectCurrentUser);
    this.favorites$ = this.store.select(selectFavoriteMovies);
  }
}
