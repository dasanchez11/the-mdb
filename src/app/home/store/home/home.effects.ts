import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { HomeHttpService } from '../../services/home-http.service';
import {
  FetchPlayingNowStart,
  FetchPlayingNowSuccess,
  FetchPopularSuccess,
  FetchTopRatedSuccess,
  FetchUpcomingSuccess,
} from './home.actions';
import { HomeActionTypes, HomeStartActions } from './home.types';
@Injectable()
export class HomeEffects {
  constructor(private actions$: Actions, private homeHttp: HomeHttpService) {}

  possibleActions = {
    [HomeActionTypes.FETCH_PLAYING_NOW_START]: {
      action: FetchPlayingNowSuccess,
      function: this.homeHttp.getNowPlaying,
    },
    [HomeActionTypes.FETCH_POPULAR_START]: {
      action: FetchPopularSuccess,
      function: this.homeHttp.getPopular,
    },
    [HomeActionTypes.FETCH_TOP_RATED_START]: {
      action: FetchTopRatedSuccess,
      function: this.homeHttp.getTopRated,
    },
    [HomeActionTypes.FETCH_UPCOMING_START]: {
      action: FetchUpcomingSuccess,
      function: this.homeHttp.getUpcoming,
    },
  };

  fetchStart = createEffect(() =>
    this.actions$.pipe(
      ofType(
        HomeActionTypes.FETCH_PLAYING_NOW_START ||
          HomeActionTypes.FETCH_POPULAR_START
      ),
      switchMap((data: { action: HomeStartActions; payload: number }) => {
        const requestFunction = this.possibleActions[data.action].function;
        return requestFunction(data.payload).pipe(
          switchMap(moviesResponse => {
            return of(FetchPlayingNowSuccess({ payload: moviesResponse }));
          })
        );
      })
    )
  );
}
