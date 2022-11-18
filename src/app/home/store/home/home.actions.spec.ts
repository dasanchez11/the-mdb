import { mockMoviesResponse } from '../../test/mock-response';
import { mockMovies } from '../../test/mock-results';
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

describe('Home Actions', () => {
  it('Should fetch playing now start', () => {
    const page = 1;
    const action = FetchPlayingNowStart({ payload: page });
    expect(action.type).toEqual('[AuthHttpService] SIGN_IN_START');
    expect(action.payload).toEqual(page);
  });

  it('Should fetch playing now success', () => {
    const result = mockMoviesResponse;
    const action = FetchPlayingNowSuccess({ payload: result });
    expect(action.type).toEqual('[AuthHttpService] SIGN_IN_START');
    expect(action.payload).toEqual(result);
  });

  it('Should fetch playing now failure', () => {
    const result = 'error';
    const action = FetchPlayingNowFailure({ payload: result });
    expect(action.type).toEqual('[AuthHttpService] SIGN_IN_START');
    expect(action.payload).toEqual(result);
  });

  it('Should fetch top rated start', () => {
    const page = 1;
    const action = FetchTopRatedStart({ payload: page });
    expect(action.type).toEqual('[AuthHttpService] SIGN_IN_START');
    expect(action.payload).toEqual(page);
  });

  it('Should fetch top rated success', () => {
    const result = mockMoviesResponse;
    const action = FetchTopRatedSuccess({ payload: result });
    expect(action.type).toEqual('[AuthHttpService] SIGN_IN_START');
    expect(action.payload).toEqual(result);
  });

  it('Should fetch top rated failure', () => {
    const result = 'error';
    const action = FetchTopRatedFailure({ payload: result });
    expect(action.type).toEqual('[AuthHttpService] SIGN_IN_START');
    expect(action.payload).toEqual(result);
  });

  it('Should fetch upcoming start', () => {
    const page = 1;
    const action = FetchUpcomingStart({ payload: page });
    expect(action.type).toEqual('[AuthHttpService] SIGN_IN_START');
    expect(action.payload).toEqual(page);
  });

  it('Should fetch upcoming success', () => {
    const result = mockMoviesResponse;
    const action = FetchUpcomingSuccess({ payload: result });
    expect(action.type).toEqual('[AuthHttpService] SIGN_IN_START');
    expect(action.payload).toEqual(result);
  });

  it('Should fetch upcoming failure', () => {
    const result = 'error';
    const action = FetchUpcomingFailure({ payload: result });
    expect(action.type).toEqual('[AuthHttpService] SIGN_IN_START');
    expect(action.payload).toEqual(result);
  });

  it('Should fetch popular start', () => {
    const page = 1;
    const action = FetchPopularStart({ payload: page });
    expect(action.type).toEqual('[AuthHttpService] SIGN_IN_START');
    expect(action.payload).toEqual(page);
  });

  it('Should fetch popular success', () => {
    const result = mockMoviesResponse;
    const action = FetchPopularSuccess({ payload: result });
    expect(action.type).toEqual('[AuthHttpService] SIGN_IN_START');
    expect(action.payload).toEqual(result);
  });

  it('Should fetch popular failure', () => {
    const result = 'error';
    const action = FetchPopularFailure({ payload: result });
    expect(action.type).toEqual('[AuthHttpService] SIGN_IN_START');
    expect(action.payload).toEqual(result);
  });
});
