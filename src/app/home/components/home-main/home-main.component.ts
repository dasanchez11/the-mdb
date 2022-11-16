import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { FetchPlayingNowStart } from '../../store/home/home.actions';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
})
export class HomeMainComponent implements OnInit {
  playing = FetchPlayingNowStart({ payload: 1 });

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(FetchPlayingNowStart({ payload: 1 }));
  }
}
