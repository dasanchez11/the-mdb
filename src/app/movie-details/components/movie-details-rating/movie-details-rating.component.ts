import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { AddRating, RemoveRating } from '../../store/specific-movie.actions';

@Component({
  selector: 'app-movie-details-rating',
  templateUrl: './movie-details-rating.component.html',
  styleUrls: ['./movie-details-rating.component.scss'],
})
export class MovieDetailsRatingComponent implements OnInit {
  @Input() rating!: number;
  rates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  @Input() logged$!: Observable<boolean>;
  @Input() movieId!: number;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  addRate(rate: number) {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.store.dispatch(
          AddRating({ payload: { movieId: this.movieId, rate: rate } })
        );
      }
    });
  }

  removeRate() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.store.dispatch(RemoveRating({ payload: this.movieId }));
      }
    });
  }
}
