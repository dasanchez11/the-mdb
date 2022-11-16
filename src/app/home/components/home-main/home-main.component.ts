import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import {
  selectMovieEntities,
  selectPopular,
} from 'src/app/shared/store/movies.selectors';
import {
  FetchPlayingNowStart,
  FetchTopRatedStart,
  FetchUpcomingStart,
  FetchPopularStart,
} from '../../store/home/home.actions';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
})
export class HomeMainComponent implements OnInit {
  playing = FetchPlayingNowStart;
  topRated = FetchTopRatedStart;
  upcoming = FetchUpcomingStart;
  popular = FetchPopularStart;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(this.topRated({ payload: 1 }));
    this.store.dispatch(this.playing({ payload: 1 }));
    this.store.dispatch(this.upcoming({ payload: 1 }));
    this.store.dispatch(this.popular({ payload: 1 }));
    this.store.select(selectPopular).subscribe(value => {
      console.log(value);
    });
  }
}
