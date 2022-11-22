import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, of, switchMap } from 'rxjs';
import { FavoriteActionTypes } from 'src/app/favorites/store/favorites.types';
import { IMoviesReponse } from 'src/app/home/interfaces/movies-response.interface';
import { UpsertManyMovies } from 'src/app/shared/store/movies.actions';
import { IMovieDetailsResponse } from '../interfaces/responses/movie-details/movie-details-response.interface';
import { IMovieReviewResponse } from '../interfaces/responses/movie-reviews/movie-review-response.interface';
import { SpecificMovieHttpService } from '../services/specific-movie-http.service';
import {
  ClearSpecificMovies,
  FetchDetailsFailure,
  FetchDetailsSuccess,
  FetchRecommendedFailure,
  FetchRecommendedSuccess,
  FetchSimilarFailure,
  FetchSimilarSuccess,
  UpdateSpecificFavorite,
} from './specific-movie.actions';
import {
  SpecificMovieActionTypes,
  SpecificStartActionsTypes,
} from './specific-movie.types';

@Injectable()
export class SpecificMovieEffects {
  constructor(
    private actions$: Actions,
    private specificHttp: SpecificMovieHttpService
  ) {}

  favoriteChange = createEffect(() =>
    this.actions$.pipe(
      ofType(
        FavoriteActionTypes.ADD_FAVORITE_SUCCESS,
        FavoriteActionTypes.DELETE_FAVORITE_SUCCESS
      ),
      switchMap((result: { type: any; payload: number }) => {
        let returnValue = false;
        if (result.type === FavoriteActionTypes.ADD_FAVORITE_SUCCESS) {
          returnValue = true;
        }
        return of(UpdateSpecificFavorite({ payload: returnValue }));
      })
    )
  );

  fetchDetailsSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(SpecificMovieActionTypes.FETCH_DETAILS_SUCCESS),
      mergeMap((data: { type: any; payload: IMovieDetailsResponse }) => {
        const { recommendations, similar } = data.payload;

        const values = [...recommendations.results, ...similar.results];
        return of(UpsertManyMovies({ payload: values }));
      })
    )
  );

  recommendedOrSimilarSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SpecificMovieActionTypes.FETCH_RECOMMENDED_SUCCESS,
        SpecificMovieActionTypes.FETCH_SIMILAR_SUCCESS
      ),
      mergeMap((data: { type: any; payload: IMoviesReponse }) => {
        return of(UpsertManyMovies({ payload: data.payload.results }));
      })
    )
  );

  detailsStart = createEffect(() =>
    this.actions$.pipe(
      ofType(SpecificMovieActionTypes.FETCH_DETAILS_START),
      mergeMap(() => {
        return of(ClearSpecificMovies());
      })
    )
  );

  possibleActions = {
    [SpecificMovieActionTypes.FETCH_RECOMMENDED_START]: {
      success: FetchRecommendedSuccess,
      function: this.specificHttp.getRecommended,
      failure: FetchRecommendedFailure,
    },
    [SpecificMovieActionTypes.FETCH_SIMILAR_START]: {
      success: FetchSimilarSuccess,
      function: this.specificHttp.getSimilar,
      failure: FetchSimilarFailure,
    },
  };

  movieDetailsAction = createEffect(() =>
    this.actions$.pipe(
      ofType(SpecificMovieActionTypes.FETCH_DETAILS_START),
      switchMap(
        (data: {
          type: SpecificMovieActionTypes.FETCH_DETAILS_START;
          payload: number;
        }) => {
          return this.specificHttp.getMovieDetails(data.payload).pipe(
            switchMap(movieResponse => {
              return of(FetchDetailsSuccess({ payload: movieResponse }));
            }),
            catchError(errorResponse => {
              return of(
                FetchDetailsFailure({
                  payload: errorResponse.error.status_message,
                })
              );
            })
          );
        }
      )
    )
  );

  recommendedAndSimilarActions = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SpecificMovieActionTypes.FETCH_RECOMMENDED_START,
        SpecificMovieActionTypes.FETCH_SIMILAR_START
      ),
      mergeMap(
        (data: {
          type: SpecificStartActionsTypes;
          payload: { page: number; movieId: number };
        }) => {
          const { page, movieId } = data.payload;
          const successAction = this.possibleActions[data.type].success;
          const failureAction = this.possibleActions[data.type].failure;
          const requestFunction = this.possibleActions[data.type].function.bind(
            this.specificHttp
          );
          return requestFunction(page, movieId).pipe(
            switchMap(moviesResponse => {
              return of(successAction({ payload: moviesResponse }));
            }),
            catchError(errorResponse => {
              return of(
                failureAction({ payload: errorResponse.error.status_message })
              );
            })
          );
        }
      )
    )
  );
}
