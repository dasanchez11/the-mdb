import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { SpecificMovieEffects } from './specific-movie.effects';
import { SpecificMovieHttpService } from '../services/specific-movie-http.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { SpecificMovieActionTypes } from './specific-movie.types';
import {
  ClearSpecificMovies,
  FetchDetailsFailure,
  FetchDetailsStart,
  FetchDetailsSuccess,
  FetchRecommendedFailure,
  FetchRecommendedSuccess,
  FetchSimilarFailure,
  FetchSimilarStart,
  FetchSimilarSuccess,
  UpdateSpecificFavorite,
} from './specific-movie.actions';
import { of, take, throwError } from 'rxjs';
import { mockMoviesResponse } from 'src/app/home/test/mock-response';
import { mockMovieDetails } from '../test/mock-movie-details';
import { mockMovieDetailsResponse } from '../test/mock-movie-details.response';
import { UpsertManyMovies } from 'src/app/shared/store/movies.actions';
import {
  addMovieToFavoriteSuccess,
  deleteFavoriteSuccess,
} from 'src/app/favorites/store/favorites.actions';
import { mockErrorResponse } from 'src/app/auth/test/mock-error-response';

describe('Specific Movie Effects', () => {
  let actions$: Actions;
  let effects: SpecificMovieEffects;
  let mockHttp: any;

  beforeEach(async () => {
    mockHttp = jasmine.createSpyObj('specificHttp', [
      'getMovieDetails',
      'getRecommended',
      'getSimilar',
    ]);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [
        SpecificMovieEffects,
        provideMockActions(() => actions$),
        {
          provide: SpecificMovieHttpService,
          useValue: mockHttp,
        },
      ],
    }).compileComponents();

    effects = TestBed.inject(SpecificMovieEffects);
  });

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  describe('Recommeded and similar', () => {
    it('should get the correct possible actions ', () => {
      const objectRef1 =
        effects.possibleActions[
          SpecificMovieActionTypes.FETCH_RECOMMENDED_START
        ];
      expect(objectRef1.success.type).toEqual(FetchRecommendedSuccess.type);
      expect(objectRef1.failure.type).toEqual(FetchRecommendedFailure.type);
      objectRef1.function(1, 1);
      expect(mockHttp.getRecommended).toHaveBeenCalledTimes(1);

      const objectRef2 =
        effects.possibleActions[SpecificMovieActionTypes.FETCH_SIMILAR_START];
      expect(objectRef2.success.type).toEqual(FetchSimilarSuccess.type);
      expect(objectRef2.failure.type).toEqual(FetchSimilarFailure.type);
      objectRef2.function(1, 1);
      expect(mockHttp.getSimilar).toHaveBeenCalledTimes(1);
    });

    it('should dispatch success action', () => {
      actions$ = of(FetchSimilarStart({ payload: { page: 1, movieId: 1 } }));
      mockHttp.getSimilar.and.returnValue(of(mockMoviesResponse));

      effects.recommendedAndSimilarActions
        .pipe(take(1))
        .subscribe((action: any) => {
          expect(mockHttp.getSimilar).toHaveBeenCalledTimes(1);
          expect(action).toEqual(
            FetchSimilarSuccess({ payload: mockMoviesResponse })
          );
        });
    });

    it('should dispatch failure action', () => {
      actions$ = of(FetchSimilarStart({ payload: { page: 1, movieId: 1 } }));
      mockHttp.getSimilar.and.returnValue(throwError(() => mockErrorResponse));

      effects.recommendedAndSimilarActions
        .pipe(take(1))
        .subscribe((action: any) => {
          expect(mockHttp.getSimilar).toHaveBeenCalledTimes(1);
          expect(action).toEqual(
            FetchSimilarFailure({ payload: 'Error Message' })
          );
        });
    });
  });

  describe('Fetch Details', () => {
    it('should dispatchs details success action', () => {
      actions$ = of(FetchDetailsStart({ payload: 131 }));
      mockHttp.getMovieDetails.and.returnValue(of(mockMovieDetailsResponse));

      effects.movieDetailsAction.pipe(take(1)).subscribe((action: any) => {
        expect(mockHttp.getMovieDetails).toHaveBeenCalledTimes(1);
        expect(action).toEqual(
          FetchDetailsSuccess({ payload: mockMovieDetailsResponse })
        );
      });
    });

    it('should dispatch details failure action', () => {
      actions$ = of(FetchDetailsStart({ payload: 131 }));
      mockHttp.getMovieDetails.and.returnValue(
        throwError(() => mockErrorResponse)
      );
      effects.movieDetailsAction.pipe(take(1)).subscribe((action: any) => {
        expect(mockHttp.getMovieDetails).toHaveBeenCalledTimes(1);
        expect(action).toEqual(
          FetchDetailsFailure({ payload: 'Error Message' })
        );
      });
    });

    it('should upsert when details success ', () => {
      actions$ = of(FetchDetailsSuccess({ payload: mockMovieDetailsResponse }));
      effects.fetchDetailsSuccess.pipe(take(1)).subscribe((action: any) => {
        const values = [
          ...mockMovieDetailsResponse.recommendations.results,
          ...mockMovieDetailsResponse.similar.results,
        ];
        expect(action).toEqual(UpsertManyMovies({ payload: values }));
      });
    });
  });

  it('should clear movies when details start action', () => {
    actions$ = of(FetchDetailsStart({ payload: 131 }));
    effects.detailsStart.pipe(take(1)).subscribe((action: any) => {
      expect(action).toEqual(ClearSpecificMovies());
    });
  });

  describe('should upsert similar or recommended success', () => {
    it('should upsert on recommended Success', () => {
      actions$ = of(FetchRecommendedSuccess({ payload: mockMoviesResponse }));
      effects.recommendedOrSimilarSuccess
        .pipe(take(1))
        .subscribe((action: any) => {
          expect(action).toEqual(
            UpsertManyMovies({ payload: mockMoviesResponse.results })
          );
        });
    });

    it('should upsert on similar Success', () => {
      actions$ = of(FetchSimilarSuccess({ payload: mockMoviesResponse }));
      effects.recommendedOrSimilarSuccess
        .pipe(take(1))
        .subscribe((action: any) => {
          expect(action).toEqual(
            UpsertManyMovies({ payload: mockMoviesResponse.results })
          );
        });
    });
  });

  describe('Update when Add or remove favorites', () => {
    it('should update when Add to favorites', () => {
      actions$ = of(addMovieToFavoriteSuccess({ movieId: 21 }));
      effects.favoriteChange.pipe(take(1)).subscribe((action: any) => {
        expect(action).toEqual(UpdateSpecificFavorite({ payload: true }));
      });
    });

    it('should update when Remove from favorites', () => {
      actions$ = of(deleteFavoriteSuccess({ favoriteMovieId: 123 }));
      effects.favoriteChange.pipe(take(1)).subscribe((action: any) => {
        expect(action).toEqual(UpdateSpecificFavorite({ payload: false }));
      });
    });
  });
});
