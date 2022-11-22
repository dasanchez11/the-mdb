import { mockErrorResponse } from 'src/app/auth/test/mock-error-response';
import { mockMoviesResponse } from 'src/app/home/test/mock-response';
import { mockMovieDetails } from '../test/mock-movie-details';
import { mockMovieDetailsResponse } from '../test/mock-movie-details.response';
import { mockMovieReviewsResponse } from '../test/mock-movie-reviews.response';
import {
  FetchDetailsFailure,
  FetchDetailsStart,
  FetchDetailsSuccess,
  FetchRecommendedFailure,
  FetchRecommendedStart,
  FetchRecommendedSuccess,
  FetchSimilarFailure,
  FetchSimilarStart,
  FetchSimilarSuccess,
  UpdateAddSpecificRate,
  UpdateDeleteSpecificRate,
  UpdateSpecificFavorite,
  UpdateSpecificWatchlistSuccess,
} from './specific-movie.actions';
import { SpecificMovieActionTypes } from './specific-movie.types';

describe('Specific Movie Actions', () => {
  describe('Details', () => {
    it('should fetch details start', () => {
      const movieId = 1;
      const action = FetchDetailsStart({ payload: movieId });
      expect(action.type).toEqual(SpecificMovieActionTypes.FETCH_DETAILS_START);
      expect(action.payload).toEqual(movieId);
    });

    it('should fetch details success', () => {
      const action = FetchDetailsSuccess({ payload: mockMovieDetailsResponse });
      expect(action.type).toEqual(
        SpecificMovieActionTypes.FETCH_DETAILS_SUCCESS
      );
      expect(action.payload).toEqual(mockMovieDetailsResponse);
    });

    it('should fetch details failure', () => {
      const result = 'error';
      const action = FetchDetailsFailure({ payload: result });
      expect(action.type).toEqual(
        SpecificMovieActionTypes.FETCH_DETAILS_FAILURE
      );
      expect(action.payload).toEqual(result);
    });
  });

  describe('Similar', () => {
    it('should fetch similar start', () => {
      const page = 2;
      const movieId = 3;
      const action = FetchSimilarStart({
        payload: { page: page, movieId: movieId },
      });
      expect(action.type).toEqual(SpecificMovieActionTypes.FETCH_SIMILAR_START);
      expect(action.payload).toEqual({ page: page, movieId: movieId });
    });

    it('should fetch similar success', () => {
      const action = FetchSimilarSuccess({ payload: mockMoviesResponse });
      expect(action.type).toEqual(
        SpecificMovieActionTypes.FETCH_SIMILAR_SUCCESS
      );
      expect(action.payload).toEqual(mockMoviesResponse);
    });

    it('should fetch similar failure', () => {
      const result = 'error';
      const action = FetchSimilarFailure({ payload: result });
      expect(action.type).toEqual(
        SpecificMovieActionTypes.FETCH_SIMILAR_FAILURE
      );
      expect(action.payload).toEqual(result);
    });
  });

  describe('Recommended', () => {
    it('should fetch recommended start', () => {
      const page = 2;
      const movieId = 3;
      const action = FetchRecommendedStart({
        payload: { page: page, movieId: movieId },
      });
      expect(action.type).toEqual(
        SpecificMovieActionTypes.FETCH_RECOMMENDED_START
      );
      expect(action.payload).toEqual({ page: page, movieId: movieId });
    });

    it('should fetch recommended success', () => {
      const action = FetchRecommendedSuccess({ payload: mockMoviesResponse });
      expect(action.type).toEqual(
        SpecificMovieActionTypes.FETCH_RECOMMENDED_SUCCESS
      );
      expect(action.payload).toEqual(mockMoviesResponse);
    });

    it('should fetch recommended failure', () => {
      const result = 'error';
      const action = FetchRecommendedFailure({ payload: result });
      expect(action.type).toEqual(
        SpecificMovieActionTypes.FETCH_RECOMMENDED_FAILURE
      );
      expect(action.payload).toEqual(result);
    });
  });

  describe('Update', () => {
    it('should update favorites', () => {
      const action = UpdateSpecificFavorite({ payload: true });
      expect(action.type).toEqual(
        SpecificMovieActionTypes.UPDATE_SPECIFIC_MOVIE_FAVORITE
      );
      expect(action.payload).toEqual(true);
    });

    it('should update watchList', () => {
      const action = UpdateSpecificWatchlistSuccess({ payload: true });
      expect(action.type).toEqual(
        SpecificMovieActionTypes.UPDATE_SPECIFIC_MOVIE_WATCHLIST_SUCCESS
      );
      expect(action.payload).toEqual(true);
    });

    it('should update add rating', () => {
      const action = UpdateAddSpecificRate({ payload: 10 });
      expect(action.type).toEqual(
        SpecificMovieActionTypes.UPDATE_ADD_MOVIE_RATE_SUCCESS
      );
      expect(action.payload).toEqual(10);
    });

    it('should update remove rating', () => {
      const action = UpdateDeleteSpecificRate();
      expect(action.type).toEqual(
        SpecificMovieActionTypes.UPDATE_DELETE_MOVIE_RATE_SUCCESS
      );
    });
  });
});
