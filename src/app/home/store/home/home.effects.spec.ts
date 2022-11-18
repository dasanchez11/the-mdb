import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, take, throwError } from 'rxjs';
import { mockErrorResponse } from 'src/app/auth/test/mock-error-response';
import { UpsertManyMovies } from 'src/app/shared/store/movies.actions';
import { HomeHttpService } from '../../services/home-http.service';
import { mockMoviesResponse } from '../../test/mock-response';

import {
  FetchPlayingNowFailure,
  FetchPlayingNowStart,
  FetchPlayingNowSuccess,
  FetchPopularFailure,
  FetchPopularSuccess,
  FetchTopRatedFailure,
  FetchTopRatedSuccess,
  FetchUpcomingFailure,
  FetchUpcomingSuccess,
} from './home.actions';
import { HomeEffects } from './home.effects';
import { HomeActionTypes } from './home.types';

describe('Home Effects', () => {
  let actions$: Actions;
  let effects: HomeEffects;
  let mockHttp: any;

  beforeEach(async () => {
    mockHttp = jasmine.createSpyObj('homeHttp', [
      'getTopRated',
      'getPopular',
      'getNowPlaying',
      'getUpcoming',
    ]);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [
        HomeEffects,
        provideMockActions(() => actions$),
        {
          provide: HomeHttpService,
          useValue: mockHttp,
        },
      ],
    }).compileComponents();

    effects = TestBed.inject(HomeEffects);
  });

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  it('should get the correct possible actions ', () => {
    const objectRef1 =
      effects.possibleActions[HomeActionTypes.FETCH_PLAYING_NOW_START];
    expect(objectRef1.success.type).toEqual(FetchPlayingNowSuccess.type);
    expect(objectRef1.failure.type).toEqual(FetchPlayingNowFailure.type);
    objectRef1.function();
    expect(mockHttp.getNowPlaying).toHaveBeenCalledTimes(1);

    const objectRef2 =
      effects.possibleActions[HomeActionTypes.FETCH_POPULAR_START];
    expect(objectRef2.success.type).toEqual(FetchPopularSuccess.type);
    expect(objectRef2.failure.type).toEqual(FetchPopularFailure.type);
    objectRef2.function();
    expect(mockHttp.getPopular).toHaveBeenCalledTimes(1);

    const objectRef3 =
      effects.possibleActions[HomeActionTypes.FETCH_TOP_RATED_START];
    expect(objectRef3.success.type).toEqual(FetchTopRatedSuccess.type);
    expect(objectRef3.failure.type).toEqual(FetchTopRatedFailure.type);
    objectRef3.function();
    expect(mockHttp.getTopRated).toHaveBeenCalledTimes(1);

    const objectRef4 =
      effects.possibleActions[HomeActionTypes.FETCH_UPCOMING_START];
    expect(objectRef4.success.type).toEqual(FetchUpcomingSuccess.type);
    expect(objectRef4.failure.type).toEqual(FetchUpcomingFailure.type);
    objectRef4.function();
    expect(mockHttp.getUpcoming).toHaveBeenCalledTimes(1);
  });

  it('should dispatch success action', () => {
    actions$ = of(FetchPlayingNowStart);
    mockHttp.getNowPlaying.and.returnValue(of(mockMoviesResponse));

    effects.fetchStart.pipe(take(1)).subscribe((action: any) => {
      expect(mockHttp.getNowPlaying).toHaveBeenCalledTimes(1);
      expect(action).toEqual(
        FetchPlayingNowSuccess({ payload: mockMoviesResponse })
      );
    });
  });

  it('should dispatch failure action', () => {
    actions$ = of(FetchPlayingNowStart);
    mockHttp.getNowPlaying.and.returnValue(throwError(() => mockErrorResponse));

    effects.fetchStart.pipe(take(1)).subscribe((action: any) => {
      expect(mockHttp.getNowPlaying).toHaveBeenCalledTimes(1);
      expect(action).toEqual(
        FetchPlayingNowFailure({
          payload: mockErrorResponse.error.status_message,
        })
      );
    });
  });

  it('should upsert many movies when success', () => {
    actions$ = of(FetchPlayingNowSuccess({ payload: mockMoviesResponse }));

    effects.fetchSuccess.pipe(take(1)).subscribe((action: any) => {
      expect(action).toEqual(
        UpsertManyMovies({
          payload: mockMoviesResponse.results,
        })
      );
    });
  });
});
