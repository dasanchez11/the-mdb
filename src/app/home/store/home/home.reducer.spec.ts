import { mockMoviesResponse } from '../../test/mock-response';
import {
  FetchPlayingNowFailure,
  FetchPlayingNowStart,
  FetchPlayingNowSuccess,
  FetchPopularFailure,
  FetchPopularStart,
  FetchPopularSuccess,
  FetchTopRatedFailure,
  FetchTopRatedStart,
  FetchTopRatedSuccess,
  FetchUpcomingFailure,
  FetchUpcomingStart,
  FetchUpcomingSuccess,
} from './home.actions';
import { homeInitialState, homeReducer, HomeState } from './home.reducer';

describe('Home Reducer', () => {
  it('should return the default state with unknown action', () => {
    const action = { type: 'Unknown' };
    const state = homeReducer(homeInitialState, action);
    expect(state).toBe(homeInitialState);
  });

  describe('should change for start actions', () => {
    it('playing now', () => {
      const action = FetchPlayingNowStart({ payload: 1 });
      const state = homeReducer(homeInitialState, action);
      const newState: HomeState = {
        loading: {
          playingNow: true,
          upcoming: false,
          topRated: false,
          popular: false,
        },
        errors: homeInitialState.errors,
        meta: homeInitialState.meta,
        ids: homeInitialState.ids,
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('top rated ', () => {
      const action = FetchTopRatedStart({ payload: 1 });
      const state = homeReducer(homeInitialState, action);
      const newState: HomeState = {
        loading: {
          playingNow: false,
          upcoming: false,
          topRated: true,
          popular: false,
        },
        errors: homeInitialState.errors,
        meta: homeInitialState.meta,
        ids: homeInitialState.ids,
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('popular', () => {
      const action = FetchPopularStart({ payload: 1 });
      const state = homeReducer(homeInitialState, action);
      const newState: HomeState = {
        loading: {
          playingNow: false,
          upcoming: false,
          topRated: false,
          popular: true,
        },
        errors: homeInitialState.errors,
        meta: homeInitialState.meta,
        ids: homeInitialState.ids,
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('upcoming', () => {
      const action = FetchUpcomingStart({ payload: 1 });
      const state = homeReducer(homeInitialState, action);
      const newState: HomeState = {
        loading: {
          playingNow: false,
          upcoming: true,
          topRated: false,
          popular: false,
        },
        errors: homeInitialState.errors,
        meta: homeInitialState.meta,
        ids: homeInitialState.ids,
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('should change for success actions', () => {
    it('playing now', () => {
      const action = FetchPlayingNowSuccess({ payload: mockMoviesResponse });
      const state = homeReducer(homeInitialState, action);
      const newState: HomeState = {
        loading: homeInitialState.loading,
        errors: homeInitialState.errors,
        meta: {
          ...homeInitialState.meta,
          playingNow: {
            page: mockMoviesResponse.page,
            total_pages: mockMoviesResponse.total_pages,
            total_results: mockMoviesResponse.total_results,
          },
        },
        ids: {
          ...homeInitialState.ids,
          playingNow: mockMoviesResponse.results.map(res => res.id),
        },
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('top rated ', () => {
      const action = FetchTopRatedSuccess({ payload: mockMoviesResponse });
      const state = homeReducer(homeInitialState, action);
      const newState: HomeState = {
        loading: homeInitialState.loading,
        errors: homeInitialState.errors,
        meta: {
          ...homeInitialState.meta,
          topRated: {
            page: mockMoviesResponse.page,
            total_pages: mockMoviesResponse.total_pages,
            total_results: mockMoviesResponse.total_results,
          },
        },
        ids: {
          ...homeInitialState.ids,
          topRated: mockMoviesResponse.results.map(res => res.id),
        },
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('popular', () => {
      const action = FetchPopularSuccess({ payload: mockMoviesResponse });
      const state = homeReducer(homeInitialState, action);
      const newState: HomeState = {
        loading: homeInitialState.loading,
        errors: homeInitialState.errors,
        meta: {
          ...homeInitialState.meta,
          popular: {
            page: mockMoviesResponse.page,
            total_pages: mockMoviesResponse.total_pages,
            total_results: mockMoviesResponse.total_results,
          },
        },
        ids: {
          ...homeInitialState.ids,
          popular: mockMoviesResponse.results.map(res => res.id),
        },
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('upcoming', () => {
      const action = FetchUpcomingSuccess({ payload: mockMoviesResponse });
      const state = homeReducer(homeInitialState, action);
      const newState: HomeState = {
        loading: homeInitialState.loading,
        errors: homeInitialState.errors,
        meta: {
          ...homeInitialState.meta,
          upcoming: {
            page: mockMoviesResponse.page,
            total_pages: mockMoviesResponse.total_pages,
            total_results: mockMoviesResponse.total_results,
          },
        },
        ids: {
          ...homeInitialState.ids,
          upcoming: mockMoviesResponse.results.map(res => res.id),
        },
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('should change for failure actions', () => {
    it('playing now', () => {
      const action = FetchPlayingNowFailure({ payload: 'error' });
      const state = homeReducer(homeInitialState, action);
      const newState: HomeState = {
        loading: homeInitialState.loading,
        errors: { ...homeInitialState.errors, playingNow: 'error' },
        meta: homeInitialState.meta,
        ids: homeInitialState.ids,
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('top rated ', () => {
      const action = FetchTopRatedFailure({ payload: 'error' });
      const state = homeReducer(homeInitialState, action);
      const newState: HomeState = {
        loading: homeInitialState.loading,
        errors: { ...homeInitialState.errors, topRated: 'error' },
        meta: homeInitialState.meta,
        ids: homeInitialState.ids,
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('popular', () => {
      const action = FetchPopularFailure({ payload: 'error' });
      const state = homeReducer(homeInitialState, action);
      const newState: HomeState = {
        loading: homeInitialState.loading,
        errors: { ...homeInitialState.errors, popular: 'error' },
        meta: homeInitialState.meta,
        ids: homeInitialState.ids,
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('upcoming', () => {
      const action = FetchUpcomingFailure({ payload: 'error' });
      const state = homeReducer(homeInitialState, action);
      const newState: HomeState = {
        loading: homeInitialState.loading,
        errors: { ...homeInitialState.errors, upcoming: 'error' },
        meta: homeInitialState.meta,
        ids: homeInitialState.ids,
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
