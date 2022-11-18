import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';

import {
  FetchPlayingNowStart,
  FetchTopRatedStart,
  FetchUpcomingStart,
  FetchPopularStart,
} from '../../store/home/home.actions';
import {
  selectHomePlayingNow,
  selectHomePopular,
  selectHomeTopRated,
  selectHomeUpcoming,
} from '../../store/home/home.selectors';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
})
export class HomeMainComponent implements OnInit {
  playingStart = FetchPlayingNowStart;
  topRatedStart = FetchTopRatedStart;
  upcomingStart = FetchUpcomingStart;
  popularStart = FetchPopularStart;

  playingMovies = selectHomePlayingNow;
  topRatedMovies = selectHomeTopRated;
  upcomingMovies = selectHomeUpcoming;
  popularMovies = selectHomePopular;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(this.topRatedStart({ payload: 1 }));
    this.store.dispatch(this.playingStart({ payload: 1 }));
    this.store.dispatch(this.upcomingStart({ payload: 1 }));
    this.store.dispatch(this.popularStart({ payload: 1 }));
  }
}
