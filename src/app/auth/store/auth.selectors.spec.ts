import { mockUser } from 'src/app/shared/test/mock-user';
import { AuthState } from './auth.reducer';
import {
  selectCurrentUser,
  selectCurrentUserErrors,
  selectCurrentUserLoading,
  selectCurrentUserLogged,
} from './auth.selectors';

describe('Auth selectors', () => {
  it('Should select current User Loading', () => {
    const mockInitialState: AuthState = {
      isLoading: true,
      currentUser: null,
      authErrors: null,
    };
    const result = selectCurrentUserLoading.projector(mockInitialState);
    expect(result).toBeTrue();
  });

  it('Should select current User Errors', () => {
    const mockInitialState: AuthState = {
      isLoading: false,
      currentUser: null,
      authErrors: 'error',
    };
    const result = selectCurrentUserErrors.projector(mockInitialState);
    expect(result).toBe('error');
  });

  it('Should select curent User Logged in', () => {
    const mockInitialState: AuthState = {
      isLoading: false,
      currentUser: null,
      authErrors: null,
    };
    const result = selectCurrentUserLogged.projector(mockInitialState);
    expect(result).toBe(false);
  });

  it('Should select current User', () => {
    const userMock = mockUser;
    const mockInitialState: AuthState = {
      isLoading: false,
      currentUser: userMock,
      authErrors: null,
    };
    const result = selectCurrentUser.projector(mockInitialState);
    expect(result).toBe(userMock);
  });
});
