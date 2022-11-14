import { mockErrorResponse } from 'src/app/shared/test/mock-error-response';
import { mockUser } from 'src/app/shared/test/mock-user';
import {
  Logout,
  SignInFailure,
  SignInStart,
  SignInSuccess,
} from './auth.actions';
import { authInitialState, authReducer, AuthState } from './auth.reducer';

describe('Auth Reducer', () => {
  it('should return the default state with unknown action', () => {
    const action = { type: 'Unknown' };
    const state = authReducer(authInitialState, action);
    expect(state).toBe(authInitialState);
  });

  it('should change for signInStart', () => {
    const action = SignInStart({ payload: 'requestToken' });
    const state = authReducer(authInitialState, action);
    const newState: AuthState = {
      isLoading: true,
      authErrors: null,
      currentUser: authInitialState.currentUser,
    };
    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });

  it('should change for SignInSuccess', () => {
    const action = SignInSuccess({ payload: mockUser });
    const state = authReducer(authInitialState, action);
    const newState: AuthState = {
      isLoading: false,
      authErrors: null,
      currentUser: mockUser,
    };
    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });

  it('should change for SignInFailure', () => {
    const message = mockErrorResponse.error.status_message;
    const action = SignInFailure({ payload: message });
    const state = authReducer(authInitialState, action);
    const newState: AuthState = {
      isLoading: false,
      authErrors: message,
      currentUser: authInitialState.currentUser,
    };
    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });

  it('should change for Logout', () => {
    const action = Logout();
    const state = authReducer(authInitialState, action);
    const newState: AuthState = {
      isLoading: false,
      authErrors: null,
      currentUser: null,
    };
    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });
});
