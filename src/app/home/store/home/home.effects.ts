import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { UpsertManyMovies } from 'src/app/shared/store/movies.actions';
import { IMoviesReponse } from '../../interfaces/movies-response.interface';
import { HomeHttpService } from '../../services/home-http.service';
import {
  FetchPlayingNowFailure,
  FetchPlayingNowSuccess,
  FetchPopularFailure,
  FetchPopularSuccess,
  FetchTopRatedFailure,
  FetchTopRatedSuccess,
  FetchUpcomingFailure,
  FetchUpcomingSuccess,
  HomeSuccessActions,
} from './home.actions';
import { HomeStartActionsTypes, HomeActionTypes } from './home.types';
@Injectable()
export class HomeEffects {
  constructor(private actions$: Actions, private homeHttp: HomeHttpService) {}

  fetchSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(
        HomeActionTypes.FETCH_PLAYING_NOW_SUCCESS,
        HomeActionTypes.FETCH_POPULAR_SUCCESS,
        HomeActionTypes.FETCH_TOP_RATED_SUCCESS,
        HomeActionTypes.FETCH_UPCOMING_SUCCESS
      ),
      switchMap(
        (data: { type: HomeSuccessActions; payload: IMoviesReponse }) => {
          return of(UpsertManyMovies({ payload: data.payload.results }));
        }
      )
    )
  );

  possibleActions = {
    [HomeActionTypes.FETCH_PLAYING_NOW_START]: {
      success: FetchPlayingNowSuccess,
      function: this.homeHttp.getNowPlaying,
      failure: FetchPlayingNowFailure,
    },
    [HomeActionTypes.FETCH_POPULAR_START]: {
      success: FetchPopularSuccess,
      function: this.homeHttp.getPopular,
      failure: FetchPopularFailure,
    },
    [HomeActionTypes.FETCH_TOP_RATED_START]: {
      success: FetchTopRatedSuccess,
      function: this.homeHttp.getTopRated,
      failure: FetchTopRatedFailure,
    },
    [HomeActionTypes.FETCH_UPCOMING_START]: {
      success: FetchUpcomingSuccess,
      function: this.homeHttp.getUpcoming,
      failure: FetchUpcomingFailure,
    },
  };

  fetchStart = createEffect(() =>
    this.actions$.pipe(
      ofType(
        HomeActionTypes.FETCH_PLAYING_NOW_START,
        HomeActionTypes.FETCH_POPULAR_START,
        HomeActionTypes.FETCH_TOP_RATED_START,
        HomeActionTypes.FETCH_UPCOMING_START
      ),
      concatMap((data: { type: HomeStartActionsTypes; payload: number }) => {
        const successAction = this.possibleActions[data.type].success;
        const failureAction = this.possibleActions[data.type].failure;
        const requestFunction = this.possibleActions[data.type].function.bind(
          this.homeHttp
        );
        return requestFunction(data.payload).pipe(
          switchMap(moviesResponse => {
            return of(successAction({ payload: moviesResponse }));
          }),
          catchError(errorResponse => {
            return of(
              failureAction({ payload: errorResponse.error.status_message })
            );
          })
        );
      })
    )
  );
}
