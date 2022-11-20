import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { MovieDetails } from '../../interfaces/responses/movie-details/movie-details.interface';
import {
  FetchDetailsStart,
  FetchRecommendedStart,
  FetchSimilarStart,
} from '../../store/specific-movie.actions';
import {
  selectMovieDetails,
  selectMovieDetailsLoading,
  selectRecommendedMovies,
  selectSimilarMovies,
} from '../../store/specific-movie.selectors';
import { mockMovieDetails } from '../../test/mock-movie-details';

@Component({
  selector: 'app-movie-details-main',
  templateUrl: './movie-details-main.component.html',
})
export class MovieDetailsMainComponent implements OnInit {
  movie$!: Observable<MovieDetails | null>;
  moviesLoading$!: Observable<boolean>;
  similarStart = FetchSimilarStart;
  recommendedStart = FetchRecommendedStart;

  similarMovies = selectSimilarMovies;
  recommendedMovies = selectRecommendedMovies;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.moviesLoading$ = this.store.select(selectMovieDetailsLoading);
    this.movie$ = this.store.select(selectMovieDetails);
    this.route.paramMap.subscribe(params => {
      const movieId = params.get('id');
      if (movieId) {
        this.store.dispatch(FetchDetailsStart({ payload: +movieId }));
      }
    });
  }
}
