import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { selectCurrentUserLogged } from 'src/app/auth/store/auth.selectors';
import {
  addMovieToFavorites,
  deleteFavorite,
} from 'src/app/favorites/store/favorites.actions';
import { loadLists } from 'src/app/lists/store/lists.actions';
import { MovieDetails } from '../../interfaces/responses/movie-details/movie-details.interface';
import {
  AddRating,
  AddToWatchlist,
  RemoveFromWatchList,
  RemoveRating,
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
  rating = 0;
  ratingOpen = false;
  addListOpen = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.logged$ = this.store.select(selectCurrentUserLogged);
    this.store.select(selectMovieAccountState).subscribe(accountState => {
      if (accountState) {
        this.favorite = accountState.favorite;
        this.watchlist = accountState.watchlist;
        if (accountState.rated === false) {
          this.rated = false;
          this.rating = 0;
        } else {
          this.rated = true;
          const val = accountState.rated.valueOf() as { value: number };
          this.rating = val.value;
        }
      }
    });
    this.loadUserLists()
  }

  loadUserLists() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.store.dispatch(loadLists())
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
        this.ratingOpen = !this.ratingOpen;
      }
    });
  }

  listClicked() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.addListOpen = !this.addListOpen;
      }
    });
  }


}
