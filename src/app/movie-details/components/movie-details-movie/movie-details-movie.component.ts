import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { selectCurrentUserLogged } from 'src/app/auth/store/auth.selectors';
import { Movie } from 'src/app/home/interfaces/movies.interface';
import { UpdateOneMovie } from 'src/app/shared/store/movies.actions';
import { MovieDetails } from '../../interfaces/responses/movie-details/movie-details.interface';
import { IMovieDetails } from '../../test/mock-movie-details';

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
    if (this.movie.account_states) {
      this.favorite = this.movie.account_states.favorite;
      this.rated = !!this.movie.account_states.rated;
      this.watchlist = this.movie.account_states.watchlist;
    }
  }

  watchlistClick() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.watchlist = !this.watchlist;
      }
    });
  }

  favoriteClick() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.favorite = !this.favorite;
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
