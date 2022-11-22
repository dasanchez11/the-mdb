import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { selectCurrentUserLogged } from 'src/app/auth/store/auth.selectors';
import {
  addMovieToFavorites,
  deleteFavorite,
} from 'src/app/favorites/store/favorites.actions';
import { MovieDetails } from '../../interfaces/responses/movie-details/movie-details.interface';
import {
  AddToWatchlist,
  RemoveFromWatchList,
} from '../../store/specific-movie.actions';
import { selectMovieAccountState } from '../../store/specific-movie.selectors';

@Component({
  selector: 'app-movie-details-movie',
  templateUrl: './movie-details-movie.component.html',
  styleUrls: ['./movie-details-movie.component.scss'],
})
export class MovieDetailsMovieComponent implements OnInit {
  logged$!: Observable<boolean>;
  imagePath = 'https://image.tmdb.org/t/p/w500';
  imagePath2 = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces';
  @Input() movie!: MovieDetails;
  favorite: boolean = false;
  rated: boolean = false;
  watchlist: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.logged$ = this.store.select(selectCurrentUserLogged);
    this.store.select(selectMovieAccountState).subscribe(accountState => {
      if (accountState) {
        this.favorite = accountState.favorite;
        this.rated = !!accountState.rated;
        this.watchlist = accountState.watchlist;
      }
    });
  }

  watchlistClick() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        if (!this.watchlist) {
          this.store.dispatch(AddToWatchlist({ payload: this.movie.id }));
        } else {
          this.store.dispatch(RemoveFromWatchList({ payload: this.movie.id }));
        }
      }
    });
  }

  favoriteClick() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        if (!this.favorite) {
          this.store.dispatch(addMovieToFavorites({ movieId: this.movie.id }));
        } else {
          this.store.dispatch(
            deleteFavorite({ favoriteMovieId: this.movie.id })
          );
        }
      }
    });
  }

  ratedClick() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.rated = !this.rated;
      }
    });
  }
}
